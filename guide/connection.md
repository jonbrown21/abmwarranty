---
layout: guide
title: "Troubleshooting Connection Issues"
description: "Troubleshooting Connection Issues"
permalink: /guide/connection/
---


<p>
If ABM Warranty cannot connect to Apple Business Manager, first verify that the
<strong>Client ID</strong>, <strong>Key ID</strong>, and <strong>PEM private key</strong>
are correctly configured for the active credential in Settings.
</p>

<p>
In environments with multiple credentials, connection and authentication issues are
isolated per credential (tenant). A failure affecting one credential does not impact
other configured tenants.
</p>

<p>
Authentication failures commonly occur when:
</p>

<ul>
    <li>The PEM file does not match the selected Key ID</li>
    <li>The Client ID is incorrect or belongs to a different ABM organization</li>
    <li>The API key has expired or been revoked in Apple Business Manager</li>
    <li>The PEM file cannot be accessed due to file permission or path issues</li>
</ul>

<p>
When authentication fails, ABM Warranty will not attempt to retrieve device inventory
or warranty coverage data for that credential. Failure details are surfaced in the
<strong>Status Dashboard</strong> and written to the application Logs for diagnosis.
</p>

<p>
Temporary connectivity issues, Apple-side throttling, or transient server errors may
also delay imports. In these cases, the app automatically applies rate-limit backoff
and retries without blocking the user interface.
</p>

<p>
Retry counts, throttling events, and cumulative backoff timing are recorded and visible
in the Status Dashboard, providing transparency into import behavior and Apple API
constraints.
</p>

<p>
Network restrictions such as firewalls, VPNs, or proxy servers may block access to
Apple endpoints. Ensure that outbound HTTPS access to Apple Business Manager and
Apple OAuth services is permitted on your network.
</p>

<p>
If no valid credentials are available, ABM Warranty may display guidance prompting you
to configure credentials, or temporarily operate using sample data to demonstrate the
user interface without making live API requests.
</p>

<p>
</p>

