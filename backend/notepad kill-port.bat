:: This script is used to kill a process running on a specific port if running on Windows.
@echo off
set PORT=5000
echo Killing process on port %PORT%...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :%PORT%') do taskkill /F /PID %%a
echo Port %PORT% is now free.
