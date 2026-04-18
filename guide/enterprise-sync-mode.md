---
layout: guide
title: "Enterprise Sync Mode"
description: "Enterprise Sync Mode"
permalink: /guide/enterprise-sync-mode/
guide_shots:
  - src: /assets/images/guide/sync/enterprise_sync.png
    alt: "Enterprise Sync Mode settings and sync strategy overview"
---

<p>
Enterprise Sync Mode is an advanced sync option designed for organizations with
larger Apple device fleets. It helps the app process large sync workloads more
safely and consistently, especially when API conditions are slow, rate-limited,
or unstable.
</p>

<p>
When enabled, sync behavior is tuned for reliability and controlled throughput
rather than pure speed bursts.
</p>

<h2>Where to Enable It</h2>

<ol>
  <li>Open <strong>Settings</strong>.</li>
  <li>Turn on <strong>Enterprise Sync Support</strong>.</li>
</ol>

<p>
Once enabled, the dashboard indicates that Enterprise Sync Mode is active.
</p>

<h2>Why It Exists</h2>

<p>
As fleets grow, sync jobs become heavier and operational complexity rises. More
devices must be reconciled, more coverage and enrichment data must be processed,
and API throttling or transient failures become more likely during long runs.
</p>

<p>
Enterprise Sync Mode exists to reduce failed or unstable sync runs under those
conditions and provide a more resilient runtime path for larger-scale imports.
</p>

<h2>How It Differs From the Primary Sync Track</h2>

<p>
Enterprise Sync Mode keeps the same sync contract and data rules, but changes
execution behavior to prioritize stability and predictability at scale.
</p>

<h3>Same Core Contract</h3>

<ul>
  <li>Reconciles device presence against API results.</li>
  <li>Marks devices inactive when they are no longer in API inventory.</li>
  <li>Uses full, partial, and single-device sync entry points.</li>
  <li>Persists sync state and job history.</li>
</ul>

<h3>Different Execution Style</h3>

<ul>
  <li>Controlled pacing of API requests.</li>
  <li>More defensive retry and backoff behavior.</li>
  <li>Chunked job execution with durable state tracking.</li>
  <li>Better handling of long-running sync operations.</li>
</ul>

<h2>Benefits for Larger Fleets</h2>

<p>
Enterprise Sync Mode is most useful when you have many devices and frequent
sync activity where job stability matters as much as raw execution speed.
</p>

<ul>
  <li>Fewer unstable runs under API pressure.</li>
  <li>More predictable progress during large syncs.</li>
  <li>Better survival of cancellation and interruption scenarios.</li>
  <li>Stronger visibility into chunk and job outcomes in Sync Jobs.</li>
  <li>Smoother long-run behavior for full and partial sync cycles.</li>
</ul>

<h2>What It Does Not Change</h2>

<p>
Enterprise mode does <strong>not</strong> change your business logic or data
contract. It does not alter inactive rules, redefine full/partial/single sync
types, skip reconciliation requirements, or change what correct sync results
look like.
</p>

<p>
It changes <em>how work is performed</em>, not <em>what result is considered
correct</em>.
</p>

<h2>Sync Size and Enterprise Mode</h2>

<p>
Enterprise mode works with <strong>Sync Size</strong> (chunk size). Smaller
chunks can improve control and observability, while larger chunks can reduce
overhead in stable environments.
</p>

<p>
Available values are <code>10</code>, <code>50</code>, <code>100</code>,
<code>200</code>, <code>500</code>, <code>1000</code>, <code>2000</code>,
<code>5000</code>, and <code>10000</code>. The default value is
<code>100</code>.
</p>

<h2>Recommended Usage</h2>

<p>
Use Enterprise Sync Mode when your tenant has a larger fleet, you run frequent
full or partial syncs, and you need more stable behavior across long-running
operations with clearer run and chunk-level visibility.
</p>

<p>
For smaller fleets, primary sync mode may feel faster in simple conditions, but
Enterprise mode is typically more resilient as scale, runtime duration, and API
variability increase.
</p>
