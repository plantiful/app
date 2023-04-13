#!/bin/sh
# Usage:
# ./setup-macos.sh
#

# Check if brew is installed if not install it
if ! command -v brew &> /dev/null
then
    echo "Installing brew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    brew update
fi

# Install Node.js, Yarn, Watchman, and Expo CLI
brew install node yarn watchman
yarn global add expo-cli expo

yarn install

# If something goes wrong, try running this command:
# rm -rf node_modules && yarn cache clean && yarn install

# In case they're some issues with watchman, try running these commands:
# brew uninstall watchman
# brew install watchman
# watchman shutdown-server
# watchman watch-del-all
