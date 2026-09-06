// ========== CONFIGURATION ==========
const API = "http://127.0.0.1:5000/api";
console.log("✅ script.js loaded - API:", API);

// ========== AUTHENTICATION ==========
async function register() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    console.log("📝 Register attempt:", { name, email, role });

    if (!name || !email || !password) {
        alert("❌ Please fill in all fields");
        return;
    }

    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();
        console.log("Register response:", data);

        if (data.message && data.message.includes("successful")) {
            alert("✅ Registration Successful!\n\nPlease now login with your credentials.");
            // Clear form
            document.getElementById("regName").value = "";
            document.getElementById("regEmail").value = "";
            document.getElementById("regPassword").value = "";
        } else {
            alert("❌ Registration failed: " + (data.error || "Unknown error"));
        }
    } catch (error) {
        console.error("Register error:", error);
        alert("❌ Registration failed: Could not connect to server");
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    console.log("🔐 Login attempt:", email);

    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (data.message === "Login successful!" || data.token) {
            // Store login info
            localStorage.setItem("token", data.token || "demo-token");
            localStorage.setItem("role", data.role || role);
            localStorage.setItem("userEmail", email);
            
            console.log("✅ Login successful! Redirecting...");
            
            // Redirect based on role
            if (data.role === "student" || role === "student") {
                window.location.href = "dashboard.html";
            } else {
                window.location.href = "faculty.html";
            }
        } else {
            alert("❌ Login failed: " + (data.error || "Invalid credentials"));
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("❌ Login failed: Could not connect to server");
    }
}

// ========== PROJECT FUNCTIONS ==========
async function addProject() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        return;
    }

    let formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("technologies", document.getElementById("technologies").value);
    formData.append("github_link", document.getElementById("github").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("batch", document.getElementById("batch").value);

    const files = document.getElementById("screenshots").files;
    for (let i = 0; i < files.length; i++) {
        formData.append("screenshots", files[i]);
    }

    try {
        const res = await fetch(`${API}/projects/add`, {
            method: "POST",
            headers: { "Authorization": "Bearer " + token },
            body: formData
        });

        const data = await res.json();
        alert(data.message || "Project submitted!");
    } catch (error) {
        alert("Failed to submit project");
    }
}

async function loadApprovedProjects() {
    try {
        const res = await fetch(`${API}/projects`);
        const projects = await res.json();

        const container = document.getElementById("projects");
        if (!container) return;

        container.innerHTML = "";

        projects.forEach(project => {
            container.innerHTML += `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <p><strong>Tech:</strong> ${Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies}</p>
                    <a href="${project.github_link}" target="_blank">GitHub</a>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

async function loadPendingProjects() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch(`${API}/projects/pending`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const projects = await res.json();
        const container = document.getElementById("pending");
        
        if (!container) return;

        container.innerHTML = "";

        projects.forEach(project => {
            container.innerHTML += `
                <div class="pending-project">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button onclick="approve('${project._id}')">Approve</button>
                    <button onclick="reject('${project._id}')">Reject</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading pending projects:", error);
    }
}

async function approve(id) {
    await updateStatus(id, "Approved");
}

async function reject(id) {
    await updateStatus(id, "Rejected");
}

async function updateStatus(id, status) {
    const token = localStorage.getItem("token");
    await fetch(`${API}/projects/status/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ status })
    });
    loadPendingProjects();
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Page loaded successfully");
    
    // Load projects on homepage
    if (document.getElementById("projects")) {
        loadApprovedProjects();
    }
    
    // Load pending projects on faculty page
    if (document.getElementById("pending")) {
        loadPendingProjects();
    }
});
// ========== DASHBOARD NAVIGATION ==========
function showSection(sectionId) {
    // Hide all dashboard sections
    const sections = document.querySelectorAll(".dashboard-section");
    sections.forEach(section => {
        section.classList.remove("active");
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add("active");
    }

    // Update sidebar active state
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.classList.remove("active");
    });

    const activeMenu = document.querySelector(
        `.menu-item[href="#${sectionId}"]`
    );

    if (activeMenu) {
        activeMenu.classList.add("active");
    }

    // Load profile information
    if (sectionId === "profile") {
        loadProfile();
    }

    // Load user's projects
    if (sectionId === "my-projects") {
        loadMyProjects();
    }
}


// Load profile information
function loadProfile() {
    const email = localStorage.getItem("userEmail");

    const emailElement = document.getElementById("userEmail");

    if (email && emailElement) {
        emailElement.textContent = email;
    }
}