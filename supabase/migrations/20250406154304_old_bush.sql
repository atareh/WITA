/*
  # Add OpenAI API key to Vault

  1. Changes
    - Add OPENAI_API_KEY secret to Vault for Edge Functions
*/

-- Create a new secret in Vault for OpenAI API key
SELECT vault.create_secret(
  'OPENAI_API_KEY',
  'your-openai-api-key-here',
  'Edge function OpenAI API key'
);