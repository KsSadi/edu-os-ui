$adminDir = 'e:\Project\eduOS\school\admin_panel'
$fffd = [char]0xFFFD
$issues = 0

Get-ChildItem -Path $adminDir -Filter '*.html' -Recurse | Sort-Object Name | ForEach-Object {
    $path = $_.FullName
    $text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $lines = $text -split "`n"

    # Check for remaining FFFD chars
    $hasFffd = $text.IndexOf($fffd) -ge 0

    # Check for ?? patterns in HTML context (icon boxes, etc.) - not in JS ternary
    $htmlQQ = $false
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        # Skip pure JS lines with ternary operators
        if ($line -match '\?\?' -and $line -notmatch '^\s*//') {
            $htmlQQ = $true
            break
        }
    }

    if ($hasFffd -or $htmlQQ) {
        Write-Host "ISSUE: $($_.Name)" -ForegroundColor Yellow
        if ($hasFffd) { Write-Host "  Has FFFD chars" -ForegroundColor Red }
        if ($htmlQQ) {
            for ($i = 0; $i -lt $lines.Count; $i++) {
                if ($lines[$i] -match '\?\?' -and $lines[$i] -notmatch '^\s*//') {
                    Write-Host ("  L" + ($i+1) + ": " + $lines[$i].Trim()) -ForegroundColor DarkYellow
                }
            }
        }
        $issues++
    }
}

if ($issues -eq 0) {
    Write-Host 'All files clean!' -ForegroundColor Green
} else {
    Write-Host "`n$issues files with issues" -ForegroundColor Red
}
