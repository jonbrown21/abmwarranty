---
layout: guide
title: "Coverage & Warranty Windows"
description: "Coverage & Warranty Windows"
permalink: /guide/coverage/
---


<p>
Coverage information in ABM Warranty includes <strong>Standard Warranty</strong> and
<strong>AppleCare+</strong> coverage windows as reported by Apple Business Manager.
Each coverage window includes a start date, end date, and a derived status based on
the current date.
</p>

<p>
Device inventory and coverage data are retrieved using separate Apple Business Manager
API endpoints. Coverage requests are performed after devices are discovered and are
processed in batches to avoid blocking the user interface.
</p>

<p>
As coverage data becomes available, ABM Warranty updates device records incrementally.
You may see coverage statuses update progressively while an import is still in progress.
</p>

<p>
For each device, ABM Warranty evaluates the most relevant coverage window for both
Standard Warranty and AppleCare+. If Apple provides multiple historical windows,
only the currently applicable window is used to determine coverage status and filtering.
</p>

<p>
Coverage details are displayed in the <strong>Device Detail</strong> view, including:
</p>

<ul>
    <li>Coverage type (Standard Warranty or AppleCare+)</li>
    <li>Coverage start and end dates</li>
    <li>Derived status (active, expired, expiring soon, or requires attention)</li>
    <li>The last time coverage information was updated for the device</li>
</ul>

<p>
Devices that are no longer returned by Apple Business Manager are retained locally and
marked as <strong>Inactive</strong>. Inactive devices preserve their last known coverage
state and remain visible unless filtered out.
</p>

<p>
Coverage-related states such as active, expired, expiring soon, renewable, and inactive
are surfaced throughout the app using sidebar filters and Dashboard indicators to help
identify devices that may require action.
</p>

<p>
All coverage data is read-only. ABM Warranty does not modify warranty status, coverage
records, or device metadata in Apple Business Manager.
</p>

<p>
</p>

