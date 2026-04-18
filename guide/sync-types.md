---
layout: guide
title: "Sync Types"
description: "Sync Types"
permalink: /guide/sync-types/
---

<h3>Summary</h3>

<p>
ABM Warranty provides three sync types so teams can choose the right execution
scope for each operational scenario. Instead of forcing one heavy process for
every run, sync type selection lets you balance breadth, speed, and risk across
large fleet operations.
</p>

<p>
All three types share the same reconciliation contract and final data goals, but
they differ in workload shape and run intent. This keeps outcomes consistent
while giving operations flexibility for daily cadence, larger refreshes, and
single-device verification.
</p>

<h3>Full Sync with Update</h3>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/sync/full_sync.png' | relative_url }}"
    alt="Full Sync with Update workflow view"
    loading="lazy"
    decoding="async">
</figure>

<p>
Full Sync with Update is the broadest execution path and is intended for
comprehensive tenant refreshes. It reconciles the full API inventory against
local state, applies inactive decisions for devices no longer present in source
inventory, and then processes active workloads through chunked job execution.
</p>

<p>
This mode is best used for baseline alignment, post-maintenance verification, or
periodic deep refresh cycles. It favors correctness and full-state convergence
over shortest runtime, especially when fleet size is large.
</p>

<h3>Partial Sync</h3>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/sync/partial_sync.png' | relative_url }}"
    alt="Partial Sync no-data recovery workflow view"
    loading="lazy"
    decoding="async">
</figure>

<p>
Partial Sync is a targeted recovery path for devices currently in a no-data
state. It is primarily used to re-run devices that were skipped or left
unfinished in prior processing windows rather than to execute a broad recurring
fleet-wide cadence.
</p>

<p>
No-data states can result from cancellation/interruption, transient API or
service errors, and chunk runs that did not complete cleanly end-to-end. Partial
Sync focuses on reconciling that backlog so unresolved devices can be retried
without rerunning a full tenant refresh.
</p>

<h3>Single Device Sync</h3>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/sync/single_sync.png' | relative_url }}"
    alt="Single Device Sync focused serial workflow view"
    loading="lazy"
    decoding="async">
</figure>

<p>
Single Device Sync is a targeted workflow for focused diagnostics and validation
on a specific serial. It is designed for support and verification tasks where a
single device must be checked without triggering a broader tenant run.
</p>

<p>
This mode keeps the same general orchestration pattern but limits scope to one
record path, making it useful for triage, post-change checks, and repeatable
support investigation steps.
</p>

<h3>How the Modes Fit Together</h3>

<p>
The three modes are not competing systems; they are execution profiles over the
same core sync framework. Teams can run full for baseline, partial for cadence,
and single-device for pinpoint investigations without changing the underlying
data rules.
</p>

<pre class="terminal"><code>Tenant Sync Strategy
--------------------
Full Sync      -> broad reconciliation + chunked execution
Partial Sync   -> reduced-scope recurring updates
Single Device  -> one-serial targeted validation</code></pre>
