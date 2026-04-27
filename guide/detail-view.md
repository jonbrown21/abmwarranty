---
layout: guide
title: "Enhanced Detail View"
description: "Enhanced Detail View"
permalink: /guide/detail-view/
guide_shots:
  - src: /assets/images/guide/jamf/enhanced.png
    alt: "Enhanced device detail view with coverage history and attribute cards"
---

<p>
The Enhanced Detail View is the expanded per-device experience that combines
coverage history with richer Apple Business Manager attribute data in visual
cards. It is designed to make troubleshooting, validation, and data review
faster without leaving the device context.
</p>

<h2>Where to Access It</h2>

<ul>
  <li>Open the main device list in Dashboard.</li>
  <li>Select any device row.</li>
  <li>Use the right-side detail panel to review warranty cards, coverage history, and Device Attributes.</li>
</ul>

<h2>Top Sections in Detail View</h2>

<h3>Warranty Summary Cards</h3>
<p>
The top summary cards show Standard Warranty and AppleCare+ windows with
start and end dates, plus current status indicators. This gives a quick
operational view before drilling into individual attributes.
</p>

<h3>Coverage History</h3>
<p>
Coverage History shows prior coverage records with start, end, and status
details. Use this timeline to compare current coverage against historical
windows and validate lifecycle transitions.
</p>

<h2>Device Attributes (Visual Buckets)</h2>

<p>
Below coverage sections, ABM attributes are grouped into themed cards so related
data stays together. This reduces scan overhead and helps operators quickly
isolate the category that matters for the issue they are investigating.
</p>

<table>
  <thead>
    <tr>
      <th>Card Bucket</th>
      <th>Typical Fields</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Identity</td>
      <td>Status, Product Type, Device Capacity, Part Number</td>
      <td>Hardware identity and high-level state context</td>
    </tr>
    <tr>
      <td>Network</td>
      <td>Wi-Fi Address, Bluetooth Address, Ethernet Address</td>
      <td>Network hardware identifiers and connectivity validation</td>
    </tr>
    <tr>
      <td>Cellular IDs</td>
      <td>IMEI, MEID, EID</td>
      <td>Cellular enrollment and inventory correlation</td>
    </tr>
    <tr>
      <td>Procurement</td>
      <td>Order Number, Order Date, Purchase Source, Purchase Source ID</td>
      <td>Purchase and lifecycle sourcing context</td>
    </tr>
    <tr>
      <td>Lifecycle</td>
      <td>Added to Org, Updated in ABM, Released from Org, Last Seen in ABM</td>
      <td>Timeline and freshness signals from ABM inventory metadata</td>
    </tr>
    <tr>
      <td>Assignment</td>
      <td>Server Name, Server Type, Server Created, Server Updated</td>
      <td>Assigned server relationship and management routing</td>
    </tr>
  </tbody>
</table>

<h2>Data Source Notes</h2>

<h3>ABM API and Local Persistence</h3>
<p>
These values originate from Apple Business Manager API responses and are
persisted in the active tenant database. The detail panel renders those
persisted values for the selected tenant and device context.
</p>

<h3>Display Formatting</h3>
<ul>
  <li>Address fields are formatted for readability.</li>
  <li>Date and time values are rendered in human-readable UI formats.</li>
  <li>Empty or missing values are shown as explicit no-data placeholders.</li>
</ul>

<h2>Why It Matters Operationally</h2>

<table>
  <thead>
    <tr>
      <th>Use Case</th>
      <th>How Enhanced Detail Helps</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Warranty validation</td>
      <td>Compare summary windows and historical records in one place.</td>
    </tr>
    <tr>
      <td>Mapping validation</td>
      <td>Cross-check ABM source fields before outbound mapping or sync testing.</td>
    </tr>
    <tr>
      <td>Data quality review</td>
      <td>Identify missing identifiers or stale lifecycle timestamps quickly.</td>
    </tr>
    <tr>
      <td>Troubleshooting</td>
      <td>Use grouped fields to isolate network, procurement, assignment, or lifecycle issues.</td>
    </tr>
  </tbody>
</table>

<h2>Relationship to CSV Export</h2>

<p>
Most fields shown in Enhanced Detail View are also available in CSV export.
Use CSV for fleet-level reporting and trend analysis across many devices.
</p>

<p>
Use Enhanced Detail View when you need per-device diagnosis, context-rich
review, and faster field-by-field validation in one panel.
</p>
