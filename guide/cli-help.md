---
layout: guide
title: "CLI Help Page"
description: "CLI Help Page"
permalink: /guide/cli-help/
---

<p>
ABM Warranty includes a command-line interface named <code>abm-warranty</code>
for local notification controls and diagnostics.
</p>

<div class="video-wrap">
    {% include videos/video.html id="4C4idaTRW04" %}
</div>

<h3>Add ZSH Alias</h3>

<pre class="terminal"><code>echo '
abm_warranty() {
  "/Applications/ABM Warranty.app/Contents/MacOS/ABM Warranty" "$@"
}
alias abm-warranty=abm_warranty
' >> ~/.zshrc && source ~/.zshrc && hash -r</code></pre>

<h3>Run Help</h3>

<pre class="terminal"><code>abm-warranty --help</code></pre>

<pre class="terminal"><code>ABM Warranty CLI

OVERVIEW
  Command-line interface for ABM Warranty diagnostics and notification controls.

USAGE
  abm-warranty [--help]
  abm-warranty notifications [--help]
  abm-warranty notifications &lt;command&gt; [options]

GLOBAL FLAGS
  -h, --help
      Show this help.

COMMAND GROUPS
  notifications
      Manage local warranty notification behavior and helper registration.

NOTIFICATIONS COMMANDS
  status
  enable
  disable
  frequency &lt;daily|3days|weekly&gt;
  run-once
  fire-test
  fire-test [-v|--verbose]
  help

EXAMPLES
  abm-warranty --help
  abm-warranty notifications status
  abm-warranty notifications enable
  abm-warranty notifications frequency weekly
  abm-warranty notifications fire-test</code></pre>

<h2>Security and Sandboxing</h2>

<p>
At this stage, the CLI is focused on notification management and diagnostics.
As the CLI surface expands, it will continue to follow the same local-first
execution model and platform security boundaries used by the app.
</p>

<ul>
    <li>CLI actions are local-only (no push servers).</li>
    <li>Notification settings are shared through the app-group container.</li>
    <li>Credential material remains in Keychain and is not exposed by CLI commands.</li>
    <li>If macOS notification permission is denied, notification commands report failure states.</li>
</ul>
