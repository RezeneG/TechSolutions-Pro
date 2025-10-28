// TechSolutions Pro - Enhanced Backend Server with Admin Authentication & Management
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Admin Users Database
const adminUsers = [
    { id: 1, username: "admin", password: "admin123", role: "superadmin", email: "admin@techsolutions.com" },
    { id: 2, username: "manager", password: "manager123", role: "manager", email: "manager@techsolutions.com" },
    { id: 3, username: "demo", password: "demo123", role: "viewer", email: "demo@techsolutions.com" }
];

// Enhanced Sample Data with all services and courses
const sampleServices = [
    {
        id: 1,
        name: "Website Development",
        description: "Custom website development with modern technologies. We create responsive, SEO-friendly websites that drive results.",
        price: "£999",
        category: "development",
        features: ["Responsive Design", "SEO Optimized", "CMS Integration", "3 Months Support"],
        status: "active",
        created: "2024-01-15"
    },
    {
        id: 2,
        name: "IT Support & Maintenance",
        description: "Professional IT support and maintenance services to keep your systems running smoothly.",
        price: "£45/hour",
        category: "support", 
        features: ["24/7 Support", "Remote Assistance", "Hardware Maintenance", "Software Updates"],
        status: "active",
        created: "2024-01-10"
    },
    {
        id: 3,
        name: "Software Testing",
        description: "Comprehensive software testing services to ensure your applications are bug-free and performant.",
        price: "Get Quote",
        category: "testing",
        features: ["Automated Testing", "Manual Testing", "Performance Testing", "Security Testing"],
        status: "active",
        created: "2024-02-01"
    },
    {
        id: 4, 
        name: "Game Development Consultation",
        description: "Expert consultation for game development projects, from concept to deployment.",
        price: "£65/hour",
        category: "consultation",
        features: ["Game Design", "Technical Architecture", "Performance Optimization", "Platform Guidance"],
        status: "active",
        created: "2024-01-20"
    },
    {
        id: 5,
        name: "Cloud Migration Services",
        description: "Seamlessly migrate your infrastructure to cloud platforms like AWS, Azure, or Google Cloud.",
        price: "£1,500+",
        category: "cloud",
        features: ["Infrastructure Setup", "Data Migration", "Security Configuration", "Ongoing Support"],
        status: "active",
        created: "2024-02-15"
    },
    {
        id: 6,
        name: "Cybersecurity Audit",
        description: "Comprehensive security assessment to identify vulnerabilities and protect your business.",
        price: "£2,000",
        category: "security",
        features: ["Vulnerability Assessment", "Penetration Testing", "Security Report", "Remediation Plan"],
        status: "active",
        created: "2024-02-20"
    },
    {
        id: 7,
        name: "Mobile App Development",
        description: "Create powerful mobile applications for iOS and Android platforms.",
        price: "£1,200+",
        category: "development",
        features: ["Native & Cross-platform", "UI/UX Design", "App Store Deployment", "Maintenance"],
        status: "active",
        created: "2024-03-01"
    },
    {
        id: 8,
        name: "Data Analytics & BI",
        description: "Transform your data into actionable insights with advanced analytics and business intelligence.",
        price: "£85/hour",
        category: "analytics",
        features: ["Data Visualization", "Dashboard Creation", "Predictive Analytics", "KPI Tracking"],
        status: "active",
        created: "2024-03-05"
    }
];

const sampleCourses = [
    {
        id: 1,
        name: "Complete Web Development Bootcamp",
        description: "Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
        duration: "12 weeks",
        enrolled: 1247,
        rating: 4.8,
        level: "Beginner to Advanced",
        status: "published",
        price: "£499",
        badge: "BESTSELLER",
        created: "2024-01-10"
    },
    {
        id: 2,
        name: "Cybersecurity Essentials", 
        description: "Learn essential cybersecurity principles, threat detection, and protection strategies.",
        duration: "8 weeks",
        enrolled: 892,
        rating: 4.7,
        level: "Intermediate",
        status: "published",
        price: "£399",
        badge: "HOT",
        created: "2024-01-15"
    },
    {
        id: 3,
        name: "Mobile App Development",
        description: "Build native and cross-platform mobile applications for iOS and Android.",
        duration: "10 weeks", 
        enrolled: 756,
        rating: 4.6,
        level: "Intermediate",
        status: "published",
        price: "£449",
        badge: "NEW",
        created: "2024-02-01"
    },
    {
        id: 4,
        name: "Cloud Computing with AWS",
        description: "Master Amazon Web Services and learn to deploy scalable cloud infrastructure.",
        duration: "6 weeks",
        enrolled: 543,
        rating: 4.9,
        level: "Intermediate",
        status: "published",
        price: "£349",
        badge: "TRENDING",
        created: "2024-02-10"
    },
    {
        id: 5,
        name: "Data Science & Machine Learning",
        description: "Learn data analysis, visualization, and machine learning algorithms with Python.",
        duration: "14 weeks",
        enrolled: 621,
        rating: 4.7,
        level: "Advanced",
        status: "published",
        price: "£599",
        badge: "POPULAR",
        created: "2024-02-15"
    },
    {
        id: 6,
        name: "DevOps & CI/CD Pipeline",
        description: "Master DevOps practices, containerization with Docker, and CI/CD pipeline setup.",
        duration: "8 weeks",
        enrolled: 432,
        rating: 4.8,
        level: "Intermediate",
        status: "published",
        price: "£399",
        badge: "HOT",
        created: "2024-03-01"
    },
    {
        id: 7,
        name: "UI/UX Design Fundamentals",
        description: "Learn user-centered design principles, prototyping, and design tools.",
        duration: "6 weeks",
        enrolled: 389,
        rating: 4.6,
        level: "Beginner",
        status: "published",
        price: "£299",
        badge: "NEW",
        created: "2024-03-05"
    },
    {
        id: 8,
        name: "Blockchain Development",
        description: "Build decentralized applications and smart contracts on Ethereum blockchain.",
        duration: "10 weeks",
        enrolled: 298,
        rating: 4.5,
        level: "Advanced",
        status: "published",
        price: "£549",
        badge: "EMERGING",
        created: "2024-03-10"
    }
];

// Sample data for admin management
let sampleUsers = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Customer", joined: "2024-01-15", status: "active" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Customer", joined: "2024-02-03", status: "active" },
    { id: 3, name: "Mike Wilson", email: "mike@example.com", role: "Premium", joined: "2024-01-28", status: "active" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Admin", joined: "2023-12-10", status: "active" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", role: "Customer", joined: "2024-03-01", status: "active" }
];

let sampleOrders = [
    { id: 1001, customer: "John Smith", item: "Website Development", amount: "£999", date: "2024-03-15", status: "Completed", type: "service" },
    { id: 1002, customer: "Sarah Johnson", item: "Web Development Bootcamp", amount: "£299", date: "2024-03-14", status: "In Progress", type: "course" },
    { id: 1003, customer: "Mike Wilson", item: "Cybersecurity Audit", amount: "£2,000", date: "2024-03-12", status: "Pending", type: "service" },
    { id: 1004, customer: "Alex Brown", item: "Mobile App Development Course", amount: "£449", date: "2024-03-10", status: "Completed", type: "course" },
    { id: 1005, customer: "Emily Davis", item: "Cloud Migration Services", amount: "£1,500", date: "2024-03-08", status: "In Progress", type: "service" }
];

// Helper function to generate simple tokens
function generateToken(userId) {
    return 'admin-token-' + userId + '-' + Date.now();
}

// Authentication middleware
function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Admin authentication token required" 
        });
    }
    
    // Simple token validation (in production, use JWT)
    const tokenParts = token.split('-');
    if (tokenParts.length < 3 || tokenParts[0] !== 'admin' || tokenParts[1] !== 'token') {
        return res.status(401).json({ 
            success: false, 
            message: "Invalid authentication token" 
        });
    }
    
    const userId = parseInt(tokenParts[2]);
    const user = adminUsers.find(u => u.id === userId);
    
    if (!user) {
        return res.status(401).json({ 
            success: false, 
            message: "User not found" 
        });
    }
    
    req.adminUser = user;
    next();
}

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TechSolutions Pro Backend is running!',
        timestamp: new Date().toISOString(),
        version: '2.1.0',
        features: {
            adminAuth: true,
            services: sampleServices.length,
            courses: sampleCourses.length,
            users: sampleUsers.length,
            orders: sampleOrders.length,
            management: true
        }
    });
});

// Admin Authentication Endpoints
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Username and password required" 
        });
    }
    
    const user = adminUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        const token = generateToken(user.id);
        
        res.json({ 
            success: true, 
            message: "Login successful",
            user: { 
                id: user.id,
                username: user.username, 
                role: user.role,
                email: user.email
            },
            token: token,
            permissions: getPermissions(user.role)
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Invalid username or password" 
        });
    }
});

app.post('/api/admin/logout', authenticateAdmin, (req, res) => {
    res.json({ 
        success: true, 
        message: "Logout successful" 
    });
});

app.get('/api/admin/profile', authenticateAdmin, (req, res) => {
    res.json({
        success: true,
        user: req.adminUser
    });
});

// Helper function for permissions
function getPermissions(role) {
    const permissions = {
        superadmin: ['read', 'write', 'delete', 'manage_users', 'manage_services', 'manage_courses', 'view_analytics'],
        manager: ['read', 'write', 'manage_services', 'manage_courses', 'view_analytics'],
        viewer: ['read', 'view_analytics']
    };
    return permissions[role] || ['read'];
}

// Public endpoints (no auth required)
app.get('/api/services', (req, res) => {
    res.json(sampleServices);
});

app.get('/api/services/categories/all', (req, res) => {
    const categories = [...new Set(sampleServices.map(service => service.category))];
    res.json(categories);
});

app.get('/api/courses', (req, res) => {
    res.json(sampleCourses);
});

// Protected Admin endpoints
app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
    const recentActivities = [
        { id: 1, action: "user_registration", user: "John Doe", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 2, action: "course_enrollment", course: "Web Development Bootcamp", user: "Jane Smith", timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: 3, action: "service_purchase", service: "Website Development", amount: "£999", timestamp: new Date(Date.now() - 10800000).toISOString() },
        { id: 4, action: "user_login", user: "admin", timestamp: new Date(Date.now() - 14400000).toISOString() },
        { id: 5, action: "course_created", course: "Blockchain Development", admin: "manager", timestamp: new Date(Date.now() - 18000000).toISOString() }
    ];
    
    // Calculate revenue from orders
    const totalRevenue = sampleOrders.reduce((sum, order) => {
        const amount = parseFloat(order.amount.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    
    res.json({
        totalUsers: sampleUsers.length,
        totalServices: sampleServices.length,
        totalCourses: sampleCourses.length,
        totalOrders: sampleOrders.length,
        revenue: `£${totalRevenue.toLocaleString()}`,
        activeProjects: 47,
        completionRate: "94%",
        newRegistrations: sampleUsers.filter(user => {
            const joinDate = new Date(user.joined);
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            return joinDate > thirtyDaysAgo;
        }).length,
        monthlyGrowth: "12%",
        recentActivities: recentActivities,
        topPerforming: {
            service: "Website Development",
            course: "Complete Web Development Bootcamp",
            revenueSource: "Service Sales"
        },
        userStats: {
            total: sampleUsers.length,
            byRole: sampleUsers.reduce((acc, user) => {
                acc[user.role] = (acc[user.role] || 0) + 1;
                return acc;
            }, {})
        }
    });
});

// Admin Management Endpoints
app.get('/api/admin/services', authenticateAdmin, (req, res) => {
    const serviceStats = sampleServices.reduce((acc, service) => {
        acc.total++;
        acc.byCategory[service.category] = (acc.byCategory[service.category] || 0) + 1;
        acc.byStatus[service.status] = (acc.byStatus[service.status] || 0) + 1;
        return acc;
    }, { total: 0, byCategory: {}, byStatus: {} });

    res.json({
        services: sampleServices,
        stats: serviceStats,
        management: {
            canAdd: req.adminUser.role !== 'viewer',
            canEdit: req.adminUser.role !== 'viewer',
            canDelete: req.adminUser.role === 'superadmin'
        }
    });
});

app.get('/api/admin/courses', authenticateAdmin, (req, res) => {
    const courseStats = sampleCourses.reduce((acc, course) => {
        acc.total++;
        acc.totalEnrolled += course.enrolled;
        acc.averageRating = (acc.averageRating || 0) + course.rating;
        acc.byLevel[course.level] = (acc.byLevel[course.level] || 0) + 1;
        return acc;
    }, { total: 0, totalEnrolled: 0, averageRating: 0, byLevel: {} });
    
    courseStats.averageRating = (courseStats.averageRating / sampleCourses.length).toFixed(1);

    res.json({
        courses: sampleCourses,
        stats: courseStats
    });
});

app.get('/api/admin/users', authenticateAdmin, requirePermission('manage_users'), (req, res) => {
    res.json({
        users: sampleUsers,
        stats: {
            total: sampleUsers.length,
            active: sampleUsers.filter(u => u.status === 'active').length,
            byRole: sampleUsers.reduce((acc, user) => {
                acc[user.role] = (acc[user.role] || 0) + 1;
                return acc;
            }, {})
        }
    });
});

app.get('/api/admin/orders', authenticateAdmin, (req, res) => {
    const orderStats = sampleOrders.reduce((acc, order) => {
        acc.total++;
        acc.byStatus[order.status] = (acc.byStatus[order.status] || 0) + 1;
        acc.byType[order.type] = (acc.byType[order.type] || 0) + 1;
        
        const amount = parseFloat(order.amount.replace(/[^0-9.]/g, ''));
        acc.totalRevenue += isNaN(amount) ? 0 : amount;
        
        return acc;
    }, { total: 0, byStatus: {}, byType: {}, totalRevenue: 0 });
    
    res.json({
        orders: sampleOrders,
        stats: orderStats
    });
});

// CRUD Operations for Services
app.post('/api/admin/services', authenticateAdmin, requirePermission('manage_services'), (req, res) => {
    const newService = {
        id: Math.max(...sampleServices.map(s => s.id)) + 1,
        ...req.body,
        created: new Date().toISOString().split('T')[0],
        status: 'active'
    };
    
    sampleServices.push(newService);
    
    res.json({
        success: true,
        message: "Service added successfully",
        service: newService
    });
});

app.put('/api/admin/services/:id', authenticateAdmin, requirePermission('manage_services'), (req, res) => {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = sampleServices.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Service not found"
        });
    }
    
    sampleServices[serviceIndex] = {
        ...sampleServices[serviceIndex],
        ...req.body,
        updated: new Date().toISOString()
    };
    
    res.json({
        success: true,
        message: "Service updated successfully",
        service: sampleServices[serviceIndex]
    });
});

app.delete('/api/admin/services/:id', authenticateAdmin, requirePermission('manage_services'), (req, res) => {
    const serviceId = parseInt(req.params.id);
    const serviceIndex = sampleServices.findIndex(s => s.id === serviceId);
    
    if (serviceIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Service not found"
        });
    }
    
    const deletedService = sampleServices.splice(serviceIndex, 1)[0];
    
    res.json({
        success: true,
        message: "Service deleted successfully",
        service: deletedService
    });
});

// CRUD Operations for Courses
app.post('/api/admin/courses', authenticateAdmin, requirePermission('manage_courses'), (req, res) => {
    const newCourse = {
        id: Math.max(...sampleCourses.map(c => c.id)) + 1,
        ...req.body,
        created: new Date().toISOString().split('T')[0],
        status: 'published',
        enrolled: 0,
        rating: 0
    };
    
    sampleCourses.push(newCourse);
    
    res.json({
        success: true,
        message: "Course added successfully",
        course: newCourse
    });
});

app.put('/api/admin/courses/:id', authenticateAdmin, requirePermission('manage_courses'), (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = sampleCourses.findIndex(c => c.id === courseId);
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }
    
    sampleCourses[courseIndex] = {
        ...sampleCourses[courseIndex],
        ...req.body,
        updated: new Date().toISOString()
    };
    
    res.json({
        success: true,
        message: "Course updated successfully",
        course: sampleCourses[courseIndex]
    });
});

app.delete('/api/admin/courses/:id', authenticateAdmin, requirePermission('manage_courses'), (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = sampleCourses.findIndex(c => c.id === courseId);
    
    if (courseIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Course not found"
        });
    }
    
    const deletedCourse = sampleCourses.splice(courseIndex, 1)[0];
    
    res.json({
        success: true,
        message: "Course deleted successfully",
        course: deletedCourse
    });
});

// User Management
app.put('/api/admin/users/:id', authenticateAdmin, requirePermission('manage_users'), (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = sampleUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    sampleUsers[userIndex] = {
        ...sampleUsers[userIndex],
        ...req.body
    };
    
    res.json({
        success: true,
        message: "User updated successfully",
        user: sampleUsers[userIndex]
    });
});

app.delete('/api/admin/users/:id', authenticateAdmin, requirePermission('manage_users'), (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = sampleUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    
    const deletedUser = sampleUsers.splice(userIndex, 1)[0];
    
    res.json({
        success: true,
        message: "User deleted successfully",
        user: deletedUser
    });
});

// Order Management
app.put('/api/admin/orders/:id', authenticateAdmin, (req, res) => {
    const orderId = parseInt(req.params.id);
    const orderIndex = sampleOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
    
    sampleOrders[orderIndex] = {
        ...sampleOrders[orderIndex],
        ...req.body
    };
    
    res.json({
        success: true,
        message: "Order updated successfully",
        order: sampleOrders[orderIndex]
    });
});

// Analytics Endpoints
app.get('/api/admin/analytics/overview', authenticateAdmin, requirePermission('view_analytics'), (req, res) => {
    const serviceRevenue = sampleOrders
        .filter(order => order.type === 'service')
        .reduce((sum, order) => sum + parseFloat(order.amount.replace(/[^0-9.]/g, '')), 0);
    
    const courseRevenue = sampleOrders
        .filter(order => order.type === 'course')
        .reduce((sum, order) => sum + parseFloat(order.amount.replace(/[^0-9.]/g, '')), 0);
    
    res.json({
        revenue: {
            total: serviceRevenue + courseRevenue,
            services: serviceRevenue,
            courses: courseRevenue,
            growth: 12.5
        },
        users: {
            total: sampleUsers.length,
            newThisMonth: sampleUsers.filter(user => {
                const joinDate = new Date(user.joined);
                const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                return joinDate >= monthStart;
            }).length
        },
        popular: {
            topService: sampleServices[0],
            topCourse: sampleCourses[0],
            trendingCategory: "development"
        }
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to TechSolutions Pro API v2.1!',
        version: '2.1.0',
        features: ['services', 'courses', 'admin-auth', 'analytics', 'management'],
        endpoints: {
            public: {
                services: '/api/services',
                courses: '/api/courses', 
                health: '/api/health'
            },
            admin: {
                login: '/api/admin/login',
                dashboard: '/api/admin/dashboard',
                services: '/api/admin/services',
                courses: '/api/admin/courses',
                users: '/api/admin/users',
                orders: '/api/admin/orders',
                analytics: '/api/admin/analytics/overview'
            }
        },
        adminDemo: {
            username: 'admin',
            password: 'admin123'
        },
        stats: {
            services: sampleServices.length,
            courses: sampleCourses.length,
            users: sampleUsers.length,
            orders: sampleOrders.length
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🟢 Starting TechSolutions Pro Enhanced Backend Server...');
    console.log('==================================================');
    console.log('🟢 TECH SOLUTIONS PRO BACKEND SERVER v2.1');
    console.log('==================================================');
    console.log('Port: ' + PORT);
    console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('Database: In-Memory with Enhanced Admin Features');
    console.log('Time: ' + new Date().toLocaleString());
    console.log('URL: http://localhost:' + PORT);
    console.log('');
    console.log('🔐 ADMIN AUTHENTICATION:');
    console.log('   👤 Login: POST http://localhost:' + PORT + '/api/admin/login');
    console.log('   📊 Dashboard: GET http://localhost:' + PORT + '/api/admin/dashboard');
    console.log('');
    console.log('🛠️  SERVICES MANAGEMENT:');
    console.log('   📋 All Services: GET http://localhost:' + PORT + '/api/admin/services');
    console.log('   ➕ Add Service: POST http://localhost:' + PORT + '/api/admin/services');
    console.log('   ✏️  Update Service: PUT http://localhost:' + PORT + '/api/admin/services/:id');
    console.log('   🗑️  Delete Service: DELETE http://localhost:' + PORT + '/api/admin/services/:id');
    console.log('');
    console.log('📚 COURSES MANAGEMENT:');
    console.log('   📖 All Courses: GET http://localhost:' + PORT + '/api/admin/courses');
    console.log('   ➕ Add Course: POST http://localhost:' + PORT + '/api/admin/courses');
    console.log('   ✏️  Update Course: PUT http://localhost:' + PORT + '/api/admin/courses/:id');
    console.log('   🗑️  Delete Course: DELETE http://localhost:' + PORT + '/api/admin/courses/:id');
    console.log('');
    console.log('👥 USER MANAGEMENT:');
    console.log('   👥 All Users: GET http://localhost:' + PORT + '/api/admin/users');
    console.log('   ✏️  Update User: PUT http://localhost:' + PORT + '/api/admin/users/:id');
    console.log('   🗑️  Delete User: DELETE http://localhost:' + PORT + '/api/admin/users/:id');
    console.log('');
    console.log('📊 ANALYTICS:');
    console.log('   📈 Overview: GET http://localhost:' + PORT + '/api/admin/analytics/overview');
    console.log('');
    console.log('🔑 DEMO CREDENTIALS:');
    console.log('   👑 Admin: admin / admin123 (Full access)');
    console.log('   👨‍💼 Manager: manager / manager123 (Manage services & courses)');
    console.log('   👀 Viewer: demo / demo123 (Read-only)');
    console.log('==================================================');
});
