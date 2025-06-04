/*
  # Update jobs table with user_id and policies

  1. Changes
    - Add user_id column to jobs table
    - Create index for user_id lookups
    - Update RLS policies for anonymous auth support

  2. Security
    - Enable RLS on jobs table
    - Drop existing policies to avoid conflicts
    - Create new policies for authenticated users
    - Allow public access to shared jobs
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'jobs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE jobs ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Create index for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can create jobs" ON jobs;
DROP POLICY IF EXISTS "Users can read their own jobs" ON jobs;
DROP POLICY IF EXISTS "Anyone can view shared analyses" ON jobs;

-- Create new policies
CREATE POLICY "Users can create jobs"
ON jobs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can read their own jobs"
ON jobs FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR (
    is_shared = true 
    AND shareable_id IS NOT NULL 
    AND (expires_at IS NULL OR expires_at > now())
  )
);

CREATE POLICY "Anyone can view shared analyses"
ON jobs FOR SELECT
TO public
USING (
  is_shared = true 
  AND shareable_id IS NOT NULL 
  AND (expires_at IS NULL OR expires_at > now())
);