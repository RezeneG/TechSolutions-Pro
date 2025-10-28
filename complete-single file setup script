# TechSolutions Pro - Complete Single-File Setup
# Run this script from D:\online-tuition

Write-Host "🚀 TECH SOLUTIONS PRO - COMPLETE SETUP" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📦 Building complete application..." -ForegroundColor Yellow

# Create project root
$projectRoot = "TechSolutions-Pro"
Write-Host "📁 Creating project directory: $projectRoot" -ForegroundColor Green

if (Test-Path $projectRoot) {
    Write-Host "🔄 Directory exists, cleaning..." -ForegroundColor Yellow
    Remove-Item -Path $projectRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $projectRoot -Force | Out-Null
Set-Location $projectRoot

# Create directory structure
$directories = @("backend", "frontend", "docs")
foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "✅ Created: $dir" -ForegroundColor Green
}

# 1. Create Enhanced Backend
Write-Host "`n🔧 CREATING ENHANCED BACKEND..." -ForegroundColor Yellow

$backendServer = @'
// TechSolutions Pro - Backend Server with Enhanced Content
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Admin Users
const adminUsers = [
    { id: 1, username: "admin", password: "admin123", role: "superadmin", email: "admin@techsolutions.com" },
    { id: 2, username: "manager", password: "manager123", role: "manager", email: "manager@techsolutions.com" },
    { id: 3, username: "demo", password: "demo123", role: "viewer", email: "demo@techsolutions.com" }
];

// 12 ENHANCED SERVICES
const sampleServices = [
    {
        id: 1, name: "Website Development", price: "£999 - £4,999", category: "development",
        description: "Custom website development with modern technologies. We create responsive, SEO-friendly websites.",
        features: ["Responsive Design", "SEO Optimized", "CMS Integration", "3 Months Support"],
        popularity: 95, deliveryTime: "2-4 weeks"
    },
    {
        id: 2, name: "E-commerce Solutions", price: "£2,499 - £7,999", category: "development",
        description: "Complete e-commerce platform with payment integration and inventory management.",
        features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Marketing Tools"],
        popularity: 88, deliveryTime: "4-6 weeks"
    },
    {
        id: 3, name: "Mobile App Development", price: "£3,999 - £12,999", category: "development",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        features: ["iOS & Android", "Cross-platform", "Push Notifications", "App Store Deployment"],
        popularity: 92, deliveryTime: "6-8 weeks"
    },
    {
        id: 4, name: "Custom Software Development", price: "£5,999 - £25,000+", category: "development",
        description: "Tailored software solutions for your unique business needs.",
        features: ["Custom Requirements", "Scalable Architecture", "API Integration", "Database Design"],
        popularity: 85, deliveryTime: "8-12 weeks"
    },
    {
        id: 5, name: "IT Support & Maintenance", price: "£45/hour", category: "support",
        description: "Professional IT support and maintenance services 24/7.",
        features: ["24/7 Support", "Remote Assistance", "Hardware Maintenance", "Software Updates"],
        popularity: 90, deliveryTime: "Immediate"
    },
    {
        id: 6, name: "Cloud Infrastructure Management", price: "£75/hour", category: "support",
        description: "Complete cloud infrastructure setup and management on AWS, Azure, or Google Cloud.",
        features: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization", "Security Configuration"],
        popularity: 87, deliveryTime: "1-2 weeks"
    },
    {
        id: 7, name: "Network Security Audit", price: "£1,499 - £4,999", category: "support",
        description: "Comprehensive security assessment and penetration testing.",
        features: ["Vulnerability Assessment", "Penetration Testing", "Security Report", "Remediation Plan"],
        popularity: 83, deliveryTime: "1-2 weeks"
    },
    {
        id: 8, name: "Software Testing & QA", price: "£1,999 - £6,999", category: "testing",
        description: "Comprehensive software testing services for bug-free applications.",
        features: ["Automated Testing", "Manual Testing", "Performance Testing", "Security Testing"],
        popularity: 89, deliveryTime: "2-4 weeks"
    },
    {
        id: 9, name: "Mobile App Testing", price: "£1,499 - £4,999", category: "testing",
        description: "Specialized testing for mobile applications across different devices.",
        features: ["Device Compatibility", "Performance Testing", "User Experience", "Battery Usage"],
        popularity: 86, deliveryTime: "2-3 weeks"
    },
    {
        id: 10, name: "Game Development Consultation", price: "£65/hour", category: "consultation",
        description: "Expert consultation for game development projects.",
        features: ["Game Design", "Technical Architecture", "Performance Optimization", "Platform Guidance"],
        popularity: 82, deliveryTime: "Flexible"
    },
    {
        id: 11, name: "Digital Transformation Strategy", price: "£120/hour", category: "consultation",
        description: "Strategic consulting for digital technology adoption.",
        features: ["Strategy Development", "Technology Assessment", "Implementation Plan", "ROI Analysis"],
        popularity: 88, deliveryTime: "Flexible"
    },
    {
        id: 12, name: "AI & Machine Learning Consulting", price: "£95/hour", category: "consultation",
        description: "Expert guidance on implementing AI and machine learning solutions.",
        features: ["AI Strategy", "Model Development", "Data Analysis", "Implementation Support"],
        popularity: 94, deliveryTime: "Flexible"
    }
];

// 9 ENHANCED COURSES
const sampleCourses = [
    {
        id: 1, name: "Complete Web Development Bootcamp", price: "£499", duration: "12 weeks", enrolled: 1247, rating: 4.8,
        description: "Master full-stack web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
        category: "web-development", instructor: "Sarah Johnson", level: "Beginner to Advanced",
        certificate: true, projects: 8, badge: "BESTSELLER"
    },
    {
        id: 2, name: "Advanced JavaScript & React Masterclass", price: "£349", duration: "8 weeks", enrolled: 892, rating: 4.7,
        description: "Deep dive into modern JavaScript, React hooks, context API, and state management.",
        category: "web-development", instructor: "Mike Chen", level: "Intermediate",
        certificate: true, projects: 5, badge: "POPULAR"
    },
    {
        id: 3, name: "Cybersecurity Essentials", price: "£399", duration: "10 weeks", enrolled: 756, rating: 4.6,
        description: "Learn essential cybersecurity principles, threat detection, and protection strategies.",
        category: "cybersecurity", instructor: "Dr. Emily Watson", level: "Beginner to Intermediate",
        certificate: true, projects: 6, badge: "HOT"
    },
    {
        id: 4, name: "Ethical Hacking & Penetration Testing", price: "£599", duration: "14 weeks", enrolled: 423, rating: 4.9,
        description: "Advanced course covering penetration testing and ethical hacking techniques.",
        category: "cybersecurity", instructor: "Alex Rodriguez", level: "Advanced",
        certificate: true, projects: 7, badge: "ADVANCED"
    },
    {
        id: 5, name: "Mobile App Development with Flutter", price: "£449", duration: "10 weeks", enrolled: 634, rating: 4.5,
        description: "Build beautiful, native mobile applications for iOS and Android using Flutter.",
        category: "mobile-development", instructor: "David Kim", level: "Intermediate",
        certificate: true, projects: 6, badge: "TRENDING"
    },
    {
        id: 6, name: "iOS Development with SwiftUI", price: "£479", duration: "12 weeks", enrolled: 521, rating: 4.7,
        description: "Master iOS app development using Swift and SwiftUI for Apple ecosystem.",
        category: "mobile-development", instructor: "Lisa Thompson", level: "Intermediate",
        certificate: true, projects: 5, badge: "NEW"
    },
    {
        id: 7, name: "Data Science & Machine Learning", price: "£549", duration: "16 weeks", enrolled: 887, rating: 4.8,
        description: "Comprehensive data science course covering Python, statistics, and machine learning.",
        category: "data-science", instructor: "Dr. Robert Brown", level: "Intermediate to Advanced",
        certificate: true, projects: 8, badge: "POPULAR"
    },
    {
        id: 8, name: "Python for Automation & Scripting", price: "£299", duration: "6 weeks", enrolled: 1123, rating: 4.6,
        description: "Learn Python programming for automation, scripting, and web scraping.",
        category: "programming", instructor: "Maria Garcia", level: "Beginner",
        certificate: true, projects: 4, badge: "BESTSELLER"
    },
    {
        id: 9, name: "AWS Cloud Practitioner & Solutions Architect", price: "£529", duration: "10 weeks", enrolled: 698, rating: 4.7,
        description: "Master AWS cloud services and prepare for AWS certifications.",
        category: "cloud-devops", instructor: "James Wilson", level: "Intermediate",
        certificate: true, projects: 6, badge: "CERTIFICATION"
    }
];

// Helper functions
function generateToken(userId) {
    return 'admin-token-' + userId + '-' + Date.now();
}

function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Admin authentication required" });
    }
    const tokenParts = token.split('-');
    if (tokenParts.length < 3 || tokenParts[0] !== 'admin' || tokenParts[1] !== 'token') {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const userId = parseInt(tokenParts[2]);
    const user = adminUsers.find(u => u.id === userId);
    if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
    }
    req.adminUser = user;
    next();
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'TechSolutions Pro Backend is running!',
        services: sampleServices.length,
        courses: sampleCourses.length,
        version: '2.1.0'
    });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const user = adminUsers.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(user.id);
        res.json({ 
            success: true, 
            message: "Login successful",
            user: { username: user.username, role: user.role, email: user.email },
            token: token
        });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Public endpoints
app.get('/api/services', (req, res) => {
    res.json(sampleServices);
});

app.get('/api/courses', (req, res) => {
    res.json(sampleCourses);
});

// Admin dashboard
app.get('/api/admin/dashboard', authenticateAdmin, (req, res) => {
    res.json({
        totalUsers: 5247,
        totalServices: sampleServices.length,
        totalCourses: sampleCourses.length,
        revenue: "£12,847",
        activeProjects: 47,
        completionRate: "94%",
        recentActivities: [
            { action: "user_registration", user: "John Doe", timestamp: new Date().toISOString() },
            { action: "course_enrollment", course: "Web Development Bootcamp", user: "Jane Smith", timestamp: new Date().toISOString() }
        ]
    });
});

// Root
app.get('/', (req, res) => {
    res.json({
        message: 'TechSolutions Pro API - Enhanced Edition',
        services: sampleServices.length,
        courses: sampleCourses.length,
        endpoints: {
            services: '/api/services',
            courses: '/api/courses',
            admin: '/api/admin/login',
            health: '/api/health'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 TechSolutions Pro Backend - Enhanced Edition');
    console.log('==============================================');
    console.log('📍 Port: ' + PORT);
    console.log('📊 Services: ' + sampleServices.length);
    console.log('📚 Courses: ' + sampleCourses.length);
    console.log('🌐 URL: http://localhost:' + PORT);
    console.log('');
    console.log('🔑 Demo Admin: admin / admin123');
    console.log('==============================================');
});
'@

$backendServer | Out-File -FilePath "backend/server.js" -Encoding UTF8

# Backend package.json
$backendPackage = @'
{
  "name": "techsolutions-backend",
  "version": "2.1.0",
  "description": "Backend for TechSolutions Pro - 12 services & 9 courses",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
}
'@

$backendPackage | Out-File -FilePath "backend/package.json" -Encoding UTF8

Write-Host "✅ Backend created with 12 services & 9 courses!" -ForegroundColor Green

# 2. Create Enhanced Frontend
Write-Host "`n🎨 CREATING ENHANCED FRONTEND..." -ForegroundColor Yellow

$frontendHtml = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechSolutions Pro | IT Services & Training</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #4361ee; --secondary: #3f37c9; --accent: #4cc9f0;
            --light: #f8f9fa; --dark: #212529; --success: #4bb543;
            --warning: #ffcc00; --danger: #dc3545; --gray: #6c757d;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
        body { background: #f5f7fb; color: var(--dark); line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Header */
        header { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 1000; }
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
        .logo { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { text-decoration: none; color: var(--dark); font-weight: 500; transition: color 0.3s; }
        .nav-links a:hover { color: var(--primary); }
        .auth-buttons { display: flex; gap: 15px; align-items: center; }
        
        /* Buttons */
        .btn { padding: 10px 20px; border-radius: 5px; font-weight: 600; cursor: pointer; transition: all 0.3s;
               border: none; text-decoration: none; display: inline-block; text-align: center; }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--secondary); }
        .btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }
        .btn-outline:hover { background: var(--primary); color: white; }
        
        /* Hero */
        .hero { padding: 80px 0; background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%); color: white; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; max-width: 700px; margin: 0 auto 30px; opacity: 0.9; }
        .hero-buttons { display: flex; gap: 15px; justify-content: center; margin-bottom: 50px; }
        .hero-stats { display: flex; justify-content: space-around; max-width: 800px; margin: 0 auto; 
                     background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; backdrop-filter: blur(10px); }
        .stat { text-align: center; }
        .stat-number { font-size: 2.5rem; font-weight: 700; margin-bottom: 5px; }
        .stat-label { font-size: 1rem; opacity: 0.8; }
        
        /* Sections */
        .section { padding: 80px 0; }
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-header h2 { font-size: 2.5rem; color: var(--dark); margin-bottom: 15px; }
        .section-header p { color: var(--gray); max-width: 600px; margin: 0 auto; }
        
        /* Services Grid */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .service-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                       transition: transform 0.3s, box-shadow 0.3s; }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .service-icon { background: var(--primary); color: white; height: 80px; display: flex;
                       align-items: center; justify-content: center; font-size: 2rem; }
        .service-content { padding: 25px; }
        .service-content h3 { margin-bottom: 15px; color: var(--dark); }
        .service-content p { color: var(--gray); margin-bottom: 20px; }
        .service-price { font-size: 1.5rem; font-weight: 700; color: var(--primary); margin-bottom: 15px; }
        .service-features { list-style: none; margin-bottom: 20px; }
        .service-features li { margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        .service-features li i { color: var(--success); }
        
        /* Courses Grid */
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .course-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .course-image { height: 180px; background: var(--primary); display: flex; align-items: center;
                       justify-content: center; color: white; font-size: 3rem; position: relative; }
        .course-badge { position: absolute; top: 15px; right: 15px; background: var(--accent); color: white;
                       padding: 5px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: 600; }
        .course-content { padding: 25px; }
        .course-content h3 { margin-bottom: 15px; color: var(--dark); }
        .course-content p { color: var(--gray); margin-bottom: 20px; }
        .course-meta { display: flex; justify-content: space-between; margin-bottom: 20px; color: var(--gray); }
        .course-meta span { display: flex; align-items: center; gap: 5px; }
        .course-rating { color: var(--warning); }
        
        /* Admin Dashboard */
        .dashboard { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .dashboard-header { background: var(--primary); color: white; padding: 20px 30px; }
        .dashboard-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 30px; }
        .stat-card { background: var(--light); padding: 20px; border-radius: 8px; text-align: center; }
        .stat-card i { font-size: 2rem; color: var(--primary); margin-bottom: 10px; }
        .stat-card .number { font-size: 2rem; font-weight: 700; margin-bottom: 5px; }
        .stat-card .label { color: var(--gray); font-size: 0.9rem; }
        
        /* Footer */
        footer { background: var(--dark); color: white; padding: 60px 0 30px; }
        .footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-bottom: 40px; }
        .footer-bottom { text-align: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); }
        
        /* Responsive */
        @media (max-width: 768px) {
            .navbar { flex-direction: column; gap: 20px; }
            .hero h1 { font-size: 2.2rem; }
            .hero-stats { flex-direction: column; gap: 30px; }
            .hero-buttons { flex-direction: column; align-items: center; }
        }
        
        /* Additional Styles */
        .status-badge { display: inline-block; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .status-online { background: var(--success); color: white; }
        .status-offline { background: var(--danger); color: white; }
        .admin-badge { background: var(--warning); color: var(--dark); padding: 3px 8px; border-radius: 12px; font-size: 0.7rem; }
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.5); z-index: 1001; align-items: center; justify-content: center; }
        .modal-content { background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; }
        .close-modal { float: right; font-size: 1.5rem; cursor: pointer; color: var(--gray); }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 600; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <i class="fas fa-laptop-code"></i>
                    <span>TechSolutions Pro</span>
                </div>
                <div class="nav-links">
                    <a href="#" class="active">Home</a>
                    <a href="#services">Services</a>
                    <a href="#courses">Courses</a>
                    <a href="#admin" id="adminNavLink">Admin <span class="admin-badge">Login</span></a>
                </div>
                <div class="auth-buttons">
                    <span class="status-badge status-online" id="backend-status">Backend Online</span>
                    <a href="#" class="btn btn-outline" onclick="openModal('loginModal')">Login</a>
                    <a href="#" class="btn btn-primary" onclick="openModal('registerModal')">Sign Up</a>
                </div>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Professional IT Services & Training</h1>
            <p>Transform your business with our expert IT solutions and comprehensive training programs. 12 services & 9 courses available.</p>
            <div class="hero-buttons">
                <a href="#services" class="btn btn-primary">Explore Services</a>
                <a href="#courses" class="btn btn-outline">View Courses</a>
                <a href="#admin" class="btn btn-outline" onclick="checkAdminAccess(event)">Admin Dashboard</a>
            </div>
            <div class="hero-stats">
                <div class="stat">
                    <div class="stat-number" id="total-users">5,247</div>
                    <div class="stat-label">Happy Clients</div>
                </div>
                <div class="stat">
                    <div class="stat-number">12</div>
                    <div class="stat-label">IT Services</div>
                </div>
                <div class="stat">
                    <div class="stat-number">9</div>
                    <div class="stat-label">Training Courses</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services">
        <div class="container">
            <div class="section-header">
                <h2>Our Professional Services</h2>
                <p>12 comprehensive IT services to drive your business forward</p>
            </div>
            <div class="services-grid" id="services-container">
                <!-- Services loaded by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Courses Section -->
    <section class="section" id="courses">
        <div class="container">
            <div class="section-header">
                <h2>Training Courses</h2>
                <p>9 comprehensive training programs to advance your career</p>
            </div>
            <div class="courses-grid" id="courses-container">
                <!-- Courses loaded by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Admin Dashboard -->
    <section class="section" id="admin" style="display: none;">
        <div class="container">
            <div class="section-header">
                <h2>Admin Dashboard</h2>
                <p>Platform management and analytics</p>
                <button class="btn btn-outline btn-small" onclick="adminLogout()" style="margin-top: 10px;">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            <div class="dashboard">
                <div class="dashboard-header">
                    <h3><i class="fas fa-chart-line"></i> Platform Analytics</h3>
                    <span id="adminWelcome">Welcome, Administrator</span>
                </div>
                <div class="dashboard-stats" id="admin-stats">
                    <!-- Admin stats loaded by JavaScript -->
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>TechSolutions Pro</h3>
                    <p>Your trusted partner for IT services and professional training.</p>
                </div>
                <div class="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#admin" onclick="checkAdminAccess(event)">Admin</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><i class="fas fa-envelope"></i> info@techsolutions.com</li>
                        <li><i class="fas fa-phone"></i> +44 123 456 7890</li>
                        <li><i class="fas fa-map-marker-alt"></i> London, UK</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TechSolutions Pro. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Admin Login Modal -->
    <div id="adminLoginModal" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal('adminLoginModal')">&times;</span>
            <h3><i class="fas fa-lock"></i> Admin Login</h3>
            <div class="form-group">
                <label>Username</label>
                <input type="text" id="adminUsername" value="admin" placeholder="Enter admin username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="adminPassword" value="admin123" placeholder="Enter admin password">
            </div>
            <button class="btn btn-primary" onclick="adminLogin()" style="width: 100%;">
                <i class="fas fa-sign-in-alt"></i> Login to Admin
            </button>
            <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <small><strong>Demo Credentials:</strong><br>
                Username: <code>admin</code> | Password: <code>admin123</code></small>
            </div>
        </div>
    </div>

    <script>
        // API URLs
        const API_BASE = 'http://localhost:5000/api';
        const SERVICES_URL = `${API_BASE}/services`;
        const COURSES_URL = `${API_BASE}/courses`;
        const ADMIN_URL = `${API_BASE}/admin/dashboard`;
        const ADMIN_LOGIN_URL = `${API_BASE}/admin/login`;
        const HEALTH_URL = `${API_BASE}/health`;

        // Admin state
        let adminAuth = { isLoggedIn: false, user: null, token: null };

        // Check backend status
        async function checkBackendStatus() {
            try {
                const response = await fetch(HEALTH_URL);
                const data = await response.json();
                document.getElementById('backend-status').className = 'status-badge status-online';
                document.getElementById('backend-status').textContent = `Backend Online (${data.services}s ${data.courses}c)`;
                return true;
            } catch (error) {
                document.getElementById('backend-status').className = 'status-badge status-offline';
                document.getElementById('backend-status').textContent = 'Backend Offline';
                return false;
            }
        }

        // Load services
        async function loadServices() {
            const isBackendOnline = await checkBackendStatus();
            let services = [];

            if (isBackendOnline) {
                try {
                    const response = await fetch(SERVICES_URL);
                    services = await response.json();
                } catch (error) {
                    console.error('Error loading services:', error);
                }
            }

            // Fallback sample data
            if (services.length === 0) {
                services = [
                    { id: 1, name: "Website Development", price: "£999 - £4,999", description: "Custom website development.", features: ["Responsive", "SEO", "CMS"] },
                    { id: 2, name: "Mobile App Development", price: "£3,999 - £12,999", description: "Native mobile apps.", features: ["iOS & Android", "Cross-platform"] },
                    { id: 3, name: "IT Support", price: "£45/hour", description: "24/7 IT support.", features: ["Remote Assistance", "Maintenance"] },
                    { id: 4, name: "Cloud Management", price: "£75/hour", description: "Cloud infrastructure management.", features: ["AWS/Azure", "Migration"] },
                    { id: 5, name: "Software Testing", price: "£1,999 - £6,999", description: "QA and testing services.", features: ["Automated", "Manual"] },
                    { id: 6, name: "AI Consulting", price: "£95/hour", description: "AI and ML solutions.", features: ["Strategy", "Implementation"] }
                ];
            }

            const container = document.getElementById('services-container');
            container.innerHTML = '';
            
            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <div class="service-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <div class="service-content">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <ul class="service-features">
                            ${service.features.map(feat => `<li><i class="fas fa-check"></i> ${feat}</li>`).join('')}
                        </ul>
                        <div class="service-price">${service.price}</div>
                        <a href="#" class="btn btn-primary">Get Started</a>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Load courses
        async function loadCourses() {
            const isBackendOnline = await checkBackendStatus();
            let courses = [];

            if (isBackendOnline) {
                try {
                    const response = await fetch(COURSES_URL);
                    courses = await response.json();
                } catch (error) {
                    console.error('Error loading courses:', error);
                }
            }

            // Fallback sample data
            if (courses.length === 0) {
                courses = [
                    { id: 1, name: "Web Development Bootcamp", duration: "12 weeks", enrolled: 1247, rating: 4.8, price: "£499", description: "Full-stack web development.", badge: "BESTSELLER" },
                    { id: 2, name: "Cybersecurity Essentials", duration: "10 weeks", enrolled: 756, rating: 4.6, price: "£399", description: "Security principles and practices.", badge: "HOT" },
                    { id: 3, name: "Mobile App Development", duration: "10 weeks", enrolled: 634, rating: 4.5, price: "£449", description: "Flutter mobile development.", badge: "TRENDING" },
                    { id: 4, name: "Data Science & ML", duration: "16 weeks", enrolled: 887, rating: 4.8, price: "£549", description: "Python and machine learning.", badge: "POPULAR" },
                    { id: 5, name: "AWS Cloud", duration: "10 weeks", enrolled: 698, rating: 4.7, price: "£529", description: "AWS certifications prep.", badge: "CERTIFICATION" }
                ];
            }

            const container = document.getElementById('courses-container');
            container.innerHTML = '';
            
            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.innerHTML = `
                    <div class="course-image">
                        <i class="fas fa-book"></i>
                        ${course.badge ? `<div class="course-badge">${course.badge}</div>` : ''}
                    </div>
                    <div class="course-content">
                        <h3>${course.name}</h3>
                        <p>${course.description}</p>
                        <div class="course-meta">
                            <span><i class="fas fa-clock"></i> ${course.duration}</span>
                            <span><i class="fas fa-user-graduate"></i> ${course.enrolled}</span>
                            <span class="course-rating"><i class="fas fa-star"></i> ${course.rating}</span>
                        </div>
                        <div class="service-price">${course.price}</div>
                        <a href="#" class="btn btn-primary">Enroll Now</a>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Admin functions
        async function adminLogin() {
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            const isBackendOnline = await checkBackendStatus();
            
            if (isBackendOnline) {
                try {
                    const response = await fetch(ADMIN_LOGIN_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        adminAuth = { isLoggedIn: true, user: result.user, token: result.token };
                        localStorage.setItem('adminAuth', JSON.stringify(adminAuth));
                        closeModal('adminLoginModal');
                        showAdminDashboard();
                        loadAdminStats();
                        updateAdminNavigation();
                    } else {
                        alert('Login failed: ' + result.message);
                    }
                } catch (error) {
                    useDemoAdminAuth();
                }
            } else {
                useDemoAdminAuth();
            }
        }

        function useDemoAdminAuth() {
            adminAuth = { isLoggedIn: true, user: { username: 'demo-admin', role: 'admin' }, token: 'demo-token' };
            localStorage.setItem('adminAuth', JSON.stringify(adminAuth));
            closeModal('adminLoginModal');
            showAdminDashboard();
            loadAdminStats();
            updateAdminNavigation();
            alert('Backend offline - Using demo admin mode');
        }

        function showAdminDashboard() {
            document.getElementById('admin').style.display = 'block';
            document.getElementById('adminWelcome').textContent = `Welcome, ${adminAuth.user.username}`;
            document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
        }

        function adminLogout() {
            adminAuth = { isLoggedIn: false, user: null, token: null };
            localStorage.removeItem('adminAuth');
            document.getElementById('admin').style.display = 'none';
            updateAdminNavigation();
            alert('Admin logged out');
        }

        function updateAdminNavigation() {
            const adminLink = document.getElementById('adminNavLink');
            if (adminAuth.isLoggedIn) {
                adminLink.innerHTML = `Admin <span class="admin-badge">${adminAuth.user.role}</span>`;
            } else {
                adminLink.innerHTML = 'Admin <span class="admin-badge">Login</span>';
            }
        }

        function checkAdminAccess(event) {
            if (event) event.preventDefault();
            if (!adminAuth.isLoggedIn) {
                openModal('adminLoginModal');
            } else {
                showAdminDashboard();
            }
        }

        function checkSavedAdminAuth() {
            const savedAuth = localStorage.getItem('adminAuth');
            if (savedAuth) {
                adminAuth = JSON.parse(savedAuth);
                if (adminAuth.isLoggedIn) {
                    showAdminDashboard();
                    loadAdminStats();
                    updateAdminNavigation();
                }
            }
        }

        async function loadAdminStats() {
            const stats = {
                totalUsers: 5247,
                totalServices: 12,
                totalCourses: 9,
                revenue: "£12,847",
                activeProjects: 47
            };

            const container = document.getElementById('admin-stats');
            container.innerHTML = '';
            
            const statCards = [
                { icon: 'fa-users', number: stats.totalUsers, label: 'Total Users' },
                { icon: 'fa-laptop-code', number: stats.totalServices, label: 'Services' },
                { icon: 'fa-book', number: stats.totalCourses, label: 'Courses' },
                { icon: 'fa-chart-line', number: stats.revenue, label: 'Revenue' }
            ];
            
            statCards.forEach(stat => {
                const card = document.createElement('div');
                card.className = 'stat-card';
                card.innerHTML = `
                    <i class="fas ${stat.icon}"></i>
                    <div class="number">${stat.number}</div>
                    <div class="label">${stat.label}</div>
                `;
                container.appendChild(card);
            });
        }

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            checkSavedAdminAuth();
            loadServices();
            loadCourses();
            document.querySelector('a[href="#admin"]').addEventListener('click', checkAdminAccess);
        });
    </script>
</body>
</html>
'@

$frontendHtml | Out-File -FilePath "frontend/index.html" -Encoding UTF8

# Frontend package.json
$frontendPackage = @'
{
  "name": "techsolutions-frontend",
  "version": "2.1.0",
  "description": "Frontend for TechSolutions Pro",
  "main": "index.html",
  "scripts": {
    "start": "live-server --port=3003"
  },
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
'@

$frontendPackage | Out-File -FilePath "frontend/package.json" -Encoding UTF8

# Frontend startup script
$frontendStart = @'
Write-Host "🌐 TechSolutions Pro Frontend" -ForegroundColor Green
Write-Host "Starting on http://localhost:3003" -ForegroundColor Cyan
live-server --port=3003 --no-browser
'@

$frontendStart | Out-File -FilePath "frontend/start-frontend.ps1" -Encoding UTF8

Write-Host "✅ Frontend created with enhanced UI!" -ForegroundColor Green

# 3. Create Master Startup Script
Write-Host "`n⚡ CREATING MASTER STARTUP SCRIPT..." -ForegroundColor Yellow

$masterStartup = @'
Write-Host "🚀 TechSolutions Pro - Enhanced Edition" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🎯 Starting Enhanced Application" -ForegroundColor Yellow
Write-Host "📊 12 Services & 9 Courses" -ForegroundColor White
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js." -ForegroundColor Red
    exit 1
}

Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow

# Backend dependencies
Write-Host "🔧 Backend dependencies..." -ForegroundColor White
cd backend
npm install
cd ..

Write-Host "`n🎯 Starting servers..." -ForegroundColor Green

# Start backend
Write-Host "🔧 Starting backend (http://localhost:5000)..." -ForegroundColor Cyan
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; node server.js"

# Wait for backend
Start-Sleep -Seconds 3

# Start frontend
Write-Host "🎨 Starting frontend (http://localhost:3003)..." -ForegroundColor Cyan
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; .\start-frontend.ps1"

Write-Host "`n🎉 APPLICATION STARTED!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3003" -ForegroundColor White
Write-Host "🔧 Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "🔑 Admin: admin / admin123" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Close PowerShell windows to stop servers" -ForegroundColor Red
'@

$masterStartup | Out-File -FilePath "start-all.ps1" -Encoding UTF8

# 4. Create README
Write-Host "`n📚 CREATING DOCUMENTATION..." -ForegroundColor Yellow

$readme = @'
# TechSolutions Pro - Enhanced Edition

## 🚀 Quick Start
```powershell
# Start everything:
.\start-all.ps1

# Access:
# Frontend: http://localhost:3003
# Backend:  http://localhost:5000
# Admin: admin / admin123
