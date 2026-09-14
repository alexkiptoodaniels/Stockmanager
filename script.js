// ============================================
// SUPABASE INITIALIZATION
// ============================================

// Import Supabase (make sure to add this script tag in HTML head)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

const SUPABASE_URL = 'https://oovlbtdhuhvsrafzuzuc.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_XVoEZjP2Mx3vdW6p-pb8vQ_olu9x5SE';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global variable for current session
let currentSession = null;
let currentUser = null;

// ============================================
// INITIALIZATION & THEME MANAGEMENT
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    initializeTheme();
    await initializeSupabase();
    checkAuthStatus();
    initializePageContent();
});

async function initializeSupabase() {
    try {
        // Check if user already has active session
        const { data: { session } } = await supabaseClient.auth.getSession();
        currentSession = session;
        
        if (session) {
            // Fetch user data from database
            const { data: userData, error } = await supabaseClient
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            if (userData) {
                currentUser = userData;
            }
        }
    } catch (error) {
        console.error('Supabase initialization error:', error);
    }
}

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

function generateUserDisplayId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ID-${timestamp}${random}`.substring(0, 12);
}

async function checkAuthStatus() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (!currentSession) {
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

async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        
        currentSession = null;
        currentUser = null;
        window.location.href = 'index.html';
    } catch (error) {
        showMessage('profileMessage', 'Logout error: ' + error.message, 'error');
    }
}

// ============================================
// SIGNUP FUNCTIONALITY
// ============================================

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
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

        try {
            // Sign up with Supabase Auth
            const { data: { user }, error: authError } = await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

            if (authError) throw authError;

            // Create user profile in database
            const userDisplayId = generateUserDisplayId();
            const { data: userData, error: dbError } = await supabaseClient
                .from('users')
                .insert([{
                    id: user.id,
                    email: email,
                    phone: phone,
                    shop_name: shopName,
                    display_id: userDisplayId,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (dbError) throw dbError;

            // Set up session
            currentSession = { user: user };
            currentUser = userData;

            showMessage('signupMessage', 'Account created successfully! Redirecting...', 'success');

            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 2000);
        } catch (error) {
            showMessage('signupMessage', 'Signup error: ' + error.message, 'error');
        }
    });
}

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        try {
            // Sign in with Supabase Auth
            const { data: { session }, error: authError } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (authError) throw authError;

            // Fetch user profile from database
            const { data: userData, error: dbError } = await supabaseClient
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (dbError) throw dbError;

            // Set up session
            currentSession = session;
            currentUser = userData;

            showMessage('loginMessage', 'Login successful! Redirecting...', 'success');

            setTimeout(() => {
                window.location.href = 'inventory.html';
            }, 1500);
        } catch (error) {
            showMessage('loginMessage', 'Login error: ' + error.message, 'error');
        }
    });
}

// ============================================
// PROFILE FUNCTIONALITY
// ============================================

async function initializeProfilePage() {
    if (!currentSession || !currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display user info
    document.getElementById('profileShopName').textContent = currentUser.shop_name;
    document.getElementById('profileUserId').textContent = currentUser.display_id;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;

    const createdDate = new Date(currentUser.created_at);
    document.getElementById('profileMemberSince').textContent = createdDate.getFullYear();

    // Display stats
    await updateProfileStats();

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

async function updateProfileStats() {
    if (!currentUser) return;

    try {
        // Fetch products from database
        const { data: products, error } = await supabaseClient
            .from('products')
            .select('*')
            .eq('user_id', currentUser.id);

        if (error) throw error;

        const totalProducts = products.length;
        const totalItems = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
        const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalValue').textContent = '$' + totalValue.toFixed(2);
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

async function handlePasswordChange(e) {
    e.preventDefault();

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        showMessage('profileMessage', 'New passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showMessage('profileMessage', 'Password must be at least 6 characters', 'error');
        return;
    }

    try {
        // Update password using Supabase Auth
        const { error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;

        showMessage('profileMessage', 'Password changed successfully', 'success');
        document.getElementById('changePasswordForm').reset();
    } catch (error) {
        showMessage('profileMessage', 'Password change error: ' + error.message, 'error');
    }
}

async function handleDeleteAccount() {
    const modal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = 'Are you sure you want to delete your account? This action cannot be undone.';
    modal.classList.add('show');

    document.getElementById('confirmYes').onclick = async function() {
        try {
            // Delete products first
            await supabaseClient
                .from('products')
                .delete()
                .eq('user_id', currentUser.id);

            // Delete user profile
            await supabaseClient
                .from('users')
                .delete()
                .eq('id', currentUser.id);

            // Delete auth user
            await supabaseClient.auth.admin.deleteUser(currentUser.id);

            // Sign out
            await supabaseClient.auth.signOut();

            currentSession = null;
            currentUser = null;

            showMessage('profileMessage', 'Account deleted. Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            showMessage('profileMessage', 'Delete error: ' + error.message, 'error');
        }
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

let allProducts = [];

async function initializeInventoryPage() {
    if (!currentSession || !currentUser) {
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
    await displayProducts();
    updateCategoryOptions();
}

async function handleAddProduct(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    const productCategory = document.getElementById('productCategory').value.trim();

    if (!productName || !productPrice) {
        showMessage('inventoryMessage', 'Please fill in required fields', 'error');
        return;
    }

    try {
        // Insert product into database
        const { data, error } = await supabaseClient
            .from('products')
            .insert([{
                user_id: currentUser.id,
                name: productName,
                description: productDescription,
                price: productPrice,
                quantity: productQuantity,
                category: productCategory,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;

        showMessage('inventoryMessage', 'Product added successfully!', 'success');
        e.target.reset();
        await displayProducts();
        updateCategoryOptions();
        await updateProfileStats();
    } catch (error) {
        showMessage('inventoryMessage', 'Add product error: ' + error.message, 'error');
    }
}

async function displayProducts() {
    if (!currentUser) return;

    try {
        // Fetch products from database
        const { data: products, error } = await supabaseClient
            .from('products')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        allProducts = products;

        const productsBody = document.getElementById('productsBody');
        const noProducts = document.getElementById('noProducts');

        if (!products || products.length === 0) {
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
                        <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showMessage('inventoryMessage', 'Load products error: ' + error.message, 'error');
    }
}

async function editProduct(productId) {
    const product = allProducts.find(p => p.id === productId);

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

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const { error } = await supabaseClient
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) throw error;

        showMessage('inventoryMessage', 'Product deleted successfully!', 'success');
        await displayProducts();
        updateCategoryOptions();
        await updateProfileStats();
    } catch (error) {
        showMessage('inventoryMessage', 'Delete product error: ' + error.message, 'error');
    }
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
        editForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const productId = document.getElementById('editProductId').value;
            const productName = document.getElementById('editProductName').value.trim();
            const productDescription = document.getElementById('editProductDescription').value.trim();
            const productPrice = parseFloat(document.getElementById('editProductPrice').value);
            const productQuantity = parseInt(document.getElementById('editProductQuantity').value);
            const productCategory = document.getElementById('editProductCategory').value.trim();

            try {
                const { error } = await supabaseClient
                    .from('products')
                    .update({
                        name: productName,
                        description: productDescription,
                        price: productPrice,
                        quantity: productQuantity,
                        category: productCategory
                    })
                    .eq('id', productId);

                if (error) throw error;

                showMessage('inventoryMessage', 'Product updated successfully!', 'success');
                editModal.classList.remove('show');
                await displayProducts();
                updateCategoryOptions();
                await updateProfileStats();
            } catch (error) {
                showMessage('inventoryMessage', 'Update product error: ' + error.message, 'error');
            }
        });
    }
}

async function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    displayFilteredProducts(filtered);
}

async function handleCategoryFilter(e) {
    const selectedCategory = e.target.value;
    
    const filtered = selectedCategory ? 
        allProducts.filter(p => p.category === selectedCategory) : 
        allProducts;

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
                    <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateCategoryOptions() {
    const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
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
