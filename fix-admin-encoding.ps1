# ─────────────────────────────────────────────────────────────────
# Fix admin panel HTML files – replace ? placeholders with correct
# characters using HTML entities (ASCII-safe script).
# Run: powershell -ExecutionPolicy Bypass -File fix-admin-encoding.ps1
# ─────────────────────────────────────────────────────────────────
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$adminDir = "e:\Project\eduOS\school\admin_panel"

function Fix-Html {
    param([string]$path, [System.Collections.Specialized.OrderedDictionary]$map)
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $orig    = $content
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

# ── COMMON replacements applied to ALL admin HTML files ──────────
$common = [ordered]@{

    # Page title separator
    ' ? Dhaka High School Admin'  = ' &middot; Dhaka High School Admin'

    # Session year en-dash
    'Session 2024?25'  = 'Session 2024&#x2013;25'
    '2024?25'          = '2024&#x2013;25'

    # Alert / modal close buttons
    'onclick="this.parentElement.remove()">?</button>' = 'onclick="this.parentElement.remove()">&times;</button>'
    'class="alert-close">?</button>'                   = 'class="alert-close">&times;</button>'
    'class="modal-close">?</button>'                   = 'class="modal-close">&times;</button>'

    # Currency Taka
    '>?4.'   = '>&#x09F3;4.'
    '>?3.'   = '>&#x09F3;3.'
    '>?5.'   = '>&#x09F3;5.'
    '>?2.'   = '>&#x09F3;2.'
    '>?1,'   = '>&#x09F3;1,'
    '>?1.'   = '>&#x09F3;1.'
    '"?4.'   = '"&#x09F3;4.'
    '"?3.'   = '"&#x09F3;3.'
    '"?5.'   = '"&#x09F3;5.'
    '"?2.'   = '"&#x09F3;2.'
    '?1,200' = '&#x09F3;1,200'
    '?500'   = '&#x09F3;500'
    '?800'   = '&#x09F3;800'
    '?600'   = '&#x09F3;600'
    '?4.2L'  = '&#x09F3;4.2L'
    '?3.8L'  = '&#x09F3;3.8L'
    '?3.6L'  = '&#x09F3;3.6L'

    # Pagination display range
    'Showing 1?20'  = 'Showing 1&#x2013;20'
    'Showing 1?50'  = 'Showing 1&#x2013;50'
    'Showing 1?25'  = 'Showing 1&#x2013;25'

    # Class-section separator
    'Class I?A'    = 'Class I-A'
    'Class II?B'   = 'Class II-B'
    'Class V?A'    = 'Class V-A'
    'Class VI?C'   = 'Class VI-C'
    'Class VII?A'  = 'Class VII-A'
    'Class VIII?B' = 'Class VIII-B'
    'Class IX?A'   = 'Class IX-A'
    'Class IX?B'   = 'Class IX-B'
    'Class X?A'    = 'Class X-A'
    'Class X?B'    = 'Class X-B'
    'Class XI?B'   = 'Class XI-B'
    'Class XII?A'  = 'Class XII-A'
    'Class 6?A'    = 'Class 6-A'
    'Class 7?A'    = 'Class 7-A'
    'Class 8?A'    = 'Class 8-A'
    'Class 8?B'    = 'Class 8-B'
    'Class 9?A'    = 'Class 9-A'
    'Class 10?A'   = 'Class 10-A'

    # Status badges
    '>? Good<'    = '>&#x2713; Good<'
    '>? Low<'     = '>&#x26A0; Low<'
    '>? Fair<'    = '>~ Fair<'
    '>? Paid<'    = '>&#x2713; Paid<'
    '>? Pending<' = '>&#x23F3; Pending<'
    '>? Overdue<' = '>&#x26A0; Overdue<'

    # Common button/link labels
    '>?? Export Report<'         = '>&#x1F4CA; Export Report<'
    '>? Export Report<'          = '>&#x1F4CA; Export Report<'
    '>? Bulk Import<'            = '>&#x1F4E5; Bulk Import<'
    '>?? Bulk Import<'           = '>&#x1F4E5; Bulk Import<'
    '>?? Download Year Report<'  = '>&#x1F4E5; Download Year Report<'
    '>? Download Year Report<'   = '>&#x1F4E5; Download Year Report<'
    '>?? Download<'              = '>&#x1F4E5; Download<'
    '>? Download<'               = '>&#x1F4E5; Download<'
    '>?? Export Selected<'       = '>&#x1F4CA; Export Selected<'
    '>? Export Selected<'        = '>&#x1F4CA; Export Selected<'
    '>?? Send Message<'          = '>&#x2709;&#xFE0F; Send Message<'
    '>? Send Message<'           = '>&#x2709;&#xFE0F; Send Message<'
    '>?? Change Class<'          = '>&#x1F504; Change Class<'
    '>? Change Class<'           = '>&#x1F504; Change Class<'
    '>?? Withdraw<'              = '>&#x274C; Withdraw<'
    '>? Withdraw<'               = '>&#x274C; Withdraw<'
    '>?? Promote All Students<'  = '>&#x1F393; Promote All Students<'
    '>? Promote All Students<'   = '>&#x1F393; Promote All Students<'
    '>?? View Reports<'          = '>&#x1F4CA; View Reports<'
    '>? View Reports<'           = '>&#x1F4CA; View Reports<'
    '>?? Print<'                 = '>&#x1F5A8;&#xFE0F; Print<'
    '>? Print<'                  = '>&#x1F5A8;&#xFE0F; Print<'

    # Modal title icons
    '">? Edit '    = '">&#x270F;&#xFE0F; Edit '
    '">?? Edit '   = '">&#x270F;&#xFE0F; Edit '
    '">? Delete '  = '">&#x1F5D1;&#xFE0F; Delete '
    '">?? Delete ' = '">&#x1F5D1;&#xFE0F; Delete '
    '">? Confirm'  = '">&#x26A0;&#xFE0F; Confirm'
    '">?? Confirm' = '">&#x26A0;&#xFE0F; Confirm'

    # Inline text separators
    ' ? via '               = ' &middot; via '
    ' ? by Admin'           = ' &middot; by Admin'
    'Fee overdue ? '        = 'Fee overdue &middot; '
    'Low attendance ? '     = 'Low attendance &middot; '
    'Fee Collection ? 2025' = 'Fee Collection &middot; 2025'
    'Collection ? 2025'     = 'Collection &middot; 2025'
    '? Term '               = '&middot; Term '

    # Input placeholder ellipsis
    'Student ID?'  = 'Student ID&hellip;'
    'Name, Roll?'  = 'Name, Roll&hellip;'

    # View Full arrow and chart labels
    'View Full ?'  = 'View Full &#x2192;'
    'View Full ??'  = 'View Full &#x2192;'
    'Mar ?'        = 'Mar &#x25B2;'

    # Page eyebrow labels
    '>????? People<' = '>&#x1F9D1;&#x200D;&#x1F393; People<'
    '>?? Academics<' = '>&#x1F4DA; Academics<'
    '>? Finance<'    = '>&#x1F4B0; Finance<'
    '>?? Finance<'   = '>&#x1F4B0; Finance<'
    '>? Settings<'   = '>&#x2699;&#xFE0F; Settings<'
    '>? System<'     = '>&#x2699;&#xFE0F; System<'
    '>? People<'     = '>&#x1F465; People<'
    '>? Exams<'      = '>&#x1F4DD; Exams<'
    '>?? Exams<'     = '>&#x1F4DD; Exams<'
    '>? Community<'  = '>&#x1F310; Community<'
    '>?? Community<' = '>&#x1F310; Community<'
    '>? Market<'     = '>&#x1F6CD;&#xFE0F; Market<'
    '>?? Market<'    = '>&#x1F6CD;&#xFE0F; Market<'
    '>? Contests<'   = '>&#x1F3C6; Contests<'
    '>?? Contests<'  = '>&#x1F3C6; Contests<'
    '>? AI<'         = '>&#x1F916; AI<'
    '>? AI Tools<'   = '>&#x1F916; AI Tools<'
    '>?? AI Tools<'  = '>&#x1F916; AI Tools<'
    '>? Support<'    = '>&#x1F198; Support<'
    '>?? Support<'   = '>&#x1F198; Support<'
    '>? Reports<'    = '>&#x1F4CA; Reports<'
    '>?? Reports<'   = '>&#x1F4CA; Reports<'

    # JavaScript strings
    "'? Task marked complete'"  = "'&#x2705; Task marked complete'"
    "'? Task reopened'"         = "'&#x21BA; Task reopened'"
    "icon='?'"                  = "icon='&#x2139;&#xFE0F;'"
    "'?? Exam details'"         = "'&#x1F4DD; Exam details'"
    "Preparing export?"         = "Preparing export&hellip;"
    "'Download ready!','?'"     = "'Download ready!','&#x2705;'"
    "'Download ready!','??'"    = "'Download ready!','&#x2705;'"
    "'? Report generating'"     = "'&#x1F4CA; Report generating'"
    "'?? Report generating'"    = "'&#x1F4CA; Report generating'"
    "textContent = done ? '?' : '';" = "textContent = done ? '&#x2713;' : '';"
}

# ── Dashboard-specific fixes ─────────────────────────────────────
$dashFix = [ordered]@{
    'Good morning, Mr. Rahman ??'  = 'Good morning, Mr. Rahman &#x2600;&#xFE0F;'
    'Good morning, Mr. Rahman ?'   = 'Good morning, Mr. Rahman &#x2600;&#xFE0F;'
    'Tuesday, 25 February 2025 ? Session' = 'Tuesday, 25 February 2025 &middot; Session'

    # Quick actions
    '<div class="qa-icon" style="background:#E0F2FE;color:#0369A1;">?</div>'        = '<div class="qa-icon" style="background:#E0F2FE;color:#0369A1;">&#x1F464;</div>'
    '<div class="qa-icon" style="background:#D1FAE5;color:#065F46;">??</div>'       = '<div class="qa-icon" style="background:#D1FAE5;color:#065F46;">&#x2705;</div>'
    '<div class="qa-icon" style="background:#FEF3C7;color:#92400E;">??</div>'       = '<div class="qa-icon" style="background:#FEF3C7;color:#92400E;">&#x1F4B5;</div>'
    '<div class="qa-icon" style="background:#EDE9FE;color:#5B21B6;">??</div>'       = '<div class="qa-icon" style="background:#EDE9FE;color:#5B21B6;">&#x1F4E2;</div>'
    '<div class="qa-icon" style="background:#CCFBF1;color:#0F766E;">??</div>'       = '<div class="qa-icon" style="background:#CCFBF1;color:#0F766E;">&#x1F4CA;</div>'
    '<div class="qa-icon" style="background:var(--bg);color:var(--muted);">?</div>' = '<div class="qa-icon" style="background:var(--bg);color:var(--muted);">&#x2699;&#xFE0F;</div>'

    # Stat card icons row 1
    '<div class="stat-icon-box">?????</div>
        <div class="stat-num">1,248</div>' = '<div class="stat-icon-box">&#x1F9D1;&#x200D;&#x1F393;</div>
        <div class="stat-num">1,248</div>'
    '<div class="stat-icon-box">?</div>
        <div class="stat-num">89.4%</div>' = '<div class="stat-icon-box">&#x1F4CA;</div>
        <div class="stat-num">89.4%</div>'
    '<div class="stat-icon-box">??</div>
        <div class="stat-num">?4.2L</div>' = '<div class="stat-icon-box">&#x1F4B0;</div>
        <div class="stat-num">&#x09F3;4.2L</div>'
    '<div class="stat-icon-box">?</div>
        <div class="stat-num">47</div>'    = '<div class="stat-icon-box">&#x26A0;&#xFE0F;</div>
        <div class="stat-num">47</div>'

    # Stat card icons row 2
    '<div class="stat-icon-box">?????</div>
        <div class="stat-num">68</div>'    = '<div class="stat-icon-box">&#x1F469;&#x200D;&#x1F3EB;</div>
        <div class="stat-num">68</div>'
    '<div class="stat-icon-box">??</div>
        <div class="stat-num">32</div>'    = '<div class="stat-icon-box">&#x1F3EB;</div>
        <div class="stat-num">32</div>'
    '<div class="stat-icon-box">??</div>
        <div class="stat-num">6</div>'     = '<div class="stat-icon-box">&#x1F4DD;</div>
        <div class="stat-num">6</div>'
    '<div class="stat-icon-box">??</div>
        <div class="stat-num">3</div>'     = '<div class="stat-icon-box">&#x1F4E5;</div>
        <div class="stat-num">3</div>'

    # Stat deltas
    'delta-up">? +12 this month</div>'       = 'delta-up">&#x25B2; +12 this month</div>'
    'delta-up">? +2.1% vs yesterday</div>'   = 'delta-up">&#x25B2; +2.1% vs yesterday</div>'
    'delta-down">? +8 since last week</div>' = 'delta-down">&#x25BC; +8 since last week</div>'
    'delta-up">? Pending review</div>'       = 'delta-up">&#x23F3; Pending review</div>'

    # Alert icons
    '<span class="alert-icon">??</span>'  = '<span class="alert-icon">&#x1F6A8;</span>'
    '<span class="alert-icon">?</span>'   = '<span class="alert-icon">&#x26A0;&#xFE0F;</span>'

    # Activity feed icons
    '<div class="activity-icon" style="background:var(--green-light);">??</div>'  = '<div class="activity-icon" style="background:var(--green-light);">&#x1F4B0;</div>'
    '<div class="activity-icon" style="background:var(--blue-light);">??</div>'   = '<div class="activity-icon" style="background:var(--blue-light);">&#x2705;</div>'
    '<div class="activity-icon" style="background:var(--amber-light);">??</div>'  = '<div class="activity-icon" style="background:var(--amber-light);">&#x1F4CB;</div>'
    '<div class="activity-icon" style="background:var(--purple-light);">??</div>' = '<div class="activity-icon" style="background:var(--purple-light);">&#x1F4E2;</div>'
    '<div class="activity-icon" style="background:var(--red-light);">?</div>'     = '<div class="activity-icon" style="background:var(--red-light);">&#x26A0;&#xFE0F;</div>'

    # Inline amounts and separators
    'paid February tuition ?1,200' = 'paid February tuition &#x09F3;1,200'
    '3 hours ago ? by Admin'       = '3 hours ago &middot; by Admin'

    # Task checkmark
    '<div class="task-check done" onclick="toggleTask(this)">?</div>' = '<div class="task-check done" onclick="toggleTask(this)">&#x2713;</div>'

    # JS toggleTask
    "showToast(done ? '? Task marked complete' : '? Task reopened')" = "showToast(done ? '&#x2705; Task marked complete' : '&#x21BA; Task reopened')"
}

# ── Students-specific fixes ──────────────────────────────────────
$stuFix = [ordered]@{
    '<div class="page-eyebrow">????? People</div>' = '<div class="page-eyebrow">&#x1F9D1;&#x200D;&#x1F393; People</div>'
    '<div class="page-eyebrow">? People</div>'     = '<div class="page-eyebrow">&#x1F465; People</div>'

    '<span class="sb-search-icon">??</span>'  = '<span class="sb-search-icon">&#x1F50D;</span>'
    '<span class="sb-search-icon">?</span>'   = '<span class="sb-search-icon">&#x1F50D;</span>'

    '<button class="vt-btn" id="btnGrid" onclick="setView(''grid'')" title="Grid view">?</button>'    = '<button class="vt-btn" id="btnGrid" onclick="setView(''grid'')" title="Grid view">&#x229E;</button>'
    '<button class="vt-btn on" id="btnList" onclick="setView(''list'')" title="List view">?</button>' = '<button class="vt-btn on" id="btnList" onclick="setView(''list'')" title="List view">&#x2630;</button>'

    '<button class="pg-btn">?</button>
          <button class="pg-btn on">1</button>'  = '<button class="pg-btn">&lsaquo;</button>
          <button class="pg-btn on">1</button>'
    '<button class="pg-btn">63</button>
          <button class="pg-btn">?</button>'     = '<button class="pg-btn">63</button>
          <button class="pg-btn">&rsaquo;</button>'
    '<span style="padding:0 4px;color:var(--muted);">?</span>' = '<span style="padding:0 4px;color:var(--muted);">&hellip;</span>'

    '<button class="modal-close" onclick="closeModal(''exportModal'')">?</button>' = '<button class="modal-close" onclick="closeModal(''exportModal'')">&times;</button>'
    'Preparing export?'          = 'Preparing export&hellip;'
    "'Download ready!','?'"      = "'Download ready!','&#x2705;'"
}

# ── Run ──────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=== Fixing admin panel HTML files ===" -ForegroundColor Cyan

$files = Get-ChildItem -Path $adminDir -Filter "*.html" -Recurse | Sort-Object Name

foreach ($file in $files) {
    $path = $file.FullName
    $map  = [ordered]@{}
    foreach ($e in $common.GetEnumerator()) { $map[$e.Key] = $e.Value }

    switch ($file.Name) {
        'admin-dashboard.html' { foreach ($e in $dashFix.GetEnumerator()) { $map[$e.Key] = $e.Value } }
        'admin-students.html'  { foreach ($e in $stuFix.GetEnumerator())  { $map[$e.Key] = $e.Value } }
    }

    Fix-Html -path $path -map $map
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
