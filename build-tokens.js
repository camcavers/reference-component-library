// build-tokens.js
import StyleDictionary from 'style-dictionary';
import fs from 'fs/promises';

// Import the transformers directly from subpaths
import { transformTypes } from '@tokens-studio/sd-transforms/dist/types/transformTypes.js';
import { transformGroups } from '@tokens-studio/sd-transforms/dist/types/transformGroups.js';

async function buildTokens() {
  try {
    // Read the tokens.json file
    let tokensData;
    try {
      const tokensContent = await fs.readFile('./tokens/tokens.json', 'utf8');
      tokensData = JSON.parse(tokensContent);
    } catch (error) {
      // If tokens aren't in the tokens folder, try the root directory
      const tokensContent = await fs.readFile('./tokens.json', 'utf8');
      tokensData = JSON.parse(tokensContent);
    }

    // Register the Tokens Studio transforms
    Object.entries(transformTypes).forEach(([name, transform]) => {
      StyleDictionary.registerTransform(transform);
    });

    // Register the transform groups
    Object.entries(transformGroups).forEach(([name, transforms]) => {
      StyleDictionary.registerTransformGroup({
        name: name,
        transforms: transforms
      });
    });

    // Create the style dictionary configuration
    const styleDictionary = StyleDictionary.extend({
      tokens: tokensData,
      platforms: {
        css: {
          transformGroup: 'tokens-studio',
          buildPath: 'src/',
          files: [{
            destination: 'index.css',
            format: 'css/variables',
            options: {
              outputReferences: true,
              selector: ':root'
            }
          }]
        },
        js: {
          transformGroup: 'tokens-studio',
          buildPath: 'src/',
          files: [{
            destination: 'tokens.js',
            format: 'javascript/es6'
          }]
        }
      }
    });

    // Build all platforms
    styleDictionary.buildAllPlatforms();
    
    console.log('✅ Design tokens generated successfully!');
  } catch (error) {
    console.error('❌ Error building tokens:', error);
    console.error(error.stack);
  }
}

buildTokens();