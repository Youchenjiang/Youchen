import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitHooksDir = path.resolve(__dirname, '../.git/hooks');
const sourceHook = path.resolve(__dirname, 'pre-commit.sh');
const targetHook = path.resolve(gitHooksDir, 'pre-commit');

try {
  if (fs.existsSync(gitHooksDir)) {
    // Copy hook source script into .git/hooks directory safely
    fs.copyFileSync(sourceHook, targetHook);
    try {
      fs.chmodSync(targetHook, '755');
    } catch (e) {
      // Chmod fallback for Windows environments where chmod is not supported
    }
    console.log('✅ Git pre-commit hook installed successfully into .git/hooks/pre-commit');
  } else {
    console.log('⚠️ .git/hooks directory not found. Skipping hook installation.');
  }
} catch (error) {
  console.error('❌ Failed to install Git pre-commit hook:', error.message);
}
