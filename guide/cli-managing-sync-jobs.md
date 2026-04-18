---
layout: guide
title: "CLI Managing Sync Jobs"
description: "CLI Managing Sync Jobs"
permalink: /guide/cli-managing-sync-jobs/
---

<p>
The sync command surface is designed for headless import operations when you
need to run ABM Warranty jobs outside the GUI. It gives you direct control over
tenant targeting, sync mode selection, and runtime tuning so operational jobs
can be executed and reviewed from terminal workflows.
</p>

<p>
This page breaks each sync capability into practical commands and expected
output. Use it as a runbook for listing tenants, inspecting chunk-size
preferences, launching full or scoped syncs, and reviewing job history for
troubleshooting and audit visibility.
</p>

<h3>Sync Help</h3>

<p>
Start with the sync help output to see the complete command surface, option
requirements, and command aliases for both <code>--sync</code> and
<code>sync</code> forms.
</p>

<pre class="terminal"><code>abm-warranty sync --help
ABM Warranty Sync CLI

OVERVIEW
  Run headless sync jobs for a specific tenant.

USAGE
  abm-warranty --sync --tenant-id &lt;TENANT_ID&gt; --type &lt;full|partial|single&gt; [--serial &lt;SERIAL&gt;]
  abm-warranty sync --tenant-id &lt;TENANT_ID&gt; --type &lt;full|partial|single&gt; [--serial &lt;SERIAL&gt;]
  abm-warranty --chunk-size
  abm-warranty --set-chunk-size &lt;VALUE&gt;

COMMANDS
  --list-tenants
      List available tenant IDs and names.
  --chunk-size
      Print current global chunk-size preference and allowed values.
  --set-chunk-size &lt;VALUE&gt;
      Set global chunk-size preference used by full/partial sync.

  --show-jobs --tenant-id &lt;TENANT_ID&gt;
      Print expanded sync run/chunk history for a tenant.

  --sync --tenant-id &lt;TENANT_ID&gt; --type &lt;full|partial|single&gt; [--serial &lt;SERIAL&gt;]
      Run sync now.

OPTIONS
  --tenant-id &lt;TENANT_ID&gt;
      Required for --sync and --show-jobs.
  --type &lt;full|partial|single&gt;
      Required for --sync.
  --serial &lt;SERIAL&gt;
      Required for --type single.
  &lt;VALUE&gt;
      Allowed chunk sizes:
      10, 50, 100, 200, 500, 1000, 2000, 5000, 10000

EXAMPLES
  abm-warranty --list-tenants
  abm-warranty --chunk-size
  abm-warranty --set-chunk-size 500
  abm-warranty --show-jobs --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  abm-warranty --sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type full
  abm-warranty sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type partial
  abm-warranty --sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type single --serial C02XXXXXXX

CANCELLATION
  Use Ctrl+C to cancel an active sync.
  Ctrl+X is not cancel for this CLI. Ctrl+Z suspends the process.</code></pre>

<p>
The help output defines required flags clearly, including when
<code>--tenant-id</code>, <code>--type</code>, and <code>--serial</code> are
mandatory. It also documents cancellation behavior so operators can safely stop
an active sync run.
</p>

<h3>List Available Tenants</h3>

<p>
Use tenant listing before running jobs so you target the correct tenant
identifier in scripted or manual workflows.
</p>

<pre class="terminal"><code>abm-warranty --list-tenants</code></pre>

<p>
This command returns the tenant IDs and display names currently available to
the local runtime context.
</p>

<h3>Check Current Chunk Size</h3>

<p>
Use chunk-size inspection to confirm the global batch setting used for
full and partial sync jobs.
</p>

<pre class="terminal"><code>abm-warranty --chunk-size</code></pre>

<p>
The output shows the active preference and valid values, which helps validate
performance tuning before larger sync operations.
</p>

<h3>Set Global Chunk Size</h3>

<p>
Use this command to tune chunk processing volume for full and partial runs when
you need to balance speed, API pressure, and local processing overhead.
</p>

<pre class="terminal"><code>abm-warranty --set-chunk-size 500</code></pre>

<p>
After this update, subsequent eligible sync jobs will use the configured chunk
size preference until changed again.
</p>

<h3>Show Sync Job History</h3>

<p>
Use job history output to inspect recent run and chunk activity for a specific
tenant. This is useful for support triage, verification, and timeline review.
</p>

<pre class="terminal"><code>abm-warranty --show-jobs --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code></pre>

<p>
This command prints expanded sync history scoped to the provided tenant ID,
including run-level and chunk-level status details.
</p>

<h3>Run a Full Sync</h3>

<p>
Use full sync when you need a complete refresh of the tenant dataset in one
headless run.
</p>

<pre class="terminal"><code>abm-warranty --sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type full</code></pre>

<p>
This executes a full sync immediately for the selected tenant and records the
run in sync job history.
</p>

<h3>Run a Partial Sync</h3>

<p>
Use partial sync for routine incremental processing when full dataset refresh is
not required.
</p>

<pre class="terminal"><code>abm-warranty sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type partial</code></pre>

<p>
This starts a partial job using the same tenant targeting model with a lighter
data scope than a full run.
</p>

<h3>Run a Single-Device Sync</h3>

<p>
Use single-device mode when you need focused troubleshooting or validation for
one serial number.
</p>

<pre class="terminal"><code>abm-warranty --sync --tenant-id BUSINESSAPI.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx --type single --serial C02XXXXXXX</code></pre>

<p>
In single mode, the serial is required and the sync scope is constrained to one
device for targeted verification.
</p>
