---
layout: guide
title: "Exporting CSV"
description: "Exporting CSV"
permalink: /guide/export/
---


<p>
ABM Warranty allows you to export the currently visible device list to a CSV
file for reporting, audits, and integration with external workflows.
Exports are always scoped to the <strong>active tenant</strong>.
</p>

<p>
The exported data reflects the current application state, including active
filters, search text, and sort order.
</p>

<h3>Tenant-Aware Exports</h3>

<p>
In multi-credential environments, each credential maps to a single tenant.
CSV exports always reflect the currently selected tenant and include only
that tenant’s devices.
</p>

<p>
The default export filename includes the tenant name to clearly distinguish
exports when working with multiple organizations.
</p>

<h3>Included Fields</h3>

<p>
Each exported CSV row represents a single device and includes:
</p>

<ul>
    <li>Serial number</li>
    <li>Device make</li>
    <li>Device model</li>
    <li>Standard warranty start date</li>
    <li>Standard warranty end date</li>
    <li>AppleCare+ start date (if present)</li>
    <li>AppleCare+ end date (if present)</li>
    <li>Computed warranty status</li>
    <li>Last Imported timestamp</li>
    <li>Last Seen in Apple Business Manager</li>
    <li>Inactive flag</li>
    <li>No Data flag</li>
</ul>

<p>
All dates are exported in ISO-8601 format to ensure compatibility with
spreadsheets, databases, and automation tools.
</p>

<h3>Filtering & Sorting</h3>

<p>
CSV exports always respect the current view. Any filters applied for
warranty status, device type, inactive devices, or search text directly
control which devices are included.
</p>

<p>
The row order in the CSV matches the active sort order shown in the app.
</p>

<h3>Exporting During Imports</h3>

<p>
CSV export remains available while an import is running. When exporting
during an active import, the CSV reflects the most recently persisted data
for the tenant at the moment the export begins.
</p>

<p>
This ensures that reporting and audits are never blocked by long-running
imports.
</p>

<h3>Inactive & No-Data Devices</h3>

<p>
Devices that are no longer returned by Apple Business Manager are retained
and marked as <strong>Inactive</strong>. Devices temporarily missing coverage
data are marked with a <strong>No Data</strong> indicator.
</p>

<p>
Both inactive and no-data devices are included in exports whenever they are
visible under the current filters.
</p>

<h3>How to Export</h3>

<p>
To export data, choose <strong>Export &lt;Tenant Name&gt; to CSV…</strong>
from the File menu and select a destination.
</p>

<p>
The generated CSV can be opened directly in spreadsheet applications or
imported into other reporting systems.
</p>

<p>
</p>

