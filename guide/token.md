---
layout: guide
title: "Token Exchange"
description: "Token Exchange"
permalink: /guide/token/
---


<p>
ABM Warranty authenticates with Apple Business Manager by exchanging a locally
generated JWT client assertion for an OAuth access token. This exchange occurs
automatically as part of an import and is required before any device or coverage
requests can be made.
</p>

<p>
Access tokens are short-lived and are requested on demand. Tokens are not reused
across application launches and are never stored persistently on disk.
All token handling is performed in memory and scoped to the active import run.
</p>

<p>
If token exchange fails, the import does not begin. Common causes include
invalid or mismatched credentials, expired or revoked API keys, or an invalid
PEM private key. Temporary network or Apple service issues may also result in
transient failures.
</p>

<p>
Token exchange failures do <strong>not</strong> modify existing device data.
Previously imported devices and coverage information remain intact and visible
until a successful import completes.
</p>

<p>
Authentication and token exchange outcomes are recorded in the Log window and
summarized indirectly in the Status Dashboard through credential and import
health indicators. Detailed error messages are available only in the logs.
</p>

<p>
All token exchange activity is tenant-scoped. When using multiple credentials,
each tenant performs its own authentication flow independently, and failures
for one tenant do not affect others.
</p>

<p>
If repeated token exchange failures occur, verify the configured Client ID,
Key ID, and PEM private key, and confirm that the API key remains active in
Apple Business Manager before retrying.
</p>

<p>
</p>

