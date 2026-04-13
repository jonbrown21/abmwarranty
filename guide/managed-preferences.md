---
layout: guide
title: "Managed Preferences"
description: "Managed Preferences"
permalink: /guide/managed-preferences/
guide_shots:
  - src: /assets/images/guide/import_creds/import_creds.png
    alt: Import managed credentials in ABM Warranty
---


<p>
ABM Warranty supports deployment and configuration through managed preferences
(MDM) to enable secure, scalable administration in enterprise environments.
Managed preferences are primarily used to <strong>distribute and manage Apple
Business Manager API credentials</strong> and to control specific application
behavior during managed rollouts.
</p>

<p>
This document describes how managed preferences interact with ABM Warranty.
For a complete, always-up-to-date reference — including preference keys,
payload formats, and examples — refer to the official documentation:
</p>

<ul>
    <li>
        <strong>ABM Warranty Utilities Repository</strong><br />
        <a href="https://github.com/breelabs/ABM-Warranty-Utilities">
            https://github.com/breelabs/ABM-Warranty-Utilities
        </a>
    </li>
    <li>
        <strong>Managed Preferences Wiki</strong><br />
        <a href="https://github.com/breelabs/ABM-Warranty-Utilities/wiki/Managed-Preferences">
            https://github.com/breelabs/ABM-Warranty-Utilities/wiki/Managed-Preferences
        </a>
    </li>
</ul>

<h3>Credential Management via MDM</h3>

<p>
Managed preferences are used to deliver <strong>managed Apple Business Manager
credentials</strong> to ABM Warranty. Each managed credential corresponds to a
single ABM tenant and results in a dedicated tenant environment inside the app.
</p>

<p>
Managed credentials include encrypted private key material and metadata
(Client ID, Key ID, scope, and display name). Private keys are never stored
in plain text and are decrypted locally only after user authorization.
</p>

<p>
Managed credentials are imported into the app through a guided user experience.
Users are prompted to approve and unlock managed credentials before they
become active.
</p>

<h3>Behavior of Managed Credentials</h3>

<p>
Managed credentials follow explicit rules to ensure predictable behavior:
</p>

<ul>
    <li>
        <strong>Additions</strong> — New managed credentials delivered via MDM
        are detected automatically and queued for import.
    </li>
    <li>
        <strong>Removals</strong> — When a credential is no longer managed,
        it becomes a normal (user-owned) credential and may be removed
        manually by the user.
    </li>
    <li>
        <strong>Updates</strong> — Changes to an existing managed credential
        do not overwrite user state. Managed preferences are treated as
        authoritative only for initial delivery.
    </li>
</ul>

<p>
This design prevents silent credential rotation, unexpected data loss,
or background key replacement.
</p>

<h3>Multi-Tenancy and Managed Preferences</h3>

<p>
ABM Warranty enforces a strict relationship between credentials and tenants:
</p>

<ul>
    <li><strong>One credential equals one tenant</strong></li>
    <li><strong>One tenant equals one database</strong></li>
</ul>

<p>
When multiple managed credentials are deployed, ABM Warranty creates
independent tenant environments. Device data, diagnostics, health status,
and logs are isolated per tenant and do not overlap.
</p>

<p>
For details on tenant isolation, database layout, and logging behavior,
see:
</p>

<ul>
    <li>
        <a href="https://github.com/breelabs/ABM-Warranty-Utilities/wiki/Multi%E2%80%90Tenancy">
            Multi-Tenancy Documentation
        </a>
    </li>
</ul>

<h3>Security Model</h3>

<p>
ABM Warranty is designed with intentional security boundaries:
</p>

<ul>
    <li>Private keys are never written to logs</li>
    <li>Credentials are stored using the macOS Keychain</li>
    <li>Tenant databases are isolated and scoped by credential</li>
    <li>No write operations are ever performed against Apple Business Manager</li>
</ul>

<p>
Managed preferences control <em>delivery</em> of credentials, not ongoing
runtime behavior. All imports, retries, and API access remain user-visible
and auditable through the Status Dashboard and Logs.
</p>

<p>
</p>
