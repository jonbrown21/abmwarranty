---
layout: guide
title: "Inbound Jobs View"
description: "Inbound Jobs View"
permalink: /guide/inbound-jobs/
---

<p>
The <strong>Inbound Sync Jobs</strong> window is the execution history and live progress view for
Apple Business API loading into the database. It shows what ran, in what order, and what happened for each credential
within each outbound run.
</p>

<h2>Sync Types</h2>

<div class="guide-steps guide-steps--double">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/reload.png' | relative_url }}"
        alt="Inbound Jobs full sync run view"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Full reload view showing fleet-wide Apple Business API processing and aggregate progress.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/reload_single.png' | relative_url }}"
        alt="Inbound Jobs single sync run view"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Single reload view focused on one serial for targeted validation and low-risk testing.</p>
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
      <td>Fleet-wide Apple Business API reconciliation and production runs</td>
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

<div class="video-wrap">
  <video class="w-full h-full" controls>
    <source src="{{ '/assets/videos/guide/chunking_chrome.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<hr>
<h2>Progress and Status</h2>

<div class="guide-steps guide-steps--double">
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/inbound_sync.png' | relative_url }}"
        alt="Inbound Apple Business API reload status view showing running, completed, failed, and canceled states"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Inbound Apple Business API reload status view showing running, completed, failed, and canceled states.</p>
  </div>
  <div class="guide-step-item">
    <figure class="guide-shot-card guide-step-frame">
      <img
        src="{{ '/assets/images/guide/chunk_size.png' | relative_url }}"
        alt="Inbound Apple Business API now respects chunk sizes for more granular API control"
        loading="lazy"
        decoding="async">
    </figure>
    <p class="guide-step-caption">Inbound Apple Business API now respects chunk sizes for more granular API control.</p>
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
