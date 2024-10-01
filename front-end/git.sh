#!/bin/bash

# Get the current directory
current_dir=$(pwd)

# Function to initialize Git repository
initialize_git() {
    echo "Running command directly..."
    git init
    git add .  # Fixed typo 'it' to 'git'
    git commit -m "Initial commit for frontend and backend"
    git push -u supreet main
    echo "Git repository initialized and initial commit created."
}

# Check if the current directory ends with SUPREET-SOUHARDA
if [[ $current_dir == *SUPREET-SOUHARDA ]]; then
    initialize_git
else
    # Change to the parent directory
    echo "Changing to the parent directory..."
    cd ..

    # After changing the directory, check again
    current_dir=$(pwd)  # Update current_dir after changing directory

    # Check if the new directory ends with SUPREET-SOUHARDA
    if [[ $current_dir == *SUPREET-SOUHARDA ]]; then
        initialize_git
    else
        echo "Not in a SUPREET-SOUHARDA directory. Exiting..."
    fi
fi
