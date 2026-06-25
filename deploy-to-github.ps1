Write-Host "=== DzStartup Hub - Deploy to GitHub ===" -ForegroundColor Green
Write-Host ""

$repoName = "dzstartup-hub"

# Check if git is configured
$name = git config user.name
$email = git config user.email
if (-not $name -or -not $email) {
    git config user.name "DzStartup Hub"
    git config user.email "dev@dzstartup.hub"
}

# Ask for GitHub username
$ghUser = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrEmpty($ghUser)) { Write-Host "Username required!" -ForegroundColor Red; exit 1 }

# Ask for Personal Access Token
Write-Host ""
Write-Host "Create a token here: https://github.com/settings/tokens/new" -ForegroundColor Yellow
Write-Host "Select scopes: [x] repo (Full control) [x] workflow" -ForegroundColor Yellow
Write-Host ""
$ghToken = Read-Host "Enter your GitHub Personal Access Token (paste it)"
if ([string]::IsNullOrEmpty($ghToken)) { Write-Host "Token required!" -ForegroundColor Red; exit 1 }

# Create repo via API
Write-Host "Creating repository on GitHub..." -ForegroundColor Cyan
$body = @{ name = $repoName; description = "DzStartup Hub - Algeria's Premier Startup Ecosystem"; private = $false } | ConvertTo-Json
try {
    $result = Invoke-WebRequest -Uri "https://api.github.com/user/repos" -Method Post -Headers @{ Authorization = "Bearer $ghToken" } -Body $body -ContentType "application/json" -UseBasicParsing
    Write-Host "Repository created!" -ForegroundColor Green
} catch {
    Write-Host "Failed to create repo: $_" -ForegroundColor Red
    Write-Host "The repo might already exist. Trying to push anyway..." -ForegroundColor Yellow
}

# Commit and push
git add .
git commit -m "Initial commit: DzStartup Hub with PWA + Capacitor + GitHub Actions"
git branch -M main
git remote remove origin 2>$null
git remote add origin "https://$ghUser`:$ghToken@github.com/$ghUser/$repoName.git"
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== SUCCESS ===" -ForegroundColor Green
    Write-Host "Code pushed to: https://github.com/$ghUser/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To get your APK:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/$ghUser/$repoName/actions" -ForegroundColor Cyan
    Write-Host "2. Click the running workflow 'Build APK'" -ForegroundColor Cyan
    Write-Host "3. Wait for it to finish (5-10 mins)" -ForegroundColor Cyan
    Write-Host "4. Click the completed workflow" -ForegroundColor Cyan
    Write-Host "5. Download the APK from Artifacts" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "OR use PWA Builder (no wait):" -ForegroundColor Yellow
    Write-Host "1. Deploy to Vercel/Netlify" -ForegroundColor Cyan
    Write-Host "2. Paste URL in https://pwabuilder.com" -ForegroundColor Cyan
} else {
    Write-Host "Push failed. Check your token has 'repo' scope." -ForegroundColor Red
}
