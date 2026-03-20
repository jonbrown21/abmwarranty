---
layout: guide
title: "FAQ"
description: "FAQ"
permalink: /guide/faq/
---


<h3>How do I generate Apple Business Manager API credentials?</h3>

<p>
API credentials are created in Apple Business Manager under
<strong>Settings → API Keys</strong>. Apple provides a <strong>Client ID</strong>,
<strong>Key ID</strong>, and a downloadable <strong>PEM private key</strong>.
All three must match exactly for authentication to succeed.
</p>

<h3>Where do I select the PEM private key?</h3>

<p>
After entering the Client ID and Key ID in Settings, ABM Warranty prompts you
to select the PEM private key file. The file is stored locally and used only
to generate short-lived authentication assertions.
</p>

<h3>Does ABM Warranty support multiple credentials?</h3>

<p>
Yes. ABM Warranty supports multiple credentials. Each credential represents
a distinct Apple Business Manager tenant and operates independently.
</p>

<p>
Switching credentials automatically switches tenants, databases, diagnostics,
and logs without mixing data between organizations.
</p>

<h3>Why does the app show a warning about missing or invalid credentials?</h3>

<p>
If credentials are missing, incomplete, or invalid, ABM Warranty disables
live API imports and enters a diagnostic or sample-data state.
</p>

<p>
This allows you to explore the interface safely without making live requests
to Apple Business Manager until credentials are corrected.
</p>

<h3>Why are some devices marked as inactive?</h3>

<p>
Devices marked as <strong>Inactive</strong> are no longer returned by Apple
Business Manager but are retained locally for historical accuracy.
</p>

<p>
Inactive devices are never deleted automatically and remain visible in
filters, dashboards, and exports.
</p>

<h3>Why do some devices show “No Data” for coverage?</h3>

<p>
“No Data” indicates that Apple Business Manager did not return coverage
information for the device during the initial coverage pass.
</p>

<p>
ABM Warranty supports targeted retries that fetch coverage only for affected
devices without reloading the full device inventory.
</p>

<h3>Can I export data while an import is running?</h3>

<p>
Yes. CSV export is always available. When exporting during an active import,
the file reflects the most recently persisted data for the active tenant at
the moment the export begins.
</p>

<h3>What does the “Last Imported” timestamp represent?</h3>

<p>
The Last Imported timestamp indicates the most recent successful refresh
of device data from Apple Business Manager for that device.
</p>

<p>
This value persists across app launches and is updated during retries and
coverage refreshes.
</p>

<h3>Why does an import sometimes slow down or pause?</h3>

<p>
ABM Warranty dynamically adjusts request concurrency based on Apple API
responses. If rate limits or server errors are detected, the import
temporarily slows or pauses to remain compliant.
</p>

<p>
Throttle events, retries, and backoff timing are visible in the Status
Dashboard.
</p>

<h3>Where can I find detailed error information?</h3>

<p>
Detailed errors, retry counts, and server responses are visible in the
Status Dashboard and the Log window. Logs are scoped to the active tenant
to prevent cross-organization noise.
</p>

<h3>How do managed credentials work?</h3>

<p>
Managed credentials can be deployed via MDM using managed preferences.
When detected, ABM Warranty prompts you to import them securely.
</p>

<p>
If a managed credential is removed from MDM, it becomes a normal,
user-managed credential and can be removed manually.
</p>

<h3>What should I do if a problem persists?</h3>

<p>
Review the Status Dashboard and tenant-scoped logs to identify the issue.
If further assistance is needed, export diagnostics or consult the
ABM Warranty Support GPT with relevant log details.
</p>

<p>
</p>

