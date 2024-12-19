#!/bin/bash

# Save the original directory
original_dir=$(pwd)

# Function to initialize Git repository
initialize_git() {
    echo "Running command directly..."
    git init
    git add .  # Ensure all files are added
    git commit -m "Initial commit for frontend and backend"
    git push -u supreet main
    echo "Git repository initialized and initial commit created."
}

# Convert the current directory to lowercase
current_dir=$(pwd) 
current_dir_lower=$(echo "$current_dir" | tr '[:upper:]' '[:lower:]')

# Check if the current directory ends with supreet-souharda (case insensitive)
if [[ $current_dir_lower == *supreet-souharda ]]; then
    initialize_git
else
    # Change to the parent directory
    echo "Changing to the parent directory..."
    cd ..

    # After changing the directory, check again
    current_dir=$(pwd)  # Update current_dir after changing directory
    current_dir_lower=$(echo "$current_dir" | tr '[:upper:]' '[:lower:]')  # Convert again

    # Check if the new directory ends with supreet-souharda (case insensitive)
    if [[ $current_dir_lower == *supreet-souharda ]]; then
        initialize_git
    else
        echo "Not in a SUPREET-SOUHARDA directory. Exiting..."
        cd "$original_dir"  # Return to the original directory
        exit 1  # Exit with a non-zero status
    fi
fi

# Return to the original directory at the end
cd "$original_dir"
echo "Returned to the original directory: $original_dir"
