// fetch-tokens.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import url from 'url';

// Get repository URL from command line arguments
const repoUrl = process.argv[2];

if (!repoUrl) {
  console.error('Please provide a git repository URL');
  console.error('Usage: node fetch-tokens.js https://github.com/username/repo.git [branch] [path/to/tokens.json]');
  process.exit(1);
}

// Optional branch name (default to main)
const branch = process.argv[3] || 'main';

// Optional path to tokens.json within the repository (default to tokens.json)
const tokensPath = process.argv[4] || 'tokens.json';

// Create temp directory
const tempDir = path.join(process.cwd(), 'temp-repo');

try {
  console.log(`Fetching tokens from ${repoUrl} (branch: ${branch})`);
  
  // Clean up any existing temp directory
  if (fs.existsSync(tempDir)) {
    console.log('Cleaning up existing temp directory...');
    execSync(`rm -rf "${tempDir}"`);
  }
  
  // Clone the specific branch of the repository
  execSync(`git clone --depth 1 --branch ${branch} ${repoUrl} "${tempDir}"`, { stdio: 'inherit' });
  
  // Check if tokens file exists in the cloned repo
  const sourceTokensPath = path.join(tempDir, tokensPath);
  
  if (!fs.existsSync(sourceTokensPath)) {
    throw new Error(`Tokens file not found at ${tokensPath} in the repository`);
  }
  
  // Ensure tokens directory exists
  const tokensDir = path.join(process.cwd(), 'tokens');
  if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir, { recursive: true });
  }
  
  // Copy tokens file to tokens directory
  const destTokensPath = path.join(tokensDir, 'tokens.json');
  fs.copyFileSync(sourceTokensPath, destTokensPath);
  
  console.log(`✅ Tokens file copied to ${destTokensPath}`);
  
  // Get the commit info for reference
  const commitInfo = execSync(`cd "${tempDir}" && git log -1 --pretty=format:"%h %an %ad %s"`, { encoding: 'utf-8' });
  console.log(`\nToken source: ${repoUrl}`);
  console.log(`Branch: ${branch}`);
  console.log(`Commit: ${commitInfo}`);
  
  // Save source metadata for reference
  const metadataPath = path.join(tokensDir, 'tokens-source.json');
  fs.writeFileSync(metadataPath, JSON.stringify({
    repository: repoUrl,
    branch: branch,
    path: tokensPath,
    commit: commitInfo,
    fetchedAt: new Date().toISOString()
  }, null, 2));
  
  console.log('\nRunning token build process...');
  execSync('npm run tokens', { stdio: 'inherit' });
  
  console.log('\n✅ Tokens successfully imported and built!');
} catch (error) {
  console.error('\n❌ Error fetching tokens:', error.message);
  process.exit(1);
} finally {
  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf "${tempDir}"`);
  }
}
