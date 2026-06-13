$path = 'e:\Project\eduOS\school\admin_panel\admin-dashboard.html'
$text = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
$lines = $text -split "`n"
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match '\?') {
        Write-Host ("L" + ($i+1) + ": " + $line.Trim())
    }
}
