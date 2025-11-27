-- Admin Dashboard Migration SQL
-- Run this in Supabase SQL Editor to add admin functionality

-- Step 1: Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin';
$$ LANGUAGE sql SECURITY DEFINER;


-- Step 2: Add admin RLS policies for profiles
CREATE POLICY "Admins can view all profiles." ON profiles
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update any profile." ON profiles
  FOR UPDATE USING (is_admin());

-- Step 3: Add admin RLS policies for properties
CREATE POLICY "Admins can view all properties." ON properties
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update any property." ON properties
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete any property." ON properties
  FOR DELETE USING (is_admin());

-- Step 4: Set your user as admin
-- First, find your user ID from the auth.users table in Supabase Dashboard
-- Then run this query with your actual user ID:
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE id = 'your-user-id-here';

-- Or if you know your email, you can find the ID first:
-- SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- Then use that ID in the UPDATE query above

-- Verify the policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('profiles', 'properties') 
AND policyname LIKE '%Admin%';