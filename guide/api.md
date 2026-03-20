---
layout: guide
title: "Using Apple Business Manager APIs"
description: "Using Apple Business Manager APIs"
permalink: /guide/api/
---


<p>
ABM Warranty retrieves device inventory and warranty coverage data from Apple Business Manager (ABM)
using Apple’s official, read-only APIs. These APIs are used exclusively to <strong>observe</strong>
device state and coverage information — no data is ever written back to ABM.
</p>

<p>
The app currently relies on two primary API domains:
</p>

<ul>
    <li>
        <strong>Organization Devices</strong> — Retrieves the organization’s full device inventory
        using paginated requests.
    </li>
    <li>
        <strong>AppleCare Coverage</strong> — Retrieves warranty and AppleCare coverage details
        for individual devices.
    </li>
</ul>

<p>
Device inventory is fetched page-by-page to avoid blocking the user interface.
As devices are discovered, they are immediately surfaced in the app and persisted locally.
Warranty coverage is then retrieved asynchronously in the background, allowing progress
to be reported continuously while the app remains fully responsive.
</p>

<p>
ABM Warranty uses a unified, non-blocking import pipeline designed for reliability and transparency.
Import progress is displayed in the Progress Bar and Status Dashboard, including:
</p>

<ul>
    <li>Pagination progress and page counts</li>
    <li>Retry attempts and backoff timing</li>
    <li>Rate-limit (HTTP 429) handling</li>
    <li>Server error detection</li>
    <li>Estimated time remaining</li>
</ul>

<p>
Only read-only API operations are performed. ABM Warranty
<strong>never modifies, deletes, or writes</strong> data back to Apple Business Manager.
All device records are stored locally and scoped to the credential (tenant) that retrieved them.
</p>

<p>
If API errors occur — such as network interruptions, rate limiting, or transient server failures —
the app automatically retries where appropriate. Retry counts, throttling events, and error
conditions are recorded and surfaced in the Status Dashboard and diagnostic exports.
</p>

<p>
Devices that are no longer returned by ABM are not deleted. Instead, they are retained locally
and marked as inactive. This preserves historical accuracy and ensures that previously
managed devices remain visible for auditing and reporting purposes.
</p>

<p>
All API activity strictly respects Apple’s documented rate limits. When throttling is required,
imports pause automatically and resume once it is safe to continue. Throttle state and cooldown
timing are clearly communicated in the user interface.
</p>

<p>
In situations where valid credentials are not available, or during first-time use,
ABM Warranty may display sample data. This allows users to explore the interface safely
without making live API requests. Sample data is clearly labeled and is automatically
replaced once a successful ABM import occurs.
</p>

<p>
</p>

