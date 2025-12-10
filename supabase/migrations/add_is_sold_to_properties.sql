-- Migration: Add is_sold field to properties table
-- Description: This allows properties to be marked as sold/rented while keeping them visible with a badge
-- Date: 2025-12-10

-- Add is_sold column to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS is_sold boolean DEFAULT false;

-- Add comment to explain the field
COMMENT ON COLUMN properties.is_sold IS 'Indicates if the property has been sold or rented. Sold properties remain visible with a badge.';

-- Create an index for better query performance when filtering sold/available properties
CREATE INDEX IF NOT EXISTS idx_properties_is_sold ON properties(is_sold);

-- Optional: Create a composite index for common queries (published and not sold)
CREATE INDEX IF NOT EXISTS idx_properties_published_not_sold ON properties(is_published, is_sold) WHERE is_published = true;
