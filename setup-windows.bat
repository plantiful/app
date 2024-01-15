@echo off
REM Usage:
REM setup-windows.bat

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo This script must be run as an administrator.
    exit /b
)

where winget >nul 2>&1
if %errorlevel% neq 0 (
    echo Winget is not installed. Please install Winget and rerun this script.
    exit /b
)

echo Updating Winget and Install Node.js, Yarn, and Expo CLI...
winget upgrade --all
winget install -e --id OpenJS.NodeJS
winget install -e --id Yarn.Yarn

echo Installing Expo CLI...
yarn global add expo-cli expo

echo Installing project dependencies...
yarn install

echo Setup complete!
