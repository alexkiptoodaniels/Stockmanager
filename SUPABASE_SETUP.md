# 🚀 SUPABASE SETUP GUIDE

## ============================================
## WHAT IS SUPABASE?
## ============================================

Supabase is an open-source Firebase alternative that provides:
- **Authentication**: Secure user signup and login
- **Database**: PostgreSQL database for storing data
- **Real-time**: Live data updates
- **REST API**: Easy data access from frontend

This Stock Management System uses Supabase to:
✓ Handle user authentication (signup/login)
✓ Store user profiles and data
✓ Store product/inventory data
✓ Manage user sessions

---

## ============================================
## STEP 1: CREATE SUPABASE ACCOUNT
## ============================================

1. Go to: https://supabase.com
2. Click "Sign Up" or "Start Your Project"
3. Sign up using:
   - Email
   - GitHub account
   - Google account
4. Verify your email
5. Create a new organization (or use default)

---

## ============================================
## STEP 2: CREATE A NEW PROJECT
## ============================================

1. After login, click "Create new project"
2. Fill in project details:
   - **Project Name**: "Stock Management System" (or your choice)
   - **Database Password**: Create strong password (save it!)
   - **Region**: Choose closest to you (e.g., us-east-1)
3. Click "Create new project"
4. Wait 2-3 minutes for project to be created

---

## ============================================
## STEP 3: GET YOUR CREDENTIALS
## ============================================

Once project is created:

1. Go to **Settings** → **API**
2. You'll see:
   - **Project URL**: https://your-project-url.supabase.co
   - **Anon Key**: Public key for frontend access

3. Copy both values

4. Open **script.js** in your project

5. Find lines 8-9:
```javascript
const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

6. Replace with your actual values:
```javascript
const SUPABASE_URL = 'https://your-actual-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

7. **SAVE THE FILE**

---

## ============================================
## STEP 4: CREATE DATABASE TABLES
## ============================================

### TABLE 1: USERS TABLE

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL code:

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  shop_name TEXT NOT NULL,
  display_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

4. Click **Run**
5. You'll see "Success" message

### TABLE 2: PRODUCTS TABLE

1. Click **New Query** again
2. Paste this SQL code:

```sql
CREATE TABLE public.products (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Click **Run**
4. You'll see "Success" message

### TABLE 3: CREATE INDEX (FOR PERFORMANCE)

1. Click **New Query** again
2. Paste this SQL code:

```sql
CREATE INDEX idx_products_user_id ON public.products(user_id);
```

3. Click **Run**

---

## ============================================
## STEP 5: SET UP AUTHENTICATION
## ============================================

1. Go to **Authentication** in sidebar
2. Click **Providers**
3. Make sure "Email" is **enabled** (should be by default)
4. Scroll down to find:
   - **Email Confirmations**: You can disable for testing
   - **Autoconfirm New Users**: Turn ON for testing
5. Click **Save**

---

## ============================================
## STEP 6: SET UP ROW LEVEL SECURITY (RLS)
## ============================================

This secures your data so users can only access their own data.

### Enable RLS on USERS table:

1. Go to **SQL Editor**
2. Click **New Query**
3. Paste:

```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON public.users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id);
```

4. Click **Run**

### Enable RLS on PRODUCTS table:

1. Click **New Query**
2. Paste:

```sql
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own products"
ON public.products FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products"
ON public.products FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
ON public.products FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products"
ON public.products FOR DELETE
USING (auth.uid() = user_id);
```

3. Click **Run**

---

## ============================================
## STEP 7: TEST YOUR SETUP
## ============================================

1. Open **index.html** in your browser
2. Click **Sign Up**
3. Fill in:
   - Email: test@example.com
   - Phone: 1234567890
   - Shop Name: My Test Shop
   - Password: Test123456 (6+ chars)
   - Confirm Password: Test123456
4. Click **Create Account**
5. Should redirect to profile page
6. If successful, account was created in Supabase!

### Check in Supabase:

1. Go to Supabase dashboard
2. Click **Table Editor**
3. Click **users** table
4. You should see your test user!

---

## ============================================
## STEP 8: TEST INVENTORY
## ============================================

1. From profile page, click **Inventory**
2. Add a product:
   - Name: Test Product
   - Price: 29.99
   - Quantity: 50
   - Category: Test
3. Click **Add Product**
4. Product should appear in table

### Check in Supabase:

1. Go to Supabase **Table Editor**
2. Click **products** table
3. You should see your product!

---

## ============================================
## TROUBLESHOOTING
## ============================================

### ERROR: "401 Unauthorized"
**Cause**: Wrong SUPABASE_URL or SUPABASE_ANON_KEY
**Solution**: 
1. Double-check credentials in script.js
2. Make sure you copied entire key (no spaces)
3. Refresh browser

### ERROR: "Invalid credentials"
**Cause**: Credentials not set in script.js
**Solution**:
1. Copy URL from Supabase Settings → API
2. Copy Anon Key from same location
3. Paste into script.js lines 8-9

### ERROR: "User already exists"
**Cause**: Email already used for signup
**Solution**:
1. Use different email address
2. Or go to Supabase → Authentication → Users
3. Delete the test user if needed

### ERROR: "Relation 'public.users' does not exist"
**Cause**: Tables not created yet
**Solution**:
1. Go to Supabase SQL Editor
2. Run the CREATE TABLE queries above
3. Refresh the application

### ERROR: "products" table not found
**Cause**: Products table not created
**Solution**:
1. Go to Supabase SQL Editor
2. Run CREATE TABLE for products
3. Refresh the application

### Data not showing
**Cause**: Row Level Security blocking access
**Solution**:
1. Make sure RLS policies are created
2. Run the RLS setup queries
3. Logout and login again

---

## ============================================
## DATABASE SCHEMA REFERENCE
## ============================================

### USERS TABLE
```
Column Name    | Type                    | Description
id             | UUID (Primary Key)      | Auth user ID
email          | TEXT (Unique)          | User email
phone          | TEXT                   | Phone number
shop_name      | TEXT                   | Shop name
display_id     | TEXT (Unique)          | Display ID (ID-XXXXX)
created_at     | TIMESTAMP              | Account creation date
```

### PRODUCTS TABLE
```
Column Name    | Type                    | Description
id             | BIGSERIAL (Primary Key) | Product ID
user_id        | UUID (Foreign Key)      | Owner's user ID
name           | TEXT                   | Product name
description    | TEXT                   | Product description
price          | DECIMAL(10,2)          | Product price
quantity       | INTEGER                | Stock quantity
category       | TEXT                   | Product category
created_at     | TIMESTAMP              | Creation date
```

---

## ============================================
## DATA FLOW
## ============================================

### SIGNUP FLOW:
1. User fills signup form
2. JavaScript calls Supabase Auth API
3. Auth API creates user account
4. App creates user profile in users table
5. Auto-login happens
6. Redirect to profile page

### LOGIN FLOW:
1. User fills login form
2. JavaScript calls Supabase Auth API
3. Auth API validates credentials
4. App fetches user profile from database
5. Session created
6. Redirect to inventory page

### ADD PRODUCT FLOW:
1. User fills product form
2. JavaScript calls Supabase Database API
3. Product inserted into products table
4. user_id automatically set to current user
5. Product appears in inventory table
6. Stats automatically update

### EDIT PRODUCT FLOW:
1. User clicks Edit button
2. Modal opens with product data
3. User modifies fields
4. JavaScript calls Supabase Database API
5. Product updated in database
6. Table refreshes immediately

### DELETE PRODUCT FLOW:
1. User clicks Delete button
2. Confirmation dialog appears
3. User confirms
4. JavaScript calls Supabase Database API
5. Product deleted from database
6. Table refreshes immediately

---

## ============================================
## SECURITY NOTES
## ============================================

### WHAT'S SECURE:
✓ Supabase handles password hashing
✓ User authentication is secure
✓ Data is encrypted in transit
✓ Row Level Security prevents data leaks
✓ Only users can access their own data

### WHAT'S NOT SECURE (FOR PRODUCTION):
✗ Anon key is visible in frontend code
✗ No additional encryption
✗ No rate limiting
✗ No backend validation

### FOR PRODUCTION USE:
1. Use Supabase with a backend server
2. Move credentials to backend
3. Add rate limiting
4. Add backend validation
5. Implement audit logging
6. Add database backups

---

## ============================================
## USEFUL LINKS
## ============================================

- Supabase Website: https://supabase.com
- Dashboard: https://app.supabase.com
- Documentation: https://supabase.com/docs
- SQL Editor Guide: https://supabase.com/docs/guides/database/connecting-to-postgres
- Auth Guide: https://supabase.com/docs/guides/auth
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security

---

## ============================================
## FAQ
## ============================================

**Q: Is Supabase free?**
A: Yes! Free tier includes:
- 500MB database storage
- 2GB bandwidth
- Up to 50,000 monthly active users
- Unlimited real-time connections

**Q: Do I need a credit card?**
A: No for free tier. Only if you want to exceed limits.

**Q: Can I use Supabase without internet?**
A: No, Supabase is cloud-based. Internet required.

**Q: Can I export my data?**
A: Yes, Supabase provides SQL export and backup features.

**Q: Is my data private?**
A: Yes, Row Level Security ensures only you can access your data.

**Q: Can I delete my account?**
A: Yes, go to Supabase Settings → Organization → Delete Account

**Q: How often are backups?**
A: Daily backups on Pro plan, weekly on free tier.

---

## ============================================
## NEXT STEPS
## ============================================

1. Create Supabase account
2. Create project
3. Copy credentials to script.js
4. Create database tables
5. Enable authentication
6. Set up Row Level Security
7. Test signup
8. Test inventory management
9. Deploy to production (optional)

---

## ============================================
## SUPPORT
## ============================================

If you need help:
1. Check Supabase documentation
2. Check browser console for errors (F12)
3. Check Supabase dashboard logs
4. Review troubleshooting section above

**Error messages usually tell you what's wrong!**

Good luck! 🎉
