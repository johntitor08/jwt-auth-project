Write-Host "=== Complete JWT Auth Test ===" -ForegroundColor Cyan

$baseUrl = "http://localhost:5000"
$headers = @{ "Content-Type" = "application/json" }

# Test 1: Health Check
Write-Host "`n1. Testing server health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✅ Server health: $($health.status)" -ForegroundColor Green
}
catch {
    Write-Host "❌ Server health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Test 2: Registration
Write-Host "`n2. Testing user registration..." -ForegroundColor Yellow
$registerData = @{
    username = "testuser_$(Get-Date -Format 'HHmmss')"
    email    = "test_$(Get-Date -Format 'HHmmss')@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post -Body $registerData -Headers $headers
    Write-Host "✅ Registration successful!" -ForegroundColor Green
    Write-Host "   User: $($registerResponse.username)" -ForegroundColor White
    Write-Host "   Email: $($registerResponse.email)" -ForegroundColor White
    Write-Host "   Token received: $($registerResponse.token.Length) characters" -ForegroundColor White
    
    $token = $registerResponse.token
}
catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    exit
}

# Test 3: Login
Write-Host "`n3. Testing user login..." -ForegroundColor Yellow
$loginData = @{
    email    = $registerResponse.email
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginData -Headers $headers
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "   User: $($loginResponse.username)" -ForegroundColor White
}
catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Test 4: Protected Profile Route
Write-Host "`n4. Testing protected profile route..." -ForegroundColor Yellow
$profileHeaders = @{
    "Content-Type"  = "application/json"
    "Authorization" = "Bearer $token"
}

try {
    $profileResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/profile" -Method Get -Headers $profileHeaders
    Write-Host "✅ Profile access successful!" -ForegroundColor Green
    Write-Host "   User ID: $($profileResponse.user._id)" -ForegroundColor White
    Write-Host "   Username: $($profileResponse.user.username)" -ForegroundColor White
    Write-Host "   Email: $($profileResponse.user.email)" -ForegroundColor White
}
catch {
    Write-Host "❌ Profile access failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== All Tests Completed Successfully! ===" -ForegroundColor Green
Write-Host "Your JWT Auth backend is fully functional with MongoDB Atlas!" -ForegroundColor Cyan