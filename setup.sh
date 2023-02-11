#!/bin/sh
# Usage:
# ./setup.sh
#

# Install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew update

# Install dependencies with homebrew
brew install node watchman

# Install dependencies with npm
npm install expo @expo/webpack-config@^0.17.2
npm fund
npm audit fix --force