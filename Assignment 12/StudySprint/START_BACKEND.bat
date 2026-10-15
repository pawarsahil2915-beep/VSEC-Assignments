@echo off
cd /d "%~dp0backend"
if not exist .env copy .env.example .env
echo Installing backend packages...
call npm install
if errorlevel 1 (
  echo.
  echo Installation failed. Check that Node.js and npm are installed.
  pause
  exit /b 1
)
echo.
echo Starting StudySprint API...
echo Make sure MongoDB Community Server is running first.
call npm run dev
pause
