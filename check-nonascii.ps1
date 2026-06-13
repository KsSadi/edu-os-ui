$path = 'e:\Project\eduOS\school\admin_panel\admin-dashboard.html'
$bytes = [System.IO.File]::ReadAllBytes($path)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text -split "`n"
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    # Check for non-ASCII chars (codepoint > 127) that might be wrong
    if ($line -cmatch '[^\x00-\x7E]') {
        # Filter out lines that only have &# entities or known OK content
        $stripped = $line -replace '&#x[0-9A-Fa-f]+;', '' -replace '&[a-z]+;', '' -replace '<[^>]+>', '' -replace '\s', ''
        if ($stripped -cmatch '[^\x00-\x7E]') {
            Write-Host ("L" + ($i+1) + ": " + $line.Trim())
        }
    }
}
