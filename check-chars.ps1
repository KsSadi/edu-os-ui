$path = 'e:\Project\eduOS\school\admin_panel\admin-dashboard.html'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$lines = $text -split "`n"

# Check line 6 (title) for the exact non-ASCII char
$line6 = $lines[5]  # 0-indexed
foreach ($ch in $line6.ToCharArray()) {
    $cp = [int]$ch
    if ($cp -gt 127) {
        Write-Host ("  U+" + $cp.ToString('X4') + " '" + $ch + "'")
    }
}
Write-Host "---"
# Check line 160
$line160 = $lines[159]
foreach ($ch in $line160.ToCharArray()) {
    $cp = [int]$ch
    if ($cp -gt 127) {
        Write-Host ("  U+" + $cp.ToString('X4') + " '" + $ch + "'")
    }
}
