#!/bin/sh
# Usage:
# ./setup-macos.sh

if ! command -v brew &> /dev/null
then
    echo "Installing brew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    brew update
fi

echo "Installing node, yarn, watchman, and expo-cli..."
brew install node yarn watchman
yarn global add expo-cli expo

echo "Installing project dependencies..."
yarn install

echo "Setup complete!"

# If something goes wrong, try running this command:
# rm -rf node_modules && yarn cache clean && yarn install

# In case they're some issues with watchman, try running these commands:
# brew uninstall watchman
# brew install watchman
# watchman shutdown-server
# watchman watch-del-all
