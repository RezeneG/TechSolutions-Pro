# Update the backend/server.js in the setup script
$enhancedBackend = @'
// TechSolutions Pro - Backend Server with Admin Authentication
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

// Sample data (fallback when MongoDB is not available)
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
        price: "£499"
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
        price: "£399"
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
        price: "£449"
    }
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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TechSolutions Pro Backend is running!',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        features: {
            adminAuth: true,
            services: sampleServices.length,
            courses: sampleCourses.length
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
        superadmin: ['read', 'write', 'delete', 'manage_users'],
        manager: ['read', 'write'],
        viewer: ['read']
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
        { id: 4, action: "user_login", user: "admin", timestamp: new Date(Date.now() - 14400000).toISOString() }
    ];
    
    res.json({
        totalUsers: 5247,
        totalServices: sampleServices.length,
        totalCourses: sampleCourses.length,
        revenue: "£12,847",
        activeProjects: 47,
        completionRate: "94%",
        newRegistrations: 23,
        monthlyGrowth: "12%",
        recentActivities: recentActivities,
        topPerforming: {
            service: "Website Development",
            course: "Complete Web Development Bootcamp",
            revenueSource: "Service Sales"
        }
    });
});

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
        return acc;
    }, { total: 0, totalEnrolled: 0, averageRating: 0 });
    
    courseStats.averageRating = (courseStats.averageRating / sampleCourses.length).toFixed(1);

    res.json({
        courses: sampleCourses,
        stats: courseStats
    });
});

// Admin management endpoints
app.post('/api/admin/services', authenticateAdmin, (req, res) => {
    if (req.adminUser.role === 'viewer') {
        return res.status(403).json({ 
            success: false, 
            message: "Insufficient permissions to add services" 
        });
    }
    
    const newService = {
        id: sampleServices.length + 1,
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

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to TechSolutions Pro API!',
        version: '2.0.0',
        features: ['services', 'courses', 'admin-auth', 'analytics'],
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
                courses: '/api/admin/courses'
            }
        },
        adminDemo: {
            username: 'admin',
            password: 'admin123'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🟢 Starting TechSolutions Pro Backend with Admin Authentication...');
    console.log('==================================================');
    console.log('🟢 TECH SOLUTIONS PRO BACKEND SERVER v2.0');
    console.log('==================================================');
    console.log('Port: ' + PORT);
    console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('Database: In-Memory with Admin Auth');
    console.log('Time: ' + new Date().toLocaleString());
    console.log('URL: http://localhost:' + PORT);
    console.log('');
    console.log('🔐 ADMIN AUTHENTICATION:');
    console.log('   👤 Login: POST http://localhost:' + PORT + '/api/admin/login');
    console.log('   📊 Dashboard: GET http://localhost:' + PORT + '/api/admin/dashboard');
    console.log('');
    console.log('🛠️  SERVICES MARKETPLACE:');
    console.log('   📋 http://localhost:' + PORT + '/api/services');
    console.log('   🗂️  http://localhost:' + PORT + '/api/services/categories/all');
    console.log('');
    console.log('📚 COURSES:');
    console.log('   📖 http://localhost:' + PORT + '/api/courses');
    console.log('');
    console.log('🌐 PUBLIC:');
    console.log('   🏠 http://localhost:' + PORT + '/');
    console.log('   🩺 http://localhost:' + PORT + '/api/health');
    console.log('');
    console.log('🔑 DEMO CREDENTIALS:');
    console.log('   👑 Admin: admin / admin123');
    console.log('   👨‍💼 Manager: manager / manager123');
    console.log('   👀 Viewer: demo / demo123');
    console.log('==================================================');
});
'@

# Save the enhanced backend
$enhancedBackend | Out-File -FilePath "backend/server.js" -Encoding UTF8

Write-Host "✅ Enhanced backend with admin authentication created!" -ForegroundColor Green
