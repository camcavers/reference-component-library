// check-tokens-format.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Function to recursively check if any property in the object uses $value (DTCG format)
function hasDTCGFormat(obj) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  
  if ('$value' in obj) {
    return true;
  }
  
  if (Array.isArray(obj)) {
    return obj.some(item => hasDTCGFormat(item));
  }
  
  return Object.values(obj).some(value => hasDTCGFormat(value));
}

// Function to recursively check if any property in the object uses value (old Tokens Studio format)
function hasOldFormat(obj) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  
  if ('value' in obj && 'type' in obj) {
    return true;
  }
  
  if (Array.isArray(obj)) {
    return obj.some(item => hasOldFormat(item));
  }
  
  return Object.values(obj).some(value => hasOldFormat(value));
}

// Read the tokens file
try {
  const tokensPath = path.join(process.cwd(), 'tokens', 'tokens.json');
  if (!fs.existsSync(tokensPath)) {
    console.error('❌ tokens.json file not found in tokens directory');
    process.exit(1);
  }
  
  const tokensContent = fs.readFileSync(tokensPath, 'utf8');
  const tokens = JSON.parse(tokensContent);
  
  const isDTCG = hasDTCGFormat(tokens);
  const isOldFormat = hasOldFormat(tokens);
  
  console.log('Analyzing tokens format...');
  
  if (isDTCG) {
    console.log('✅ Detected W3C DTCG format (using $value properties)');
    console.log('Running with DTCG config...');
    execSync('npm run tokens-dtcg', { stdio: 'inherit' });
  } else if (isOldFormat) {
    console.log('✅ Detected original Tokens Studio format (using value properties)');
    console.log('Running with original config...');
    execSync('npm run tokens', { stdio: 'inherit' });
  } else {
    console.log('⚠️ Could not determine tokens format.');
    console.log('Please check your tokens.json file structure.');
    console.log('Trying with DTCG config as default...');
    execSync('npm run tokens-dtcg', { stdio: 'inherit' });
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}