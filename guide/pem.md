---
layout: guide
title: "Working with PEM Keys"
description: "Working with PEM Keys"
permalink: /guide/pem/
---


<p>
The PEM file is your <strong>Apple Business Manager API private key</strong>.
ABM Warranty uses this key to generate a signed JWT client assertion, which is
required to authenticate with Apple’s OAuth service before any device or
coverage data can be retrieved.
</p>

<p>
The PEM file must meet the following requirements:
</p>

<ul>
    <li>Elliptic Curve (EC) private key using the <strong>P-256</strong> curve</li>
    <li><strong>Unencrypted</strong> private key format</li>
    <li>Downloaded directly from Apple Business Manager</li>
    <li>Must correspond exactly to the configured <strong>Client ID</strong>
        and <strong>Key ID</strong></li>
</ul>

<p>
To configure a PEM key, open <strong>Settings</strong>, enter the Client ID and
Key ID, then select the PEM file using the file picker. The key is validated
immediately to confirm that it can be used to generate a client assertion.
</p>

<p>
ABM Warranty stores only a secure reference to the PEM file location.
The private key itself is never copied, embedded, or transmitted outside the
local system.
</p>

<p>
If the PEM file cannot be read or validated, ABM Warranty will:
</p>

<ul>
    <li>Block authentication and API access</li>
    <li>Surface credential warnings in the <strong>Status Dashboard</strong></li>
    <li>Record detailed diagnostic information in the <strong>Log window</strong></li>
</ul>

<p>
Common PEM-related issues include selecting an encrypted private key,
choosing a certificate instead of a private key, mismatched Key IDs, or
file permission restrictions that prevent the app from accessing the key.
</p>

<p>
For managed environments, PEM files may be deployed automatically using
managed preferences. Managed keys follow the same validation rules and are
treated identically to manually imported keys once installed.
</p>

<p>
For security reasons, PEM files are never transmitted to Apple or any
third party. Only the generated JWT assertion is sent as part of the OAuth
authentication process.
</p>

<p>
</p>

