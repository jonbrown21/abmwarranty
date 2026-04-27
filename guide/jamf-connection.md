---
layout: guide
title: "JAMF Connection"
description: "JAMF Connection"
permalink: /guide/jamf-connection/
---

<p>
This page explains the out-of-the-box JAMF connection profile in ABM Warranty. This is
specifically for the prebuilt JAMF profile, not the Builder profile. The JAMF profile is
designed to reduce setup complexity by providing predefined endpoint behavior and default
mapping expectations for the ABM warranty fields used by outbound sync.
</p>

<h3>Purpose</h3>
<p>
The JAMF profile defines a known outbound integration contract for JAMF Pro. It lets you
authenticate once, validate the connection, and then focus on mapping review and sync behavior.
You are not required to manually design every endpoint contract in the way Builder requires.
</p>

<h3>Scope</h3>
<p>
The JAMF profile supports outbound sync of ABM warranty-related values to JAMF records and
uses serial number as the record matching key. The profile includes expected destination field
names and endpoint patterns suitable for JAMF API workflows.
</p>



<h3>Where to Configure JAMF Connections</h3>
<ul>
  <li>Open <strong>Settings</strong>.</li>
  <li>Go to <strong>Connections</strong>.</li>
  <li>Select <strong>Add Connection</strong>.</li>
  <li>Choose the JAMF OAuth profile.</li>
</ul>


<div class="guide-steps guide-steps--double">
    <div class="guide-step-item">
        <figure class="guide-shot-card guide-step-frame">
            <span class="guide-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/jamf/step_1.png' | relative_url }}"
              alt="Open Settings and click on Connections"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Open Settings and click on Connections.</p>
    </div>
    <div class="guide-step-item">
        <figure class="guide-shot-card guide-step-frame">
            <span class="guide-step-pill">Step 2</span>
            <img
              src="{{ '/assets/images/guide/jamf/jamf_connection.png' | relative_url }}"
              alt="Fill out the information in the JAMF API Wizard"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Fill out the information in the JAMF API Wizard.</p>
    </div>
</div>

<h3>Credential Association</h3>
<p>
After creation, connections are associated to credentials in the credential detail screen under
<strong>Mapped Connections</strong>. Ordering in that section determines outbound execution order
for that credential.
</p>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/mapped_connections.png' | relative_url }}"
      alt="Mapped Connections in ABM Warranty"
      loading="lazy"
      decoding="async">
</figure>

<h3>JAMF Connection Wizard Flow</h3>

<h3>Step 1: Connection Basics + OAuth Details</h3>
<p>
Enter friendly name, base URL, token URL, OAuth client ID, and client secret. Optional values
such as scope/audience may exist depending on profile fields, but required fields are validated
before continuing.
</p>

<h3>Step 2: Connection Validation (Not Shown)</h3>
<p>
The wizard validates authentication and confirms the profile can communicate with destination APIs.
For JAMF profile flows, this step is intended to be deterministic: when validation succeeds,
the flow advances to mapping review instead of requiring manual contract design.

This step is typically shown by a progress spinner and authenticates very fast assuming that your information is correct, if not its kicked back to step 1. 

Your Jamf Pro API Client needs the following privileges: Read Computers, Update Computers, Read Mobile Devices, Update Mobile Devices, Read Users, Update Users.
</p>

<h3>Step 3: Field Mapping Review</h3>
<p>
You review ABM source fields, destination field selections, destination sample values, and action
rules. This is where you confirm update behavior prior to save.
</p>

<div class="guide-steps guide-steps--double">
    <div class="guide-step-item">
        <figure class="guide-shot-card guide-step-frame">
            <span class="guide-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/jamf/wizard_1.png' | relative_url }}"
              alt="Enter the information into the JAMF API Connection Wizard"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Enter the information into the JAMF API Connection Wizard.</p>
    </div>
    <div class="guide-step-item">
        <figure class="guide-shot-card guide-step-frame">
            <span class="guide-step-pill">Step 3</span>
            <img
              src="{{ '/assets/images/guide/jamf/wizard_3.png' | relative_url }}"
              alt="Update Mapping fields for purchasing data"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Update Mapping fields for purchasing data.</p>
    </div>
</div>

<h2>Understanding Mapping in JAMF Profile</h2>

<h3>Key Matching Field</h3>
<p>
Serial number is the lookup key used to find destination records. This key should not be mapped
as a field to overwrite destination identity. It is used for matching.
</p>

<h3>Default Warranty Field Set</h3>
<p>
Current warranty mapping surfaces these core ABM fields:
</p>
<ul>
  <li><code>serialNumber</code></li>
  <li><code>orderNumber</code></li>
  <li><code>orderDateTime</code></li>
  <li><code>purchaseSourceType</code></li>
  <li><code>purchaseSourceId</code></li>
  <li><code>appleCareId</code></li>
  <li><code>warrantyDate</code></li>
  <li><code>lifeExpectancy</code></li>
</ul>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/wizard_3.png' | relative_url }}"
      alt="Mapped Connections in ABM Warranty"
      loading="lazy"
      decoding="async">
</figure>

<h3>Action Rules</h3>
<p>
Per-field action controls define behavior:
</p>
<ul>
  <li><strong>Update</strong>: field is eligible for outbound update.</li>
  <li><strong>Skip</strong>: field is never updated by outbound sync.</li>
  <li><strong>Key</strong>: identity/match behavior (used for serial matching context).</li>
</ul>

<p>
Even when action is <strong>Update</strong>, sync logic may still skip a field when source and
destination values are already equivalent after normalization.
</p>

<h3>How to Update Mappings Later</h3>
<ul>
  <li>Settings → Connections.</li>
  <li>Select the JAMF connection row.</li>
  <li>Choose <strong>Update Mapping</strong>.</li>
</ul>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/jamf_connection.png' | relative_url }}"
      alt="Use the manual mapped connections to update connection mapping later"
      loading="lazy"
      decoding="async">
</figure>

<h3>Review Device Type Scope</h3>
<p>
Use the device type selector to switch between Computers and Mobile Devices where available.
Mapping drafts and sample snapshots are scope-aware and should be reviewed per scope before save.
</p>

<h3>Confirm Destination Samples</h3>
<p>
Destination sample values are used for operator confidence while mapping. If samples are empty,
validate API auth, path contract behavior, and serial lookup viability before concluding mapping
is incorrect.
</p>

<h3>Operational Behavior During Outbound Sync</h3>
<p>
Outbound jobs execute in the mapped connection order configured for each credential. If a
credential has multiple connections, each connection runs as its own outbound job in sequence.
</p>

<h3>Source Modes</h3>
<ul>
  <li><strong>Database</strong>: outbound uses locally persisted ABM data as source.</li>
  <li><strong>Live API</strong>: outbound reconciles using live source data flow where enabled.</li>
</ul>

<h3>Dry Run</h3>
<p>
Dry run evaluates updates without writing destination changes and reports diagnostics
(would update, skipped, missing source, missing destination).
</p>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/modes.png' | relative_url }}"
      alt="Leverage Dry Run and API Based Modes"
      loading="lazy"
      decoding="async">
</figure>
