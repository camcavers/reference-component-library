// sd.config.dtcg.fixed.cjs - Fixes reference paths in DTCG tokens
const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// Pre-process DTCG tokens to fix reference paths
function preprocessTokens() {
  const tokensPath = path.join(process.cwd(), 'tokens', 'tokens.json');
  const outputPath = path.join(process.cwd(), 'tokens', 'tokens-processed.json');
  
  try {
    if (!fs.existsSync(tokensPath)) {
      console.error('❌ tokens.json file not found');
      return false;
    }
    
    // Read tokens file
    const tokensContent = fs.readFileSync(tokensPath, 'utf8');
    const tokens = JSON.parse(tokensContent);
    
    // Function to fix reference strings in values
    function fixReferenceInValue(value) {
      if (typeof value !== 'string') return value;
      
      // Replace references like {color.base...} with {global.color.base...}
      return value.replace(/\{([^}]+)\}/g, (match, path) => {
        // Only add global. prefix if it's not already there
        return path.startsWith('global.') ? `{${path}}` : `{global.${path}}`;
      });
    }
    
    // Recursively convert $value to value and fix references
    function processObject(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      
      const result = Array.isArray(obj) ? [] : {};
      
      for (const key in obj) {
        // Convert $value property to value and fix references
        if (key === '$value') {
          result.value = fixReferenceInValue(obj[key]);
          // Copy other properties ($type, $description etc.)
          for (const propKey in obj) {
            if (propKey !== '$value' && propKey.startsWith('$')) {
              // Remove $ prefix
              result[propKey.substring(1)] = obj[propKey];
            }
          }
        } else if (key === 'value' && typeof obj[key] === 'string') {
          // If it's already a value property, fix references
          result[key] = fixReferenceInValue(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Recursively process nested objects
          result[key] = processObject(obj[key]);
        } else {
          // Copy any other properties as-is
          result[key] = obj[key];
        }
      }
      
      return result;
    }
    
    // Process the tokens - if tokens has a "global" property, use that
    const tokensData = tokens.global ? { global: processObject(tokens.global) } : processObject(tokens);
    
    // Write processed tokens
    fs.writeFileSync(outputPath, JSON.stringify(tokensData, null, 2));
    console.log('✅ Processed DTCG tokens with fixed references');
    return true;
  } catch (error) {
    console.error('❌ Error processing DTCG tokens:', error.message);
    return false;
  }
}

// Pre-process the tokens to handle DTCG format and fix references
const preprocessSuccess = preprocessTokens();
const tokensSource = preprocessSuccess 
  ? ['./tokens/tokens-processed.json'] 
  : ['./tokens/tokens.json'];

// Register custom format
StyleDictionary.registerFormat({
  name: 'css/variables/custom',
  formatter: function(dictionary) {
    return `:root {\n${dictionary.allProperties.map(prop => {
      // Remove 'global' from the path if it exists
      const path = prop.path[0] === 'global' ? prop.path.slice(1) : prop.path;
      const name = path.join('-');
      
      return `  --${name}: ${prop.value};`;
    }).join('\n')}\n}`;
  }
});

// Define your style dictionary configuration
module.exports = {
  source: tokensSource,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/',
      files: [{
        destination: 'index.css',
        format: 'css/variables/custom'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
};