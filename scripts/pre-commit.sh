#!/bin/sh
# Local Pre-Commit CI Hook for Youchen Portfolio & Blog
# Runs lint, format, and build in parallel for faster feedback

echo "🔍 Running local pre-commit CI checks (lint, format, build)..."

# Check if lint and format scripts are defined in package.json
HAS_LINT=false
HAS_FORMAT=false

if grep -q '"lint"' package.json > /dev/null 2>&1; then
  HAS_LINT=true
fi

if grep -q '"format"' package.json > /dev/null 2>&1; then
  HAS_FORMAT=true
fi

# Initialize status variables
LINT_STATUS=0
FORMAT_STATUS=0
BUILD_STATUS=0
FAILED=0

# Array to store PIDs for waiting
pids=""

# Run lint if available
if $HAS_LINT; then
  echo "⏳ Running lint..."
  npm run lint &
  LINT_PID=$!
  pids="$pids $LINT_PID"
fi

# Run format if available
if $HAS_FORMAT; then
  echo "⏳ Running format check..."
  npm run format &
  FORMAT_PID=$!
  pids="$pids $FORMAT_PID"
fi

# Always run build
echo "⏳ Building for production..."
npm run build &
BUILD_PID=$!
pids="$pids $BUILD_PID"

# Wait for each known process and set status
if $HAS_LINT; then
  wait $LINT_PID || LINT_STATUS=$?
fi
if $HAS_FORMAT; then
  wait $FORMAT_PID || FORMAT_STATUS=$?
fi
wait $BUILD_PID || BUILD_STATUS=$?

# Check results
if [ $LINT_STATUS -ne 0 ] || [ $FORMAT_STATUS -ne 0 ] || [ $BUILD_STATUS -ne 0 ]; then
  echo "❌ One or more checks failed!"
  [ $LINT_STATUS -ne 0 ] && echo "  Lint failed (exit code: $LINT_STATUS)"
  [ $FORMAT_STATUS -ne 0 ] && echo "  Format failed (exit code: $FORMAT_STATUS)"
  [ $BUILD_STATUS -ne 0 ] && echo "  Build failed (exit code: $BUILD_STATUS)"
  echo "👉 Please fix the errors before committing."
  exit 1
fi

echo "✅ All checks passed! Proceeding with commit..."
exit 0