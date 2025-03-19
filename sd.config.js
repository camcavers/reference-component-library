// sd.config.js
import StyleDictionary from 'style-dictionary';
import { transformTokens } from '@tokens-studio/sd-transforms';

// Set up the configuration for Style Dictionary
const config = {
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/',
      files: [{
        destination: 'index.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
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

// Apply Tokens Studio transforms
const { registerTransforms } = await import('@tokens-studio/sd-transforms');

// Register the Tokens Studio transforms
registerTransforms(StyleDictionary);

// Export the configuration
export default config;