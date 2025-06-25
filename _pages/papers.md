---
layout: single
title: "Papers"
permalink: /papers/
author_profile: true
classes: papers
---

<!-- 📊 Sección de estadísticas -->
<h2 style="margin-top: 0.5rem;">📈 Research Output Insights</h2>

<p class="papers-intro">
  Think publishing is all stress and footnotes? <strong>Take a breather.</strong>  
  These charts give you a quick peek into our research adventure — from silent years to sudden bursts of inspiration.  
  It's like a Spotify Wrapped, but for scientists. 🎧📈
</p>

<div class="charts-flex">
  <canvas id="quartileChart" width="400" height="300"></canvas>
  <canvas id="yearChart" width="400" height="400"></canvas>
</div>

<!-- 📄 Lista de artículos -->
<h2 style="margin-top: 2rem;">📚 Papers List</h2>

<p class="papers-intro">
  Below you'll find a growing list of our <strong>research milestones</strong> — no filler, just our favorite experiments, models and breakthroughs.  
  Whether you're a fellow academic, a curious mind, or just killing time between experiments... <strong>welcome</strong>.  
  Click the icons below to dive deeper, there's a PDF waiting for you!
</p>

<div id="papers-container"></div>

<!-- Scripts -->
<script src="{{ '/assets/js/papers.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/papers.css' | relative_url }}">
