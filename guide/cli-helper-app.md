---
layout: guide
title: "CLI Helper App"
description: "CLI Helper App"
permalink: /guide/cli-helper-app/
---

<p>
ABM Warranty includes a dedicated login-item helper app to keep local warranty
notifications working even when the main app is closed.
</p>

<h3>Why the Helper Exists</h3>

<p>
The core app can only evaluate notification candidates while it is running.
For managed notification behavior, that is not sufficient. Users expect alerts
to continue after logout/login cycles, app restarts, and normal desktop
workflows where the app is closed. The helper provides this continuity by
running as a login-item runtime and executing the same evaluation engine used
by the app path.
</p>

<h3>Architecture Summary</h3>

<ul>
    <li><strong>Main app</strong> computes and publishes a tenant-scoped snapshot to shared app-group storage.</li>
    <li><strong>Helper</strong> reads that snapshot and transforms it into notification events.</li>
    <li><strong>Shared engine</strong> applies suppression, cadence, and dedupe rules.</li>
    <li><strong>UserNotifications</strong> posts local alerts with deep-link payloads.</li>
    <li><strong>App open path</strong> resolves payloads to tenant/device detail or filter fallback.</li>
</ul>

<h3>How It Works with Login-Items</h3>

<p>
Helper registration is handled through
<code>SMAppService.loginItem(identifier:)</code> so notification behavior can be
managed through a system-supported login-item path. When notifications are
enabled, ABM Warranty registers
<code>breelabs.ABM-Warranty.NotificationHelper</code>. When notifications are
disabled, the app unregisters that helper so background notification evaluation
stops with the same policy boundary used in the UI.
</p>

<p>
Runtime helper state is observable through statuses such as
<code>enabled</code>, <code>requiresApproval</code>, <code>notFound</code>, and
<code>notRegistered</code>. This gives operators a concrete way to confirm
whether the login-item path is active and approved. The helper is bundled with
the app at
<code>ABM Warranty.app/Contents/Library/LoginItems/ABM Notification Helper.app</code>,
keeping deployment and registration tied to the same signed app package.
</p>

<h3>Data Flow and Contracts</h3>

<p>
The helper reads tenant snapshot data from
<code>widget.snapshot.activeTenant</code> in app-group defaults. That snapshot
contains summary counts and prequalified device lists for
<strong>Needs Attention</strong> and <strong>Expiring Soon</strong>, which lets
the helper evaluate notification candidates without recomputing upstream
coverage state. This keeps runtime behavior aligned with the app-open path.
</p>

<p>
Notification behavior is governed by shared keys including
<code>notifications.enabled</code>, <code>notifications.frequency</code>, and
<code>notifications.lastSentMap</code>, with suppression stored in
<code>notification_suppression</code> inside shared SQLite storage. Posted
notification payloads include <code>tenantID</code>, <code>deviceID</code>,
<code>serialNumber</code>, <code>category</code>, and timestamp fields so the
app can resolve deep links and preserve deterministic dedupe logic per
tenant/device/category.
</p>

<h3>Runtime Behavior</h3>

<p>
Current helper cadence is a 30-minute interval timer plus an immediate launch
evaluation.
</p>

<p>
At launch, the helper performs an immediate evaluation pass so users do not
have to wait for the first timer cycle to detect pending notifications. While
running, it continues periodic evaluation on the 30-minute schedule. This
pattern balances responsiveness with predictable local background work.
</p>

<p>
Evaluation is intentionally gated. Runs are skipped when notifications are
disabled, when notification authorization is unavailable, or when no valid
snapshot is present. For eligible candidates, dedupe is enforced per
tenant/device/category using last-sent timestamps, and suppressed devices are
excluded for that tenant context so muted records stay muted across cycles.
</p>

<h3>Security & Sandboxing</h3>

<p>
The helper target runs sandboxed and is constrained by app entitlements, which
keeps its runtime scope narrow and purpose-built for notification workflows.
Shared app-group access is explicit and limited to notification and state
exchange, rather than broad data access, so helper behavior remains bounded to
the same domain as the notification pipeline.
</p>

<p>
Credential authority remains in the app credential flows, and private key
material is not moved into helper scope. ABM Warranty also does not rely on an
APNs or push backend for this feature path. Notifications are local system
notifications, which keeps delivery behavior local-first and consistent with
desktop sandbox expectations.
</p>

<h3>Why This Is Critical to Managed Notifications</h3>

<p>
Managed environments need notification continuity even when the primary UI is
not open. The helper provides that continuity by carrying the same policy model
into a login-item runtime, so alerts still evaluate across app restarts,
logout/login cycles, and typical desktop usage where the app may not stay
foregrounded.
</p>

<p>
This also prevents policy drift between app-open and app-closed behavior.
Suppression, cadence, and dedupe decisions remain deterministic because both
paths operate against the same contracts and shared state. The result is a
consistent notification experience that mirrors what administrators configure in
the app.
</p>

<h3>Operations and Diagnostics</h3>

<p>
Use CLI commands to validate helper state and end-to-end notification behavior:
</p>

<pre class="terminal"><code>abm-warranty notifications status
abm-warranty notifications run-once
abm-warranty notifications fire-test
abm-warranty notifications fire-test -v</code></pre>

<p>
If alerts do not appear:
</p>

<ol>
    <li>Confirm helper status is <code>enabled</code>.</li>
    <li>Confirm macOS notification authorization is granted.</li>
    <li>Confirm the target device is not in <strong>Notifications Muted</strong>.</li>
    <li>Run <code>fire-test -v</code> to verify local delivery path.</li>
    <li>Validate snapshot presence and tenant context before run-once checks.</li>
</ol>
