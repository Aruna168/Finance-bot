# PowerShell script to start the FinBot backend server

Write-Host "Starting FinBot Backend Server..." -ForegroundColor Green

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please create a .env file with your GEMINI_API_KEY" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "Starting server on http://localhost:3000" -ForegroundColor Cyan
node index.js


