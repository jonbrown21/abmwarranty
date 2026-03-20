---
layout: home
show_home_sections: false
title: ABM Warranty Security
description: ABM Warranty security overview and practices for Apple Business and School Manager operations.
permalink: /security/
---

<section class="abm-section hero-band hero-band--privacy hero-band--security">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <div class="privacy-hero-glass">
            <p class="eyebrow">Security</p>
            <h1>Security</h1>
            <p class="hero-copy">
              ABM Warranty is designed for operational trust in Apple IT environments. We focus on secure-by-default workflows, controlled data handling, and practical safeguards that support enterprise and education fleet management.
            </p>
          </div>
        </div>
        <div class="hero-shot" role="img" aria-label="ABM Warranty security page hero image">
          <img
            id="hero-shot-image"
            src="{{ '/assets/images/home/screens/log_light_cut.png' | relative_url }}"
            data-light="{{ '/assets/images/home/screens/log_light_cut.png' | relative_url }}"
            data-dark="{{ '/assets/images/home/screens/log_dk_cut.png' | relative_url }}"
            alt="ABM Warranty app interface preview"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1160"
            height="780">
        </div>
      </div>
    </div>
  </div>
</section>

<section class="abm-section privacy-content">
  <div class="abm-container">
    <p class="eyebrow">Security disclosure</p>
    <h2>ABM Warranty Security Disclosure (Terms of Service Style)</h2>
    <p><strong>Effective Date: March 20, 2026</strong></p>

    <p>
      This Security Disclosure is written to explain, in plain language, how ABM Warranty protects data and credentials in the current shipping architecture.
      When we use technical terms, we define them. Where a control is not implemented, we say that clearly.
    </p>

    <h3>Security of Apple ABM/ASM API Access</h3>
    <p>
      ABM Warranty connects to Apple services using the same trust model Apple requires for Apple Business Manager (ABM) and Apple School Manager (ASM):
      OAuth 2.0 (Open Authorization 2.0), signed JSON Web Tokens (JWTs), and HTTPS (encrypted web transport). In practice, the app first signs a short-lived
      JWT assertion with an ES256 signature (Elliptic Curve Digital Signature Algorithm using the P-256 curve and SHA-256 hash), sends that assertion to Apple’s
      OAuth token endpoint, and receives a bearer token. That bearer token is then used for read operations against Apple’s ABM/ASM API endpoints.
    </p>
    <p>
      All of that traffic is sent over TLS (Transport Layer Security) through Apple’s standard URLSession trust chain. The app includes retry and backoff handling
      for rate-limits and transient server/network conditions, and it supports cancellation and bounded paging so API calls do not run uncontrolled. The app’s HTTP
      behavior in this app codebase is limited to POST for token exchange and GET for device/coverage retrieval.
    </p>
    <p>
      For transparency: certificate pinning is not implemented in the current code. The app relies on Apple platform trust validation rather than custom pinning logic.
    </p>

    <h3>Credential Storage in macOS Keychain</h3>
    <p>
      Credential identity data is stored in the macOS Keychain, which is Apple’s system credential vault designed for secrets and security-sensitive records.
      ABM Warranty stores credentials as generic password items, one record per credential identity, under a fixed service namespace. This design avoids a single
      giant blob and makes replacement/removal operations explicit and auditable.
    </p>
    <p>
      The stored credential object includes tenant identity metadata (for example Client ID and Key ID), scope (business or school), and a bookmark reference to the key file.
      Keychain remains the authoritative source for credential identity state, and the app reloads from Keychain after changes so in-memory state follows what was actually persisted.
    </p>
    <p>
      Keychain is treated as the source of truth for credential identity state rather than a general-purpose settings store.
    </p>

    <h3>Database Security in the Sandbox</h3>
    <p>
      ABM Warranty uses SQLite for device and coverage records, but it does so inside the macOS App Sandbox. “Sandboxed” means the app is not free to read or write anywhere
      on your Mac by default. Instead, the operating system puts the app inside a controlled container and requires explicit permission boundaries for file access, inter-process
      sharing, and network behavior.
    </p>
    <p>
      Within that sandbox, ABM Warranty writes tenant databases under Application Support and uses a per-tenant file model (<code>devices-&lt;credentialID&gt;.sqlite3</code>).
      This is a deliberate separation control: each tenant’s records are stored in its own database file rather than a shared multi-tenant table.
    </p>
    <p>
      For transparency: the current code does not add a second app-layer database encryption product on top of SQLite. Security at rest therefore depends on the sandbox boundary,
      account/device protections, and platform disk protections provided by macOS.
    </p>

    <h3>Private Key Placement and Why Keys Are Not Embedded in Credential Identity Fields</h3>
    <p>
      The private key material is intentionally separated from credential identity metadata. ABM Warranty stores a bookmark reference (security-scoped bookmark) in credential
      records, while the key file itself is kept as a file in the app-controlled Keys directory under Application Support.
    </p>
    <p>
      That separation matters. It means identity metadata can be managed through Keychain while key file handling remains explicit and file-scoped. At runtime, the app resolves
      the bookmark and requests scoped access to the key file only when needed for signing operations.
    </p>
    <p>
      The app does not treat private key material as a standard form field value. Credential identity and key material are intentionally managed as separate concerns.
    </p>

    <h3>Encryption of Managed Preferences for MDM Deployment</h3>
    <p>
      For managed deployment through MDM (Mobile Device Management), ABM Warranty supports encrypted key payload import. Managed payloads include encrypted key bytes plus the
      cryptographic materials needed to decrypt locally (salt and nonce). The app derives a symmetric key using HKDF-SHA256 (HMAC-based Key Derivation Function with SHA-256)
      and decrypts using AES-GCM (Advanced Encryption Standard in Galois/Counter Mode), which provides both confidentiality and integrity checks.
    </p>
    <p>
      Operationally, decryption happens on-device after user passphrase entry. If authentication checks fail, decryption fails. That is the expected secure behavior. The managed
      flow is visible in app state and not a hidden background mutation path.
    </p>
    <p>
      Managed key transport is encrypted and authenticated, and decryption is performed locally on-device rather than through a vendor-hosted decryption service.
    </p>

    <h3>Managed Credential Packager Security Chain (From Packaging to App Import)</h3>
    <p>
      ABM Warranty’s managed-credential flow is designed as a two-part security model: credentials are encrypted before they ever reach MDM deployment payloads, and they are
      decrypted only inside the app after an interactive user unlock step. The packager tool (<code>abm_managed_creds_packager.py</code>) reads credential metadata from CSV and
      reads PEM key bytes from local files, then encrypts each PEM using AES-256-GCM (Advanced Encryption Standard, 256-bit key, Galois/Counter Mode). The encryption key is not
      stored in the payload. Instead, it is derived from a passphrase using HKDF-SHA256 (HMAC-based Key Derivation Function with SHA-256), which is exactly the same derivation model
      used by the app during import.
    </p>
    <p>
      The packager uses one passphrase per run, but still generates a unique random salt (16 bytes) and nonce (12 bytes) for each credential entry. That means each encrypted PEM is
      cryptographically distinct even when produced in the same batch. The generated managed payload stores only encrypted material and parameters required for decryption
      (<code>encryptedPEM</code>, <code>pemSalt</code>, <code>pemNonce</code>) alongside identity metadata (<code>id</code>, <code>name</code>, <code>scope</code>, <code>clientId</code>,
      <code>keyId</code>). In deployment terms, this is written to <code>ManagedABMCredentials</code> in managed preferences (plist or mobileconfig), commonly delivered through
      MDM-managed profile infrastructure.
    </p>
    <p>
      On the app side, ABM Warranty detects <code>ManagedABMCredentials</code>, queues managed credentials, and presents a user-facing unlock/import flow. Before import, the app
      validates the passphrase by attempting authenticated decryption. If decryption fails, import is blocked. If decryption succeeds, the PEM is written into the app’s controlled
      Keys directory, converted to PKCS#8 when needed, and then attached to the credential through a security-scoped bookmark saved in Keychain-backed credential records. Managed
      preferences carry encrypted transport payloads, and the usable key reference is established only after successful local decryption and explicit user action.
    </p>
    <p>
      From a security-posture perspective, this reduces exposure in transit and at-rest inside deployment artifacts: the private key is not distributed as plaintext in the managed
      payload, the passphrase is never embedded in that payload, and import is not silent. The remaining operational risk is centered on passphrase handling and endpoint hygiene at
      packaging time (for example, where the CSV/PEM source files are handled), which is why the tooling recommends environment-variable passphrase input instead of command-line
      literals.
    </p>

    <h3>Tenant Isolation and Non-Intermixing of Tenant Data</h3>
    <p>
      ABM Warranty enforces a one-credential-to-one-tenant mapping and a one-tenant-to-one-database mapping. Tenant activation is explicit, and active tenant context controls
      which store and cache are loaded in memory. When tenant context changes, previous tenant runtime state is torn down before new context is used.
    </p>
    <p>
      This architecture is designed to prevent accidental cross-tenant record blending. It also blocks duplicate credential identity insertion for the same tenant Client ID,
      which reduces identity collision risk.
    </p>
    <p>
      Tenant inventory data is intentionally isolated so one tenant’s records are not merged into another tenant’s database.
    </p>

    <h3>Data Collection Posture</h3>
    <p>
      ABM Warranty processes ABM/ASM data locally to provide warranty and inventory functionality, but the current app codebase does not include a third-party analytics SDK pipeline
      (for example Firebase Analytics, Mixpanel, Amplitude, Sentry, or Crashlytics ingestion paths). Network calls are focused on Apple OAuth and Apple ABM/ASM API operations
      required for product behavior.
    </p>
    <p>
      The app does maintain local logs and local device data persistence for operational and support use. Those are local diagnostic/data functions, not a separate telemetry
      export service to a vendor backend implemented in this app codebase.
    </p>
    <p>
      ABM/ASM data is used for local app operation, and this architecture does not implement a built-in external analytics collection pipeline.
    </p>

    <h3>Desktop Widgets and Sandbox-Entitlement-Based Data Sharing</h3>
    <p>
      The widget extension and the main app share data through an App Group container. An App Group is an Apple-controlled sharing boundary that allows only specifically entitled
      apps/extensions from the same signed team to read/write shared container data. ABM Warranty uses this to publish a snapshot for widgets.
    </p>
    <p>
      The widget reads summary snapshot data (counts, tenant label, and selected device display rows) from shared UserDefaults under that App Group. The extension itself is
      sandboxed and, in current build settings, has outgoing network connections disabled. That means widget content comes from the shared snapshot pipeline, not direct API calls
      from the widget process.
    </p>
    <p>
      Widget data sharing is controlled by Apple entitlements and limited to the explicitly authorized app/widget pair.
    </p>

    <h3>App Hardening and Entitlements Explained</h3>
    <p>
      An entitlement is a signed permission claim in a macOS app’s code signature. You can think of it as a capability contract between the app and the operating system:
      what this app is allowed to do, and what it is not allowed to do.
    </p>
    <p>
      ABM Warranty’s hardened posture combines entitlements with restrictive target settings. The app enables App Sandbox and Hardened Runtime, disallows incoming network
      connections, and disables unnecessary hardware/resource capabilities (camera, location, contacts, microphone/audio input, Bluetooth, USB, calendars, printing). The widget
      target is further restricted with no outgoing network access. The App Group entitlement is present to permit only the specific app-widget data bridge.
    </p>
    <p>
      Why this improves security: each disabled capability removes attack surface. Each entitlement is a narrow, auditable allowance rather than an unrestricted permission model.
    </p>

    <h3>Security Transparency Commitment</h3>
    <p>
      This disclosure reflects the code and entitlement posture in this app as of March 20, 2026. We do not claim controls that are not present.
      Where controls are platform-default (for example TLS trust validation) rather than custom-enhanced (for example certificate pinning), that distinction is disclosed above.
    </p>
  </div>
</section>

{% include sections/newsletter.html %}

{% include sections/faq.html %}
