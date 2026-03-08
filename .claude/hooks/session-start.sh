#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install npm dependencies
cd "$CLAUDE_PROJECT_DIR"
npm install

# Install frontend-design plugin from official marketplace
claude plugin marketplace add anthropics/claude-code 2>/dev/null || true
claude plugin install frontend-design@claude-code-plugins --scope user 2>/dev/null || true
