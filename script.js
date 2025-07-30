// Mock data for jobs
let jobs = [
    {
        id: 1,
        title: "Frontend разработчик",
        company: "TechKz",
        description: "Ищем опытного Frontend разработчика для работы с React и Vue.js. Требуется опыт работы от 2 лет, знание JavaScript, HTML, CSS. Работа в дружной команде, интересные проекты, возможность роста.",
        city: "Алматы",
        salary: 350000,
        employmentType: "Полная занятость",
        experience: "1-3 года",
        email: "hr@techkz.com",
        datePosted: "2025-01-21",
        status: "active",
        applications: 8,
        views: 45
    },
    {
        id: 2,
        title: "Backend разработчик Python",
        company: "DataSoft",
        description: "Требуется Backend разработчик с опытом работы с Python, Django/Flask. Знание PostgreSQL, Redis приветствуется. Удаленная работа возможна.",
        city: "Нур-Султан",
        salary: 400000,
        employmentType: "Удаленная работа",
        experience: "3-5 лет",
        email: "jobs@datasoft.kz",
        datePosted: "2025-01-20",
        status: "active",
        applications: 12,
        views: 67
    },
    {
        id: 3,
        title: "UX/UI Дизайнер",
        company: "DesignHub",
        description: "Ищем креативного UX/UI дизайнера для создания современных интерфейсов. Требуется портфолио, знание Figma, Adobe Creative Suite.",
        city: "Алматы",
        salary: 280000,
        employmentType: "Полная занятость",
        experience: "1-3 года",
        email: "design@designhub.kz",
        datePosted: "2025-01-19",
        status: "active",
        applications: 15,
        views: 89
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudTech",
        description: "Требуется DevOps инженер с опытом работы с AWS, Docker, Kubernetes. Знание CI/CD процессов обязательно.",
        city: "Шымкент",
        salary: 450000,
        employmentType: "Полная занятость",
        experience: "3-5 лет",
        email: "devops@cloudtech.kz",
        datePosted: "2025-01-18",
        status: "paused",
        applications: 6,
        views: 34
    },
    {
        id: 5,
        title: "Менеджер по продажам",
        company: "SalesForce KZ",
        description: "Ищем активного менеджера по продажам IT-решений. Опыт продаж B2B обязателен. Высокие комиссионные.",
        city: "Караганда",
        salary: 200000,
        employmentType: "Полная занятость",
        experience: "1-3 года",
        email: "sales@salesforce.kz",
        datePosted: "2025-01-17",
        status: "active",
        applications: 9,
        views: 52
    },
    {
        id: 6,
        title: "QA Engineer",
        company: "TestLab",
        description: "Требуется QA инженер для тестирования веб-приложений. Знание автоматизированного тестирования приветствуется.",
        city: "Актобе",
        salary: 250000,
        employmentType: "Частичная занятость",
        experience: "Без опыта",
        email: "qa@testlab.kz",
        datePosted: "2025-01-16",
        status: "closed",
        applications: 3,
        views: 21
    }
];

// Current user (mock data)
let currentUser = {
    id: 1,
    name: "Работодатель",
    email: "employer@onai.kz",
    type: "employer"
};

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Format salary
function formatSalary(salary) {
    return new Intl.NumberFormat('ru-KZ').format(salary) + ' ₸';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Сегодня';
    if (diffDays === 2) return 'Вчера';
    if (diffDays <= 7) return `${diffDays} дня назад`;
    
    return date.toLocaleDateString('ru-RU');
}

// Display jobs on jobs page
function displayJobs(jobsToShow = jobs) {
    const container = document.getElementById('jobs-container');
    const noResults = document.getElementById('no-results');
    const jobsCount = document.getElementById('jobs-count');
    
    if (!container) return;
    
    if (jobsToShow.length === 0) {
        container.style.display = 'none';
        noResults.classList.remove('hidden');
        if (jobsCount) jobsCount.textContent = '0';
        return;
    }
    
    container.style.display = 'grid';
    noResults.classList.add('hidden');
    if (jobsCount) jobsCount.textContent = jobsToShow.length;
    
    container.innerHTML = jobsToShow.map(job => `
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${job.title}</h3>
                    <p class="text-primary font-medium mb-1">${job.company}</p>
                    <div class="flex items-center text-gray-600 text-sm space-x-4">
                        <span><i class="fas fa-map-marker-alt mr-1"></i>${job.city}</span>
                        <span><i class="fas fa-clock mr-1"></i>${job.employmentType}</span>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-secondary">${formatSalary(job.salary)}</div>
                    <div class="text-sm text-gray-500">${formatDate(job.datePosted)}</div>
                </div>
            </div>
            
            <p class="text-gray-700 mb-4 line-clamp-3">${job.description}</p>
            
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <span class="bg-gray-100 px-2 py-1 rounded">${job.experience}</span>
                </div>
                <button onclick="applyToJob(${job.id})" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                    <i class="fas fa-paper-plane mr-2"></i>Откликнуться
                </button>
            </div>
        </div>
    `).join('');
}

// Filter and search jobs
function filterJobs() {
    const searchInput = document.getElementById('search-input');
    const cityFilter = document.getElementById('city-filter');
    const salaryFilter = document.getElementById('salary-filter');
    
    if (!searchInput || !cityFilter || !salaryFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCity = cityFilter.value;
    const minSalary = parseInt(salaryFilter.value) || 0;
    
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                            job.company.toLowerCase().includes(searchTerm) ||
                            job.description.toLowerCase().includes(searchTerm);
        const matchesCity = !selectedCity || job.city === selectedCity;
        const matchesSalary = job.salary >= minSalary;
        
        return matchesSearch && matchesCity && matchesSalary;
    });
    
    displayJobs(filteredJobs);
}

// Apply to job
function applyToJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        alert(`Ваш отклик на вакансию "${job.title}" отправлен! Работодатель свяжется с вами по email.`);
        // Here you would typically send the application to a backend
    }
}

// Auth form switching
function switchToRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-tab').classList.remove('text-primary', 'border-primary');
    document.getElementById('login-tab').classList.add('text-gray-400', 'border-transparent');
    document.getElementById('register-tab').classList.add('text-primary', 'border-primary');
    document.getElementById('register-tab').classList.remove('text-gray-400', 'border-transparent');
}

function switchToLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-tab').classList.remove('text-primary', 'border-primary');
    document.getElementById('register-tab').classList.add('text-gray-400', 'border-transparent');
    document.getElementById('login-tab').classList.add('text-primary', 'border-primary');
    document.getElementById('login-tab').classList.remove('text-gray-400', 'border-transparent');
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Mock authentication
    if (email && password) {
        const successDiv = document.getElementById('auth-success');
        const successText = document.getElementById('success-text');
        successText.textContent = 'Успешный вход! Добро пожаловать в Onai!';
        successDiv.classList.remove('hidden');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
}

// Handle registration
function handleRegister(event) {
    event.preventDefault();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    if (password.length < 6) {
        alert('Пароль должен содержать минимум 6 символов!');
        return;
    }
    
    const successDiv = document.getElementById('auth-success');
    successDiv.classList.remove('hidden');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Add job form handler
function handleAddJob(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newJob = {
        id: jobs.length + 1,
        title: formData.get('title'),
        company: formData.get('company'),
        description: formData.get('description'),
        city: formData.get('city'),
        salary: parseInt(formData.get('salary')),
        employmentType: formData.get('employment-type') || 'Полная занятость',
        experience: formData.get('experience') || 'Без опыта',
        email: formData.get('email'),
        datePosted: new Date().toISOString().split('T')[0],
        status: 'active',
        applications: 0,
        views: 0
    };
    
    jobs.push(newJob);
    
    const successDiv = document.getElementById('success-message');
    successDiv.classList.remove('hidden');
    
    event.target.reset();
    
    setTimeout(() => {
        successDiv.classList.add('hidden');
    }, 5000);
}

// Dashboard functions
function displayMyJobs() {
    const container = document.getElementById('my-jobs-container');
    const emptyState = document.getElementById('empty-jobs');
    const statusFilter = document.getElementById('status-filter');
    
    if (!container) return;
    
    const selectedStatus = statusFilter ? statusFilter.value : '';
    const myJobs = jobs.filter(job => {
        return !selectedStatus || job.status === selectedStatus;
    });
    
    if (myJobs.length === 0) {
        container.style.display = 'none';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    container.style.display = 'block';
    if (emptyState) emptyState.classList.add('hidden');
    
    container.innerHTML = myJobs.map(job => `
        <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900">${job.title}</h3>
                        <span class="px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}">
                            ${getStatusText(job.status)}
                        </span>
                    </div>
                    <p class="text-primary font-medium mb-2">${job.company}</p>
                    <div class="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                        <span><i class="fas fa-map-marker-alt mr-1"></i>${job.city}</span>
                        <span><i class="fas fa-money-bill-wave mr-1"></i>${formatSalary(job.salary)}</span>
                        <span><i class="fas fa-calendar mr-1"></i>${formatDate(job.datePosted)}</span>
                    </div>
                    <p class="text-gray-700 mb-4">${job.description}</p>
                </div>
            </div>
            
            <div class="flex items-center justify-between border-t pt-4">
                <div class="flex items-center space-x-6 text-sm text-gray-600">
                    <span><i class="fas fa-users mr-1"></i>${job.applications} откликов</span>
                    <span><i class="fas fa-eye mr-1"></i>${job.views} просмотров</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="editJob(${job.id})" class="text-primary hover:text-blue-600 transition duration-300">
                        <i class="fas fa-edit mr-1"></i>Редактировать
                    </button>
                    <button onclick="toggleJobStatus(${job.id})" class="text-yellow-600 hover:text-yellow-700 transition duration-300">
                        <i class="fas fa-pause mr-1"></i>${job.status === 'active' ? 'Приостановить' : 'Активировать'}
                    </button>
                    <button onclick="deleteJob(${job.id})" class="text-red-600 hover:text-red-700 transition duration-300">
                        <i class="fas fa-trash mr-1"></i>Удалить
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateDashboardStats();
}

function getStatusColor(status) {
    switch(status) {
        case 'active': return 'bg-green-100 text-green-800';
        case 'paused': return 'bg-yellow-100 text-yellow-800';
        case 'closed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'active': return 'Активна';
        case 'paused': return 'На паузе';
        case 'closed': return 'Закрыта';
        default: return 'Неизвестно';
    }
}

function updateDashboardStats() {
    const activeJobsCount = document.getElementById('active-jobs-count');
    const totalApplications = document.getElementById('total-applications');
    const totalViews = document.getElementById('total-views');
    const successfulHires = document.getElementById('successful-hires');
    
    if (activeJobsCount) {
        activeJobsCount.textContent = jobs.filter(job => job.status === 'active').length;
    }
    
    if (totalApplications) {
        totalApplications.textContent = jobs.reduce((sum, job) => sum + job.applications, 0);
    }
    
    if (totalViews) {
        totalViews.textContent = jobs.reduce((sum, job) => sum + job.views, 0);
    }
    
    if (successfulHires) {
        successfulHires.textContent = jobs.filter(job => job.status === 'closed').length;
    }
}

function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    document.getElementById('edit-job-id').value = job.id;
    document.getElementById('edit-title').value = job.title;
    document.getElementById('edit-description').value = job.description;
    document.getElementById('edit-city').value = job.city;
    document.getElementById('edit-salary').value = job.salary;
    
    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

function handleEditJob(event) {
    event.preventDefault();
    const jobId = parseInt(document.getElementById('edit-job-id').value);
    const jobIndex = jobs.findIndex(j => j.id === jobId);
    
    if (jobIndex !== -1) {
        jobs[jobIndex] = {
            ...jobs[jobIndex],
            title: document.getElementById('edit-title').value,
            description: document.getElementById('edit-description').value,
            city: document.getElementById('edit-city').value,
            salary: parseInt(document.getElementById('edit-salary').value)
        };
        
        closeEditModal();
        displayMyJobs();
        alert('Вакансия успешно обновлена!');
    }
}

function toggleJobStatus(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = job.status === 'active' ? 'paused' : 'active';
        displayMyJobs();
    }
}

function deleteJob(jobId) {
    if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
        const jobIndex = jobs.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
            jobs.splice(jobIndex, 1);
            displayMyJobs();
        }
    }
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.location.href = 'index.html';
    }
}

// Initialize page based on current location
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Set up event listeners based on current page
    switch(currentPage) {
        case 'jobs.html':
            displayJobs();
            
            // Set up search and filter listeners
            const searchInput = document.getElementById('search-input');
            const cityFilter = document.getElementById('city-filter');
            const salaryFilter = document.getElementById('salary-filter');
            
            if (searchInput) searchInput.addEventListener('input', filterJobs);
            if (cityFilter) cityFilter.addEventListener('change', filterJobs);
            if (salaryFilter) salaryFilter.addEventListener('change', filterJobs);
            break;
            
        case 'add-job.html':
            const addJobForm = document.getElementById('add-job-form');
            if (addJobForm) {
                addJobForm.addEventListener('submit', handleAddJob);
            }
            break;
            
        case 'auth.html':
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const loginTab = document.getElementById('login-tab');
            const registerTab = document.getElementById('register-tab');
            
            if (loginForm) loginForm.addEventListener('submit', handleLogin);
            if (registerForm) registerForm.addEventListener('submit', handleRegister);
            if (loginTab) loginTab.addEventListener('click', switchToLogin);
            if (registerTab) registerTab.addEventListener('click', switchToRegister);
            break;
            
        case 'dashboard.html':
            displayMyJobs();
            
            const statusFilter = document.getElementById('status-filter');
            const editJobForm = document.getElementById('edit-job-form');
            
            if (statusFilter) {
                statusFilter.addEventListener('change', displayMyJobs);
            }
            
            if (editJobForm) {
                editJobForm.addEventListener('submit', handleEditJob);
            }
            break;
    }
});

// Add CSS for line clamp
const style = document.createElement('style');
style.textContent = `
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .animate-fade-in {
        animation: fadeIn 1s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);