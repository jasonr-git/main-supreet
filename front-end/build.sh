#!/bin/bash
npm run build
git init
git add .  # Ensure all files are added
git commit -m "Initial commit for frontend and backend"
git push -u origin frontend-build
echo "Git repository initialized and initial commit created, pushed to frontend-build branch."
