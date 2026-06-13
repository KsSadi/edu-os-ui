# Phase 2: Fix PS-code corruption + remaining ?? patterns
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$adminDir = 'e:\Project\eduOS\school\admin_panel'

function Fix-Html {
    param([string]$path, [System.Collections.Specialized.OrderedDictionary]$map)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $orig = $content
    foreach ($entry in $map.GetEnumerator()) {
        $content = $content.Replace($entry.Key, $entry.Value)
    }
    if ($content -ne $orig) {
        [System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "  FIXED  $($path | Split-Path -Leaf)" -ForegroundColor Green
    } else {
        Write-Host "  ok     $($path | Split-Path -Leaf)" -ForegroundColor DarkGray
    }
}

$phase2 = [ordered]@{

    # ── PS code corruption fix ─────────────────────────────────────
    ' $args[0].Value -replace $fffd, ''&#x2013;'' ' = '2024&#x2013;25'

    # ── Option dropdowns needing distinct year values ──────────────
    '2024&#x2013;25 (Next &middot; Draft)' = '2025&#x2013;26 (Next &middot; Draft)'
    '2024&#x2013;25 (Archived)'            = '2023&#x2013;24 (Archived)'
    '2024&#x2013;25 (Upcoming)'            = '2025&#x2013;26 (Upcoming)'

    # ── Tab buttons ────────────────────────────────────────────────
    '>?? Fees<'                      = '>&#x1F4B0; Fees<'
    '>?? Documents<'                 = '>&#x1F4C4; Documents<'
    '>?? Activity Log<'              = '>&#x1F4CB; Activity Log<'
    '>?? Academic<'                  = '>&#x1F4DA; Academic<'
    '>?? Academic Placement<'        = '>&#x1F4DA; Academic Placement<'
    '>?? Notes<'                     = '>&#x1F4DD; Notes<'
    '>?? Attendance<'                = '>&#x1F4CA; Attendance<'
    '>?? Result<'                    = '>&#x1F4CA; Result<'
    '>?? Results<'                   = '>&#x1F4CA; Results<'
    '>?? Schedule<'                  = '>&#x1F4C5; Schedule<'
    '>?? Messages<'                  = '>&#x2709;&#xFE0F; Messages<'
    '>?? Fee<'                       = '>&#x1F4B0; Fee<'
    '>?? Notices<'                   = '>&#x1F4E2; Notices<'
    '>?? Marks<'                     = '>&#x1F4DD; Marks<'
    '>?? Overview<'                  = '>&#x1F4CA; Overview<'
    '>?? General<'                   = '>&#x2699;&#xFE0F; General<'
    '>?? Security<'                  = '>&#x1F512; Security<'
    '>?? Roles<'                     = '>&#x1F465; Roles<'
    '>?? Permissions<'               = '>&#x1F510; Permissions<'
    '>????? Teacher Assignments<'    = '>&#x1F469;&#x200D;&#x1F3EB; Teacher Assignments<'
    '>????? Assign Teacher<'         = '>&#x1F469;&#x200D;&#x1F3EB; Assign Teacher<'

    # ── Card/section titles ────────────────────────────────────────
    '>?? Personal Information<'      = '>&#x1F464; Personal Information<'
    '>?? Notes &amp; Flags<'         = '>&#x1F4DD; Notes &amp; Flags<'
    '>?? Annual Exam<'               = '>&#x1F4DD; Annual Exam<'
    '>?? GPA History<'               = '>&#x1F4CA; GPA History<'
    '>?? Attendance &middot;<'       = '>&#x1F4CA; Attendance &middot;<'
    '>?? Attendance Summary<'        = '>&#x1F4CA; Attendance Summary<'
    '>?? Fee Payment History<'       = '>&#x1F4B0; Fee Payment History<'
    '>?? Fee Summary<'               = '>&#x1F4B0; Fee Summary<'
    '>?? Uploaded Documents<'        = '>&#x1F4C4; Uploaded Documents<'
    '>?? Activity &amp; Change Log<' = '>&#x1F4CB; Activity &amp; Change Log<'
    '>?? Add Note<'                  = '>&#x1F4DD; Add Note<'
    '>???????? Guardian Details<'    = '>&#x1F46A; Guardian Details<'
    '>? Annual Exam<'                = '>&#x1F4DD; Annual Exam<'
    '>? GPA History<'                = '>&#x1F4CA; GPA History<'
    '>? Fee Payment History<'        = '>&#x1F4B0; Fee Payment History<'
    '>? Add Note<'                   = '>&#x1F4DD; Add Note<'
    '>??? Fee Types<'                = '>&#x1F4B0; Fee Types<'
    '>? Fee Types<'                  = '>&#x1F4B0; Fee Types<'

    # ── Dropdown menu items ────────────────────────────────────────
    '>?? View Profile<'              = '>&#x1F464; View Profile<'
    '>? View Profile<'               = '>&#x1F464; View Profile<'
    '>?? Edit<'                      = '>&#x270F;&#xFE0F; Edit<'
    '>? Edit<'                       = '>&#x270F;&#xFE0F; Edit<'
    '>?? Print ID Card<'             = '>&#x1F5A8;&#xFE0F; Print ID Card<'
    '>? Print ID Card<'              = '>&#x1F5A8;&#xFE0F; Print ID Card<'
    '>?? Fee History<'               = '>&#x1F4B0; Fee History<'
    '>? Fee History<'                = '>&#x1F4B0; Fee History<'
    '>?? Assign to Class<'           = '>&#x1F3EB; Assign to Class<'
    '>? Assign to Class<'            = '>&#x1F3EB; Assign to Class<'
    '>?? Delete<'                    = '>&#x1F5D1;&#xFE0F; Delete<'
    '>? Delete<'                     = '>&#x1F5D1;&#xFE0F; Delete<'
    '>?? Copy From Last Year<'       = '>&#x1F4CB; Copy From Last Year<'
    '>? Copy From Last Year<'        = '>&#x1F4CB; Copy From Last Year<'
    '>?? Send SMS Reminder<'         = '>&#x1F4F1; Send SMS Reminder<'
    '>? Send SMS Reminder<'          = '>&#x1F4F1; Send SMS Reminder<'
    '>?? Start Live Chat<'           = '>&#x1F4AC; Start Live Chat<'
    '>? Start Live Chat<'            = '>&#x1F4AC; Start Live Chat<'
    '>?? Submit Ticket<'             = '>&#x1F4E8; Submit Ticket<'
    '>? Submit Ticket<'              = '>&#x1F4E8; Submit Ticket<'
    '>?? View Reports<'              = '>&#x1F4CA; View Reports<'
    '>? View Reports<'               = '>&#x1F4CA; View Reports<'
    '>?? Apply Filter<'              = '>&#x1F50D; Apply Filter<'
    '>? Apply Filter<'               = '>&#x1F50D; Apply Filter<'

    # ── Subject card icons ─────────────────────────────────────────
    '<div class="sc-icon" style="background:#FEF3C7;">??</div>' = '<div class="sc-icon" style="background:#FEF3C7;">&#x1F4DA;</div>'
    '<div class="sc-icon" style="background:#DBEAFE;">??</div>' = '<div class="sc-icon" style="background:#DBEAFE;">&#x1F52C;</div>'
    '<div class="sc-icon" style="background:#EDE9FE;">??</div>' = '<div class="sc-icon" style="background:#EDE9FE;">&#x2795;</div>'
    '<div class="sc-icon" style="background:#D1FAE5;">??</div>' = '<div class="sc-icon" style="background:#D1FAE5;">&#x1F30D;</div>'
    '<div class="sc-icon" style="background:#CFFAFE;">??</div>' = '<div class="sc-icon" style="background:#CFFAFE;">&#x1F4BB;</div>'
    '<div class="sc-icon" style="background:#EEF2FF;">??</div>' = '<div class="sc-icon" style="background:#EEF2FF;">&#x1F3A8;</div>'
    '<div class="sc-icon" style="background:#FEF9EE;">??</div>' = '<div class="sc-icon" style="background:#FEF9EE;">&#x1F4DA;</div>'
    '<div class="sc-icon" style="background:#FCE7F3;">??</div>' = '<div class="sc-icon" style="background:#FCE7F3;">&#x1FA78;</div>'

    # ── Support page icons ─────────────────────────────────────────
    '<div class="cc-icon">??</div>'      = '<div class="cc-icon">&#x1F4E7;</div>'
    '<div class="cc-icon">?</div>'       = '<div class="cc-icon">&#x1F4E7;</div>'
    '<span class="cat-icon">??</span>'   = '<span class="cat-icon">&#x1F41B;</span>'
    '<span class="cat-icon">?</span>'    = '<span class="cat-icon">&#x1F41B;</span>'
    '<div class="upload-zone-icon">??</div>' = '<div class="upload-zone-icon">&#x1F4CE;</div>'
    '<div class="upload-zone-icon">?</div>'  = '<div class="upload-zone-icon">&#x1F4CE;</div>'

    # ── Toast icon arguments ───────────────────────────────────────
    ",'?????'"  = ",'&#x1F9D1;&#x200D;&#x1F393;'"
    ",'??')"    = ",'&#x2705;')"
    ",'???')"   = ",'&#x2705;')"

    # ── Currency ───────────────────────────────────────────────────
    '? in Lakhs' = 'in Lakhs'
    '? 12,000'   = '&#x09F3;12,000'
    '? 47,600'   = '&#x09F3;47,600'
    '?47,600'    = '&#x09F3;47,600'

    # ── Hero badge ─────────────────────────────────────────────────
    '>?? Session' = '>&#x1F3EB; Session'
    '>? Session'  = '>&#x1F3EB; Session'

    # ── Search icon ────────────────────────────────────────────────
    '<span class="sb-search-icon">??</span>' = '<span class="sb-search-icon">&#x1F50D;</span>'
    '<span class="sb-search-icon">?</span>'  = '<span class="sb-search-icon">&#x1F50D;</span>'

    # ── Misc large icons ───────────────────────────────────────────
    '<div style="font-size:2.5rem;margin-bottom:14px;">??</div>' = '<div style="font-size:2.5rem;margin-bottom:14px;">&#x26A0;&#xFE0F;</div>'
    '<div style="font-size:2rem;margin-bottom:6px;opacity:.4;">??</div>' = '<div style="font-size:2rem;margin-bottom:6px;opacity:.4;">&#x1F4CE;</div>'
    '<div style="font-size:2rem;margin-bottom:6px;">??</div>'   = '<div style="font-size:2rem;margin-bottom:6px;">&#x1F4C4;</div>'

    # ── Bengali first names array ──────────────────────────────────
    "const BN_FIRST = ['??????','??????','??????','??????','????','??????','?????','????????','??????','???????','??????','???????'];" = "const BN_FIRST = ['Rahim','Karim','Hasan','Ahmed','Riya','Nasrin','Fatima','Abdullah','Sumaiya','Tahmina','Shakib','Mustafiz'];"

    # ── Bengali name in student profile ───────────────────────────
    'Farhan Islam (?????? ?????)' = 'Farhan Islam'

    # ── JS icon fields ─────────────────────────────────────────────
    "{icon:'??',"   = "{icon:'&#x270F;&#xFE0F;',"
    "{icon:'?????'," = "{icon:'&#x1F469;&#x200D;&#x1F3EB;',"

    # ── Attendance overall label ───────────────────────────────────
    'Overall Attendance 2024&#x2013;25' = 'Overall Attendance 2024&#x2013;25'
}

Write-Host ''
Write-Host '=== Phase 2: Fix PS-code corruption and remaining ?? ===' -ForegroundColor Cyan

Get-ChildItem -Path $adminDir -Filter '*.html' -Recurse | Sort-Object Name | ForEach-Object {
    Fix-Html -path $_.FullName -map $phase2
}

Write-Host ''
Write-Host 'Done!' -ForegroundColor Cyan
