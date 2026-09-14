-- ============================================
-- STOCK MANAGEMENT SYSTEM - SQL COMMANDS BREAKDOWN
-- ============================================
--
-- This file shows each SQL command section by section
-- Use COMPLETE_SQL_SETUP.sql for full setup with comments
-- Use MINIMAL_SQL_SETUP.sql for quick setup
--
-- ============================================

-- ============================================
-- SECTION 1: CREATE USERS TABLE
-- ============================================
-- What: Stores user account information
-- Why: Need to track who owns products
-- Linked to: Supabase Auth system
--
-- Columns:
--   id = User ID (from Supabase Auth)
--   email = Email address (unique)
--   phone = Phone number
--   shop_name = Business name
--   display_id = Display ID (ID-XXXXX format)
--   created_at = Account creation date

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  shop_name TEXT NOT NULL,
  display_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SECTION 2: CREATE PRODUCTS TABLE
-- ============================================
-- What: Stores product/inventory information
-- Why: Need to track products and stock levels
-- Linked to: users table (via user_id)
--
-- Columns:
--   id = Product ID (auto-incrementing)
--   user_id = Product owner (links to users.id)
--   name = Product name
--   description = Product details
--   price = Product price
--   quantity = Stock quantity
--   category = Product category (for grouping)
--   created_at = Product creation date

CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SECTION 3: CREATE INDEXES (PERFORMANCE)
-- ============================================
-- What: Speed up database queries
-- Why: Make searches and filters faster
-- Performance impact: Queries run ~100x faster

-- Index products by user_id (most common query)
CREATE INDEX IF NOT EXISTS idx_products_user_id ON public.products(user_id);

-- Index products by category (for filtering)
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- Index products by creation date (for sorting)
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Index users by email (for lookups)
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Index users by display_id (for lookups)
CREATE INDEX IF NOT EXISTS idx_users_display_id ON public.users(display_id);

-- ============================================
-- SECTION 4: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
-- What: Turn on security for tables
-- Why: Make sure users can ONLY access their own data
-- Security impact: User A cannot see User B's data
--
-- Example:
--   User A tries to query all products
--   → RLS policy intercepts
--   → Only returns products where user_id = User A's ID
--   → User A's products returned ✓
--   → User B's products NOT returned ✓

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECTION 5: RLS POLICIES FOR USERS TABLE
-- ============================================
-- What: Rules for who can access user data
-- Why: Ensure data privacy and security
--
-- 3 Policies:
--   1. SELECT: Users can view only their own profile
--   2. UPDATE: Users can update only their own profile
--   3. INSERT: System can create profiles during signup

-- POLICY 1: Users can SELECT (read) only their own profile
CREATE POLICY "users_select_own"
ON public.users FOR SELECT
USING (auth.uid() = id);

-- Explanation:
--   USING (auth.uid() = id)
--   = Only allow if current user ID = record ID
--   = User can only see their own row

-- POLICY 2: Users can UPDATE (edit) only their own profile
CREATE POLICY "users_update_own"
ON public.users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Explanation:
--   USING (auth.uid() = id) = Can find only own row
--   WITH CHECK (auth.uid() = id) = Can only update own row

-- POLICY 3: Users can INSERT (create) their own profile
CREATE POLICY "users_insert_own"
ON public.users FOR INSERT
WITH CHECK (auth.uid() = id);

-- Explanation:
--   WITH CHECK (auth.uid() = id)
--   = Can only create profile where ID = current user

-- ============================================
-- SECTION 6: RLS POLICIES FOR PRODUCTS TABLE
-- ============================================
-- What: Rules for who can access product data
-- Why: Ensure each user only sees their products
--
-- 4 Policies:
--   1. SELECT: Users can view only their own products
--   2. INSERT: Users can add only their own products
--   3. UPDATE: Users can edit only their own products
--   4. DELETE: Users can delete only their own products

-- POLICY 1: Users can SELECT (view) only their own products
CREATE POLICY "products_select_own"
ON public.products FOR SELECT
USING (auth.uid() = user_id);

-- Explanation:
--   USING (auth.uid() = user_id)
--   = Only show products where user_id = current user

-- POLICY 2: Users can INSERT (add) only their own products
CREATE POLICY "products_insert_own"
ON public.products FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Explanation:
--   WITH CHECK (auth.uid() = user_id)
--   = Can only insert if user_id = current user
--   = Prevents user from adding products for someone else

-- POLICY 3: Users can UPDATE (edit) only their own products
CREATE POLICY "products_update_own"
ON public.products FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Explanation:
--   USING (auth.uid() = user_id) = Find own products
--   WITH CHECK (auth.uid() = user_id) = Update only own products

-- POLICY 4: Users can DELETE only their own products
CREATE POLICY "products_delete_own"
ON public.products FOR DELETE
USING (auth.uid() = user_id);

-- Explanation:
--   USING (auth.uid() = user_id)
--   = Can only delete products where user_id = current user

-- ============================================
-- HOW TO USE THIS FILE
-- ============================================
--
-- OPTION 1: Run everything at once (RECOMMENDED)
--   1. Copy all code from this file
--   2. Go to Supabase SQL Editor
--   3. Create new query
--   4. Paste all code
--   5. Click "Run"
--   6. Wait for success
--
-- OPTION 2: Run each section separately
--   1. Copy Section 1 (CREATE TABLE users)
--   2. Run it
--   3. Copy Section 2 (CREATE TABLE products)
--   4. Run it
--   5. Continue with remaining sections...
--
-- OPTION 3: Use MINIMAL_SQL_SETUP.sql
--   1. Copy entire MINIMAL_SQL_SETUP.sql
--   2. Run all at once
--   3. Takes ~30 seconds
--
-- ============================================
-- VERIFICATION CHECKLIST
-- ============================================
-- After running SQL, verify:
--
-- ✓ No error messages
-- ✓ Success message appears
-- ✓ In Supabase Table Editor:
--   - users table appears
--   - products table appears
-- ✓ In Supabase Security → Policies:
--   - 8 policies appear (3 for users, 5 for products)
-- ✓ RLS is "ON" for both tables
--
-- If any errors:
--   1. Check error message
--   2. Compare with COMPLETE_SQL_SETUP.sql
--   3. Try running in Supabase SQL Editor directly
--
-- ============================================
-- COMMON ERRORS & SOLUTIONS
-- ============================================
--
-- ERROR: "Table already exists"
-- SOLUTION: File uses "IF NOT EXISTS" so should not error
--           If it does, tables already created (OK to skip)
--
-- ERROR: "Relation does not exist"
-- SOLUTION: Table creation failed, try again
--           Check for syntax errors
--
-- ERROR: "Permission denied"
-- SOLUTION: Make sure you're using admin credentials
--           RLS should be ON for policy creation
--
-- ERROR: "Foreign key violation"
-- SOLUTION: users table must be created before products
--           Run in order: Section 1, then Section 2, etc.
--
-- ============================================
-- NOTES
-- ============================================
--
-- • Don't change table or column names
--   (application expects exact names)
--
-- • Don't delete RLS policies
--   (they protect your data)
--
-- • Don't disable RLS
--   (it's essential for security)
--
-- • Backups: Supabase auto-backs up daily (free tier)
--
-- • Data retention: Keep at least 7 days of backups
--
-- ============================================