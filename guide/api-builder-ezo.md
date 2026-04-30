---
layout: guide
title: "EZO Setup (API Builder)"
description: "EZO Setup (API Builder)"
permalink: /guide/api-builder-ezo-setup/
guide_parent: api-builder
guide_child_order: 1
nav_title: "EZO Setup (API Builder)"
---

<p>
This page covers the EZO-specific implementation pattern for API Builder.
Use this as the reference for contract rows, mapping structure, and validation
gates when targeting EZOfficeInventory endpoints.
</p>

<h3>When to Use Builder vs EZO Profile</h3>

<h4>Use EZO Profile When</h4>
<ul>
  <li>You want predefined EZO behavior and fast setup.</li>
  <li>You do not need custom endpoint, method, or body-format control.</li>
  <li>You want the profile to provide expected default mapping semantics.</li>
</ul>

<h4>Use API Builder When</h4>
<ul>
  <li>You need explicit control over API contract paths and HTTP methods.</li>
  <li>You need to choose request format (JSON/XML) per contract endpoint.</li>
  <li>You want to manually map destination fields from real destination samples.</li>
</ul>

<hr>

<h2>EZO API Builder Contract Example (Successful Pattern)</h2>

<h3>Recommended Contract Inputs</h3>

<table>
  <thead>
    <tr>
      <th>Contract Endpoint</th>
      <th>Method</th>
      <th>Formatter</th>
      <th>Example Path</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Computers - Required fetch API</td>
      <td>GET</td>
      <td>JSON</td>
      <td><code>/assets.api?include_custom_fields=true&amp;show_document_urls=true&amp;show_image_urls=true&amp;show_document_details=true</code></td>
      <td>Primary list lookup endpoint for serial matching and runtime indexing.</td>
    </tr>
    <tr>
      <td>Computers - Required update API</td>
      <td>PUT</td>
      <td>JSON</td>
      <td><code>/assets/{id}.api?format=json</code></td>
      <td>Update endpoint uses resolved destination asset ID.</td>
    </tr>
    <tr>
      <td>Computers - Optional detail lookup API</td>
      <td>GET</td>
      <td>JSON</td>
      <td><code>/assets/{id}.api?include_custom_fields=true&amp;show_document_urls=true&amp;show_image_urls=true&amp;show_document_details=true</code></td>
      <td>Optional/collapsed detail endpoint for full payload hydration and lookup enrichment.</td>
    </tr>
    <tr>
      <td>Mobile Devices - Required fetch API</td>
      <td>GET</td>
      <td>JSON</td>
      <td><code>/assets.api?include_custom_fields=true&amp;show_document_urls=true&amp;show_image_urls=true&amp;show_document_details=true</code></td>
      <td>EZO is asset-centric; reuse same fetch path for mobile scope.</td>
    </tr>
    <tr>
      <td>Mobile Devices - Required update API</td>
      <td>PUT</td>
      <td>JSON</td>
      <td><code>/assets/{id}.api?format=json</code></td>
      <td>EZO uses the same asset update path for both scopes.</td>
    </tr>
    <tr>
      <td>Mobile Devices - Optional detail lookup API</td>
      <td>GET</td>
      <td>JSON</td>
      <td><code>/assets/{id}.api?include_custom_fields=true&amp;show_document_urls=true&amp;show_image_urls=true&amp;show_document_details=true</code></td>
      <td>Optional/collapsed detail endpoint for full payload hydration and lookup enrichment.</td>
    </tr>
  </tbody>
</table>

<h3>Important Contract Notes</h3>
<ul>
  <li>EZO lookup is typically ID-based after serial reconciliation from list/detail responses.</li>
  <li>Detail endpoints improve lookup reliability and sample-field hydration when list rows are partial.</li>
  <li>If update returns 404/405/415/400, verify path, method, and formatter pairing before changing mappings.</li>
</ul>

<hr>

<h2>EZO API Builder Mapping Example (Assets)</h2>

<h3>ABM Source to Destination Mapping Pattern</h3>
<table>
  <thead>
    <tr>
      <th>ABM Field</th>
      <th>Destination Field (Example)</th>
      <th>Action</th>
      <th>Formatter</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>serialNumber</code></td>
      <td><code>Serial Number</code></td>
      <td>Key</td>
      <td>String</td>
      <td>Lookup key. Do not treat as a writable business field.</td>
    </tr>
    <tr>
      <td><code>orderNumber</code></td>
      <td><code>PO Number</code> (if present) or custom field</td>
      <td>Update</td>
      <td>String</td>
      <td>Map only to fields supported by your EZO schema.</td>
    </tr>
    <tr>
      <td><code>orderDateTime</code></td>
      <td><code>PO Date</code> or custom field</td>
      <td>Update</td>
      <td>Date (yyyy-MM-dd) or Date (MM/dd/yyyy)</td>
      <td>Use formatter that matches destination field expectation.</td>
    </tr>
    <tr>
      <td><code>purchaseSourceType</code></td>
      <td><code>Vendor</code> or custom field</td>
      <td>Update</td>
      <td>String</td>
      <td>Map based on your EZO field availability.</td>
    </tr>
    <tr>
      <td><code>purchaseSourceId</code></td>
      <td>custom field</td>
      <td>Update</td>
      <td>String or Integer</td>
      <td>Align formatter with destination type.</td>
    </tr>
    <tr>
      <td><code>appleCareId</code></td>
      <td>custom field</td>
      <td>Update</td>
      <td>String or Integer</td>
      <td>Formatter should match target field type.</td>
    </tr>
    <tr>
      <td><code>warrantyDate</code></td>
      <td><code>Warranty</code> (or equivalent EZO destination field)</td>
      <td>Update</td>
      <td>Date (yyyy-MM-dd) or Date (MM/dd/yyyy)</td>
      <td>Use date-only output expected by your EZO field configuration.</td>
    </tr>
    <tr>
      <td><code>lifeExpectancy</code></td>
      <td>custom field</td>
      <td>Update</td>
      <td>Integer</td>
      <td>Use Integer when destination rejects decorated values like “6 Years”.</td>
    </tr>
  </tbody>
</table>

<h3>Formatter Guidance</h3>
<p>
Builder formatters are explicit and important. Choose formatters based on
destination expectations, not source display style. A date-time source may need
date-only output, and a decorated numeric string may need Integer output.
</p>

<hr>

<h2>Successful EZO API Builder Setup Checklist</h2>

<h3>End-to-End Validation Gates</h3>
<table>
  <thead>
    <tr>
      <th>Stage</th>
      <th>What to Confirm</th>
      <th>Pass Condition</th>
      <th>If It Fails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>API-Key Validation</td>
      <td>Connection test succeeds with current base URL and API key headers.</td>
      <td>Wizard advances to contract and mapping.</td>
      <td>Recheck host, API key token, header name, and any required prefix.</td>
    </tr>
    <tr>
      <td>Contract Save</td>
      <td>Contract rows are valid and persist after close and reopen.</td>
      <td>Method, formatter, and endpoint path rehydrate exactly.</td>
      <td>Reopen <strong>Update API Contract</strong> and verify each row, especially list/update/detail path parameters.</td>
    </tr>
    <tr>
      <td>Mapping Save</td>
      <td>Mapped destination fields and formatters persist after Save.</td>
      <td>Update Mapping reopens with exact saved values.</td>
      <td>Validate key field mapping and required field mappings are still set.</td>
    </tr>
    <tr>
      <td>Single Dry Run</td>
      <td>One target serial shows expected would-update and skip diagnostics.</td>
      <td>No endpoint or media-type errors in diagnostics.</td>
      <td>Check contract method/formatter pairing and mapped destination field names.</td>
    </tr>
    <tr>
      <td>Single Live Run</td>
      <td>One target serial applies expected updates in EZO destination.</td>
      <td>Destination reflects mapped values.</td>
      <td>Check response error details and verify mapped destination field names exactly match EZO-accepted fields.</td>
    </tr>
    <tr>
      <td>Full Run</td>
      <td>Jobs complete with expected update and skip counts across all records.</td>
      <td>No unexpected destination-missing spikes or payload format failures.</td>
      <td>Re-validate lookup/detail contract paths, serial visibility, and action rules.</td>
    </tr>
  </tbody>
</table>
