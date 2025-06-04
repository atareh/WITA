/*
  # Set up storage bucket for screenshots

  1. Changes
    - Create a new bucket for storing screenshots
    - Set up appropriate RLS policies for access control
*/

-- Create a new bucket for screenshots
BEGIN;
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'screenshots',
    'screenshots',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif']
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

  -- Set up security policies
  DO $$
  BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Allow authenticated users to upload screenshots" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public access to screenshots" ON storage.objects;
    
    -- Create new policies
    IF EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE schemaname = 'storage' 
      AND tablename = 'objects'
    ) THEN
      CREATE POLICY "Allow authenticated users to upload screenshots"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (
        bucket_id = 'screenshots'
        AND auth.role() = 'authenticated'
      );

      CREATE POLICY "Allow public access to screenshots"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'screenshots');
    END IF;
  END $$;
END;