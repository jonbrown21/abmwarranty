---
layout: guide
title: "Outbound Jobs View"
description: "Outbound Jobs View"
permalink: /guide/outbound-jobs/
---

<p>
The <strong>Outbound Sync Jobs</strong> window is the execution history and live progress view for
connection-driven sync work. It shows what ran, in what order, and what happened for each connection
within each outbound run.
</p>

<h2>Sync Types</h2>

<div class="guide-steps guide-steps--double">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/type_full.png' | relative_url }}"
        alt="Outbound Jobs full sync run view"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Full sync view showing fleet-wide outbound processing and aggregate progress.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/type_single.png' | relative_url }}"
        alt="Outbound Jobs single sync run view"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Single sync view focused on one serial for targeted validation and low-risk testing.</p>
  </div>
</div>

<h3>Full</h3>
<p>
<strong>Full</strong> processes all source records in scope for the run. It is used when validating new
mappings at scale, or when you want complete reconciliation against the destination system.
</p>

<h3>Single</h3>
<p>
<strong>Single</strong> processes one serial-targeted record. This is the safest way to validate contract,
formatter, and mapping behavior before running a full write operation.
</p>

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Best Use</th>
      <th>Risk Level</th>
      <th>Expected UI Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Full</td>
      <td>Fleet-wide reconciliation and production runs</td>
      <td>Higher</td>
      <td>X of total fleet in scope</td>
    </tr>
    <tr>
      <td>Single</td>
      <td>Validation, troubleshooting, and targeted correction</td>
      <td>Lower</td>
      <td>1 of 1</td>
    </tr>
  </tbody>
</table>
<hr>
<h2>Dry Run Behavior</h2>

<div class="guide-steps guide-steps--double">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/dry_run_on.png' | relative_url }}"
        alt="Dry Run toggle enabled in connection settings"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Dry Run enabled in connection settings before executing outbound sync jobs.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/dry_run_db.png' | relative_url }}"
        alt="Dry Run diagnostics dashboard in outbound sync jobs view"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Dry run diagnostics dashboard view in Outbound Sync Jobs showing non-writing validation outcomes.</p>
  </div>
</div>

<h3>What Dry Run Does</h3>
<p>
Dry run evaluates mapping and reconciliation without writing destination updates. It still performs lookup,
comparison, and payload decisioning so you can confirm what would happen in a live run.
</p>

<h3>Dry Run Dashboard in Outbound Jobs</h3>
<p>
When dry run is enabled, outbound rows show a mini diagnostics dashboard under progress. This summarizes
the run outcome without committing writes.
</p>

<table>
  <thead>
    <tr>
      <th>Metric</th>
      <th>Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Would Update</td>
      <td>Fields/records that are eligible for update if live mode is used</td>
    </tr>
    <tr>
      <td>Skipped</td>
      <td>Skipped by rule or by no-change reconciliation</td>
    </tr>
    <tr>
      <td>Missing Source</td>
      <td>Required source values were absent</td>
    </tr>
    <tr>
      <td>Missing Destination</td>
      <td>Destination record could not be resolved for target serial</td>
    </tr>
  </tbody>
</table>

<h3>Why This Matters</h3>
<p>
Dry run is the fastest safety check for contract and mapping quality. A clean dry run should precede a full
live run, especially after changing contract paths, methods, formatter, or mapping values.
</p>
<hr>
<h2>Progress and Status</h2>

<div class="guide-steps guide-steps--double">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/outbound_jobs_status.png' | relative_url }}"
        alt="Outbound Jobs status view showing running, completed, failed, and canceled states"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Status-focused view showing mixed outcomes across outbound runs, including failures and cancellations for operator triage.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/jamf/outbound/outbound_jobs.png' | relative_url }}"
        alt="Outbound Jobs dashboard view with dry run and progress diagnostics"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Outbound jobs dashboard view with progress indicators and dry run context for validating behavior before live writes.</p>
  </div>
</div>

<h3>Folder + Connection Rows</h3>
<p>
Each outbound run is shown as a folder-style row with credential context and connection count. Expanding
the folder shows each connection in execution order, its progress bar, and its status.
</p>

<h3>Status Semantics</h3>
<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Interpretation</th>
      <th>Next Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Running</td>
      <td>Connection/run is currently processing</td>
      <td>Monitor progress and logs</td>
    </tr>
    <tr>
      <td>Completed</td>
      <td>Execution finished without terminal error</td>
      <td>Review update/skip diagnostics</td>
    </tr>
    <tr>
      <td>Failed</td>
      <td>Terminal request/contract/payload error occurred</td>
      <td>Use error details + logs to isolate contract or mapping issue</td>
    </tr>
    <tr>
      <td>Canceled</td>
      <td>User-initiated cancellation before completion</td>
      <td>Rerun single first, then full if needed</td>
    </tr>
  </tbody>
</table>
<hr>
<h2>How Outbound Jobs Relates to Dashboard</h2>

<h3>Dashboard Card</h3>
<p>
The dashboard outbound card is a live operational summary. It gives current-state visibility and quick
control while a run is active.
</p>

<h3>Outbound Jobs Window</h3>
<p>
The Outbound Sync Jobs window is the historical ledger and detailed diagnostic view. Use it to inspect
past runs, compare outcomes, and validate dry run behavior over time.
</p>

<table>
  <thead>
    <tr>
      <th>View</th>
      <th>Primary Purpose</th>
      <th>Depth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dashboard</td>
      <td>Current run visibility and quick interaction</td>
      <td>High-level</td>
    </tr>
    <tr>
      <td>Outbound Sync Jobs</td>
      <td>Run history, per-connection diagnostics, and failure analysis</td>
      <td>Detailed</td>
    </tr>
  </tbody>
</table>
<hr>
<h2>Common Failure Patterns</h2>

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
      <td>Destination missing spike</td>
      <td>Lookup path does not expose serial fields consistently</td>
      <td>Review fetch contract endpoint and destination serial visibility</td>
    </tr>
    <tr>
      <td>400 INVALID_CONTENT</td>
      <td>Mapped destination path or formatter mismatch</td>
      <td>Validate mapping field names and formatter selections</td>
    </tr>
    <tr>
      <td>405 Method Not Allowed</td>
      <td>Wrong update method for endpoint</td>
      <td>Verify method in Update API Contract</td>
    </tr>
    <tr>
      <td>415 Unsupported Media Type</td>
      <td>JSON/XML formatter mismatch for endpoint family</td>
      <td>Confirm contract formatter for update endpoint</td>
    </tr>
    <tr>
      <td>Completed but no visible destination changes</td>
      <td>No-change/skip/null-source protections prevented writes</td>
      <td>Inspect per-field action rules and diagnostics counters</td>
    </tr>
  </tbody>
</table>
<hr>
<h2>Recommended Operator Workflow</h2>

<ol>
  <li>Run <strong>Single + Dry Run</strong> for the target serial.</li>
  <li>Fix contract/mapping issues until diagnostics look correct.</li>
  <li>Run <strong>Single + Live</strong> and verify destination data changed correctly.</li>
  <li>Run <strong>Full + Dry Run</strong> to estimate fleet-wide behavior.</li>
  <li>Run <strong>Full + Live</strong> once results are validated.</li>
</ol>
