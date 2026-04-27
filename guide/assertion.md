---
layout: guide
title: "JWT Client Assertion"
description: "JWT Client Assertion"
permalink: /guide/assertion/
guide_shots:
  - src: /assets/images/guide/cred_side1.png
    alt: Credentials setup panel in ABM Warranty
  - src: /assets/images/guide/assertion.png
    alt: JWT Client Assertion
---


<p>
ABM Warranty generates a JSON Web Token (JWT) client assertion using the configured
<strong>Client ID</strong>, <strong>Key ID</strong>, and <strong>PEM private key</strong>
associated with the active credential. This assertion is required to authenticate with
Apple’s OAuth service and obtain an access token for Apple Business Manager APIs.
</p>

<p>
Client assertions are generated locally on your machine and are used only as part of the
secure OAuth token exchange with Apple. The private key itself is never transmitted to
Apple and never leaves the local system.
</p>

<p>
A new assertion is generated automatically whenever the app needs to request or refresh
an OAuth access token. Assertions are short-lived by design and are never reused beyond
their valid lifetime.
</p>

<p>
In environments with multiple credentials, assertions are generated independently for
each credential. Each credential (tenant) maintains its own authentication lifecycle,
ensuring that API access, tokens, and telemetry remain fully isolated.
</p>

<p>
If assertion creation fails, the most common causes include:
</p>

<ul>
    <li>An invalid or improperly formatted PEM private key</li>
    <li>A mismatch between the Client ID and Key ID</li>
    <li>An expired or revoked key in Apple Business Manager</li>
    <li>File permission issues preventing access to the PEM file</li>
</ul>

<p>
When assertion or authentication failures occur, ABM Warranty will not attempt to retrieve
device inventory or warranty coverage data. These failures are recorded in the Logs and
reflected in the Status Dashboard to help identify and resolve credential issues quickly.
</p>

<p>
Assertion failures are treated as authentication-level errors. Depending on the failure
mode, the app may retry automatically, surface an actionable error message, or fall back
to sample data when no valid credentials are available.
</p>

<p>
A valid client assertion is required for all Apple Business Manager API access, including
device inventory retrieval and warranty coverage requests.
</p>

<p>
</p>

