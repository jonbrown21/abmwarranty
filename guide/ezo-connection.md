---
layout: guide
title: "EZO Connection"
description: "EZO Connection"
permalink: /guide/ezo-connection/
---

<p>
This page explains the out-of-the-box EZO connection profile in ABM Warranty. This is
specifically for the prebuilt EZO profile, not the Builder profile. The EZO profile is
designed to reduce setup complexity by providing predefined endpoint behavior and default
mapping expectations for the ABM warranty fields used by outbound sync.
</p>

<h3>Purpose</h3>
<p>
The EZO profile defines a known outbound integration contract for EZOfficeInventory. It lets you
authenticate once, validate the connection, and then focus on mapping review and sync behavior.
You are not required to manually design every endpoint contract in the way Builder requires.
</p>

<h3>Scope</h3>
<p>
The EZO profile supports outbound sync of ABM warranty-related values to EZO asset records and
uses serial number as the record matching key. The profile includes expected destination field
names and endpoint patterns suitable for EZO API workflows.
</p>

<hr>

<h3>EZO Connection Wizard Flow</h3>

<h3>Step 1: Connection Basics + API Key Details</h3>
<p>
Enter friendly name, base URL, API key, API key header name, and optional API key prefix.
Required fields are validated before continuing.
</p>

<h3>Step 2: Connection Validation (Not Shown)</h3>
<p>
The wizard validates authentication and confirms the profile can communicate with destination APIs.
For EZO profile flows, this step is intended to be deterministic: when validation succeeds,
the flow advances to mapping review instead of requiring manual contract design.

This step is typically shown by a progress spinner and authenticates very fast assuming your
information is correct; if not, it returns to Step 1.
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
              src="{{ '/assets/images/guide/ezo/wizard_1.png' | relative_url }}"
              alt="Enter the information into the EZO API Connection Wizard"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Enter the information into the EZO API Connection Wizard.</p>
    </div>
    <div class="guide-step-item">
        <figure class="guide-shot-card guide-step-frame">
            <span class="guide-step-pill">Step 3</span>
            <img
              src="{{ '/assets/images/guide/ezo/wizard_2.png' | relative_url }}"
              alt="Update Mapping fields for warranty and purchasing data"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="guide-step-caption">Update mapping fields for warranty and purchasing data.</p>
    </div>
</div>

<hr>
<h2>Understanding Mapping in EZO Profile</h2>

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
      src="{{ '/assets/images/guide/ezo/wizard_2.png' | relative_url }}"
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
  <li>Select the EZO connection row.</li>
  <li>Choose <strong>Update Mapping</strong>.</li>
</ul>

<h3>Profile Scope Behavior</h3>
<p>
For the direct EZO profile, mapping is a straight API profile path and does not expose a
Computers/Mobile Devices scope selector in the mapping surface. Review and save mappings in the
single profile mapping view provided.
</p>

<h3>Confirm Destination Samples</h3>
<p>
Destination sample values are used for operator confidence while mapping. If samples are empty,
validate API auth, profile contract behavior, and serial lookup viability before concluding mapping
is incorrect.
</p>
