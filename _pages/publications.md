---
layout: page
permalink: /publications/
title: Publications
description: publications in reversed chronological order. An up-to-date list is also on <a href="https://scholar.google.com/citations?user=pW_LwFQAAAAJ" target="_blank">Google Scholar</a>.
years: [2025, 2024, 2023, 2022, 2016, 2013]
nav: false
sort: 3
---

<div class="publications">
<!-- * denotes equal contribution -->
<!-- <h1> preprints </h1> -->

<!-- <p>An up-to-date list is available on <a href="https://scholar.google.com/citations?user=F1APiN4AAAAJ" target="_blank">Google Scholar</a>.</p>) -->

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}



</div>
