---
layout: guide
title: "Credential Rotation"
description: "Credential Rotation"
permalink: /guide/credential-rotation/
---

<p>
Credential rotation lets you replace a revoked or reset API credential while
preserving tenant history and existing data continuity. In practice, this means
you can move to a new credential without losing previously imported device and
warranty records tied to that tenant context.
</p>

<h3>Manual Rotation Workflow</h3>

<p>
To rotate a credential manually, open <strong>Settings &gt; API Information</strong>,
select the credential you want to replace, and choose
<strong>Change Credential</strong>. The rotation flow then collects the updated
credential details, including credential name, Client ID, Key ID, and PEM key
material.
</p>

<p>
When the workflow completes successfully, the new credential becomes the active
credential for that tenant context. Existing tenant data remains available, so
the cutover is focused on auth replacement rather than rebuilding your data
from scratch.
</p>

<div class="credential-rotation-steps credential-rotation-steps--double">
    <div class="credential-rotation-item">
        <figure class="guide-shot-card credential-rotation-step">
            <span class="credential-rotation-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/cred_change/step_1.png' | relative_url }}"
              alt="Find the change credential button"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="credential-rotation-caption">Find the change credential button to trigger the credential change wizard.</p>
    </div>
    <div class="credential-rotation-item">
        <figure class="guide-shot-card credential-rotation-step">
            <span class="credential-rotation-step-pill">Step 2</span>
            <img
              src="{{ '/assets/images/guide/cred_change/step_2.png' | relative_url }}"
              alt="Enter new credential fields and migrate"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="credential-rotation-caption">Once in the wizard enter your new credential name, client id, key id and certificate and click Migrate Credential.</p>
    </div>
</div>

<div class="video-wrap">
  <video class="w-full h-full" controls>
    <source src="{{ '/assets/videos/guide/cred-rotation_chrome.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<h3>Managed Preferences Rotation Workflow</h3>

<p>
In managed environments, imported credential payloads support two intent paths:
add a separate credential as new, or update an existing credential through
rotation. The update path maps incoming managed values to an existing
credential record and performs a controlled replacement.
</p>

<p>
This allows administrators to maintain standardized credential rollout policies
while still preserving tenant continuity. It also reduces disruption because
credential replacement and data continuity are handled in one managed flow
instead of requiring manual reconfiguration per endpoint.
</p>

<div class="credential-rotation-steps credential-rotation-steps--triple">
    <div class="credential-rotation-item">
        <figure class="guide-shot-card credential-rotation-step">
            <span class="credential-rotation-step-pill">Step 1</span>
            <img
              src="{{ '/assets/images/guide/managed_cred_change/step_1.png' | relative_url }}"
              alt="Managed credential rotation flow step 1"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="credential-rotation-caption">Click the import banner triggered by MDM and click Update Existing Credential.</p>
    </div>
    <div class="credential-rotation-item">
        <figure class="guide-shot-card credential-rotation-step">
            <span class="credential-rotation-step-pill">Step 2</span>
            <img
              src="{{ '/assets/images/guide/managed_cred_change/step_2.png' | relative_url }}"
              alt="Managed credential rotation flow step 2"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="credential-rotation-caption">Select the credential to replace.</p>
    </div>
    <div class="credential-rotation-item">
        <figure class="guide-shot-card credential-rotation-step">
            <span class="credential-rotation-step-pill">Step 3</span>
            <img
              src="{{ '/assets/images/guide/managed_cred_change/step_3.png' | relative_url }}"
              alt="Managed credential rotation flow step 3"
              loading="lazy"
              decoding="async">
        </figure>
        <p class="credential-rotation-caption">Enter the password to decrypt the updated credential to migrate.</p>
    </div>
</div>

<h3>Expected Rotation Behavior</h3>

<p>
During rotation, tenant database state is carried into the new credential
context so historical records remain intact. The prior credential is not
removed until successful cutover is confirmed, which keeps the transition
failure-safe and avoids destructive partial states.
</p>

<p>
If rotation fails at any point, tenant data is not deleted as part of failure
handling. This protects local state and lets you correct credential inputs,
retry rotation, and validate auth health without sacrificing existing coverage
history.
</p>
