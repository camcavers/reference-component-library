// debug-tokens.js
import fs from 'fs/promises';

async function debugTokens() {
  try {
    // Check if the tokens.json file exists
    try {
      const tokenStats = await fs.stat('./tokens/tokens.json');
      console.log('✅ tokens.json exists with size', tokenStats.size, 'bytes');
    } catch (err) {
      console.error('❌ Error accessing tokens.json:', err.message);
      return;
    }

    // Read the tokens.json file
    const tokensContent = await fs.readFile('./tokens/tokens.json', 'utf8');
    console.log('✅ Successfully read tokens.json');
    
    // Try to parse the JSON
    let tokensData;
    try {
      tokensData = JSON.parse(tokensContent);
      console.log('✅ Successfully parsed tokens.json as JSON');
    } catch (err) {
      console.error('❌ Error parsing tokens.json as JSON:', err.message);
      console.log('First 100 characters of file:', tokensContent.substring(0, 100));
      return;
    }
    
    // Inspect the structure of the tokens data
    console.log('\n📊 Tokens Structure:');
    console.log('- Top-level keys:', Object.keys(tokensData));
    
    // Check for common token properties
    const hasColor = tokensData.color !== undefined;
    const hasSize = tokensData.size !== undefined;
    const hasBorder = tokensData.border !== undefined;
    const hasFont = tokensData.font !== undefined;
    
    console.log(`- Has color tokens: ${hasColor ? '✅' : '❌'}`);
    console.log(`- Has size tokens: ${hasSize ? '✅' : '❌'}`);
    console.log(`- Has border tokens: ${hasBorder ? '✅' : '❌'}`);
    console.log(`- Has font tokens: ${hasFont ? '✅' : '❌'}`);
    
    // Check token format
    console.log('\n🔍 Token Format Inspection:');
    
    // Helper function to inspect a token's format
    function inspectTokenFormat(token, path = []) {
      if (typeof token !== 'object' || token === null) {
        return { 
          path: path.join('.'),
          type: typeof token, 
          isReference: typeof token === 'string' && token.startsWith('{') && token.endsWith('}'),
          value: token
        };
      }
      
      // Check if it's a leaf token with a value
      if (token.value !== undefined) {
        return { 
          path: path.join('.'),
          type: 'token object', 
          hasValue: true,
          hasType: token.type !== undefined,
          value: token.value,
          tokenType: token.type
        };
      }
      
      // Otherwise it's a group of tokens, inspect children
      const results = [];
      for (const key in token) {
        const childPath = [...path, key];
        const childResults = inspectTokenFormat(token[key], childPath);
        if (Array.isArray(childResults)) {
          results.push(...childResults);
        } else {
          results.push(childResults);
        }
      }
      return results;
    }
    
    // Inspect a sample of tokens for format issues
    let tokenSamples = [];
    if (hasColor && tokensData.color) {
      const colorSamples = inspectTokenFormat(tokensData.color, ['color']);
      if (Array.isArray(colorSamples)) {
        tokenSamples = tokenSamples.concat(colorSamples.slice(0, 3)); // Get up to 3 samples
      } else {
        tokenSamples.push(colorSamples);
      }
    }
    
    // Print token samples
    console.log('Token samples:');
    tokenSamples.forEach((sample, i) => {
      console.log(`Sample ${i + 1}:`, sample);
    });
    
    // Check for potential issues
    console.log('\n🚨 Potential Issues:');
    
    // Check if the tokens are flat (no nested structure)
    const isFlat = Object.values(tokensData).every(value => 
      typeof value !== 'object' || value === null
    );
    if (isFlat) {
      console.log('❌ Tokens appear to be flat with no hierarchy - Style Dictionary expects a nested structure');
    }
    
    // Check for empty objects
    const hasEmptyObjects = Object.keys(tokensData).some(key => 
      typeof tokensData[key] === 'object' && 
      tokensData[key] !== null && 
      Object.keys(tokensData[key]).length === 0
    );
    if (hasEmptyObjects) {
      console.log('❌ Found empty objects in the tokens structure');
    }
    
    // Provide next steps
    console.log('\n📋 Next Steps:');
    console.log('1. Check that your tokens.json has the expected nested structure');
    console.log('2. Make sure token objects have "value" properties');
    console.log('3. For references like "{color.base.primary.500}", make sure both the reference and target exist');
    console.log('4. Try using a simplified Style Dictionary config for debugging');
    
    // Create a simplified test config
    const simpleConfig = {
      source: ['./tokens/tokens.json'],
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: 'src/',
          files: [{
            destination: 'test-tokens.css',
            format: 'css/variables'
          }]
        }
      }
    };
    
    // Write a temporary simple config file
    await fs.writeFile('./test-sd-config.json', JSON.stringify(simpleConfig, null, 2));
    console.log('\n✅ Created a simplified test config at ./test-sd-config.json');
    console.log('5. Try running: npx style-dictionary build --config ./test-sd-config.json');
    
  } catch (err) {
    console.error('Error during debugging:', err);
  }
}

// Run the debugging function
debugTokens();