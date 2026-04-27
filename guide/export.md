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

<table>
  <thead>
    <tr>
      <th>CSV Header</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>Serial</code></td><td>Device serial number.</td></tr>
    <tr><td><code>Make</code></td><td>Device make/manufacturer.</td></tr>
    <tr><td><code>Model</code></td><td>Primary model label.</td></tr>
    <tr><td><code>Standard Start</code></td><td>Standard warranty start date.</td></tr>
    <tr><td><code>Standard End</code></td><td>Standard warranty end date.</td></tr>
    <tr><td><code>AC+ Start</code></td><td>AppleCare+ start date, if available.</td></tr>
    <tr><td><code>AC+ End</code></td><td>AppleCare+ end date, if available.</td></tr>
    <tr><td><code>Status</code></td><td>Computed warranty status.</td></tr>
    <tr><td><code>Last Imported</code></td><td>Local import timestamp.</td></tr>
    <tr><td><code>Last Seen in ABM</code></td><td>Last observed in Apple Business Manager.</td></tr>
    <tr><td><code>Inactive</code></td><td>Whether the record is marked inactive.</td></tr>
    <tr><td><code>No Data</code></td><td>Whether coverage is currently missing.</td></tr>
    <tr><td><code>ABM Status</code></td><td>Raw ABM status value.</td></tr>
    <tr><td><code>Updated DateTime</code></td><td>ABM updated timestamp.</td></tr>
    <tr><td><code>Added To Org DateTime</code></td><td>ABM added-to-org timestamp.</td></tr>
    <tr><td><code>Released From Org DateTime</code></td><td>ABM release timestamp, if present.</td></tr>
    <tr><td><code>Order DateTime</code></td><td>ABM order date-time value.</td></tr>
    <tr><td><code>Order Number</code></td><td>Order number from ABM attributes.</td></tr>
    <tr><td><code>Purchase Source Type</code></td><td>Purchase source type.</td></tr>
    <tr><td><code>Purchase Source ID</code></td><td>Purchase source identifier.</td></tr>
    <tr><td><code>Product Type</code></td><td>ABM product type.</td></tr>
    <tr><td><code>Product Family</code></td><td>ABM product family.</td></tr>
    <tr><td><code>Device Model</code></td><td>ABM device model.</td></tr>
    <tr><td><code>Device Capacity</code></td><td>ABM capacity value.</td></tr>
    <tr><td><code>Color</code></td><td>ABM color value.</td></tr>
    <tr><td><code>Part Number</code></td><td>Part number.</td></tr>
    <tr><td><code>IMEI</code></td><td>Cellular IMEI identifier.</td></tr>
    <tr><td><code>MEID</code></td><td>Cellular MEID identifier.</td></tr>
    <tr><td><code>EID</code></td><td>Embedded SIM EID identifier.</td></tr>
    <tr><td><code>WiFi Address</code></td><td>Wi-Fi hardware address.</td></tr>
    <tr><td><code>Bluetooth Address</code></td><td>Bluetooth hardware address.</td></tr>
    <tr><td><code>Ethernet Address</code></td><td>Ethernet hardware address.</td></tr>
    <tr><td><code>Assigned Server Related URL</code></td><td>ABM assignment related URL.</td></tr>
    <tr><td><code>Assigned Server ID</code></td><td>Assigned server ID.</td></tr>
    <tr><td><code>Assigned Server Name</code></td><td>Assigned server name.</td></tr>
    <tr><td><code>Assigned Server Type</code></td><td>Assigned server type.</td></tr>
    <tr><td><code>Assigned Server Created DateTime</code></td><td>Assigned server creation timestamp.</td></tr>
    <tr><td><code>Assigned Server Updated DateTime</code></td><td>Assigned server update timestamp.</td></tr>
    <tr><td><code>Last Coverage Refresh</code></td><td>Last local coverage refresh timestamp.</td></tr>
    <tr><td><code>Last Updated At (Local)</code></td><td>Last local device update timestamp.</td></tr>
  </tbody>
</table>

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

