$adminDir = 'e:\Project\eduOS\school\admin_panel'
$badString = '$args[0].Value -replace $fffd'

Get-ChildItem -Path $adminDir -Filter '*.html' -Recurse | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    if ($text.Contains($badString)) {
        Write-Host "CORRUPTED: $($_.Name)" -ForegroundColor Red
        # Show the corrupt lines
        $lines = $text -split "`n"
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($lines[$i].Contains($badString)) {
                Write-Host ("  L" + ($i+1) + ": " + $lines[$i].Trim())
            }
        }
    }
}
