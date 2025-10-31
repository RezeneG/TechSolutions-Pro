// TechSolutions Pro - MongoDB Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    console.log('💡 Please check your .env file and ensure MONGODB_URI is set');
    process.exit(1);
}

console.log('🔗 Attempting to connect to MongoDB Atlas...');
console.log('📝 Connection string:', MONGODB_URI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://username:password@'));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
})
.then(() => {
    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
})
.catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check your MongoDB Atlas connection string');
    console.log('   2. Ensure your IP is whitelisted in Atlas Network Access');
    console.log('   3. Verify your database user credentials');
    console.log('   4. Check if your cluster is running');
    process.exit(1);
});

// MongoDB Schemas

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    company: String,
    phone: String,
    bio: String,
    role: { type: String, default: 'customer' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    serviceRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRequest' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    learningHours: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Admin User Schema
const adminUserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'manager', 'viewer'], default: 'viewer' },
    permissions: [String],
    lastLogin: Date,
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    specs: [String],
    images: [String],
    badge: String,
    icon: String,
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Service Schema
const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: String,
    category: String,
    features: [String],
    details: String,
    duration: String,
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Course Schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: String,
    price: Number,
    originalPrice: Number,
    level: String,
    category: String,
    enrolled: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    badge: String,
    details: String,
    instructor: String,
    modules: [{
        title: String,
        duration: String,
        content: String
    }],
    status: { type: String, default: 'published' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Service Request Schema
const serviceRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    status: { type: String, default: 'pending' },
    details: String,
    requirements: String,
    budget: String,
    timeline: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        itemType: { type: String, enum: ['service', 'course', 'product'], required: true },
        itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
        itemName: String,
        quantity: { type: Number, default: 1 },
        price: Number
    }],
    totalAmount: Number,
    status: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'pending' },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const AdminUser = mongoose.model('AdminUser', adminUserSchema);
const Product = mongoose.model('Product', productSchema);
const Service = mongoose.model('Service', serviceSchema);
const Course = mongoose.model('Course', courseSchema);
const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
const Order = mongoose.model('Order', orderSchema);

// Authentication middleware
const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Admin authentication token required" 
            });
        }
        
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const adminUser = await AdminUser.findById(decoded.userId);
        
        if (!adminUser) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid authentication token" 
            });
        }
        
        req.adminUser = adminUser;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid authentication token" 
        });
    }
};

// Permission middleware
function requirePermission(permission) {
    return (req, res, next) => {
        const userPermissions = getPermissions(req.adminUser.role);
        
        if (!userPermissions.includes(permission)) {
            return res.status(403).json({ 
                success: false, 
                message: `Insufficient permissions. Required: ${permission}` 
            });
        }
        
        next();
    };
}

// Helper function for permissions
function getPermissions(role) {
    const permissions = {
        superadmin: ['read', 'write', 'delete', 'manage_users', 'manage_services', 'manage_courses', 'manage_products', 'view_analytics', 'manage_admins'],
        manager: ['read', 'write', 'manage_services', 'manage_courses', 'manage_products', 'view_analytics'],
        viewer: ['read', 'view_analytics']
    };
    return permissions[role] || ['read'];
}

// Routes

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({ 
        status: 'OK', 
        message: 'TechSolutions Pro Backend is running!',
        database: dbStatus,
        timestamp: new Date().toISOString(),
        version: '2.1.0'
    });
});

// Public endpoints
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find({ status: 'active' });
        res.json(services);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find({ status: 'published' });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const { category, featured } = req.query;
        let filter = { status: 'active' };
        
        if (category && category !== 'all') {
            filter.category = category;
        }
        
        if (featured === 'true') {
            filter.featured = true;
        }
        
        const products = await Product.find(filter);
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// User Authentication Endpoints
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                company: user.company,
                phone: user.phone,
                bio: user.bio,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                company: user.company,
                phone: user.phone,
                bio: user.bio,
                role: user.role,
                enrolledCourses: user.enrolledCourses,
                serviceRequests: user.serviceRequests,
                learningHours: user.learningHours
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Admin Authentication Endpoints
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Username and password required" 
            });
        }
        
        const adminUser = await AdminUser.findOne({ username });
        
        if (!adminUser) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid username or password" 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid username or password" 
            });
        }
        
        // Update last login
        adminUser.lastLogin = new Date();
        await adminUser.save();
        
        const token = jwt.sign(
            { userId: adminUser._id, username: adminUser.username, role: adminUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        
        res.json({ 
            success: true, 
            message: "Login successful",
            user: { 
                id: adminUser._id,
                username: adminUser.username, 
                role: adminUser.role,
                email: adminUser.email
            },
            token: token,
            permissions: getPermissions(adminUser.role)
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
});

// Protected Admin endpoints
app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalServices = await Service.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        
        // Calculate revenue from orders
        const revenueData = await Order.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        
        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
        
        // Recent activities
        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);
            
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalServices,
            totalCourses,
            totalProducts,
            totalOrders,
            revenue: `£${totalRevenue.toLocaleString()}`,
            recentOrders,
            recentUsers,
            userStats: {
                total: totalUsers,
                byRole: await User.aggregate([
                    { $group: { _id: '$role', count: { $sum: 1 } } }
                ])
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Admin Management Endpoints
app.get('/api/admin/services', authenticateAdmin, async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        
        const serviceStats = await Service.aggregate([
            { $group: { 
                _id: '$category', 
                count: { $sum: 1 }
            }}
        ]);

        res.json({
            services,
            stats: {
                total: services.length,
                byCategory: serviceStats
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/courses', authenticateAdmin, async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        
        const courseStats = await Course.aggregate([
            { $group: { 
                _id: '$level', 
                count: { $sum: 1 },
                totalEnrolled: { $sum: '$enrolled' }
            }}
        ]);

        res.json({
            courses,
            stats: {
                total: courses.length,
                byLevel: courseStats
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/products', authenticateAdmin, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        
        const productStats = await Product.aggregate([
            { $group: { 
                _id: '$category', 
                count: { $sum: 1 },
                totalStock: { $sum: '$stock' }
            }}
        ]);

        res.json({
            products,
            stats: {
                total: products.length,
                byCategory: productStats
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRUD Operations for Services
app.post('/api/admin/services', authenticateAdmin, requirePermission('manage_services'), async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        
        res.json({
            success: true,
            message: "Service added successfully",
            service: newService
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/admin/services/:id', authenticateAdmin, requirePermission('manage_services'), async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        
        res.json({
            success: true,
            message: "Service updated successfully",
            service
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRUD Operations for Courses
app.post('/api/admin/courses', authenticateAdmin, requirePermission('manage_courses'), async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        
        res.json({
            success: true,
            message: "Course added successfully",
            course: newCourse
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRUD Operations for Products
app.post('/api/admin/products', authenticateAdmin, requirePermission('manage_products'), async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        
        res.json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Database Seeding Endpoint
app.post('/api/admin/seed', async (req, res) => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await AdminUser.deleteMany({});
        await Product.deleteMany({});
        await Service.deleteMany({});
        await Course.deleteMany({});
        await ServiceRequest.deleteMany({});
        await Order.deleteMany({});

        // Create admin users with hashed passwords
        const adminUsers = [
            {
                username: "admin",
                email: "admin@techsolutions.com",
                password: await bcrypt.hash("admin123", 12),
                role: "superadmin"
            },
            {
                username: "manager", 
                email: "manager@techsolutions.com",
                password: await bcrypt.hash("manager123", 12),
                role: "manager"
            },
            {
                username: "demo",
                email: "demo@techsolutions.com", 
                password: await bcrypt.hash("demo123", 12),
                role: "viewer"
            }
        ];
        await AdminUser.insertMany(adminUsers);

        // Create sample products
        const products = await Product.insertMany([
            {
                name: "Gaming Laptop Pro X1",
                category: "laptop",
                description: "High-performance gaming laptop with RTX 4070 and Intel i9 processor.",
                price: 1899,
                originalPrice: 2199,
                specs: ["Intel i9-13900H", "RTX 4070 8GB", "32GB DDR5 RAM", "1TB NVMe SSD", "15.6\" 240Hz Display"],
                badge: "BESTSELLER",
                icon: "fa-laptop",
                stock: 15,
                featured: true
            },
            {
                name: "Business Ultrabook",
                category: "laptop", 
                description: "Lightweight and powerful business laptop with all-day battery life.",
                price: 1299,
                originalPrice: 1499,
                specs: ["Intel i7-1360P", "Iris Xe Graphics", "16GB LPDDR5", "512GB SSD", "14\" 2K Display"],
                badge: "NEW",
                icon: "fa-laptop",
                stock: 25,
                featured: true
            },
            {
                name: "Mechanical Keyboard Pro",
                category: "peripheral",
                description: "RGB mechanical keyboard with Cherry MX switches.",
                price: 129,
                originalPrice: 159,
                specs: ["Cherry MX Red", "RGB Backlight", "Aluminum Frame", "USB-C", "Programmable Keys"],
                badge: "",
                icon: "fa-keyboard",
                stock: 50,
                featured: true
            }
        ]);

        // Create sample services
        const services = await Service.insertMany([
            {
                name: "Website Development",
                description: "Custom website development with modern technologies.",
                price: "£999",
                category: "development",
                features: ["Responsive Design", "SEO Optimized", "CMS Integration", "3 Months Support"],
                details: "Our website development service includes comprehensive planning, design, development, and deployment.",
                duration: "4-6 weeks"
            },
            {
                name: "IT Support & Maintenance",
                description: "Professional IT support and maintenance services.",
                price: "£45/hour",
                category: "support",
                features: ["24/7 Support", "Remote Assistance", "Hardware Maintenance", "Software Updates"],
                details: "Our IT support service provides comprehensive technical assistance.",
                duration: "Ongoing"
            }
        ]);

        // Create sample courses
        const courses = await Course.insertMany([
            {
                name: "Complete Web Development Bootcamp",
                description: "Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
                duration: "12 weeks",
                price: 499,
                originalPrice: 799,
                level: "Beginner",
                category: "development",
                enrolled: 1247,
                rating: 4.8,
                badge: "BESTSELLER",
                details: "This comprehensive bootcamp covers everything you need to become a full-stack web developer.",
                instructor: "John Smith"
            },
            {
                name: "Cybersecurity Essentials",
                description: "Learn essential cybersecurity principles and protection strategies.",
                duration: "8 weeks",
                price: 399,
                originalPrice: 599,
                level: "Intermediate", 
                category: "security",
                enrolled: 892,
                rating: 4.7,
                badge: "HOT",
                details: "This course provides a comprehensive introduction to cybersecurity.",
                instructor: "Sarah Johnson"
            }
        ]);

        res.json({ 
            success: true, 
            message: 'Database seeded successfully',
            counts: {
                adminUsers: adminUsers.length,
                products: products.length,
                services: services.length,
                courses: courses.length
            }
        });

    } catch (error) {
        console.error('Seed error:', error);
        res.status(500).json({ success: false, error: 'Failed to seed database' });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to TechSolutions Pro MongoDB API!',
        version: '2.1.0',
        database: 'MongoDB Atlas',
        endpoints: {
            public: {
                services: '/api/services',
                courses: '/api/courses',
                products: '/api/products',
                health: '/api/health'
            },
            auth: {
                register: '/api/auth/register',
                login: '/api/auth/login'
            },
            admin: {
                login: '/api/admin/login',
                dashboard: '/api/admin/dashboard',
                services: '/api/admin/services',
                courses: '/api/admin/courses',
                products: '/api/admin/products',
                seed: '/api/admin/seed'
            }
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🟢 Starting TechSolutions Pro MongoDB Backend Server...');
    console.log('==================================================');
    console.log('🟢 TECH SOLUTIONS PRO MONGODB BACKEND v2.1');
    console.log('==================================================');
    console.log('Port: ' + PORT);
    console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('Database: MongoDB Atlas');
    console.log('Time: ' + new Date().toLocaleString());
    console.log('URL: http://localhost:' + PORT);
    console.log('');
    console.log('🔐 ADMIN AUTHENTICATION:');
    console.log('   👤 Login: POST http://localhost:' + PORT + '/api/admin/login');
    console.log('   📊 Dashboard: GET http://localhost:' + PORT + '/api/admin/dashboard');
    console.log('');
    console.log('🛠️  DATABASE MANAGEMENT:');
    console.log('   🌱 Seed Database: POST http://localhost:' + PORT + '/api/admin/seed');
    console.log('   💊 Health Check: GET http://localhost:' + PORT + '/api/health');
    console.log('');
    console.log('🔑 DEFAULT ADMIN CREDENTIALS:');
    console.log('   👑 Admin: admin / admin123 (Full access)');
    console.log('   👨‍💼 Manager: manager / manager123 (Manage content)');
    console.log('   👀 Viewer: demo / demo123 (Read-only)');
    console.log('==================================================');
});
