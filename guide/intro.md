---
layout: guide
title: "Introduction"
description: "Introduction"
permalink: /guide/intro/
guide_shots:
  - src: /assets/images/guide/introduction.png
    alt: Introduction screen in ABM Warranty
---


<p>
ABM Warranty retrieves device inventory and warranty coverage information
from Apple Business Manager using secure, read-only API access.
The application presents Apple-provided Standard Warranty and AppleCare+
data in a clear, structured interface designed for operational visibility
and auditing.
</p>

<p>
All data retrieval is performed using non-blocking background operations.
Device inventory is streamed page-by-page, and warranty coverage is fetched
in parallel batches. This allows the application to remain fully responsive
while data is imported, retried, and updated continuously.
</p>

<p>
ABM Warranty supports both single-tenant and multi-tenant operation.
Each Apple Business Manager credential maps to a dedicated tenant with its
own database, diagnostics, and logs. Switching credentials switches the
active tenant context without mixing data between organizations.
</p>

<p>
The Dashboard provides a high-level overview of device counts, warranty
states, and devices requiring attention for the active tenant.
Each dashboard tile acts as a shortcut filter, allowing you to quickly
focus on specific subsets of devices.
</p>

<p>
Individual device records display detailed coverage windows, computed
coverage status, last imported timestamps, and historical context.
Devices no longer returned by Apple Business Manager are retained locally
and marked as inactive to preserve historical accuracy.
</p>

<p>
ABM Warranty includes built-in diagnostics, rate-limit awareness, and
automatic retry handling to safely operate within Apple’s API limits.
Import activity, retries, throttling events, and errors are surfaced
through the Status Dashboard and detailed application logs.
</p>

<p>
When valid credentials are not present, the app may operate in a
diagnostic or sample-data mode. This allows the interface and workflows
to be explored without performing live API requests.
</p>

<p>
This guide explains how to configure credentials, populate and refresh
data, interpret warranty and coverage states, use filters and exports,
and troubleshoot common issues when working with Apple Business Manager
data.
</p>

<p>
</p>
