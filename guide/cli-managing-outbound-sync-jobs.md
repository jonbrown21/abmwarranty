---
layout: guide
title: "Outbound Sync Jobs"
description: "Outbound Sync Jobs"
permalink: /guide/cli-managing-outbound-sync-jobs/
---

<p>
Outbound sync uses connection setup from the app UI. CLI does not create or map
connections; it executes and inspects runs for the tenant.
</p>

<h3>Core outbound commands</h3>
<pre class="terminal"><code>abm-warranty connections list --tenant-id &lt;TENANT_ID&gt;
abm-warranty connections test --tenant-id &lt;TENANT_ID&gt; --connection-id &lt;CONNECTION_ID&gt;
abm-warranty connections remove --tenant-id &lt;TENANT_ID&gt; --connection-id &lt;CONNECTION_ID&gt;
abm-warranty connections show-jobs --tenant-id &lt;TENANT_ID&gt;</code></pre>

<h3>Run outbound now</h3>
<pre class="terminal"><code>abm-warranty connections run --tenant-id &lt;TENANT_ID&gt; --type full
abm-warranty connections run --tenant-id &lt;TENANT_ID&gt; --type single --serial C02FC149MD6T</code></pre>

<h3>Outbound behavior notes</h3>
<ul>
  <li>Run order and connection set are loaded from saved UI binding/order for that tenant.</li>
  <li>Source mode is loaded from saved connection configuration.</li>
  <li>Use Ctrl+C to cancel active runs.</li>
  <li>If a command fails with <code>--tennant-id</code>, use <code>--tenant-id</code>.</li>
</ul>

<h3>Outbound success/failure interpretation</h3>
<table>
  <thead>
    <tr>
      <th>CLI Output Pattern</th>
      <th>Meaning</th>
      <th>Primary Next Check</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>[ConnectionsCLI] completed run=... status=completed</code></td>
      <td>Outbound run completed</td>
      <td>Inspect <code>connections show-jobs</code> for per-connection results</td>
    </tr>
    <tr>
      <td><code>[ConnectionsCLI] failed: ...</code></td>
      <td>Run terminated by request/contract/payload error</td>
      <td>Validate contract method/formatter and mapping field paths</td>
    </tr>
    <tr>
      <td><code>error: no runnable connection set is configured...</code></td>
      <td>No saved mapped connection set for tenant</td>
      <td>Configure mapped connections in app UI first</td>
    </tr>
  </tbody>
</table>