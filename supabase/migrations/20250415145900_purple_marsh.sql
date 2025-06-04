/*
  # Set up OpenAI API key in vault

  1. Changes
    - Add OPENAI_API_KEY secret to vault for Edge Functions
    - Remove previous configuration attempts
*/

-- Create a new secret in vault for OpenAI API key
SELECT vault.create_secret(
  'OPENAI_API_KEY',
  '',  -- The actual API key will be set through environment variables
  'OpenAI API key for WITA function'
);