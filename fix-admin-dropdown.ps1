$dir = 'E:\Project\eduOS\school\admin_panel'
$files = Get-ChildItem $dir -Filter '*.html'
$count = 0

foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $orig = $c

    # Remove the stale "Profile dropdown" JS block and doLogout function
    # Pattern: from "// Profile dropdown" to end of the block (before </script> or next //)
    $c = [regex]::Replace($c, '(?s)\s*//\s*Profile dropdown\s*\n.*?function doLogout\(\) \{.*?\}\s*', "`n", 'Singleline')

    # Also remove standalone profileBtn/profileDropdown variable declarations that may crash
    $c = [regex]::Replace($c, '(?m)^.*?const profileBtn\s*=.*?\n', '')
    $c = [regex]::Replace($c, '(?m)^.*?const profileDropdown\s*=.*?\n', '')
    $c = [regex]::Replace($c, '(?m)^.*?const profileWrap\s*=.*?\n', '')
    $c = [regex]::Replace($c, '(?m)^.*?profileBtn\.addEventListener.*?\n', '')
    $c = [regex]::Replace($c, '(?s)profileDropdown\.classList\.toggle.*?;\s*\}\);\s*', '')
    $c = [regex]::Replace($c, '(?s)document\.addEventListener\(''click'',.*?profileDropdown\.classList\.remove.*?\}\);\s*', '')

    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.Encoding]::UTF8)
        $count++
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "Total fixed: $count"
