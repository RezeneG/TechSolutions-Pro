# Update backend/server.js with enhanced features
cd D:\online-tuition\TechSolutions-Pro\backend

@'
// TechSolutions Pro - Enhanced Backend with All Features
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Enhanced Data with more details
const services = [
    {id:1, name:"Website Development", price:"£999-£4,999", category:"development", description:"Custom website development with modern technologies.", features:["Responsive Design", "SEO Optimized", "CMS Integration"], popularity: 95},
    {id:2, name:"E-commerce Solutions", price:"£2,499-£7,999", category:"development", description:"Complete e-commerce platform development.", features:["Payment Gateway", "Inventory Management", "Order Tracking"], popularity: 88},
    {id:3, name:"Mobile App Development", price:"£3,999-£12,999", category:"development", description:"Native and cross-platform mobile applications.", features:["iOS & Android", "Cross-platform", "App Store Deployment"], popularity: 92},
    {id:4, name:"Custom Software", price:"£5,999-£25,000+", category:"development", description:"Tailored software solutions for your business.", features:["Custom Requirements", "Scalable Architecture", "API Integration"], popularity: 85},
    {id:5, name:"IT Support", price:"£45/hour", category:"support", description:"Professional IT support and maintenance.", features:["24/7 Support", "Remote Assistance", "Hardware Maintenance"], popularity: 90},
    {id:6, name:"Cloud Management", price:"£75/hour", category:"support", description:"Cloud infrastructure setup and management.", features:["AWS/Azure", "Cloud Migration", "Cost Optimization"], popularity: 87},
    {id:7, name:"Security Audit", price:"£1,499-£4,999", category:"support", description:"Comprehensive security assessment.", features:["Vulnerability Assessment", "Penetration Testing", "Security Report"], popularity: 83},
    {id:8, name:"Software Testing", price:"£1,999-£6,999", category:"testing", description:"Comprehensive software testing services.", features:["Automated Testing", "Manual Testing", "Performance Testing"], popularity: 89},
    {id:9, name:"Mobile Testing", price:"£1,499-£4,999", category:"testing", description:"Specialized mobile app testing.", features:["Device Compatibility", "Performance Testing", "User Experience"], popularity: 86},
    {id:10, name:"Game Dev Consultation", price:"£65/hour", category:"consultation", description:"Expert game development consultation.", features:["Game Design", "Technical Architecture", "Platform Guidance"], popularity: 82},
    {id:11, name:"Digital Transformation", price:"£120/hour", category:"consultation", description:"Strategic digital consulting.", features:["Strategy Development", "Technology Assessment", "ROI Analysis"], popularity: 88},
    {id:12, name:"AI & ML Consulting", price:"£95/hour", category:"consultation", description:"AI and machine learning guidance.", features:["AI Strategy", "Model Development", "Implementation Support"], popularity: 94}
];

const courses = [
    {id:1, name:"Web Development Bootcamp", duration:"12 weeks", price:"£499", enrolled:1247, rating:4.8, description:"Master full-stack web development.", category:"web-dev", instructor:"Sarah Johnson", level:"Beginner to Advanced", badge: "BESTSELLER"},
    {id:2, name:"Advanced JavaScript & React", duration:"8 weeks", price:"£349", enrolled:892, rating:4.7, description:"Deep dive into modern JavaScript.", category:"web-dev", instructor:"Mike Chen", level:"Intermediate", badge: "POPULAR"},
    {id:3, name:"Cybersecurity Essentials", duration:"10 weeks", price:"£399", enrolled:756, rating:4.6, description:"Learn cybersecurity principles.", category:"security", instructor:"Dr. Emily Watson", level:"Beginner to Intermediate", badge: "HOT"},
    {id:4, name:"Ethical Hacking", duration:"14 weeks", price:"£599", enrolled:423, rating:4.9, description:"Penetration testing techniques.", category:"security", instructor:"Alex Rodriguez", level:"Advanced", badge: "ADVANCED"},
    {id:5, name:"Mobile App with Flutter", duration:"10 weeks", price:"£449", enrolled:634, rating:4.5, description:"Build mobile apps with Flutter.", category:"mobile", instructor:"David Kim", level:"Intermediate", badge: "TRENDING"},
    {id:6, name:"iOS Development", duration:"12 weeks", price:"£479", enrolled:521, rating:4.7, description:"Master iOS app development.", category:"mobile", instructor:"Lisa Thompson", level:"Intermediate", badge: "NEW"},
    {id:7, name:"Data Science & ML", duration:"16 weeks", price:"£549", enrolled:887, rating:4.8, description:"Comprehensive data science course.", category:"data-science", instructor:"Dr. Robert Brown", level:"Intermediate to Advanced", badge: "POPULAR"},
    {id:8, name:"Python Automation", duration:"6 weeks", price:"£299", enrolled:1123, rating:4.6, description:"Python for automation and scripting.", category:"programming", instructor:"Maria Garcia", level:"Beginner", badge: "BESTSELLER"},
    {id:9, name:"AWS Cloud", duration:"10 weeks", price:"£529", enrolled:698, rating:4.7, description:"AWS cloud services and certifications.", category:"cloud", instructor:"James Wilson", level:"Intermediate", badge: "CERTIFICATION"}
];

// User database (in production, use proper database)
let users = [
    {id: 1, email: "admin@techsolutions.com", password: "admin123", role: "admin", name: "System Administrator"},
    {id: 2, email: "user@example.com", password: "user123", role: "user", name: "Demo User"}
];

let bookings = [];
let enrollments = [];

// Enhanced Routes
app.get("/", (req, res) => {
    res.json({ 
        message: "TechSolutions Pro API - Enhanced Edition", 
        features: ["Admin Dashboard", "Service Filtering", "User Authentication", "Booking System", "Search"],
        services: services.length,
        courses: courses.length,
        version: "3.0"
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", services: services.length, courses: courses.length });
});

// Services with filtering and search
app.get("/api/services", (req, res) => {
    let filteredServices = [...services];
    
    // Category filter
    if (req.query.category) {
        filteredServices = filteredServices.filter(service => 
            service.category === req.query.category
        );
    }
    
    // Search filter
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredServices = filteredServices.filter(service =>
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm)
        );
    }
    
    res.json(filteredServices);
});

app.get("/api/services/categories", (req, res) => {
    const categories = [...new Set(services.map(service => service.category))];
    res.json(categories);
});

// Courses with filtering and search
app.get("/api/courses", (req, res) => {
    let filteredCourses = [...courses];
    
    if (req.query.category) {
        filteredCourses = filteredCourses.filter(course => 
            course.category === req.query.category
        );
    }
    
    if (req.query.search) {
        const searchTerm = req.query.search.toLowerCase();
        filteredCourses = filteredCourses.filter(course =>
            course.name.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
    }
    
    res.json(filteredCourses);
});

app.get("/api/courses/categories", (req, res) => {
    const categories = [...new Set(courses.map(course => course.category))];
    res.json(categories);
});

// User Authentication
app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        email,
        password, // In production, hash this!
        name,
        role: "user"
    };
    
    users.push(newUser);
    res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ 
            success: true, 
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token: "demo-token-" + user.id
        });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Booking System
app.post("/api/bookings", (req, res) => {
    const { serviceId, userId, date, notes } = req.body;
    
    const service = services.find(s => s.id === serviceId);
    const user = users.find(u => u.id === userId);
    
    if (!service || !user) {
        return res.status(400).json({ success: false, message: "Invalid service or user" });
    }
    
    const booking = {
        id: bookings.length + 1,
        serviceId,
        userId,
        serviceName: service.name,
        userName: user.name,
        date,
        notes,
        status: "pending",
        createdAt: new Date()
    };
    
    bookings.push(booking);
    res.json({ success: true, booking });
});

app.post("/api/enrollments", (req, res) => {
    const { courseId, userId } = req.body;
    
    const course = courses.find(c => c.id === courseId);
    const user = users.find(u => u.id === userId);
    
    if (!course || !user) {
        return res.status(400).json({ success: false, message: "Invalid course or user" });
    }
    
    const enrollment = {
        id: enrollments.length + 1,
        courseId,
        userId,
        courseName: course.name,
        userName: user.name,
        enrolledAt: new Date(),
        progress: 0
    };
    
    enrollments.push(enrollment);
    res.json({ success: true, enrollment });
});

// Admin Dashboard
app.get("/api/admin/dashboard", (req, res) => {
    const totalRevenue = bookings.reduce((sum, booking) => {
        const price = booking.serviceName.includes("£") ? parseInt(booking.serviceName.split("£")[1]) : 100;
        return sum + price;
    }, 0) + enrollments.reduce((sum, enrollment) => {
        const course = courses.find(c => c.id === enrollment.courseId);
        return sum + (course ? parseInt(course.price.replace("£", "")) : 0);
    }, 0);

    res.json({
        totalUsers: users.length,
        totalServices: services.length,
        totalCourses: courses.length,
        totalBookings: bookings.length,
        totalEnrollments: enrollments.length,
        revenue: "£" + totalRevenue,
        recentActivities: [
            { action: "user_registration", user: "New User", timestamp: new Date() },
            { action: "service_booking", service: "Website Development", user: "John Doe", timestamp: new Date() },
            { action: "course_enrollment", course: "Web Development Bootcamp", user: "Jane Smith", timestamp: new Date() }
        ]
    });
});

app.get("/api/admin/users", (req, res) => {
    res.json(users);
});

app.get("/api/admin/bookings", (req, res) => {
    res.json(bookings);
});

app.get("/api/admin/enrollments", (req, res) => {
    res.json(enrollments);
});

// Start server
app.listen(PORT, () => {
    console.log("🚀 TechSolutions Pro Enhanced Backend running on http://localhost:" + PORT);
    console.log("📊 Features: Admin Dashboard, User Auth, Booking System, Search & Filter");
    console.log("🔑 Admin Login: admin@techsolutions.com / admin123");
    console.log("👤 Demo User: user@example.com / user123");
});
'@ | Out-File -FilePath "server.js" -Encoding UTF8

Write-Host "✅ Enhanced backend created with all features!" -ForegroundColor Green
