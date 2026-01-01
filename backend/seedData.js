const mongoose = require('mongoose');
const categoryModel = require('./model/category.model');
const productModel = require('./model/product.model');

// Sample seed data for testing category hierarchy and product aggregations
const seedDatabase = async () => {
    try {
        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('Clearing existing data...');
        await categoryModel.deleteMany({});
        await productModel.deleteMany({});
        console.log('Existing data cleared.');

        // Level 0: Root Categories
        console.log('Creating root categories...');
        const electronics = await categoryModel.create({
            categoryId: 'CAT001',
            categoryName: 'Electronics',
            categoryDescription: 'All electronic products',
            parentCategory: null,
            level: 0
        });

        const homeGarden = await categoryModel.create({
            categoryId: 'CAT002',
            categoryName: 'Home & Garden',
            categoryDescription: 'Home and garden products',
            parentCategory: null,
            level: 0
        });

        const sports = await categoryModel.create({
            categoryId: 'CAT003',
            categoryName: 'Sports & Outdoors',
            categoryDescription: 'Sports and outdoor equipment',
            parentCategory: null,
            level: 0
        });

        // Level 1: Child Categories of Electronics
        console.log('Creating child categories...');
        const computers = await categoryModel.create({
            categoryId: 'CAT101',
            categoryName: 'Computers',
            categoryDescription: 'Computing devices',
            parentCategory: electronics._id,
            level: 1
        });

        const mobileDevices = await categoryModel.create({
            categoryId: 'CAT102',
            categoryName: 'Mobile Devices',
            categoryDescription: 'Smartphones and tablets',
            parentCategory: electronics._id,
            level: 1
        });

        const accessories = await categoryModel.create({
            categoryId: 'CAT103',
            categoryName: 'Electronics Accessories',
            categoryDescription: 'Cables, chargers, cases',
            parentCategory: electronics._id,
            level: 1
        });

        // Level 1: Child Categories of Home & Garden
        const furniture = await categoryModel.create({
            categoryId: 'CAT201',
            categoryName: 'Furniture',
            categoryDescription: 'Home and office furniture',
            parentCategory: homeGarden._id,
            level: 1
        });

        const kitchenware = await categoryModel.create({
            categoryId: 'CAT202',
            categoryName: 'Kitchenware',
            categoryDescription: 'Kitchen appliances and tools',
            parentCategory: homeGarden._id,
            level: 1
        });

        // Level 2: Grandchild Categories
        console.log('Creating grandchild categories...');
        const laptops = await categoryModel.create({
            categoryId: 'CAT1011',
            categoryName: 'Laptops',
            categoryDescription: 'Portable computers',
            parentCategory: computers._id,
            level: 2
        });

        const desktops = await categoryModel.create({
            categoryId: 'CAT1012',
            categoryName: 'Desktops',
            categoryDescription: 'Desktop computers',
            parentCategory: computers._id,
            level: 2
        });

        const smartphones = await categoryModel.create({
            categoryId: 'CAT1021',
            categoryName: 'Smartphones',
            categoryDescription: 'Mobile phones',
            parentCategory: mobileDevices._id,
            level: 2
        });

        const tablets = await categoryModel.create({
            categoryId: 'CAT1022',
            categoryName: 'Tablets',
            categoryDescription: 'Tablet devices',
            parentCategory: mobileDevices._id,
            level: 2
        });

        console.log('Categories created successfully!');
        console.log('\nCategory Hierarchy:');
        console.log('Electronics');
        console.log('  ├── Computers');
        console.log('  │   ├── Laptops');
        console.log('  │   └── Desktops');
        console.log('  ├── Mobile Devices');
        console.log('  │   ├── Smartphones');
        console.log('  │   └── Tablets');
        console.log('  └── Electronics Accessories');
        console.log('Home & Garden');
        console.log('  ├── Furniture');
        console.log('  └── Kitchenware');
        console.log('Sports & Outdoors');

        // Create Products
        console.log('\nCreating products...');

        // Laptop Products
        await productModel.create([
            {
                productId: 'PROD001',
                productName: 'MacBook Pro 16"',
                productPrice: 2499.99,
                productQuantity: 25,
                productDescription: 'High-performance laptop for professionals',
                productCategory: laptops._id
            },
            {
                productId: 'PROD002',
                productName: 'Dell XPS 15',
                productPrice: 1899.99,
                productQuantity: 35,
                productDescription: 'Premium Windows laptop',
                productCategory: laptops._id
            },
            {
                productId: 'PROD003',
                productName: 'HP Pavilion',
                productPrice: 799.99,
                productQuantity: 50,
                productDescription: 'Budget-friendly laptop',
                productCategory: laptops._id
            },
            {
                productId: 'PROD004',
                productName: 'Lenovo ThinkPad X1',
                productPrice: 1599.99,
                productQuantity: 30,
                productDescription: 'Business laptop',
                productCategory: laptops._id
            }
        ]);

        // Desktop Products
        await productModel.create([
            {
                productId: 'PROD005',
                productName: 'iMac 24"',
                productPrice: 1799.99,
                productQuantity: 20,
                productDescription: 'All-in-one desktop computer',
                productCategory: desktops._id
            },
            {
                productId: 'PROD006',
                productName: 'Gaming PC RTX 4080',
                productPrice: 2999.99,
                productQuantity: 15,
                productDescription: 'High-end gaming desktop',
                productCategory: desktops._id
            },
            {
                productId: 'PROD007',
                productName: 'Dell OptiPlex',
                productPrice: 899.99,
                productQuantity: 40,
                productDescription: 'Business desktop',
                productCategory: desktops._id
            }
        ]);

        // Smartphone Products
        await productModel.create([
            {
                productId: 'PROD008',
                productName: 'iPhone 15 Pro',
                productPrice: 1199.99,
                productQuantity: 100,
                productDescription: 'Latest Apple smartphone',
                productCategory: smartphones._id
            },
            {
                productId: 'PROD009',
                productName: 'Samsung Galaxy S24',
                productPrice: 999.99,
                productQuantity: 120,
                productDescription: 'Flagship Android phone',
                productCategory: smartphones._id
            },
            {
                productId: 'PROD010',
                productName: 'Google Pixel 8',
                productPrice: 799.99,
                productQuantity: 80,
                productDescription: 'Pure Android experience',
                productCategory: smartphones._id
            },
            {
                productId: 'PROD011',
                productName: 'OnePlus 12',
                productPrice: 699.99,
                productQuantity: 60,
                productDescription: 'Flagship killer smartphone',
                productCategory: smartphones._id
            }
        ]);

        // Tablet Products
        await productModel.create([
            {
                productId: 'PROD012',
                productName: 'iPad Pro 12.9"',
                productPrice: 1299.99,
                productQuantity: 45,
                productDescription: 'Professional tablet',
                productCategory: tablets._id
            },
            {
                productId: 'PROD013',
                productName: 'Samsung Galaxy Tab S9',
                productPrice: 849.99,
                productQuantity: 55,
                productDescription: 'Android tablet',
                productCategory: tablets._id
            },
            {
                productId: 'PROD014',
                productName: 'iPad Air',
                productPrice: 599.99,
                productQuantity: 70,
                productDescription: 'Mid-range iPad',
                productCategory: tablets._id
            }
        ]);

        // Accessories Products
        await productModel.create([
            {
                productId: 'PROD015',
                productName: 'USB-C Cable',
                productPrice: 19.99,
                productQuantity: 500,
                productDescription: 'Fast charging cable',
                productCategory: accessories._id
            },
            {
                productId: 'PROD016',
                productName: 'Wireless Mouse',
                productPrice: 49.99,
                productQuantity: 200,
                productDescription: 'Ergonomic wireless mouse',
                productCategory: accessories._id
            },
            {
                productId: 'PROD017',
                productName: 'Phone Case',
                productPrice: 29.99,
                productQuantity: 300,
                productDescription: 'Protective phone case',
                productCategory: accessories._id
            },
            {
                productId: 'PROD018',
                productName: 'Laptop Bag',
                productPrice: 79.99,
                productQuantity: 150,
                productDescription: 'Professional laptop carrying case',
                productCategory: accessories._id
            }
        ]);

        // Furniture Products
        await productModel.create([
            {
                productId: 'PROD019',
                productName: 'Office Desk',
                productPrice: 399.99,
                productQuantity: 30,
                productDescription: 'Ergonomic office desk',
                productCategory: furniture._id
            },
            {
                productId: 'PROD020',
                productName: 'Gaming Chair',
                productPrice: 299.99,
                productQuantity: 40,
                productDescription: 'Comfortable gaming chair',
                productCategory: furniture._id
            },
            {
                productId: 'PROD021',
                productName: 'Bookshelf',
                productPrice: 149.99,
                productQuantity: 50,
                productDescription: '5-tier bookshelf',
                productCategory: furniture._id
            }
        ]);

        // Kitchenware Products
        await productModel.create([
            {
                productId: 'PROD022',
                productName: 'Blender Pro',
                productPrice: 129.99,
                productQuantity: 60,
                productDescription: 'High-speed blender',
                productCategory: kitchenware._id
            },
            {
                productId: 'PROD023',
                productName: 'Coffee Maker',
                productPrice: 89.99,
                productQuantity: 75,
                productDescription: 'Automatic coffee maker',
                productCategory: kitchenware._id
            },
            {
                productId: 'PROD024',
                productName: 'Knife Set',
                productPrice: 199.99,
                productQuantity: 45,
                productDescription: 'Professional knife set',
                productCategory: kitchenware._id
            }
        ]);

        // Sports Products (no hierarchy, direct to root)
        await productModel.create([
            {
                productId: 'PROD025',
                productName: 'Yoga Mat',
                productPrice: 39.99,
                productQuantity: 100,
                productDescription: 'Non-slip yoga mat',
                productCategory: sports._id
            },
            {
                productId: 'PROD026',
                productName: 'Dumbbells Set',
                productPrice: 149.99,
                productQuantity: 50,
                productDescription: 'Adjustable dumbbells',
                productCategory: sports._id
            }
        ]);

        console.log('Products created successfully!');
        console.log('\nDatabase seeded with:');
        console.log('- 13 Categories (3 levels deep)');
        console.log('- 26 Products across all categories');
        
        console.log('\n✅ Seed data created successfully!');
        console.log('\nYou can now test the following aggregation endpoints:');
        console.log('1. GET /api/category/aggregation');
        console.log('2. GET /api/product/aggregation/by-category');
        console.log('3. GET /api/product/aggregation/statistics');
        console.log('4. GET /api/category/tree');
        console.log('5. GET /api/product/category/:categoryId?includeChildren=true');

    } catch (error) {
        console.error('Error seeding database:', error.message);
        console.error(error);
    }
};

// Execute seed function
// Usage: node seedData.js
if (require.main === module) {
    // Replace with your MongoDB connection string
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
    
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            return seedDatabase();
        })
        .then(() => {
            console.log('\nClosing database connection...');
            return mongoose.connection.close();
        })
        .then(() => {
            console.log('Database connection closed.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

module.exports = seedDatabase;

