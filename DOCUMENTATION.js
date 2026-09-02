/**
 * ============================================
 * STOCK MANAGEMENT SYSTEM - COMPLETE GUIDE
 * ============================================
 * 
 * This file contains ONLY COMMENTS and NO executable code.
 * It serves as a comprehensive reference guide for the entire project.
 */

/**
 * ============================================
 * TABLE OF CONTENTS
 * ============================================
 * 
 * 1. PROJECT OVERVIEW
 * 2. FOLDER STRUCTURE
 * 3. FILE DESCRIPTIONS
 * 4. HOW TO RUN
 * 5. FEATURES EXPLAINED
 * 6. USER FLOWS
 * 7. DATA STORAGE
 * 8. VALIDATION
 * 9. THEME SYSTEM
 * 10. TROUBLESHOOTING
 */

/**
 * ============================================
 * 1. PROJECT OVERVIEW
 * ============================================
 * 
 * PROJECT NAME: Stock Management System
 * 
 * PURPOSE:
 * This is a complete web-based inventory management application
 * designed to help shop owners track, create, edit, and delete products.
 * 
 * TARGET AUDIENCE:
 * - Small shop owners
 * - E-commerce store managers
 * - Business operators
 * - Anyone needing simple inventory tracking
 * 
 * KEY FEATURES:
 * ✓ User authentication (signup & login)
 * ✓ Product management (add, edit, delete)
 * ✓ Real-time search and filtering
 * ✓ User profiles with auto-generated IDs
 * ✓ Light & Dark theme toggle
 * ✓ Responsive design (mobile, tablet, desktop)
 * ✓ Data persistence using localStorage
 * ✓ Inventory statistics and tracking
 * 
 * TECHNOLOGY STACK:
 * - HTML5 (Structure)
 * - CSS3 (Styling with dark/light themes)
 * - JavaScript ES6+ (Functionality)
 * - localStorage (Data persistence)
 */

/**
 * ============================================
 * 2. FOLDER STRUCTURE
 * ============================================
 * 
 * All files MUST be in the same directory/folder:
 * 
 * project-folder/
 * ├── index.html           ← Home page
 * ├── signup.html          ← Registration page
 * ├── login.html           ← Login page
 * ├── inventory.html       ← Product management
 * ├── profile.html         ← User profile
 * ├── style.css            ← All styling
 * ├── script.js            ← All functionality
 * ├── README.md            ← Markdown documentation
 * └── DOCUMENTATION.js     ← This file (comments only)
 * 
 * DO NOT:
 * ✗ Move files to different folders
 * ✗ Rename files
 * ✗ Change file extensions
 * ✗ Separate files into subdirectories
 */

/**
 * ============================================
 * 3. FILE DESCRIPTIONS
 * ============================================
 */

/**
 * INDEX.HTML - HOME PAGE
 * =======================
 * 
 * PURPOSE: Landing page showing features and benefits
 * 
 * SECTIONS:
 * 1. Navigation Bar
 *    - Logo with link to home
 *    - Theme toggle button (moon/sun icon)
 *    - Login and Signup buttons
 * 
 * 2. Hero Section
 *    - Welcome message
 *    - Tagline: "Manage your shop inventory efficiently"
 *    - Call-to-action buttons (Login, Sign Up)
 * 
 * 3. Features Section
 *    - Feature 1: Real-time Inventory Tracking
 *    - Feature 2: Easy Product Management
 *    - Feature 3: Secure User Profile
 *    - Feature 4: Protected Login
 * 
 * 4. Footer
 *    - Copyright information
 * 
 * USER INTERACTION:
 * - New users click "Sign Up" → redirected to signup.html
 * - Existing users click "Login" → redirected to login.html
 * - Click theme icon to toggle light/dark mode
 * 
 * USED FOR: First impression, feature overview, navigation
 */

/**
 * SIGNUP.HTML - REGISTRATION PAGE
 * ==================================
 * 
 * PURPOSE: Create new user accounts
 * 
 * FORM FIELDS:
 * 1. Email (required)
 *    - Type: email
 *    - Validation: Must be valid email format
 *    - Must not already exist in system
 * 
 * 2. Phone Number (required)
 *    - Type: tel
 *    - Validation: Must not be empty
 * 
 * 3. Shop Name (required)
 *    - Type: text
 *    - Validation: Must not be empty
 * 
 * 4. Password (required)
 *    - Type: password
 *    - Validation: Minimum 6 characters
 * 
 * 5. Confirm Password (required)
 *    - Type: password
 *    - Validation: Must match password field
 * 
 * PROCESS FLOW:
 * 1. User fills all fields
 * 2. JavaScript validates form
 * 3. If valid:
 *    - Create new user object
 *    - Auto-generate unique User ID
 *    - Save to localStorage
 *    - Automatically log in user
 *    - Redirect to profile.html
 * 4. If invalid:
 *    - Display error message
 *    - Keep user on form
 * 
 * USER ID GENERATION:
 * - Format: ID-XXXXXX (12 characters)
 * - Auto-generated from timestamp + random string
 * - Unique for each user
 * - Displayed in profile page
 * - Cannot be changed
 * 
 * NAVIGATION:
 * - Already have account? Link to login.html
 * - Logo links to index.html
 * - Theme toggle available
 */

/**
 * LOGIN.HTML - LOGIN PAGE
 * ========================
 * 
 * PURPOSE: Authenticate existing users
 * 
 * FORM FIELDS:
 * 1. Email (required)
 *    - Type: email
 *    - Validation: Must match stored email exactly
 * 
 * 2. Password (required)
 *    - Type: password
 *    - Validation: Must match stored password exactly
 * 
 * PROCESS FLOW:
 * 1. User enters credentials
 * 2. JavaScript searches localStorage for matching user
 * 3. If found and password matches:
 *    - Set current user session
 *    - Save to localStorage
 *    - Redirect to inventory.html
 * 4. If not found or password doesn't match:
 *    - Display error message
 *    - Keep user on form
 * 
 * SECURITY NOTES:
 * - Credentials are case-sensitive
 * - Email and password must match exactly
 * - No password reset option in demo version
 * 
 * NAVIGATION:
 * - Don't have account? Link to signup.html
 * - Logo links to index.html
 * - Theme toggle available
 * 
 * AUTOMATIC REDIRECTS:
 * - If already logged in → goes to inventory.html
 * - If not logged in → can access this page
 */

/**
 * INVENTORY.HTML - PRODUCT MANAGEMENT
 * =====================================
 * 
 * PURPOSE: Main dashboard for managing shop inventory
 * 
 * REQUIRES: User must be logged in (redirects to login if not)
 * 
 * PAGE SECTIONS:
 * 
 * 1. NAVIGATION BAR
 *    - Logo (links to home)
 *    - Theme toggle
 *    - Profile link
 *    - Logout button
 * 
 * 2. PAGE HEADER
 *    - Title: "Inventory Management"
 *    - Subtitle: "Manage your products and stock levels"
 * 
 * 3. ADD PRODUCT FORM (Section 1)
 *    - Product Name (required)
 *    - Description (optional)
 *    - Price (required, decimal)
 *    - Quantity (required, whole number)
 *    - Category (optional)
 *    - Submit button: "Add Product"
 *    
 *    VALIDATION:
 *    - Product Name: must not be empty
 *    - Price: must be number > 0
 *    - Quantity: must be number >= 0
 *    - All required fields must be filled
 *    
 *    ON SUBMIT:
 *    - Auto-generate Product ID (PROD-timestamp)
 *    - Save to current user's product array
 *    - Clear form
 *    - Update table immediately
 *    - Show success message
 * 
 * 4. SEARCH & FILTER SECTION (Section 2)
 *    
 *    Search Box:
 *    - Real-time search by product name/description
 *    - Results update as you type
 *    - Case-insensitive search
 *    - Shows matching products only
 *    
 *    Category Filter Dropdown:
 *    - Shows "All Categories" by default
 *    - Auto-populated with categories from products
 *    - Select category to filter
 *    - Updates instantly
 * 
 * 5. PRODUCTS TABLE (Section 3)
 *    - COLUMN 1: Product ID
 *      * Auto-generated unique identifier
 *      * Format: PROD-1705314600000
 *      * Cannot be edited
 *    
 *    - COLUMN 2: Name
 *      * Product name
 *      * Searchable
 *      * Max length reasonable
 *    
 *    - COLUMN 3: Category
 *      * Product category
 *      * Optional field
 *      * Shows "-" if empty
 *    
 *    - COLUMN 4: Price
 *      * Formatted as $XX.XX
 *      * Decimal values allowed
 *    
 *    - COLUMN 5: Quantity
 *      * Current stock quantity
 *      * Whole numbers only
 *    
 *    - COLUMN 6: Actions
 *      * Edit button (blue) → Opens edit modal
 *      * Delete button (red) → Deletes with confirmation
 * 
 * 6. EDIT MODAL
 *    - Appears when Edit button clicked
 *    - Shows current product details
 *    - Can modify:
 *      * Product Name
 *      * Description
 *      * Price
 *      * Quantity
 *      * Category
 *    - Cannot modify: Product ID
 *    - Save Changes button
 *    - Close button (X)
 *    - Automatically closes after save
 * 
 * 7. EMPTY STATE
 *    - When no products exist:
 *    - Display: "No products added yet. Create your first product above!"
 *    - Table hidden
 *    - Message shown instead
 * 
 * FEATURES:
 * ✓ Real-time search
 * ✓ Category filtering
 * ✓ Add products
 * ✓ Edit products with modal
 * ✓ Delete products with confirmation
 * ✓ Product ID auto-generation
 * ✓ Form validation
 * ✓ Success/error messages
 * ✓ Table sorting (implicit by creation order)
 * 
 * DATA FLOW:
 * 1. Load current user from localStorage
 * 2. Display all products in table
 * 3. User can add/edit/delete products
 * 4. Changes saved to localStorage immediately
 * 5. Page updates in real-time
 * 6. Stats on profile page update automatically
 */

/**
 * PROFILE.HTML - USER PROFILE & SETTINGS
 * ========================================
 * 
 * PURPOSE: Display user information and manage account settings
 * 
 * REQUIRES: User must be logged in (redirects to login if not)
 * 
 * PAGE SECTIONS:
 * 
 * 1. NAVIGATION BAR
 *    - Logo (links to home)
 *    - Theme toggle
 *    - Inventory link
 *    - Logout button
 * 
 * 2. PAGE HEADER
 *    - Title: "User Profile"
 *    - Subtitle: "Manage your account information"
 * 
 * 3. PROFILE CARD (Section 1)
 *    
 *    Profile Header:
 *    - Avatar: 👤 emoji placeholder
 *    - Shop Name: Large text
 *    - Background: Gradient color
 *    
 *    User Information:
 *    - User ID
 *      * Auto-generated unique identifier
 *      * Format: ID-XXXXXX
 *      * CANNOT be changed
 *      * Copy button to copy to clipboard
 *      * Use case: Share with staff/suppliers
 *    
 *    - Email
 *      * Login email address
 *      * Registered during signup
 *      * Cannot be edited in demo
 *    
 *    - Phone Number
 *      * Contact number
 *      * Registered during signup
 *      * Cannot be edited in demo
 *    
 *    - Member Since
 *      * Account creation year
 *      * Extracted from timestamp
 *    
 *    Statistics Grid (3 cards):
 *    - Total Products
 *      * Count of all items in inventory
 *      * Updates when products added/deleted
 *    
 *    - Total Stock Value
 *      * Sum of (price × quantity) for all products
 *      * Formatted as $XXX.XX
 *      * Useful for inventory valuation
 *    
 *    - Total Items
 *      * Sum of all product quantities
 *      * Total items across all products
 * 
 * 4. ACCOUNT SETTINGS CARD (Section 2)
 *    
 *    Change Password:
 *    - Field 1: Current Password
 *      * Type: password
 *      * Validation: Must match stored password
 *    
 *    - Field 2: New Password
 *      * Type: password
 *      * Validation: Minimum 6 characters
 *    
 *    - Field 3: Confirm Password
 *      * Type: password
 *      * Validation: Must match new password
 *    
 *    - Submit button: "Update Password"
 *    
 *    PROCESS:
 *    1. User fills all password fields
 *    2. Current password validated
 *    3. New passwords checked if they match
 *    4. New password checked if >= 6 chars
 *    5. If valid:
 *       - Update password in localStorage
 *       - Update current session
 *       - Show success message
 *       - Clear form
 *    6. If invalid:
 *       - Show specific error message
 *       - Keep user on page
 *    
 *    SECURITY:
 *    - Current password must be verified
 *    - Password minimum length enforced
 *    - Passwords must match for confirmation
 * 
 * 5. DANGER ZONE CARD (Section 3)
 *    
 *    Delete Account:
 *    - Red button: "Delete Account"
 *    - Warning text about permanent deletion
 *    
 *    PROCESS:
 *    1. Click delete button
 *    2. Confirmation modal appears
 *    3. If user confirms:
 *       - Remove user from users array
 *       - Clear currentUser
 *       - Redirect to home page
 *    4. If user cancels:
 *       - Modal closes
 *       - Account remains intact
 *    
 *    WARNING:
 *    - Cannot be undone
 *    - All user data deleted
 *    - All products deleted
 *    - Account cannot be recovered
 * 
 * 6. STATISTICS AUTO-UPDATE
 *    - Stats calculated every time page loads
 *    - Stats update immediately after changes
 *    - No manual refresh needed
 * 
 * FEATURES:
 * ✓ Display user information
 * ✓ Show inventory statistics
 * ✓ Change password
 * ✓ Delete account
 * ✓ Copy User ID
 * ✓ Auto-calculated stats
 * ✓ Form validation
 * ✓ Success/error messages
 * ✓ Confirmation dialogs
 */

/**
 * STYLE.CSS - STYLING FOR ALL PAGES
 * ===================================
 * 
 * PURPOSE: Central stylesheet for entire application
 * 
 * KEY CONCEPTS:
 * 
 * 1. CSS CUSTOM PROPERTIES (Variables)
 *    - Used for light/dark theme system
 *    - :root contains light theme colors
 *    - body.dark-mode contains dark theme colors
 *    - Colors update instantly with theme toggle
 * 
 * 2. LIGHT THEME (Default)
 *    --primary-color: #2563eb (Blue)
 *    --secondary-color: #10b981 (Green)
 *    --danger-color: #ef4444 (Red)
 *    --warning-color: #f59e0b (Orange)
 *    --bg-color: #ffffff (White)
 *    --text-color: #1f2937 (Dark gray)
 *    --border-color: #e5e7eb (Light gray)
 *    --hover-bg: #f3f4f6 (Very light gray)
 *    --card-bg: #ffffff (White)
 * 
 * 3. DARK THEME
 *    (Same primary colors, but)
 *    --bg-color: #1f2937 (Dark gray)
 *    --text-color: #f9fafb (Light gray)
 *    --border-color: #374151 (Medium gray)
 *    --hover-bg: #374151 (Medium gray)
 *    --card-bg: #2d3748 (Dark gray)
 *    All text becomes light colored
 *    All backgrounds become dark
 * 
 * 4. THEME SWITCHING
 *    - Theme toggle button in navbar
 *    - Click to add/remove "dark-mode" class
 *    - CSS variables automatically update
 *    - Theme preference saved to localStorage
 *    - Applied on page load from localStorage
 *    - Smooth transitions between themes
 * 
 * 5. RESPONSIVE BREAKPOINTS
 *    - Desktop: 1024px and above (full features)
 *    - Tablet: 769px to 1023px (optimized)
 *    - Mobile: 480px to 768px (stacked layout)
 *    - Small Mobile: below 480px (single column)
 *    - Uses @media queries for adjustments
 * 
 * COMPONENTS STYLED:
 * 
 * Navigation Bar:
 * - Sticky positioning (stays at top)
 * - Displays logo, theme toggle, nav links
 * - Responsive: links may hide/stack on mobile
 * 
 * Buttons:
 * - .btn (primary buttons)
 * - .btn-primary (blue, main action)
 * - .btn-secondary (green, alternative)
 * - .btn-danger (red, destructive)
 * - .btn-small (smaller size)
 * - .btn-full (100% width)
 * - Hover effects and animations
 * 
 * Hero Section:
 * - Large heading
 * - Gradient background
 * - Multiple calls-to-action
 * - Responsive text sizing
 * 
 * Forms:
 * - Input fields with labels
 * - Focus states with border color change
 * - Validation feedback
 * - Proper spacing between fields
 * 
 * Tables:
 * - Responsive: scrollable on mobile
 * - Alternating row hover effects
 * - Clear column headers
 * - Action buttons in last column
 * 
 * Cards:
 * - Shadow effects
 * - Padding and border radius
 * - Hover animations
 * - Clean separation
 * 
 * Modals:
 * - Full screen overlay
 * - Center positioned content
 * - Slide-in animation
 * - Close button
 * 
 * Messages:
 * - Success (green background)
 * - Error (red background)
 * - Warning (orange background)
 * - Left border for type indicator
 * - Auto-hide after delay
 * 
 * ANIMATIONS:
 * - @keyframes fadeIn (0.3s)
 * - @keyframes slideIn (0.3s)
 * - Smooth color transitions (0.3s)
 * - Button hover transform effects
 * 
 * SPACING SYSTEM:
 * - 0.5rem = 8px
 * - 1rem = 16px
 * - 2rem = 32px
 * - Consistent gaps and padding
 * 
 * TYPOGRAPHY:
 * - Main font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
 * - Heading sizes: h1 to h3
 * - Link styles
 * - Line height: 1.6
 * 
 * UTILITY CLASSES:
 * - .container (max-width wrapper)
 * - .form-group (form field grouping)
 * - .table-responsive (scrollable tables)
 * - .no-products (empty state message)
 * 
 * DARK MODE SUPPORT:
 * - All text colors adjust
 * - All background colors adjust
 * - Shadows maintain visibility
 * - Borders remain visible
 * - Links remain readable
 * - All interactive elements work same
 */

/**
 * SCRIPT.JS - ALL FUNCTIONALITY
 * ==============================
 * 
 * PURPOSE: Handle all application logic and interactivity
 * 
 * IMPORTANT: This is ONE file handling ALL functionality
 * 
 * INITIALIZATION:
 * - Runs on page load (DOMContentLoaded event)
 * - Initializes theme from localStorage
 * - Checks user authentication status
 * - Sets up page-specific content
 * - Attaches event listeners
 * 
 * ============================================
 * SECTION 1: THEME MANAGEMENT
 * ============================================
 * 
 * Functions:
 * - initializeTheme()
 *   Loads saved theme preference from localStorage
 *   Applies theme on page load
 * 
 * - applyTheme(theme)
 *   Accepts "light" or "dark"
 *   Adds/removes dark-mode class to body
 *   Updates theme icon
 *   Saves to localStorage
 * 
 * - updateThemeIcon(icon)
 *   Updates moon/sun emoji in navbar
 *   Called when theme changes
 * 
 * Event Listener:
 * - Click theme toggle button
 * - Gets current theme from localStorage
 * - Switches to opposite theme
 * - Applies new theme
 * 
 * ============================================
 * SECTION 2: AUTHENTICATION
 * ============================================
 * 
 * Functions:
 * - generateUserId()
 *   Creates unique 12-character ID
 *   Format: ID-XXXXXX
 *   Uses timestamp + random string
 *   Called during signup
 * 
 * - checkAuthStatus()
 *   Checks if user is logged in
 *   Determines current page
 *   Redirects if necessary
 *   Rules:
 *   * Not logged in + on protected page → login.html
 *   * Logged in + on auth page → inventory.html
 * 
 * - setupLogoutButtons()
 *   Finds all logout buttons
 *   Attaches click handlers
 *   Called when user is logged in
 * 
 * - logout()
 *   Removes currentUser from localStorage
 *   Clears user session
 *   Redirects to index.html
 *   Removes user ID, email, preferences
 * 
 * ============================================
 * SECTION 3: SIGNUP FUNCTIONALITY
 * ============================================
 * 
 * Event: Form submission on signup.html
 * 
 * Process:
 * 1. Get form field values
 * 2. Trim whitespace
 * 3. Validate all fields:
 *    - All fields required
 *    - Passwords must match
 *    - Password >= 6 characters
 *    - Email not already registered
 * 4. Create user object:
 *    - id: auto-generated User ID
 *    - email: from form
 *    - phone: from form
 *    - shopName: from form
 *    - password: from form (plain text in demo)
 *    - createdAt: current timestamp
 *    - products: empty array
 * 5. Save to localStorage:
 *    - Add to users array
 *    - Set as currentUser (auto-login)
 * 6. Show success message
 * 7. Redirect to profile.html (2 second delay)
 * 
 * Validation Messages:
 * - Empty fields → "Please fill in all fields"
 * - Passwords don't match → "Passwords do not match"
 * - Password too short → "Password must be at least 6 characters"
 * - Email exists → "Email already registered"
 * 
 * ============================================
 * SECTION 4: LOGIN FUNCTIONALITY
 * ============================================
 * 
 * Event: Form submission on login.html
 * 
 * Process:
 * 1. Get email and password from form
 * 2. Retrieve users array from localStorage
 * 3. Find user with matching email AND password
 * 4. If found:
 *    - Set as currentUser in localStorage
 *    - Show success message
 *    - Redirect to inventory.html (1.5 second delay)
 * 5. If not found:
 *    - Show error message
 *    - Keep user on login page
 *    - Clear nothing (they can retry)
 * 
 * Validation:
 * - Email must match exactly (case-sensitive)
 * - Password must match exactly (case-sensitive)
 * - Must be exact match for both
 * 
 * ============================================
 * SECTION 5: PROFILE FUNCTIONALITY
 * ============================================
 * 
 * Function: initializeProfilePage()
 * Runs when profile.html loads
 * 
 * Tasks:
 * 1. Check if user logged in (redirect if not)
 * 2. Get current user from localStorage
 * 3. Display user information:
 *    - Shop name in header
 *    - User ID in profile info
 *    - Email address
 *    - Phone number
 *    - Member since year
 * 4. Calculate and display stats:
 *    - Total products count
 *    - Total inventory value
 *    - Total items in stock
 * 5. Attach event listeners:
 *    - Password change form
 *    - Delete account button
 *    - Confirmation modal
 * 
 * Function: updateProfileStats()
 * Calculates inventory statistics
 * 
 * Calculations:
 * - Total Products: Count items in products array
 * - Total Items: Sum of all quantities
 * - Total Value: Sum of (price × quantity)
 * 
 * Function: handlePasswordChange(e)
 * Validates and updates password
 * 
 * Validation:
 * 1. Current password matches stored password
 * 2. New passwords match each other
 * 3. New password >= 6 characters
 * 
 * Process:
 * 1. Validate inputs
 * 2. Find user in users array
 * 3. Update password
 * 4. Save to localStorage
 * 5. Update current user session
 * 6. Show success message
 * 7. Clear form
 * 
 * Function: handleDeleteAccount()
 * Initiates account deletion
 * 
 * Process:
 * 1. Show confirmation modal
 * 2. If confirmed:
 *    - Remove user from users array
 *    - Clear currentUser
 *    - Show success message
 *    - Redirect to index.html
 * 3. If cancelled:
 *    - Close modal
 *    - Keep account intact
 * 
 * ============================================
 * SECTION 6: INVENTORY FUNCTIONALITY
 * ============================================
 * 
 * Function: initializeInventoryPage()
 * Runs when inventory.html loads
 * 
 * Tasks:
 * 1. Verify user logged in
 * 2. Attach form listeners:
 *    - Add product form
 *    - Search input
 *    - Category filter
 * 3. Set up edit modal
 * 4. Display existing products
 * 5. Update category options
 * 
 * Function: handleAddProduct(e)
 * Processes product creation
 * 
 * Validation:
 * - Product Name: required, not empty
 * - Price: required, must be number > 0
 * - Quantity: required, must be number >= 0
 * - Description: optional
 * - Category: optional
 * 
 * Process:
 * 1. Get form values
 * 2. Validate all fields
 * 3. Create product object:
 *    - id: auto-generated (PROD-timestamp)
 *    - name: from form
 *    - description: from form
 *    - price: from form (parsed as float)
 *    - quantity: from form (parsed as int)
 *    - category: from form
 *    - createdAt: current timestamp
 * 4. Find current user in users array
 * 5. Add product to user's products array
 * 6. Save to localStorage
 * 7. Update current user session
 * 8. Clear form
 * 9. Refresh table display
 * 10. Update category options
 * 11. Update profile stats
 * 12. Show success message
 * 
 * Function: displayProducts()
 * Shows all user products in table
 * 
 * Process:
 * 1. Get current user and products
 * 2. If no products:
 *    - Hide table
 *    - Show "No products" message
 * 3. If products exist:
 *    - Clear table body
 *    - Create table row for each product
 *    - Include edit and delete buttons
 *    - Format prices with $XX.XX
 * 
 * Function: editProduct(productId)
 * Opens edit modal with product data
 * 
 * Process:
 * 1. Find product by ID
 * 2. Populate modal form with values:
 *    - Product Name
 *    - Description
 *    - Price
 *    - Quantity
 *    - Category
 * 3. Store product ID in hidden field
 * 4. Display modal
 * 5. User can modify fields
 * 6. Submit saves changes
 * 
 * Function: deleteProduct(productId)
 * Removes product from inventory
 * 
 * Process:
 * 1. Show confirmation dialog
 * 2. If confirmed:
 *    - Remove product from products array
 *    - Update localStorage
 *    - Update current user
 *    - Refresh table
 *    - Update stats
 *    - Show success message
 * 3. If cancelled:
 *    - Do nothing
 * 
 * Function: setupEditModal()
 * Initializes edit modal behavior
 * 
 * Features:
 * - Form submission handler
 * - Update product in localStorage
 * - Refresh table
 * - Auto-close modal
 * - Close button (X)
 * - Click outside to close
 * 
 * Function: handleSearch(e)
 * Filters products by search term
 * 
 * Search by:
 * - Product name
 * - Product description
 * 
 * Behavior:
 * - Real-time as user types
 * - Case-insensitive
 * - Partial matching
 * - Displays filtered results
 * 
 * Function: handleCategoryFilter(e)
 * Filters products by selected category
 * 
 * Behavior:
 * - Dropdown change triggers filter
 * - "All Categories" shows all products
 * - Select category shows matching only
 * 
 * Function: displayFilteredProducts(products)
 * Shows filtered product list
 * 
 * Same as displayProducts() but with filtered array
 * 
 * Function: updateCategoryOptions()
 * Populates category dropdown
 * 
 * Process:
 * 1. Get all unique categories from products
 * 2. Create Set to remove duplicates
 * 3. Clear dropdown
 * 4. Add "All Categories" option
 * 5. Add each unique category
 * 
 * ============================================
 * SECTION 7: UTILITY FUNCTIONS
 * ============================================
 * 
 * Function: showMessage(elementId, message, type)
 * Displays temporary notification
 * 
 * Parameters:
 * - elementId: ID of message element
 * - message: Text to display
 * - type: "success", "error", or "warning"
 * 
 * Behavior:
 * - Shows message with appropriate styling
 * - Auto-hides after 4 seconds
 * - Smooth animations
 * 
 * Function: copyToClipboard(elementId)
 * Copies text to system clipboard
 * 
 * Process:
 * 1. Get text content from element
 * 2. Copy to clipboard using clipboard API
 * 3. Show success message
 * 
 * Function: initializePageContent()
 * Determines current page and initializes
 * 
 * Logic:
 * - If profile.html → initializeProfilePage()
 * - If inventory.html → initializeInventoryPage()
 * - Otherwise do nothing (home/auth pages)
 * 
 * ============================================
 * DATA STRUCTURES
 * ============================================
 * 
 * USER OBJECT:
 * {
 *   id: "ID-ABC123XYZ456",
 *   email: "user@example.com",
 *   phone: "+1234567890",
 *   shopName: "My Shop",
 *   password: "password123",
 *   createdAt: "2024-01-15T10:30:00.000Z",
 *   products: [ ... array of products ... ]
 * }
 * 
 * PRODUCT OBJECT:
 * {
 *   id: "PROD-1705314600000",
 *   name: "Product Name",
 *   description: "Product description",
 *   price: 29.99,
 *   quantity: 50,
 *   category: "Electronics",
 *   createdAt: "2024-01-15T10:30:00.000Z"
 * }
 * 
 * LOCALSTORAGE KEYS:
 * - "users" → Array of all users
 * - "currentUser" → Currently logged in user
 * - "theme" → "light" or "dark"
 */

/**
 * ============================================
 * 4. HOW TO RUN THE PROJECT
 * ============================================
 * 
 * SYSTEM REQUIREMENTS:
 * - Modern web browser (Chrome, Firefox, Safari, Edge)
 * - No server needed
 * - No installation required
 * - No database needed
 * 
 * SETUP STEPS:
 * 1. Create a folder for the project
 * 2. Download all 7 files
 * 3. Place ALL files in same folder (no subfolders)
 * 4. Verify filenames are exactly as specified:
 *    - index.html
 *    - signup.html
 *    - login.html
 *    - inventory.html
 *    - profile.html
 *    - style.css
 *    - script.js
 * 
 * RUNNING:
 * 1. Open file explorer/finder
 * 2. Navigate to project folder
 * 3. Double-click index.html
 * 4. Browser opens with home page
 * 
 * ALTERNATIVE:
 * 1. Right-click index.html
 * 2. Select "Open with" → Choose browser
 * 
 * IMPORTANT:
 * - Do NOT open from separate folders
 * - Do NOT rename files
 * - Do NOT change file extensions
 * - Do NOT split files into subdirectories
 * 
 * STARTING THE APP:
 * 1. index.html loads
 * 2. Theme loads from localStorage (or light by default)
 * 3. Navigation bar appears
 * 4. Can click Sign Up or Login
 * 5. Click theme icon to toggle dark/light
 */

/**
 * ============================================
 * 5. FEATURES EXPLAINED
 * ============================================
 */

/**
 * FEATURE 1: USER AUTHENTICATION
 * ================================
 * 
 * Signup:
 * - Create new account with email, phone, shop name
 * - Auto-generate unique User ID
 * - Auto-login after signup
 * - Redirect to profile page
 * 
 * Login:
 * - Use email and password
 * - Verify against stored credentials
 * - Create user session
 * - Redirect to inventory page
 * 
 * Logout:
 * - Remove user session
 * - Clear currentUser
 * - Return to home page
 * 
 * Benefits:
 * - Each user has separate data
 * - Multiple users can use same computer
 * - Data is private per user
 */

/**
 * FEATURE 2: PRODUCT MANAGEMENT
 * ==============================
 * 
 * Add Products:
 * - Fill form with product details
 * - Auto-generate product ID
 * - Save immediately
 * - Update table in real-time
 * 
 * Edit Products:
 * - Click edit button
 * - Modal opens with current data
 * - Modify any field
 * - Save changes
 * - Updates immediately
 * 
 * Delete Products:
 * - Click delete button
 * - Confirm deletion
 * - Product removed
 * - Table updates
 * 
 * View Products:
 * - Table displays all products
 * - Shows: ID, Name, Category, Price, Quantity
 * - Action buttons for edit/delete
 * 
 * Benefits:
 * - Easy inventory management
 * - Real-time updates
 * - Never lose product data
 */

/**
 * FEATURE 3: SEARCH & FILTER
 * ============================
 * 
 * Search:
 * - Type in search box
 * - Searches product name AND description
 * - Case-insensitive
 * - Real-time results
 * - Shows matching products instantly
 * 
 * Filter:
 * - Select category from dropdown
 * - Shows only products in that category
 * - "All Categories" shows everything
 * - Instant results
 * 
 * Combination:
 * - Can search AND filter together
 * - Narrows down results further
 * - Find products quickly
 * 
 * Benefits:
 * - Find products fast
 * - Organize by category
 * - Manage large inventories
 */

/**
 * FEATURE 4: PROFILE & STATISTICS
 * =================================
 * 
 * User Information:
 * - User ID (auto-generated, unique)
 * - Email address
 * - Phone number
 * - Shop name
 * - Member since (account age)
 * 
 * Statistics:
 * - Total Products: Count of products
 * - Total Stock Value: Price × Quantity sum
 * - Total Items: Quantity sum
 * 
 * Auto-Calculate:
 * - Stats update automatically
 * - No manual refresh needed
 * - Updates when products change
 * 
 * Password Management:
 * - Change password anytime
 * - Requires current password
 * - New password must be >= 6 chars
 * 
 * Account Management:
 * - Delete entire account
 * - Requires confirmation
 * - Cannot be undone
 * - All data deleted
 * 
 * Benefits:
 * - Monitor inventory value
 * - Track product count
 * - Secure account access
 */

/**
 * FEATURE 5: LIGHT & DARK THEME
 * ================================
 * 
 * Light Theme (Default):
 * - White background
 * - Dark text
 * - Blue accents
 * - Easy to read in bright light
 * 
 * Dark Theme:
 * - Dark background
 * - Light text
 * - Blue accents
 * - Easier on eyes at night
 * 
 * Toggle:
 * - Click moon/sun icon in navbar
 * - Instant theme switch
 * - All pages update
 * - Preference saved
 * 
 * Persistence:
 * - Theme setting saved to localStorage
 * - Same theme on next visit
 * - Separate for each browser
 * 
 * Benefits:
 * - Personalization
 * - Reduced eye strain
 * - Modern UX
 */

/**
 * FEATURE 6: RESPONSIVE DESIGN
 * =============================
 * 
 * Works on:
 * - Desktop computers (1024px+)
 * - Tablets (768px - 1024px)
 * - Mobile phones (480px - 768px)
 * - Small phones (< 480px)
 * 
 * Adaptations:
 * - Desktop: Full features, multi-column
 * - Tablet: Optimized spacing
 * - Mobile: Single column, stacked
 * - Small: Large touch targets, minimal
 * 
 * Elements Responsive:
 * - Navigation (dropdowns/hamburger)
 * - Forms (single column)
 * - Tables (scrollable)
 * - Modals (fit screen)
 * - Images (scale down)
 * - Text (readable sizes)
 * 
 * Benefits:
 * - Works anywhere
 * - No app installation
 * - Same features on all devices
 * - Touch-friendly on mobile
 */

/**
 * FEATURE 7: DATA PERSISTENCE
 * =============================
 * 
 * Uses localStorage:
 * - Built into modern browsers
 * - No server needed
 * - Data persists between sessions
 * - Survives browser restart
 * - ~10MB storage limit
 * 
 * What's Saved:
 * - User accounts
 * - User passwords
 * - Products and inventory
 * - Theme preference
 * 
 * When Data Saved:
 * - On signup
 * - On login
 * - When adding products
 * - When editing products
 * - When deleting products
 * - When changing password
 * 
 * Data Deleted:
 * - On logout (session only)
 * - On account deletion (all data)
 * 
 * Benefits:
 * - No lost data
 * - Works offline
 * - Instant access
 * - No cloud needed
 */

/**
 * ============================================
 * 6. USER FLOWS
 * ============================================
 */

/**
 * FLOW 1: NEW USER SIGNUP & FIRST USE
 * ====================================
 * 
 * Step 1: Visit Home
 * - User opens index.html
 * - Sees home page with features
 * 
 * Step 2: Click Sign Up
 * - Navigates to signup.html
 * - Sees signup form
 * 
 * Step 3: Fill Form
 * - Enters email
 * - Enters phone number
 * - Enters shop name
 * - Creates password (6+ chars)
 * - Confirms password
 * 
 * Step 4: Submit
 * - Clicks "Create Account"
 * - Form validates
 * - Account created
 * - User ID auto-generated
 * - User automatically logged in
 * 
 * Step 5: Redirected to Profile
 * - Sees profile page
 * - Views auto-generated User ID
 * - Sees empty statistics
 * - Cannot edit profile (read-only)
 * 
 * Step 6: Add First Product
 * - Clicks "Inventory" link
 * - Sees empty inventory
 * - Fills product form
 * - Submits
 * - Product appears in table
 * - Statistics update
 * 
 * Step 7: Manage Inventory
 * - Add more products
 * - Search/filter products
 * - Edit products
 * - Delete products
 * - Watch stats update
 * 
 * Step 8: Try Dark Mode
 * - Clicks moon icon
 * - Page switches to dark
 * - Click sun to go back to light
 */

/**
 * FLOW 2: EXISTING USER LOGIN
 * =============================
 * 
 * Step 1: Visit Home
 * - Opens index.html
 * - Sees home page
 * 
 * Step 2: Click Login
 * - Goes to login.html
 * - Sees login form
 * 
 * Step 3: Enter Credentials
 * - Types email
 * - Types password
 * 
 * Step 4: Submit
 * - Clicks "Login"
 * - System verifies credentials
 * - User logged in
 * 
 * Step 5: Redirected to Inventory
 * - Goes to inventory.html
 * - Sees all their products
 * - Can manage inventory
 * 
 * Step 6: Navigate
 * - Can click Profile link
 * - Can manage inventory
 * - Can toggle theme
 * - Can logout
 */

/**
 * FLOW 3: CHANGE PASSWORD
 * =========================
 * 
 * Step 1: Go to Profile
 * - Login first
 * - Click "Profile" link
 * 
 * Step 2: Scroll to Settings
 * - Sees "Change Password" section
 * 
 * Step 3: Fill Form
 * - Enters current password
 * - Enters new password (6+ chars)
 * - Confirms new password
 * 
 * Step 4: Submit
 * - Clicks "Update Password"
 * - System validates
 * - Password updated
 * - Message shows success
 * 
 * Step 5: Use New Password
 * - Old password no longer works
 * - Must use new password to login
 */

/**
 * FLOW 4: DELETE ACCOUNT
 * =======================
 * 
 * Step 1: Go to Profile
 * - Login first
 * - Click "Profile" link
 * 
 * Step 2: Scroll to Danger Zone
 * - Sees "Delete Account" button
 * 
 * Step 3: Click Delete
 * - Confirmation modal appears
 * - "Are you sure?" message
 * 
 * Step 4: Confirm
 * - Clicks "Yes, Delete"
 * - Account permanently deleted
 * - All products deleted
 * - Automatically logged out
 * - Redirected to home
 * 
 * Step 5: Verify Deletion
 * - Try to login with old email
 * - Get error (account doesn't exist)
 * 
 * WARNING: Cannot undo!
 */

/**
 * ============================================
 * 7. DATA STORAGE
 * ============================================
 */

/**
 * LOCALSTORAGE BASICS
 * ====================
 * 
 * What is localStorage:
 * - Built-in browser storage
 * - Stores data as strings
 * - Persists between sessions
 * - ~10MB per domain
 * - Accessed via JavaScript
 * 
 * How Used Here:
 * - Key-value pairs
 * - JSON format for complex data
 * - Parse when reading
 * - Stringify when saving
 * 
 * Clearing Data:
 * - Browser settings: Clear browsing data
 * - Developer console: localStorage.clear()
 * - Deleting account clears user data only
 */

/**
 * USERS ARRAY STRUCTURE
 * ======================
 * 
 * localStorage.getItem("users")
 * 
 * Returns JSON array of users:
 * [
 *   {
 *     id: "ID-ABC123...",
 *     email: "user1@example.com",
 *     phone: "+1234567890",
 *     shopName: "Shop 1",
 *     password: "password123",
 *     createdAt: "2024-01-15T...",
 *     products: [ ... ]
 *   },
 *   {
 *     id: "ID-XYZ789...",
 *     email: "user2@example.com",
 *     phone: "+0987654321",
 *     shopName: "Shop 2",
 *     password: "password456",
 *     createdAt: "2024-01-16T...",
 *     products: [ ... ]
 *   }
 * ]
 * 
 * Operations:
 * - Add user → Push to array
 * - Find user → Filter by email
 * - Delete user → Filter out from array
 * - Update user → Find and modify
 */

/**
 * CURRENT USER STRUCTURE
 * =======================
 * 
 * localStorage.getItem("currentUser")
 * 
 * Single user object (currently logged in):
 * {
 *   id: "ID-ABC123...",
 *   email: "user@example.com",
 *   phone: "+1234567890",
 *   shopName: "My Shop",
 *   password: "password123",
 *   createdAt: "2024-01-15T...",
 *   products: [
 *     {
 *       id: "PROD-1234...",
 *       name: "Product Name",
 *       description: "Description",
 *       price: 29.99,
 *       quantity: 50,
 *       category: "Category",
 *       createdAt: "2024-01-15T..."
 *     }
 *   ]
 * }
 * 
 * Usage:
 * - Contains only logged-in user
 * - Removed on logout
 * - Used to sync back to users array
 * - Updated when user data changes
 */

/**
 * THEME STORAGE
 * ==============
 * 
 * localStorage.getItem("theme")
 * 
 * Returns string:
 * - "light" (light theme)
 * - "dark" (dark theme)
 * 
 * Default: "light" (if not set)
 * 
 * Set on:
 * - Page load (applied immediately)
 * - Theme toggle (saved for next visit)
 * 
 * Behavior:
 * - Persists across browser sessions
 * - Separate per browser/device
 * - Survives browser restart
 */

/**
 * ============================================
 * 8. VALIDATION RULES
 * ============================================
 */

/**
 * SIGNUP VALIDATION
 * ==================
 * 
 * Email:
 * - Must be valid email format (required)
 * - Use: type="email" in HTML
 * - Cannot already exist
 * - Case-insensitive check
 * 
 * Phone:
 * - Must not be empty (required)
 * - Any format accepted
 * - Recommended: 10+ digits
 * - No format validation
 * 
 * Shop Name:
 * - Must not be empty (required)
 * - Any text accepted
 * - No length limit specified
 * 
 * Password:
 * - Must be at least 6 characters (required)
 * - Case-sensitive
 * - No complexity requirements
 * - Any characters allowed
 * 
 * Confirm Password:
 * - Must match password field exactly (required)
 * - Used for verification only
 * 
 * Error Messages:
 * - "Please fill in all fields"
 * - "Passwords do not match"
 * - "Password must be at least 6 characters"
 * - "Email already registered"
 */

/**
 * LOGIN VALIDATION
 * =================
 * 
 * Email:
 * - Must match stored email exactly
 * - Case-sensitive
 * - Must exist in system
 * 
 * Password:
 * - Must match stored password exactly
 * - Case-sensitive
 * - No reset option in demo
 * 
 * Combined:
 * - Both email AND password must match
 * - If either wrong → error
 * 
 * Error Message:
 * - "Invalid email or password"
 * - Generic (doesn't reveal which is wrong)
 * 
 * Attempts:
 * - No limit on login attempts
 * - No account lockout
 * - User can retry indefinitely
 */

/**
 * PRODUCT VALIDATION
 * ====================
 * 
 * Product Name:
 * - Required field
 * - Cannot be empty
 * - Trimmed of whitespace
 * - Any text accepted
 * 
 * Description:
 * - Optional field
 * - Can be empty
 * - Any text accepted
 * - No length limit
 * 
 * Price:
 * - Required field
 * - Must be numeric
 * - Must be positive (> 0)
 * - Decimal values allowed
 * - Format: 29.99 (2 decimal places)
 * 
 * Quantity:
 * - Required field
 * - Must be numeric
 * - Must be non-negative (>= 0)
 * - Whole numbers only
 * - Can be 0 (out of stock)
 * 
 * Category:
 * - Optional field
 * - Can be empty
 * - Any text accepted
 * - Auto-populated in filter
 * 
 * Error Messages:
 * - "Please fill in required fields"
 * - Validation shown before save
 * 
 * Auto-Validation:
 * - HTML5 input types
 * - type="number" for price/quantity
 * - type="text" for name/description
 * - Browsers enforce basic validation
 */

/**
 * PASSWORD CHANGE VALIDATION
 * ===========================
 * 
 * Current Password:
 * - Must match stored password exactly
 * - Case-sensitive
 * - Verification required
 * - Error: "Current password is incorrect"
 * 
 * New Password:
 * - Must be at least 6 characters
 * - No complexity requirements
 * - Cannot be same as current (no check)
 * - Any characters allowed
 * 
 * Confirm New Password:
 * - Must match new password exactly
 * - Used for verification
 * - Error: "New passwords do not match"
 * 
 * Process:
 * 1. Check current password
 * 2. Check new passwords match
 * 3. Check length >= 6
 * 4. If all pass → update
 * 5. Show success message
 */

/**
 * ============================================
 * 9. THEME SYSTEM
 * ============================================
 */

/**
 * CSS VARIABLES FOR THEMING
 * ==========================
 * 
 * Light Theme (in :root):
 * - --primary-color: #2563eb (Blue)
 * - --secondary-color: #10b981 (Green)
 * - --danger-color: #ef4444 (Red)
 * - --warning-color: #f59e0b (Orange)
 * - --bg-color: #ffffff (White)
 * - --text-color: #1f2937 (Dark gray)
 * - --border-color: #e5e7eb (Light gray)
 * - --hover-bg: #f3f4f6 (Very light gray)
 * - --card-bg: #ffffff (White)
 * - --shadow: 0 1px 3px rgba(0,0,0,0.1)
 * - --shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
 * 
 * Dark Theme (in body.dark-mode):
 * - --primary-color: (unchanged, #2563eb)
 * - --secondary-color: (unchanged, #10b981)
 * - --danger-color: (unchanged, #ef4444)
 * - --warning-color: (unchanged, #f59e0b)
 * - --bg-color: #1f2937 (Dark gray)
 * - --text-color: #f9fafb (Light gray)
 * - --border-color: #374151 (Medium gray)
 * - --hover-bg: #374151 (Medium gray)
 * - --card-bg: #2d3748 (Dark gray)
 * - --shadow: 0 1px 3px rgba(0,0,0,0.3)
 * - --shadow-lg: 0 10px 15px rgba(0,0,0,0.3)
 * 
 * Usage in CSS:
 * - Instead of hardcoded #ffffff
 * - Use var(--bg-color)
 * - Works with light or dark mode
 * - Changes instantly
 */

/**
 * HOW THEME SWITCHING WORKS
 * ===========================
 * 
 * Step 1: User clicks theme icon
 * 
 * Step 2: JavaScript detects click
 * - Event listener on .theme-toggle
 * 
 * Step 3: Get current theme
 * - Read from localStorage
 * - Default to "light"
 * 
 * Step 4: Toggle to opposite
 * - light → dark
 * - dark → light
 * 
 * Step 5: Apply new theme
 * - Call applyTheme(newTheme)
 * - Add/remove dark-mode class
 * 
 * Step 6: Update icon
 * - Moon emoji (🌙) for light mode
 * - Sun emoji (☀️) for dark mode
 * 
 * Step 7: Save preference
 * - Store in localStorage
 * - Persist across sessions
 * 
 * Step 8: CSS updates
 * - Variables change immediately
 * - All elements use new colors
 * - Smooth transition (0.3s)
 * 
 * Step 9: User sees change
 * - Page switches instantly
 * - All pages updated
 * - Theme persists on next visit
 */

/**
 * THEME PERSISTENCE
 * ===================
 * 
 * On Page Load:
 * 1. DOMContentLoaded event fires
 * 2. initializeTheme() called
 * 3. Read theme from localStorage
 * 4. If exists → apply it
 * 5. If doesn't exist → use "light"
 * 
 * On Page Switch:
 * 1. Navigate to new page
 * 2. initializeTheme() called
 * 3. Same theme applied
 * 4. No need to change manually
 * 
 * Browser Restart:
 * 1. Close browser
 * 2. Reopen browser
 * 3. Visit site again
 * 4. Same theme as before
 * 
 * Device Switch:
 * 1. On computer → light theme
 * 2. On phone → light theme
 * 3. Each device has separate storage
 * 4. Can have different preferences
 */

/**
 * ============================================
 * 10. TROUBLESHOOTING
 * ============================================
 */

/**
 * PROBLEM: Redirect Loop or Blank Page
 * ======================================
 * 
 * Cause:
 * - Files not in same folder
 * - Files renamed incorrectly
 * - Links broken
 * 
 * Solution:
 * 1. Check all files in same folder
 * 2. Verify exact filenames
 * 3. Try opening index.html again
 * 4. Clear browser cache (Ctrl+Shift+Del)
 * 5. Try incognito/private window
 */

/**
 * PROBLEM: Data Not Persisting After Refresh
 * ============================================
 * 
 * Cause:
 * - localStorage disabled
 * - Browser privacy settings
 * - Incognito/Private window
 * 
 * Solution:
 * 1. Check localStorage is enabled
 * 2. Open in normal window (not incognito)
 * 3. Check browser storage settings
 * 4. Try different browser
 */

/**
 * PROBLEM: Styles Not Loading
 * ============================
 * 
 * Cause:
 * - style.css not in folder
 * - Wrong filename (style.CSS)
 * - File moved to subfolder
 * 
 * Solution:
 * 1. Verify style.css exists
 * 2. Check exact filename (lowercase)
 * 3. Refresh page (Ctrl+Shift+R)
 * 4. Move file to correct location
 */

/**
 * PROBLEM: Theme Not Changing
 * =============================
 * 
 * Cause:
 * - Browser doesn't support CSS variables
 * - Theme toggle button not visible
 * - JavaScript not running
 * 
 * Solution:
 * 1. Use modern browser (Chrome, Firefox, Safari, Edge)
 * 2. Check theme icon visible in navbar
 * 3. Try clicking elsewhere first
 * 4. Refresh page
 * 5. Check browser console for errors
 */

/**
 * PROBLEM: Login Doesn't Work
 * =============================
 * 
 * Cause:
 * - Signup not completed
 * - Wrong credentials entered
 * - Case sensitivity
 * - localStorage cleared
 * 
 * Solution:
 * 1. Complete signup first
 * 2. Use exact email from signup
 * 3. Use exact password from signup
 * 4. Try signup again to test
 * 5. Check localStorage not cleared
 */

/**
 * PROBLEM: Products Not Showing
 * ==============================
 * 
 * Cause:
 * - No products added
 * - Not logged in
 * - Browser cache issue
 * 
 * Solution:
 * 1. Login first
 * 2. Add a product
 * 3. Refresh page
 * 4. Clear browser cache
 * 5. Check localStorage has data
 */

/**
 * PROBLEM: Search/Filter Not Working
 * ====================================
 * 
 * Cause:
 * - JavaScript not loaded
 * - No products to search
 * - Browser compatibility
 * 
 * Solution:
 * 1. Verify script.js loaded
 * 2. Add products first
 * 3. Try typing in search box
 * 4. Check browser console errors
 * 5. Try different browser
 */

/**
 * PROBLEM: Modal Not Opening
 * ============================
 * 
 * Cause:
 * - JavaScript error
 * - HTML structure wrong
 * - CSS display issue
 * 
 * Solution:
 * 1. Check browser console
 * 2. Verify edit button clicked
 * 3. Refresh page
 * 4. Check JavaScript loaded
 */

/**
 * GETTING HELP
 * =============
 * 
 * Check Browser Console:
 * - F12 or Ctrl+Shift+I
 * - Look at Console tab
 * - See any error messages
 * - Screenshot errors for help
 * 
 * Verify All Files:
 * - Are all 7 files present?
 * - Are filenames exactly correct?
 * - Are they in same folder?
 * 
 * Try Fresh Start:
 * 1. Clear browser cache
 * 2. Close browser completely
 * 3. Reopen browser
 * 4. Open index.html again
 * 
 * Try Different Browser:
 * - Chrome
 * - Firefox
 * - Safari
 * - Edge
 * 
 * Reinstall:
 * 1. Delete all files
 * 2. Download again
 * 3. Place in new folder
 * 4. Try again
 */

/**
 * ============================================
 * END OF DOCUMENTATION
 * ============================================
 * 
 * This file explains the entire project.
 * All features are documented above.
 * Refer back to this file for answers.
 * 
 * If issues occur:
 * 1. Read troubleshooting section
 * 2. Check browser console
 * 3. Verify all files present
 * 4. Try different browser
 * 5. Restart the application
 * 
 * Enjoy your Stock Management System!
 * 
 * ==============================================
 */
