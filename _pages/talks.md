---
layout: single
title: "Talks"
permalink: /talks/
author_profile: true
---

<!-- 📊 Gráficas de distribución -->
<h2 style="margin-top: 0.5rem;">📊 Event Distribution</h2>
Over the years, I’ve had the chance to share ideas at events ranging from technical workshops to international conferences. Here’s a visual breakdown of where, when, and how I’ve contributed to the scientific conversation.  
Because research is also about showing up, speaking up, and sparking new questions.
<div class="charts-flex">
  <canvas id="eventTypeChart" width="350" height="250"></canvas>
  <canvas id="talksPerYearChart" width="350" height="250"></canvas>
</div>

<!-- 🎤 Charlas y eventos -->
<div id="talks-container"></div>

<!-- 🔧 Librerías JS -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/talks.js' | relative_url }}"></script>

<!-- 🎨 Estilos -->
<link rel="stylesheet" href="{{ '/assets/css/talks.css' | relative_url }}">
