---
layout: guide
title: "Setting Up Credentials"
description: "Setting Up Credentials"
permalink: /guide/creds/
guide_shots:
  - src: /assets/images/guide/cred_side1.png
    alt: Credentials setup panel in ABM Warranty
  - src: /assets/images/guide/cred_side2.png
    alt: Credentials validation panel in ABM Warranty
---


<p>
Before ABM Warranty can retrieve device inventory and warranty coverage,
you must configure valid Apple Business Manager API credentials.
These credentials are required for all live data imports.
</p>

<p>
ABM Warranty uses the following credential components:
</p>

<ul>
    <li><strong>Client ID</strong> — Issued when creating an API key in Apple Business Manager</li>
    <li><strong>Key ID</strong> — Identifies the API key used to sign requests</li>
    <li><strong>PEM Private Key</strong> — Used locally to generate JWT client assertions</li>
</ul>

<p>
To configure credentials, open <strong>Settings</strong> and enter your Client ID and Key ID.
Then select the corresponding PEM private key file to complete setup.
</p>

<p>
Credentials are validated locally. ABM Warranty does not transmit your private key
to Apple. The PEM file is used only to sign short-lived client assertions required
to authenticate API requests.
</p>

<p>
Each configured credential represents a distinct Apple Business Manager tenant.
When a credential is added, ABM Warranty creates a dedicated local database that
stores devices and coverage data associated only with that credential.
</p>

<p>
If credentials are missing, incomplete, or invalid, ABM Warranty will:
</p>

<ul>
    <li>Prevent live imports from Apple Business Manager</li>
    <li>Display credential health warnings in the Freshness Bar</li>
    <li>Surface authentication errors in the Status Dashboard</li>
</ul>

<p>
When no valid credentials are available, the app may operate using sample data.
This allows you to explore the interface and features without making live API requests.
Sample data is clearly labeled and is automatically removed once a successful
import from Apple Business Manager completes.
</p>

<p>
After credentials are saved and validated, you can initiate a full import using
the Refresh button. Import progress, authentication status, and any errors are
recorded in the application Logs and summarized in the Status Dashboard.
</p>

<p>
ABM Warranty performs only read-only API operations and never modifies data in
Apple Business Manager.
</p>

<p>
</p>
