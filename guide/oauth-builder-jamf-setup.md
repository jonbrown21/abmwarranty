---
layout: guide
title: "JAMF Setup (OAUTH Builder)"
description: "JAMF Setup (OAUTH Builder)"
permalink: /guide/oauth-builder-jamf-setup/
guide_parent: oauth-builder
guide_child_order: 1
nav_title: "JAMF Setup (OAUTH Builder)"
---

<p>
This page covers the JAMF-specific implementation pattern for OAuth Builder.
Use this as the reference for contract rows, mapping structure, and validation
gates when targeting JAMF Pro endpoints.
</p>

<h3>When to Use Builder vs JAMF Profile</h3>

<h4>Use JAMF Profile When</h4>
<ul>
  <li>You want predefined JAMF behavior and fast setup.</li>
  <li>You do not need custom endpoint, method, or body-format control.</li>
  <li>You want the profile to provide expected default mapping semantics.</li>
</ul>

<h4>Use OAuth Builder When</h4>
<ul>
  <li>You need explicit control over API contract paths and HTTP methods.</li>
  <li>You need to choose request format (JSON/XML) per contract endpoint.</li>
  <li>You want to manually map destination fields from real destination samples.</li>
</ul>

<div class="guide-steps guide-steps--triple">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 1</span>
      <img
        src="{{ '/assets/images/guide/jamf/builder/step_1.png' | relative_url }}"
        alt="OAuth Builder step 1 for connection basics and OAuth credentials"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Enter connection basics and OAuth credentials, then validate authentication.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 2</span>
      <img
        src="{{ '/assets/images/guide/jamf/builder/step_2.png' | relative_url }}"
        alt="OAuth Builder step 2 for API contract setup"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Define API contract endpoints, methods, and formatter behavior for lookup and updates.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 3</span>
      <img
        src="{{ '/assets/images/guide/jamf/builder/step_3.png' | relative_url }}"
        alt="OAuth Builder step 3 for ABM to destination field mapping"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Review field mappings, action rules, and formatters before saving the Builder profile.</p>
  </div>
</div>

<hr>

<h2>JAMF Builder Contract Example (Successful Pattern)</h2>

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
      <td><code>/api/v1/computers-inventory?page=0&amp;section=HARDWARE&amp;page-size=100</code></td>
      <td>Must return serial-related fields for reliable record lookup.</td>
    </tr>
    <tr>
      <td>Computers - Required update API</td>
      <td>PATCH</td>
      <td>JSON</td>
      <td><code>/api/v1/computers-inventory-detail/{id}</code></td>
      <td>Update endpoint uses resolved destination record ID.</td>
    </tr>
    <tr>
      <td>Mobile Devices - Required fetch API</td>
      <td>GET</td>
      <td>JSON</td>
      <td><code>/api/v2/mobile-devices</code></td>
      <td>Used for destination lookup and sampling for mobile records.</td>
    </tr>
    <tr>
      <td>Mobile Devices - Required update API</td>
      <td>PUT</td>
      <td>XML</td>
      <td><code>/JSSResource/mobiledevices/id/{id}</code></td>
      <td>Classic endpoint typically requires XML payload formatting.</td>
    </tr>
  </tbody>
</table>

<h3>Important Contract Notes</h3>
<ul>
  <li>Replace placeholders (for example page-size) with a real numeric value in Builder paths.</li>
  <li>Computers fetch path should include <code>section=HARDWARE</code> for reliable serial availability in JAMF.</li>
  <li>If update returns 405/415/400, verify method and formatter pairing before changing mappings.</li>
</ul>

<hr>

<h2>JAMF Builder Mapping Example (Computers)</h2>

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
      <td><code>serialNumber</code></td>
      <td>Key</td>
      <td>String</td>
      <td>Lookup key. Do not treat as a writable business field.</td>
    </tr>
    <tr>
      <td><code>orderNumber</code></td>
      <td><code>purchasing.poNumber</code></td>
      <td>Update</td>
      <td>String or Integer</td>
      <td>Choose formatter based on destination type expectation.</td>
    </tr>
    <tr>
      <td><code>orderDateTime</code></td>
      <td><code>purchasing.poDate</code></td>
      <td>Update</td>
      <td>Date (yyyy-MM-dd)</td>
      <td>Common requirement for JAMF purchase date fields.</td>
    </tr>
    <tr>
      <td><code>purchaseSourceType</code></td>
      <td><code>purchasing.vendor</code></td>
      <td>Update</td>
      <td>String</td>
      <td>Vendor and source label mapping.</td>
    </tr>
    <tr>
      <td><code>purchaseSourceId</code></td>
      <td><code>purchasing.purchasingAccount</code></td>
      <td>Update</td>
      <td>String or Integer</td>
      <td>Align with destination schema.</td>
    </tr>
    <tr>
      <td><code>appleCareId</code></td>
      <td><code>purchasing.appleCareId</code></td>
      <td>Update</td>
      <td>String or Integer</td>
      <td>Formatter should match target field type.</td>
    </tr>
    <tr>
      <td><code>warrantyDate</code></td>
      <td><code>purchasing.warrantyDate</code></td>
      <td>Update</td>
      <td>Date (yyyy-MM-dd)</td>
      <td>Use date-only format when destination expects date-only values.</td>
    </tr>
    <tr>
      <td><code>lifeExpectancy</code></td>
      <td><code>purchasing.lifeExpectancy</code></td>
      <td>Update</td>
      <td>Integer</td>
      <td>Use Integer when destination rejects string values like “6 Years”.</td>
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

<h2>Successful JAMF Builder Setup Checklist</h2>

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
      <td>OAuth Validation</td>
      <td>Connection test succeeds with current base URL, token URL, and client credentials.</td>
      <td>Wizard advances to contract and mapping.</td>
      <td>Recheck host, token URL path, client secret, and OAuth scope or audience requirements.</td>
    </tr>
    <tr>
      <td>Contract Save</td>
      <td>Contract rows are valid and persist after close and reopen.</td>
      <td>Method, formatter, and endpoint path rehydrate exactly.</td>
      <td>Reopen <strong>Update API Contract</strong> and verify each row, especially mobile update formatter.</td>
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
      <td>Check contract method and formatter pairing and mapped destination field names.</td>
    </tr>
    <tr>
      <td>Single Live Run</td>
      <td>One target serial applies expected updates in JAMF destination.</td>
      <td>Destination reflects mapped values.</td>
      <td>Check response error field details and adjust formatter and date rules as needed.</td>
    </tr>
    <tr>
      <td>Full Run</td>
      <td>Jobs complete with expected update and skip counts across all records.</td>
      <td>No unexpected destination-missing spikes or payload format failures.</td>
      <td>Re-validate fetch endpoint serial visibility and action rules.</td>
    </tr>
  </tbody>
</table>
