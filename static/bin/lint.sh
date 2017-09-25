#!/bin/bash

START=$(date +%s)

echo '  Linting 🐥'
eslint dist/ && echo '✓ eslint pass' 
sass-lint -c .sass-lint.yml '**/*.scss' -v -q && echo '✓ sass-lint pass'

END=$(date +%s)
DIFF=$(( $END - $START ))
echo "  Linting completed in $DIFF seconds"
