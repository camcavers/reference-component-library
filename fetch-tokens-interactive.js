// fetch-tokens-interactive.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';

// Path to saved repositories configuration
const REPO_CONFIG_PATH = path.join(process.cwd(), 'tokens', 'repo-config.json');

// Load saved repositories or create default configuration
function loadRepoConfig() {
  try {
    if (fs.existsSync(REPO_CONFIG_PATH)) {
      return JSON.parse(fs.readFileSync(REPO_CONFIG_PATH, 'utf8'));
    }
  } catch (error) {
    console.warn('Error loading repo configuration:', error.message);
  }
  
  // Default configuration
  return {
    repos: [],
    lastUsed: null
  };
}

// Save repository configuration
function saveRepoConfig(config) {
  try {
    // Ensure the tokens directory exists
    const tokensDir = path.dirname(REPO_CONFIG_PATH);
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }
    
    fs.writeFileSync(REPO_CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (error) {
    console.warn('Error saving repo configuration:', error.message);
  }
}

// Add a new repository to the configuration
function addRepo(config, repoUrl, branch, tokensPath) {
  // Check if repo already exists
  const existingIndex = config.repos.findIndex(repo => repo.url === repoUrl);
  
  if (existingIndex >= 0) {
    // Update existing repo
    config.repos[existingIndex] = {
      url: repoUrl,
      branch: branch || 'main',
      tokensPath: tokensPath || 'tokens.json',
      lastUsed: new Date().toISOString()
    };
  } else {
    // Add new repo
    config.repos.push({
      url: repoUrl,
      branch: branch || 'main',
      tokensPath: tokensPath || 'tokens.json',
      lastUsed: new Date().toISOString()
    });
  }
  
  // Set as last used
  config.lastUsed = repoUrl;
  
  // Sort by last used
  config.repos.sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
  
  return config;
}

// Detect token format
function detectTokenFormat(tokensContent) {
  try {
    const tokens = JSON.parse(tokensContent);
    
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
    
    // Function to recursively check if any property in the object uses value (old format)
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
    
    const isDTCG = hasDTCGFormat(tokens);
    const isOldFormat = hasOldFormat(tokens);
    
    if (isDTCG) {
      return 'dtcg';
    } else if (isOldFormat) {
      return 'original';
    } else {
      return 'unknown';
    }
  } catch (error) {
    console.warn('Error detecting token format:', error.message);
    return 'unknown';
  }
}

// Fetch tokens from the repository
async function fetchTokens(repoUrl, branch, tokensPath) {
  const tempDir = path.join(process.cwd(), 'temp-repo');
  
  try {
    console.log(`\nFetching tokens from ${repoUrl} (branch: ${branch})`);
    
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
    
    // Read token content to detect format
    const tokenContent = fs.readFileSync(sourceTokensPath, 'utf8');
    const tokenFormat = detectTokenFormat(tokenContent);
    
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
      format: tokenFormat,
      fetchedAt: new Date().toISOString()
    }, null, 2));
    
    // Run the appropriate build based on detected format
    console.log(`\nDetected token format: ${tokenFormat}`);
    
    if (tokenFormat === 'dtcg') {
      console.log('Running DTCG token build process with fixed references...');
      execSync('npm run tokens-dtcg', { stdio: 'inherit' });
    } else if (tokenFormat === 'original') {
      console.log('Running original token build process...');
      execSync('npm run tokens', { stdio: 'inherit' });
    } else {
      console.log('Format unknown, trying auto-detection...');
      execSync('npm run tokens-auto', { stdio: 'inherit' });
    }
    
    console.log('\n✅ Tokens successfully imported and built!');
    
    return true;
  } catch (error) {
    console.error('\n❌ Error fetching tokens:', error.message);
    return false;
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      execSync(`rm -rf "${tempDir}"`);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('🔄 Design Tokens Fetcher');
    console.log('------------------------');
    
    // Load saved repositories
    const config = loadRepoConfig();
    
    // Prepare repository choices
    const repoChoices = [
      ...config.repos.map(repo => ({
        title: `${repo.url} (${repo.branch})`,
        description: `Tokens path: ${repo.tokensPath}`,
        value: repo
      })),
      {
        title: '+ Add new repository',
        value: 'new'
      }
    ];
    
    // Set initial value to last used repo if available
    const initialRepo = config.lastUsed 
      ? config.repos.findIndex(repo => repo.url === config.lastUsed)
      : undefined;
    
    // Get repository selection
    let selectedRepo = null;
    let repoUrl = '';
    let branch = 'main';
    let tokensPath = 'tokens.json';
    
    // If there are no saved repos, skip to adding a new one
    if (config.repos.length === 0) {
      selectedRepo = 'new';
    } else {
      const repoResponse = await prompts({
        type: 'select',
        name: 'repo',
        message: 'Select a repository:',
        choices: repoChoices,
        initial: initialRepo !== undefined ? initialRepo : 0
      });
      
      // Exit if cancelled
      if (repoResponse.repo === undefined) {
        console.log('\n❌ Operation cancelled');
        return;
      }
      
      selectedRepo = repoResponse.repo;
    }
    
    // If adding a new repository
    if (selectedRepo === 'new') {
      const newRepoResponse = await prompts([
        {
          type: 'text',
          name: 'repoUrl',
          message: 'Enter repository URL:',
          validate: value => value.trim() === '' ? 'Repository URL is required' : true
        },
        {
          type: 'text',
          name: 'branch',
          message: 'Enter branch name (default: main):',
          initial: 'main'
        },
        {
          type: 'text',
          name: 'tokensPath',
          message: 'Enter path to tokens.json (default: tokens.json):',
          initial: 'tokens.json'
        }
      ]);
      
      // Exit if cancelled
      if (!newRepoResponse.repoUrl) {
        console.log('\n❌ Operation cancelled');
        return;
      }
      
      repoUrl = newRepoResponse.repoUrl;
      branch = newRepoResponse.branch;
      tokensPath = newRepoResponse.tokensPath;
    } else {
      // Use selected repository
      repoUrl = selectedRepo.url;
      branch = selectedRepo.branch;
      tokensPath = selectedRepo.tokensPath;
      
      // Ask if user wants to change branch or path
      const customizeResponse = await prompts({
        type: 'confirm',
        name: 'customize',
        message: 'Do you want to customize branch or file path?',
        initial: false
      });
      
      if (customizeResponse.customize) {
        const customOptions = await prompts([
          {
            type: 'text',
            name: 'branch',
            message: 'Enter branch name:',
            initial: branch
          },
          {
            type: 'text',
            name: 'tokensPath',
            message: 'Enter path to tokens.json:',
            initial: tokensPath
          }
        ]);
        
        if (customOptions.branch) branch = customOptions.branch;
        if (customOptions.tokensPath) tokensPath = customOptions.tokensPath;
      }
    }
    
    // Fetch tokens
    const success = await fetchTokens(repoUrl, branch, tokensPath);
    
    // Save repo configuration if successful
    if (success) {
      const updatedConfig = addRepo(config, repoUrl, branch, tokensPath);
      saveRepoConfig(updatedConfig);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

// Run the main function
main();