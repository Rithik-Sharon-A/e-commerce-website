const categoryModel = require("../model/category.model");
const mongoose = require("mongoose");

const createCategory = async (req, res) => {
    try{
        const{ categoryId, categoryName, categoryDescription, parentCategory } = req.body;
        
        // Calculate level based on parent
        let level = 0;
        if (parentCategory) {
            const parent = await categoryModel.findById(parentCategory);
            if (!parent) {
                return res.status(404).json({ message: "Parent category not found" });
            }
            level = parent.level + 1;
        }
        
        const category = await categoryModel.create({ 
            categoryId, 
            categoryName, 
            categoryDescription, 
            parentCategory: parentCategory || null,
            level 
        });
        res.status(201).json({ message: "Category created successfully", category });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
};

const getAllCategories = async (req, res) => {
    try{
        const categories = await categoryModel.find({ isActive: true })
            .populate('parentCategory', 'categoryName categoryId')
            .sort({ level: 1, categoryName: 1 });
        res.status(200).json(categories);
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
};

// Get category hierarchy tree
const getCategoryTree = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { isActive: true }
            },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentCategory",
                    as: "children",
                    maxDepth: 10
                }
            },
            {
                $match: { parentCategory: null }
            },
            {
                $project: {
                    categoryId: 1,
                    categoryName: 1,
                    categoryDescription: 1,
                    level: 1,
                    childrenCount: { $size: "$children" }
                }
            },
            {
                $sort: { categoryName: 1 }
            }
        ];
        
        const tree = await categoryModel.aggregate(pipeline);
        res.status(200).json(tree);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Comprehensive category aggregations
const aggregateCategories = async (req, res) => {
    try {
        const productModel = require("../model/product.model");
        
        // Aggregation 1: Categories with product counts and total values
        const categoriesWithProducts = await categoryModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "productCategory",
                    as: "products"
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
                $addFields: {
                    totalProducts: { $size: "$products" },
                    totalInventoryValue: {
                        $sum: {
                            $map: {
                                input: "$products",
                                as: "product",
                                in: { $multiply: ["$$product.productPrice", "$$product.productQuantity"] }
                            }
                        }
                    },
                    averagePrice: { $avg: "$products.productPrice" },
                    totalQuantity: { $sum: "$products.productQuantity" }
                }
            },
            {
                $project: {
                    categoryId: 1,
                    categoryName: 1,
                    categoryDescription: 1,
                    level: 1,
                    parentCategoryName: "$parentInfo.categoryName",
                    parentCategoryId: "$parentInfo.categoryId",
                    totalProducts: 1,
                    totalInventoryValue: { $round: ["$totalInventoryValue", 2] },
                    averagePrice: { $round: ["$averagePrice", 2] },
                    totalQuantity: 1,
                    hasProducts: { $gt: ["$totalProducts", 0] }
                }
            },
            {
                $sort: { level: 1, totalProducts: -1 }
            }
        ]);

        // Aggregation 2: Category hierarchy with nested product statistics
        const hierarchyStats = await categoryModel.aggregate([
            {
                $match: { isActive: true, parentCategory: null }
            },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentCategory",
                    as: "allDescendants",
                    maxDepth: 10,
                    depthField: "depth"
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
                $addFields: {
                    descendantIds: "$allDescendants._id",
                    directProductCount: { $size: "$directProducts" },
                    totalDescendants: { $size: "$allDescendants" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    let: { descendantIds: "$descendantIds", currentId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$productCategory", "$$currentId"] },
                                        { $in: ["$productCategory", "$$descendantIds"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "allProducts"
                }
            },
            {
                $project: {
                    categoryId: 1,
                    categoryName: 1,
                    categoryDescription: 1,
                    level: 1,
                    directProductCount: 1,
                    totalDescendants: 1,
                    totalProductsInHierarchy: { $size: "$allProducts" },
                    totalHierarchyValue: {
                        $round: [{
                            $sum: {
                                $map: {
                                    input: "$allProducts",
                                    as: "product",
                                    in: { $multiply: ["$$product.productPrice", "$$product.productQuantity"] }
                                }
                            }
                        }, 2]
                    }
                }
            },
            {
                $sort: { totalProductsInHierarchy: -1 }
            }
        ]);

        // Aggregation 3: Category performance metrics
        const performanceMetrics = await categoryModel.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "productCategory",
                    as: "products"
                }
            },
            {
                $unwind: {
                    path: "$products",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        categoryId: "$_id",
                        categoryName: "$categoryName",
                        level: "$level"
                    },
                    productCount: { $sum: { $cond: [{ $ifNull: ["$products", false] }, 1, 0] } },
                    minPrice: { $min: "$products.productPrice" },
                    maxPrice: { $max: "$products.productPrice" },
                    avgPrice: { $avg: "$products.productPrice" },
                    totalValue: { 
                        $sum: { 
                            $multiply: ["$products.productPrice", "$products.productQuantity"] 
                        } 
                    },
                    totalStock: { $sum: "$products.productQuantity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryId: "$_id.categoryId",
                    categoryName: "$_id.categoryName",
                    level: "$_id.level",
                    productCount: 1,
                    priceRange: {
                        min: { $round: ["$minPrice", 2] },
                        max: { $round: ["$maxPrice", 2] },
                        avg: { $round: ["$avgPrice", 2] }
                    },
                    totalValue: { $round: ["$totalValue", 2] },
                    totalStock: 1,
                    avgValuePerProduct: { 
                        $round: [{ 
                            $cond: [
                                { $gt: ["$productCount", 0] },
                                { $divide: ["$totalValue", "$productCount"] },
                                0
                            ]
                        }, 2] 
                    }
                }
            },
            {
                $sort: { totalValue: -1 }
            }
        ]);

        res.status(200).json({
            categoriesWithProducts,
            hierarchyStats,
            performanceMetrics,
            summary: {
                totalCategories: categoriesWithProducts.length,
                categoriesWithProducts: categoriesWithProducts.filter(c => c.hasProducts).length,
                emptyCategories: categoriesWithProducts.filter(c => !c.hasProducts).length
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCategory, getAllCategories, getCategoryTree, aggregateCategories };