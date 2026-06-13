$dir = 'E:\Project\eduOS\school\admin_panel'
$files = Get-ChildItem $dir -Filter '*.html'
$count = 0
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $orig = $c

    # Fix topbar-placeholder -> topbar
    $c = $c -replace 'topbar-placeholder', 'topbar'

    # Remove any remaining hardcoded sidebar
    $c = [regex]::Replace($c, '(?s)<aside[^>]*class="sidebar"[^>]*>.*?</aside>', '')

    # Ensure empty sidebar placeholder exists before <main class="main">
    if ($c -notmatch '<aside class="sidebar"') {
        $c = $c -replace '<main class="main">', '<aside class="sidebar"></aside><main class="main">'
    }

    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Total fixed: $count"
