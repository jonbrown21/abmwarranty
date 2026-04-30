---
layout: guide
title: "OAUTH Builder"
description: "OAUTH Builder"
permalink: /guide/oauth-builder/
---

<p>
This page explains the <strong>OAuth Builder</strong> connection type in ABM Warranty.
Builder is intended for cases where you need to define contract behavior directly
instead of using a prebuilt profile.
</p>

<h3>Builder Wizard Flow (High-Level)</h3>

<h4>Step 1: OAuth Connection Basics</h4>
<p>
Enter the base URL, token URL, client ID, client secret, and optional scope or
audience details. The connection must validate OAuth before contract setup can proceed.
</p>

<h4>Step 2: API Contract</h4>
<p>
Define required fetch and update endpoints by entity, plus method and formatter.
This contract drives lookup behavior, destination sampling, and outbound update requests.
</p>

<h4>Step 3: Field Mapping</h4>
<p>
Choose destination fields for ABM source fields and define action and formatter
behavior for each. Builder does not assume profile defaults, so the destination
field path is explicitly selected by the operator.
</p>

<hr>

<h2>Updating Contract After Save</h2>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/jamf/builder/update_contract.png' | relative_url }}"
    alt="Update API Contract option in OAuth Builder connection settings"
    loading="lazy"
    decoding="async">
</figure>

<h3>Where to Update Contract</h3>
<ul>
  <li>Open the Builder connection in Settings → Connections.</li>
  <li>Use <strong>Update API Contract</strong> for contract-only edits.</li>
  <li>Use <strong>Update Mapping</strong> for mapping-only edits.</li>
</ul>

<h3>Why This Separation Matters</h3>
<p>
Contract errors (wrong path, method, or formatter) and mapping errors (wrong
field selection or action) are different failure classes. Keeping these edit
flows separate helps isolate root causes quickly.
</p>

<hr>

<h2>Validation Sequence for Reliable Setup</h2>

<h3>Recommended Order</h3>
<ol>
  <li>Validate OAuth connectivity.</li>
  <li>Set and save API Contract.</li>
  <li>Open Update Mapping and set fields, actions, and formatters.</li>
  <li>Run a single-record dry run.</li>
  <li>Run a single-record live sync.</li>
  <li>Proceed to full sync after expected updates are confirmed.</li>
</ol>

<h3>Why Single-Record First</h3>
<p>
Single-record tests reduce risk and make troubleshooting precise. You can validate
contract lookup, payload format, and field-level update behavior before any
wide-scope write operation.
</p>

<h2>Common Failure Patterns and What They Usually Mean</h2>

<table>
  <thead>
    <tr>
      <th>Symptom</th>
      <th>Likely Cause</th>
      <th>Primary Check</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>405 Method Not Allowed</td>
      <td>Wrong method for endpoint</td>
      <td>Verify method in API Contract row</td>
    </tr>
    <tr>
      <td>415 Unsupported Media Type</td>
      <td>Wrong formatter or content type</td>
      <td>Verify JSON vs XML formatter selection</td>
    </tr>
    <tr>
      <td>400 INVALID_CONTENT field errors</td>
      <td>Field name or formatter mismatch</td>
      <td>Check mapped destination path and formatter</td>
    </tr>
    <tr>
      <td>Destination missing</td>
      <td>Lookup path does not expose serial fields</td>
      <td>Check fetch contract path and serial visibility</td>
    </tr>
    <tr>
      <td>No updates but sync completes</td>
      <td>Skip, no-change, or null-source behavior</td>
      <td>Review action rules, dry-run diagnostics, and source values</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Operational Notes</h2>

<h3>Per-Field Skip Semantics</h3>
<p>
Skip is evaluated per field, not per entire record. A record can still update
some fields while other fields are skipped by rule or by no-change comparison.
</p>

<h3>Null and Empty Source Protection</h3>
<p>
Outbound behavior should skip null or empty source fields rather than clear
destination values. If destination values are unexpectedly cleared, inspect
current logs and mapping state immediately.
</p>

<h3>Diagnostics as Source of Truth</h3>
<p>
Use Outbound Sync Jobs diagnostics and runtime logs to confirm:
</p>
<ul>
  <li>Resolved destination ID</li>
  <li>Lookup endpoint used</li>
  <li>Method and formatter used</li>
  <li>Skip or update reasons</li>
  <li>Request-level failure details</li>
</ul>
