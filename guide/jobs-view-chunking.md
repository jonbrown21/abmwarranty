---
layout: guide
title: "Jobs View & Chunking"
description: "Jobs View & Chunking"
permalink: /guide/jobs-view-chunking/
guide_shots:
  - src: /assets/images/guide/sync/jobs_view.png
    alt: "Sync Jobs window showing active and recent jobs"
  - src: /assets/images/guide/sync/jobs_expanded.png
    alt: "Expanded Sync Jobs detail with chunk-level progress"
---

<p>
Jobs View is a dedicated operational surface for monitoring sync runs and
chunk-level progress in real time. It is designed for visibility and control,
especially when jobs are long-running or when multiple runs must be reviewed in
sequence.
</p>

<p>
Instead of treating sync as a black box, Jobs View exposes structured status for
run state, chunk progress, and completion outcomes. This helps operators answer
what is running, what completed, what was interrupted, and what needs follow-up.
</p>

<h3>What Jobs View Shows</h3>

<p>
Each job reflects a planned sync workload for a tenant and sync type, and each
job is broken into chunks when needed. The view is intended to make progress
interpretable at both summary and detailed levels.
</p>

<p>
At a high level, this gives teams one place to inspect queued, running,
completed, incomplete, cancelled, and failed outcomes without jumping between
logs and dashboard summaries.
</p>

<figure class="guide-shot-card">
  <img
    src="{{ '/assets/images/guide/sync/sync_size.png' | relative_url }}"
    alt="Sync Size settings dropdown for chunk size selection"
    loading="lazy"
    decoding="async">
</figure>

<h3>Chunking Model</h3>

<p>
Set chunking in <strong>Settings</strong> using the <strong>Sync Size</strong>
dropdown, where each value controls how much work is grouped per chunk and
directly affects runtime pacing, progress granularity, and recovery behavior.
</p>

<p>
Because chunking is part of job planning, the same structure can be reused
across full and partial execution paths with consistent status behavior in the
Jobs View timeline.
</p>

<pre class="terminal"><code>Job
 |- Chunk 1  [completed]
 |- Chunk 2  [completed]
 |- Chunk 3  [running]
 |- Chunk 4  [pending]</code></pre>

<h3>Progress and Outcomes</h3>

<p>
Jobs View is intended to expose meaningful operational outcomes rather than only
a single percentage. Operators can see where work completed, where it stopped,
and whether cancellation or transient failure affected only a subset of chunks.
</p>

<p>
This is especially useful for enterprise-scale runs where duration, API pressure,
and interruption risk are higher. Chunk-level outcomes make recovery and
follow-up actions more predictable.
</p>

<h3>How to Use It Operationally</h3>

<p>
Use Jobs View to verify active run progress during execution and to review
history after completion. For recurring operations, it provides a practical
timeline for identifying whether the previous run finished cleanly before
starting a new one.
</p>