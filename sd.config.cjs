// sd.config.fixed.cjs
const StyleDictionary = require('style-dictionary');
const fs = require('fs');

// Read the tokens file to inspect its structure
const tokensData = JSON.parse(fs.readFileSync('./tokens/tokens.json', 'utf8'));

// Flatten the tokens structure by removing the 'global' wrapper
// This makes references like {color.base.primary.500} work correctly
const flattenedTokens = tokensData.global || tokensData;

// Register transforms to handle Tokens Studio format
StyleDictionary.registerTransform({
  name: 'name/tokensStudio',
  type: 'name',
  transformer: function(token) {
    // Remove 'global' from the path if it exists
    const path = token.path[0] === 'global' ? token.path.slice(1) : token.path;
    return path.join('-');
  }
});

// Register a special format that handles references
StyleDictionary.registerFormat({
  name: 'css/tokensStudio',
  formatter: function(dictionary) {
    return `:root {\n${dictionary.allProperties.map(prop => {
      // Get the property name without 'global' prefix
      const path = prop.path[0] === 'global' ? prop.path.slice(1) : prop.path;
      const name = path.join('-');
      
      return `  --${name}: ${prop.value};`;
    }).join('\n')}\n}`;
  }
});

// Create the style dictionary configuration
module.exports = {
  tokens: flattenedTokens, // Use the flattened tokens instead of source
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: [
        'attribute/cti',
        'name/tokensStudio',
        'color/css'
      ],
      buildPath: 'src/',
      files: [{
        destination: 'index.css',
        format: 'css/tokensStudio'
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