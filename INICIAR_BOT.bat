@echo off
title Discord-Telegram Bridge -  Installer
color 0A

echo ===================================================
echo        DISCORD + TELEGRAM BRIDGE
echo ===================================================
echo.
echo [1/3] Checking if Node.js is installed...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found!
    echo Please install Node.js before running this bot.
    echo Download at: https://nodejs.org/
    echo.
    pause
    exit
)

echo.
echo [2/3] Installing necessary tools (please wait)...
call npm install
echo Tools installed successfully!

echo.
echo [3/3] Starting the Bot...
echo ---------------------------------------------------
echo If you see a "Missing variables" error, remember
echo to fill the .env file with your keys!
echo ---------------------------------------------------
echo.

call npx ts-node src/index.ts

pause