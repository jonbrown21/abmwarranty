---
layout: guide
title: "Common Errors"
description: "Common Errors"
permalink: /guide/errors/
---


<p>
ABM Warranty is designed to surface errors clearly without crashing,
blocking the interface, or silently failing. Errors are scoped to the
active tenant and are recorded in both the Status Dashboard and Logs.
</p>

<p>
Most issues fall into a small number of predictable categories.
Understanding how they are handled helps distinguish between
configuration problems and temporary service interruptions.
</p>

<h3>Credential & Authentication Errors</h3>

<p>
Credential-related errors occur when ABM Warranty cannot successfully
authenticate with Apple Business Manager. Common causes include:
</p>

<ul>
    <li>Incorrect Client ID or Key ID</li>
    <li>A PEM private key that does not match the selected Key ID</li>
    <li>An expired or revoked API key in Apple Business Manager</li>
    <li>PEM file access or permission issues</li>
</ul>

<p>
Authentication failures are treated as <strong>hard failures</strong>.
When they occur, ABM Warranty stops the import immediately, records the
error for the active tenant, and disables further API requests until the
credential issue is resolved.
</p>

<p>
These failures are surfaced prominently in the Status Dashboard and
logged with diagnostic detail.
</p>

<h3>API, Rate Limit & Network Errors</h3>

<p>
Transient errors such as network interruptions, HTTP 429 rate limits,
or Apple server errors (HTTP 5xx) are handled automatically.
</p>

<p>
ABM Warranty applies adaptive retry logic with backoff and reduced
concurrency. Imports pause and resume safely without blocking the user
interface or corrupting data.
</p>

<p>
Retry counts, throttling events, server errors, and cumulative backoff
time are tracked per tenant and visible in the Status Dashboard.
</p>

<h3>Coverage Retrieval Issues</h3>

<p>
Some devices may temporarily return no coverage data. These devices are
marked as having <em>No Data</em> and remain part of the device inventory.
</p>

<p>
Coverage retrieval failures do not remove devices, invalidate existing
coverage information, or require reloading the full inventory. Coverage
can be retried independently as data becomes available.
</p>

<h3>Inactive Devices</h3>

<p>
Devices that are no longer returned by Apple Business Manager are not
deleted. Instead, they are marked as <strong>Inactive</strong> and retain
their last known data.
</p>

<p>
Inactive devices continue to appear in diagnostics, filters, exports,
and historical views to preserve accuracy over time.
</p>

<h3>Sample & Diagnostic Data Mode</h3>

<p>
When valid credentials are not configured, ABM Warranty may operate using
sample or diagnostic data. In this mode, live imports are disabled and
the UI clearly indicates that displayed data is not sourced from Apple
Business Manager.
</p>

<p>
Sample data is intended to support evaluation, UI exploration, and
troubleshooting without making live API requests.
</p>

<h3>Getting Help</h3>

<p>
If an issue persists, review the Status Dashboard and Logs for the active
tenant. Logs can be filtered by tenant and exported for review when
seeking assistance.
</p>

<p>
Providing logs and diagnostic exports greatly improves the ability to
identify and resolve issues.
</p>

<p>
</p>

