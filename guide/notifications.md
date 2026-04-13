---
layout: guide
title: "Notifications"
description: "Notifications"
permalink: /guide/notifications/
---

<p>
ABM Warranty supports local macOS notifications for devices in
<strong>Needs Attention</strong> and <strong>Expiring Soon</strong> states.
These alerts are designed to keep coverage risk visible between full dashboard
reviews, while still respecting tenant context, cadence settings, and muted
device controls.
</p>

<p>
Notification behavior is local-first and policy-driven. The app and helper
runtime follow the same suppression and cadence model, so what you configure in
settings is consistently applied to background and foreground evaluation paths.
</p>

<h3>Where Notifications Are Configured</h3>

<p>
Notification controls are managed in ABM Warranty settings. From there you can
enable or disable notifications and set how frequently alerts are eligible to
reappear. Cadence options are tuned for practical operations: daily, every
three days, or weekly.
</p>

<p>
Configuration changes take effect against the shared notification model used by
the app and helper. That keeps behavior predictable when users switch between
interactive use and background delivery.
</p>

<div class="guide-shots guide-shots--split guide-shots--steps">
    <div class="guide-shot-item">
        <figure class="guide-shot-card guide-shot-card--step">
            <span class="guide-shot-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/notifications/configured/step_1.png' | relative_url }}"
              alt="Open notifications settings in ABM Warranty"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-shot-caption">Open the Notifications section in Settings to access alert controls and delivery behavior.</p>
    </div>
    <div class="guide-shot-item">
        <figure class="guide-shot-card guide-shot-card--step">
            <span class="guide-shot-step-pill">Step 2</span>
            <img
              src="{{ '/assets/images/guide/notifications/configured/step_2.png' | relative_url }}"
              alt="Enable notifications and choose cadence"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-shot-caption">Turn notifications on and select an interval that matches how often you want follow-up alerts.</p>
    </div>
</div>

<h3>What Happens After Notifications Are Enabled</h3>

<p>
After notifications are turned on in app settings, macOS may present system
permission banners tied to background activity and notification delivery. This
is expected behavior because ABM Warranty uses a helper runtime for continuity
when the app is closed, and macOS surfaces that runtime behavior explicitly.
</p>

<p>
You may see prompts indicating that ABM Warranty can run in the background and
that notifications can include alerts and badges. These prompts are part of the
normal permission flow and should be reviewed so notification delivery can work
as configured.
</p>

<div class="guide-shots guide-shots--split guide-shots--steps">
    <div class="guide-shot-item">
        <figure class="guide-shot-card guide-shot-card--step guide-shot-card--step-focus">
            <span class="guide-shot-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/notifications/notification_alerts.png' | relative_url }}"
              alt="Background activity prompt for ABM Warranty notifications"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-shot-caption">Review the background activity notice so the helper can continue notification checks while the app is not open.</p>
    </div>
    <div class="guide-shot-item">
        <figure class="guide-shot-card guide-shot-card--step guide-shot-card--step-focus">
            <span class="guide-shot-step-pill">Step 2</span>
            <img
              src="{{ '/assets/images/guide/notifications/allow_alerts.png' | relative_url }}"
              alt="Allow notifications banner for ABM Warranty"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-shot-caption">Use the system alert prompt to grant notification permission so banners and badges can be delivered.</p>
    </div>
</div>

<p>
If you need to confirm or adjust notification permissions later, open
<strong>System Settings</strong> and manage ABM Warranty under Notifications.
This is where you control alert style, sound behavior, and badge visibility at
the macOS level.
</p>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/notifications/notifications.png' | relative_url }}"
      alt="ABM Warranty notification controls in macOS System Settings"
      loading="lazy"
      decoding="async">
</figure>

<h3>Dashboard and Filters</h3>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/notifications/muted.png' | relative_url }}"
      alt="Notifications Muted card and filter in ABM Warranty"
      loading="lazy"
      decoding="async">
</figure>

<p>
The dashboard includes a <strong>Notifications Muted</strong> card, and the
sidebar filter menu includes the same muted view so teams can inspect
suppressed records quickly. Both entry points lead to the same filtered result
set for the active tenant.
</p>

<p>
This makes muted-state auditing straightforward: you can move from summary
metrics to the exact device list in one step, verify suppression intent, and
resume alerting only where needed.
</p>

<h3>Device-Level Suppression</h3>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/notifications/muted_device.png' | relative_url }}"
      alt="Device-level notification suppression control in ABM Warranty"
      loading="lazy"
      decoding="async">
</figure>

<p>
In device detail, the bell control is used to mute or unmute notifications for
an individual device. This lets you suppress noise for known or acknowledged
cases without globally disabling notifications for the tenant.
</p>

<p>
Suppression state is stored per tenant and honored across runtime paths. When a
device is muted, that status is respected by both the app and helper
evaluation flow until the device is explicitly re-enabled.
</p>

<h3>Runtime Components</h3>

<p>
Notification processing is shared across three components. The main app handles
candidate evaluation while the UI is active, the login-item helper continues
evaluation when the app is closed, and the CLI provides status and diagnostics
for verification and troubleshooting.
</p>

<p>
Together, these components maintain continuity across normal desktop workflows.
Whether the app is open or closed, notification policy remains consistent with
your configured cadence and suppression rules.
</p>

<h3>CLI Shortcuts</h3>

<pre class="terminal"><code>abm-warranty notifications status
abm-warranty notifications run-once
abm-warranty notifications fire-test
abm-warranty notifications fire-test -v</code></pre>

<p>
Use these commands to confirm current configuration, run a non-mutating
diagnostic pass, and verify local delivery behavior end-to-end.
</p>
