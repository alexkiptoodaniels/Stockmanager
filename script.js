// ============================================
// INITIALIZATION & THEME MANAGEMENT
// ============================================

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    checkAuthStatus();
    initializePageContent();
});

function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    applyTheme(theme);
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon('☀️');
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon('🌙');
    }
    localStorage.setItem('theme', theme);
}

function updateThemeIcon(icon) {
    const themeIcons = document.querySelectorAll('#themeIcon');
    themeIcons.forEach(icon => {
        icon.textContent = icon.textContent === '🌙' ? '☀️' : '🌙';
    });
}

// Theme Toggle
document.addEventListener('click', function(e) {
    if (e.target.closest('.theme-toggle')) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});

// ============================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================

function generateUserId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ID-${timestamp}${random}`.substring(0, 12);
}

function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (!currentUser) {
        // Not logged in
        if (currentPage === 'inventory.html' || currentPage === 'profile.html') {
            window.location.href = 'login.html';
        }
    } else {
        // Logged in
        if (currentPage === 'login.html' || currentPage === 'signup.html') {
            window.location.href = 'inventory.html';
        }
        setupLogoutButtons();
    }
}

function setupLogoutButtons() {
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', logout);
    });
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ============================================
// SIGNUP FUNCTIONALITY
// ============================================

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const shopName = document.getElementById('shopName').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!email || !phone || !shopName || !password || !confirmPassword) {
            showMessage('signupMessage', 'Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('signupMessage', 'Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('signupMessage', 'Password must be at least 6 characters', 'error');
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            showMessage('signupMessage', 'Email already registered', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: generateUserId(),
            email: email,
            phone: phone,
            shopName: shopName,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            products: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        showMessage('signupMessage', 'Account created successfully! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
    });
}

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showMessage('loginMessage', 'Invalid email or password', 'error');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('loginMessage', 'Login successful! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'inventory.html';
        }, 1500);
    });
}

// ============================================
// PROFILE FUNCTIONALITY
// ============================================

function initializeProfilePage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display user info
    document.getElementById('profileShopName').textContent = currentUser.shopName;
    document.getElementById('profileUserId').textContent = currentUser.id;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;

    const createdDate = new Date(currentUser.createdAt);
    document.getElementById('profileMemberSince').textContent = createdDate.getFullYear();

    // Display stats
    updateProfileStats();

    // Handle password change
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handlePasswordChange);
    }

    // Handle delete account
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', handleDeleteAccount);
    }

    // Modal handlers
    setupConfirmModal();
}

function updateProfileStats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        const userProducts = users[userIndex].products || [];
        const totalProducts = userProducts.length;
        const totalItems = userProducts.reduce((sum, p) => sum + (p.quantity || 0), 0);
        const totalValue = userProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalValue').textContent = '$' + totalValue.toFixed(2);
    }
}

function handlePasswordChange(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (oldPassword !== currentUser.password) {
        showMessage('profileMessage', 'Current password is incorrect', 'error');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        showMessage('profileMessage', 'New passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showMessage('profileMessage', 'Password must be at least 6 characters', 'error');
        return;
    }

    // Update password
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        currentUser.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showMessage('profileMessage', 'Password changed successfully', 'success');
        document.getElementById('changePasswordForm').reset();
    }
}

function handleDeleteAccount() {
    const modal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = 'Are you sure you want to delete your account? This action cannot be undone.';
    modal.classList.add('show');

    document.getElementById('confirmYes').onclick = function() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(u => u.id !== currentUser.id);
        localStorage.setItem('users', JSON.stringify(filteredUsers));
        localStorage.removeItem('currentUser');

        showMessage('profileMessage', 'Account deleted. Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    };
}

function setupConfirmModal() {
    const modal = document.getElementById('confirmModal');
    const confirmNo = document.getElementById('confirmNo');
    
    if (confirmNo) {
        confirmNo.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// ============================================
// INVENTORY FUNCTIONALITY
// ============================================

function initializeInventoryPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Setup form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }

    // Setup search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Setup filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }

    // Setup modal
    setupEditModal();

    // Display products
    displayProducts();
    updateCategoryOptions();
}

function handleAddProduct(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) return;

    const product = {
        id: 'PROD-' + Date.now(),
        name: document.getElementById('productName').value.trim(),
        description: document.getElementById('productDescription').value.trim(),
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value),
        category: document.getElementById('productCategory').value.trim(),
        createdAt: new Date().toISOString()
    };

    if (!product.name || !product.price) {
        showMessage('inventoryMessage', 'Please fill in required fields', 'error');
        return;
    }

    if (!users[userIndex].products) {
        users[userIndex].products = [];
    }

    users[userIndex].products.push(product);
    localStorage.setItem('users', JSON.stringify(users));

    // Update current user
    currentUser.products = users[userIndex].products;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showMessage('inventoryMessage', 'Product added successfully!', 'success');
    e.target.reset();
    displayProducts();
    updateCategoryOptions();
    updateProfileStats();
}

function displayProducts() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    const productsBody = document.getElementById('productsBody');
    const noProducts = document.getElementById('noProducts');
    const products = users[userIndex]?.products || [];

    if (products.length === 0) {
        productsBody.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';
    productsBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category || '-'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function editProduct(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    const product = users[userIndex].products.find(p => p.id === productId);

    if (!product) return;

    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductQuantity').value = product.quantity;
    document.getElementById('editProductCategory').value = product.category;

    const modal = document.getElementById('editModal');
    modal.classList.add('show');
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    users[userIndex].products = users[userIndex].products.filter(p => p.id !== productId);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser.products = users[userIndex].products;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showMessage('inventoryMessage', 'Product deleted successfully!', 'success');
    displayProducts();
    updateCategoryOptions();
    updateProfileStats();
}

function setupEditModal() {
    const editModal = document.getElementById('editModal');
    const closeModal = document.getElementById('closeModal');
    const editForm = document.getElementById('editProductForm');

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            editModal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            editModal.classList.remove('show');
        }
    });

    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            const productId = document.getElementById('editProductId').value;
            const productIndex = users[userIndex].products.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                users[userIndex].products[productIndex] = {
                    ...users[userIndex].products[productIndex],
                    name: document.getElementById('editProductName').value.trim(),
                    description: document.getElementById('editProductDescription').value.trim(),
                    price: parseFloat(document.getElementById('editProductPrice').value),
                    quantity: parseInt(document.getElementById('editProductQuantity').value),
                    category: document.getElementById('editProductCategory').value.trim()
                };

                localStorage.setItem('users', JSON.stringify(users));
                currentUser.products = users[userIndex].products;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                showMessage('inventoryMessage', 'Product updated successfully!', 'success');
                editModal.classList.remove('show');
                displayProducts();
                updateProfileStats();
            }
        });
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    const products = users[userIndex]?.products || [];

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    displayFilteredProducts(filtered);
}

function handleCategoryFilter(e) {
    const selectedCategory = e.target.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    const products = users[userIndex]?.products || [];

    const filtered = selectedCategory ? 
        products.filter(p => p.category === selectedCategory) : 
        products;

    displayFilteredProducts(filtered);
}

function displayFilteredProducts(products) {
    const productsBody = document.getElementById('productsBody');
    const noProducts = document.getElementById('noProducts');

    if (products.length === 0) {
        productsBody.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';
    productsBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category || '-'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateCategoryOptions() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    const products = users[userIndex]?.products || [];

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const categoryFilter = document.getElementById('categoryFilter');

    if (categoryFilter) {
        const currentValue = categoryFilter.value;
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
        categoryFilter.value = currentValue;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.className = `message show ${type}`;

    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 4000);
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showMessage('profileMessage', 'Copied to clipboard!', 'success');
    });
}

function initializePageContent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'profile.html') {
        initializeProfilePage();
    } else if (currentPage === 'inventory.html') {
        initializeInventoryPage();
    }
}
