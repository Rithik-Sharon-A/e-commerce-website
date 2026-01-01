const productModel = require("../model/product.model");
const categoryModel = require("../model/category.model");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
    try {
        const { productId, productName, productPrice, productQuantity, productDescription, productCategory } = req.body;
        
        // Validate category exists
        const category = await categoryModel.findById(productCategory);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        const product = await productModel.create({ 
            productId, 
            productName, 
            productPrice, 
            productQuantity, 
            productDescription, 
            productCategory 
        });
        
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({ isActive: true })
            .populate('productCategory', 'categoryName categoryId level')
            .select('productId productName productPrice productQuantity productDescription productCategory')
            .sort({ productName: 1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by category (including hierarchy)
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { includeChildren } = req.query;
        
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        let categoryIds = [category._id];
        
        // If includeChildren is true, get all descendant categories
        if (includeChildren === 'true') {
            const descendants = await categoryModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(categoryId) }
                },
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parentCategory",
                        as: "descendants",
                        maxDepth: 10
                    }
                }
            ]);
            
            if (descendants.length > 0) {
                categoryIds = [
                    category._id,
                    ...descendants[0].descendants.map(d => d._id)
                ];
            }
        }
        
        const products = await productModel.find({
            productCategory: { $in: categoryIds },
            isActive: true
        })
        .populate('productCategory', 'categoryName categoryId level')
        .sort({ productName: 1 });
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Comprehensive product aggregations with category hierarchy
const aggregateProductsByCategory = async (req, res) => {
    try {
        // Aggregation 1: Products grouped by category with statistics
        const productsByCategoryStats = await productModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $group: {
                    _id: {
                        categoryId: "$category._id",
                        categoryName: "$category.categoryName",
                        level: "$category.level",
                        parentCategory: "$category.parentCategory"
                    },
                    products: {
                        $push: {
                            productId: "$productId",
                            productName: "$productName",
                            price: "$productPrice",
                            quantity: "$productQuantity"
                        }
                    },
                    totalProducts: { $sum: 1 },
                    totalInventoryValue: { 
                        $sum: { $multiply: ["$productPrice", "$productQuantity"] } 
                    },
                    totalQuantity: { $sum: "$productQuantity" },
                    averagePrice: { $avg: "$productPrice" },
                    minPrice: { $min: "$productPrice" },
                    maxPrice: { $max: "$productPrice" },
                    averageQuantity: { $avg: "$productQuantity" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id.parentCategory",
                    foreignField: "_id",
                    as: "parentCategoryInfo"
                }
            },
            {
                $unwind: {
                    path: "$parentCategoryInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id.categoryId",
                    categoryName: "$_id.categoryName",
                    level: "$_id.level",
                    parentCategoryName: "$parentCategoryInfo.categoryName",
                    totalProducts: 1,
                    totalInventoryValue: { $round: ["$totalInventoryValue", 2] },
                    totalQuantity: 1,
                    priceStatistics: {
                        average: { $round: ["$averagePrice", 2] },
                        min: { $round: ["$minPrice", 2] },
                        max: { $round: ["$maxPrice", 2] }
                    },
                    averageQuantityPerProduct: { $round: ["$averageQuantity", 2] },
                    products: 1
                }
            },
            {
                $sort: { level: 1, totalInventoryValue: -1 }
            }
        ]);

        // Aggregation 2: Hierarchical category analysis with product rollup
        const hierarchicalAnalysis = await categoryModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentCategory",
                    as: "descendants",
                    maxDepth: 10,
                    depthField: "descendantLevel"
                }
            },
            {
                $addFields: {
                    allCategoryIds: {
                        $concatArrays: [
                            ["$_id"],
                            "$descendants._id"
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { categoryIds: "$allCategoryIds" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$productCategory", "$$categoryIds"] },
                                isActive: true
                            }
                        }
                    ],
                    as: "allProducts"
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "productCategory",
                    as: "directProducts"
                }
            },
            {
                $project: {
                    categoryId: 1,
                    categoryName: 1,
                    level: 1,
                    parentCategory: 1,
                    descendantCount: { $size: "$descendants" },
                    directProductCount: { $size: "$directProducts" },
                    totalProductsInHierarchy: { $size: "$allProducts" },
                    directInventoryValue: {
                        $round: [{
                            $sum: {
                                $map: {
                                    input: "$directProducts",
                                    as: "p",
                                    in: { $multiply: ["$$p.productPrice", "$$p.productQuantity"] }
                                }
                            }
                        }, 2]
                    },
                    hierarchyInventoryValue: {
                        $round: [{
                            $sum: {
                                $map: {
                                    input: "$allProducts",
                                    as: "p",
                                    in: { $multiply: ["$$p.productPrice", "$$p.productQuantity"] }
                                }
                            }
                        }, 2]
                    },
                    directQuantity: { $sum: "$directProducts.productQuantity" },
                    hierarchyQuantity: { $sum: "$allProducts.productQuantity" }
                }
            },
            {
                $sort: { level: 1, hierarchyInventoryValue: -1 }
            }
        ]);

        // Aggregation 3: Top products by category with parent hierarchy
        const topProductsByCategory = await productModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $addFields: {
                    inventoryValue: { $multiply: ["$productPrice", "$productQuantity"] }
                }
            },
            {
                $sort: { "category._id": 1, inventoryValue: -1 }
            },
            {
                $group: {
                    _id: "$category._id",
                    categoryName: { $first: "$category.categoryName" },
                    categoryLevel: { $first: "$category.level" },
                    parentCategory: { $first: "$category.parentCategory" },
                    topProducts: {
                        $push: {
                            productId: "$productId",
                            productName: "$productName",
                            price: "$productPrice",
                            quantity: "$productQuantity",
                            inventoryValue: { $round: ["$inventoryValue", 2] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    topProducts: { $slice: ["$topProducts", 5] }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "parentCategory",
                    foreignField: "_id",
                    as: "parentInfo"
                }
            },
            {
                $unwind: {
                    path: "$parentInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id",
                    categoryName: 1,
                    categoryLevel: 1,
                    parentCategoryName: "$parentInfo.categoryName",
                    topProducts: 1
                }
            },
            {
                $sort: { categoryLevel: 1, categoryName: 1 }
            }
        ]);

        // Aggregation 4: Category distribution and inventory insights
        const categoryDistribution = await productModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $facet: {
                    byLevel: [
                        {
                            $group: {
                                _id: "$category.level",
                                categoryCount: { $addToSet: "$category._id" },
                                productCount: { $sum: 1 },
                                totalValue: { 
                                    $sum: { $multiply: ["$productPrice", "$productQuantity"] } 
                                },
                                avgPrice: { $avg: "$productPrice" }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                level: "$_id",
                                uniqueCategories: { $size: "$categoryCount" },
                                productCount: 1,
                                totalValue: { $round: ["$totalValue", 2] },
                                avgPrice: { $round: ["$avgPrice", 2] }
                            }
                        },
                        {
                            $sort: { level: 1 }
                        }
                    ],
                    priceRanges: [
                        {
                            $bucket: {
                                groupBy: "$productPrice",
                                boundaries: [0, 50, 100, 200, 500, 1000, 5000, 10000],
                                default: "10000+",
                                output: {
                                    count: { $sum: 1 },
                                    products: {
                                        $push: {
                                            name: "$productName",
                                            price: "$productPrice",
                                            category: "$category.categoryName"
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    stockLevels: [
                        {
                            $group: {
                                _id: {
                                    $switch: {
                                        branches: [
                                            { case: { $lte: ["$productQuantity", 10] }, then: "Low Stock (≤10)" },
                                            { case: { $lte: ["$productQuantity", 50] }, then: "Medium Stock (11-50)" },
                                            { case: { $lte: ["$productQuantity", 100] }, then: "Good Stock (51-100)" }
                                        ],
                                        default: "High Stock (>100)"
                                    }
                                },
                                count: { $sum: 1 },
                                categories: { $addToSet: "$category.categoryName" }
                            }
                        },
                        {
                            $sort: { _id: 1 }
                        }
                    ]
                }
            }
        ]);

        res.status(200).json({
            productsByCategoryStats,
            hierarchicalAnalysis,
            topProductsByCategory,
            categoryDistribution: categoryDistribution[0],
            summary: {
                totalProductsAnalyzed: productsByCategoryStats.reduce((sum, cat) => sum + cat.totalProducts, 0),
                categoriesWithProducts: productsByCategoryStats.length,
                totalInventoryValue: productsByCategoryStats.reduce((sum, cat) => sum + cat.totalInventoryValue, 0).toFixed(2)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get product statistics summary
const getProductStatistics = async (req, res) => {
    try {
        const stats = await productModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $facet: {
                    overall: [
                        {
                            $group: {
                                _id: null,
                                totalProducts: { $sum: 1 },
                                totalInventoryValue: { 
                                    $sum: { $multiply: ["$productPrice", "$productQuantity"] } 
                                },
                                totalQuantity: { $sum: "$productQuantity" },
                                avgPrice: { $avg: "$productPrice" },
                                avgQuantity: { $avg: "$productQuantity" },
                                minPrice: { $min: "$productPrice" },
                                maxPrice: { $max: "$productPrice" }
                            }
                        }
                    ],
                    byCategory: [
                        {
                            $group: {
                                _id: "$category.categoryName",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $sort: { count: -1 }
                        },
                        {
                            $limit: 10
                        }
                    ]
                }
            }
        ]);
        
        res.status(200).json(stats[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    aggregateProductsByCategory,
    getProductStatistics
};