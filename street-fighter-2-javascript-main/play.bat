@echo off
title Street Fighter II
echo ========================================================
echo Starting Street Fighter 2 Local Server...
echo ========================================================
echo The game will open in your default browser.
echo Keep this window open while playing!
echo ========================================================
cd /d "%~dp0"
node server.js
pause
