---
layout: post
date: '2026-03-04'
author: Jon Brown
permalink: /blog/abm-warranty-0-4-1-walkthrough-multiple-credentials/
published: true
title: "ABM Warranty 0.4.1 Walkthrough: Multiple Credentials"
description: "A walkthrough of the ABM Warranty 0.4.1 multiple credentials workflow covering how I remove a credential, add multiple ABM contexts, switch between them, and how the app stores each credential set separately."
blogimgpath: 202408034Up
tags:
categories:
  - macadmins
  - apps
  - video
  - abm-warranty
  - reviews
image: /assets/images/covers/2026/ABM_Creds.png
thumbnail: /assets/images/covers/2026/ABM_Creds.png
cta: 2
comments: true
series: abmwarranty041walkthrough
---

{% include series.html id="abmwarranty041walkthrough" %}

In this part of the ABM Warranty 0.4.1 walkthrough series, I’m focusing on multiple credentials. In the first video, I showed the basic setup and how to add a single credential. In this one, I want to show what happens when I remove a credential, what changes when I add more than one, and how the app behaves once there are multiple contexts in play.

This matters because the interface changes in important ways once I stop working in a single-credential setup. The storage changes, the switching behavior changes, and some convenience options have to behave differently because the app can no longer assume there is only one active context.

## Start by Removing a Credential

The first thing I walk through in this video is deleting an existing credential. I wanted to make that part visible because deleting a credential should do more than just remove a label from the settings screen.

When I remove a credential in ABM Warranty, the app removes the database tied to that credential and clears the associated key from Keychain. That is the behavior I expect, because the credential is what ties the local data, key material, and context together. Once that credential is gone, the related local pieces should be cleaned up with it.

That is also why the app window clears out when there are no credentials left. Without a configured credential, there is no live ABM or ASM context for the app to operate against.

## Adding More Than One Credential

After removing the original credential, I add credentials back in, but this time I add two instead of one. This is the point where the app moves from a single-context setup into a multi-credential setup.

That is the real purpose of this walkthrough. I wanted to show exactly how the interface changes when there is more than one ABM context available. The app still fetches data for the active credential, but it also has to stop assuming that one default context should control everything.

This is where the multiple-credentials workflow becomes useful. Instead of treating the app like it only has one source of truth, I can maintain separate credential contexts and move between them directly.

## Why Reload on Startup Is Disabled

One of the first visible changes in a multi-credential setup is that the “reload data on startup” option becomes disabled. That is intentional.

When there is only one credential, the app can safely assume which context to load when it starts. Once there are multiple credentials, that assumption breaks. If I let the app automatically reload on startup without a clear context selected, it would create confusion and would increase the chance of failures or loading the wrong dataset unexpectedly.

So in a multi-credential state, I disable that option and force the context selection to be explicit. That makes the startup behavior more predictable and avoids pretending the app can guess which dataset I meant to load.

## How the Interface Changes

Once multiple credentials exist, the interface gains a new context-switching control in the menu area. That is where I can move between the credential sets I added.

The names shown there come directly from the friendly names I assigned in settings. That way, I am not guessing which environment I am about to load. I can switch intentionally between one credential and the other, and the app updates the visible data based on the selected context.

This is one of the most important parts of the feature. Multiple credentials are only useful if the boundaries between them are clear. I do not want the app blending data together or hiding which context I am currently viewing.

<div class="my-12 flex justify-center">
  <a
    href="https://jonbrown.org/apps/#warranty"
    class="inline-flex items-center rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white no-underline hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
  >
   Download ABM Warranty 0.4.1
  </a>
</div>

{% include videos/video.html id="9tXvMeVmPc8" header="/assets/images/covers/2026/ABM_Creds.png" %}

## Separate Databases, Separate Keys, Separate Contexts

Under the hood, the app treats each credential as its own context. That means I end up with separate database files, separate key material, and separate Keychain entries tied to each credential.

That separation is not just a technical detail. It is the reason the feature is useful. If I am switching between two ABM contexts, I need those datasets and credential records to stay independent of each other. I do not want one context overwriting the other or causing ambiguity about what I am looking at.

This is also why switching credentials changes more than what I see in the main dashboard. The selected context affects the database in use, the visible device data, and even what gets exported.

## Exporting in the Correct Context

One of the easiest ways to see the value of this design is through export behavior. When I export to CSV, the app should not combine data from every credential set unless I explicitly build it that way. It should export the data for the active context I am looking at right now.

That is how ABM Warranty behaves. If I switch to one credential and export, I get that credential’s data. If I switch to the other and export again, I get the other dataset. That keeps the workflow predictable and makes the feature useful in practice instead of just interesting in theory.

The same principle applies when I want to reload data. I switch to the context I actually want to refresh, and then I run the reload for that context only.

## Reload Boundaries Still Matter

Even in a multi-credential setup, the app still respects the same API guardrails I built into the single-credential workflow. If I just ran a sync, the app still enforces the wait period before another full reload can happen.

That does not change just because there are multiple credentials. The API discipline still matters, and the app still needs to keep those boundaries in place to avoid unnecessary load and bad operational habits.

## Deleting One Credential Does Not Delete Everything

The other behavior I wanted to make obvious in this walkthrough is that deleting a credential only deletes that credential’s context. If I remove one credential from a multi-credential setup, the app should remove only that database, only that key, and only that related Keychain entry.

That scoped behavior is what makes the feature safe to use. I can manage one context without wiping out every other context I have configured.

## Why This Feature Matters

Multiple credentials are important because they let me work with separate ABM or ASM contexts without collapsing everything into one shared state. That makes the app far more practical in environments where I need clean separation between datasets.

For me, this is one of the most important 0.4.1 workflow improvements because it changes the app from a single-context utility into something that can handle more realistic operational scenarios without losing clarity.

{% include app_support_cta.html %}
