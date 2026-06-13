# Fix U+FFFD replacement characters and remaining issues in admin panel HTML
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$adminDir = 'e:\Project\eduOS\school\admin_panel'
$fffd = [char]0xFFFD  # Unicode Replacement Character

function Fix-Fffd {
    param([string]$path)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $orig = $content

    # Replace year-range patterns first: 2024[FFFD]25 -> 2024-25
    $content = $content -replace ('20\d\d' + $fffd + '\d\d'), { $args[0].Value -replace $fffd, '&#x2013;' }

    # Replace all remaining FFFD with middle dot
    $content = $content.Replace([string]$fffd, '&middot;')

    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "  FIXED  $($path | Split-Path -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "  ok     $($path | Split-Path -Leaf)" -ForegroundColor DarkGray
    }
}

Write-Host ''
Write-Host '=== Fixing FFFD replacement chars ===' -ForegroundColor Cyan

Get-ChildItem -Path $adminDir -Filter '*.html' -Recurse | Sort-Object Name | ForEach-Object {
    Fix-Fffd -path $_.FullName
}

Write-Host ''
Write-Host 'Done!' -ForegroundColor Cyan
