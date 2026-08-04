#!/bin/sh
# Local Pre-Commit CI Hook for Youchen Portfolio & Blog

echo "🔍 Running local pre-commit CI check (npm run build)..."

# Run Vite production build locally
npm run build

# Capture exit code
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -ne 0 ]; then
  echo "❌ Local CI build failed! Commit has been automatically aborted."
  echo "👉 Please fix the compilation errors before committing."
  exit 1
fi

echo "✅ Local CI build passed cleanly! Proceeding with commit..."
exit 0
