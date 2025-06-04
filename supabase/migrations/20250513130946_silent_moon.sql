/*
  # Add shareable URLs support

  1. New Columns
    - `shareable_id` (uuid): Unique identifier for sharing
    - `expires_at` (timestamptz): When the shared link expires
    - `is_shared` (boolean): Whether the analysis has been shared

  2. Security
    - Enable RLS on jobs table
    - Add policy for public access to shared analyses
*/

-- Add new columns for sharing functionality
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS shareable_id uuid,
ADD COLUMN IF NOT EXISTS expires_at timestamptz,
ADD COLUMN IF NOT EXISTS is_shared boolean DEFAULT false;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_jobs_shareable_id ON jobs(shareable_id);

-- Add policy for public access to shared analyses
CREATE POLICY "Anyone can view shared analyses" ON jobs
FOR SELECT
TO public
USING (
  is_shared = true 
  AND shareable_id IS NOT NULL 
  AND (expires_at IS NULL OR expires_at > now())
);