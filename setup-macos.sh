#!/bin/bash
# ./setup-macos.sh
#

# Check if brew is installed if not install it
if ! command -v brew &> /dev/null
then
    echo "brew could not be found"
    echo "Installing brew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "brew is already installed"
    brew update
fi

# Check whether node is installed if not install LTS version
if ! command -v node &> /dev/null
then
    echo "node could not be found"
    echo "Installing node..."
    brew install node
else
    echo "node is already installed"
fi

# Other dependencies
brew install watchman yarn

# Install dependencies using yarn
yarn global add expo-cli