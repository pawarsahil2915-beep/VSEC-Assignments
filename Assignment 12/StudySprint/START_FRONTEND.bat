@echo off
cd /d "%~dp0frontend"
echo Installing frontend packages...
call npm install
if errorlevel 1 (
  echo.
  echo Installation failed. Check that Node.js and npm are installed.
  pause
  exit /b 1
)
echo.
echo Starting StudySprint frontend...
call npm run dev
pause
