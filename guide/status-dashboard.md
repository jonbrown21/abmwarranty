---
layout: guide
title: "Status Dashboard"
description: "Status Dashboard"
permalink: /guide/status-dashboard/
guide_shots:
  - src: /assets/images/guide/status_dashboard.png
    alt: Status Dashboard view in ABM Warranty
---


<p>
The Status Dashboard provides detailed health and diagnostic information for the
<strong>currently active tenant</strong>. It is designed to give administrators
clear visibility into credential configuration, recent import activity, and
runtime telemetry without initiating any actions or modifying data.
</p>

<p>
The dashboard reflects the current state of:
</p>

<ul>
    <li>Credential presence and structural completeness</li>
    <li>PEM private key resolution and accessibility</li>
    <li>Whether the last import succeeded, failed, or is in progress</li>
    <li>The number of devices processed during the most recent import</li>
    <li>Whether sample data was used</li>
</ul>

<p>
Import and retry telemetry is summarized for transparency, including:
</p>

<ul>
    <li>Device-page retry counts</li>
    <li>Coverage retry counts</li>
    <li>Rate-limit (HTTP 429) events</li>
    <li>Server-side errors (HTTP 5xx)</li>
    <li>Cumulative backoff time applied during the last run</li>
</ul>

<p>
Timing information is also displayed, such as when the most recent reload
started and finished. This information persists per tenant across app launches
and allows administrators to quickly understand data freshness.
</p>

<p>
The Status Dashboard is strictly <strong>read-only</strong>. It does not initiate
imports, retries, or credential changes. Its purpose is to surface the outcome
and health of prior activity and to correlate visible issues with log entries.
</p>

<p>
All values shown in the Status Dashboard are tenant-scoped. When switching
tenants, the dashboard updates immediately to reflect the health and history
of the newly selected tenant.
</p>

<p>
For detailed event timelines and error messages, administrators can open the
Log window, which provides tenant-aware log filtering and export capabilities.
</p>

<p>
</p>
