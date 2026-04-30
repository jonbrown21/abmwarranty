---
layout: guide
title: "API Builder"
description: "API Builder"
permalink: /guide/api-builder/
---

<p>
This page explains the <strong>API Builder</strong> connection type in ABM Warranty.
Builder is intended for cases where you need to define contract behavior directly
instead of using a prebuilt profile.
</p>

<h3>Builder Wizard Flow (High-Level)</h3>

<h4>Step 1: API Connection Basics</h4>
<p>
Enter the base URL and API-key authentication details (API key, header name,
and optional prefix). The connection must validate before contract setup can proceed. 
Typically the header is "Authorization" and prefix is "Bearer" which is common with bearer token APIs.
</p>

<h4>Step 2: API Contract</h4>
<p>
Define required fetch and update endpoints by entity, plus method and formatter.
This contract drives lookup behavior, destination sampling, and outbound update requests.
If your destination API supports direct serial lookup (for example <code>{serial}</code>
path tokens), set that in the fetch contract for faster ID resolution.
</p>

<h4>Step 3: Field Mapping</h4>
<p>
Choose destination fields for ABM source fields and define action and formatter
behavior for each. Builder does not assume profile defaults, so the destination
field path is explicitly selected by the operator.
</p>

<div class="guide-steps guide-steps--triple">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 1</span>
      <img
        src="{{ '/assets/images/guide/api/builder/step_1.png' | relative_url }}"
        alt="API Builder step 1 for connection basics and API key authentication"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Enter connection basics and API key authentication details, then validate connectivity.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 2</span>
      <img
        src="{{ '/assets/images/guide/api/builder/step_2.png' | relative_url }}"
        alt="API Builder step 2 for API contract setup"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Define API contract endpoints, methods, and formatter behavior for lookup, detail resolution, and updates.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <span class="guide-step-pill">Step 3</span>
      <img
        src="{{ '/assets/images/guide/api/builder/step_3.png' | relative_url }}"
        alt="API Builder step 3 for ABM to destination field mapping"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Review field mappings, action rules, and formatters before saving the Builder profile.</p>
  </div>
</div>

<hr>

<h2>Updating Contract After Save</h2>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/api/builder/step_1.png' | relative_url }}"
    alt="Update API Contract option in API Builder connection settings"
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
Contract errors (wrong path, method, formatter, or lookup token path) and mapping
errors (wrong field selection or action) are different failure classes. Keeping
these edit flows separate helps isolate root causes quickly.
</p>

<hr>

<h2>Validation Sequence for Reliable Setup</h2>

<h3>Recommended Order</h3>
<ol>
  <li>Validate API-key connectivity.</li>
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
      <td>400 field errors</td>
      <td>Field name, payload envelope, or formatter mismatch</td>
      <td>Check mapped destination path, formatter, and contract payload shape</td>
    </tr>
    <tr>
      <td>Destination missing</td>
      <td>Lookup path does not expose serial or ID</td>
      <td>Check fetch/detail contract path and serial/ID resolution behavior</td>
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