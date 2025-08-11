---
layout: archive
title: "All tags"
permalink: /tags/
---

<ul class="taxonomy__index">
  {% assign tags_sorted = site.tags | sort %}
  {% for tag in tags_sorted %}
    {% assign tag_name = tag[0] %}
    <li>
      <a href="{{ '/tags/' | relative_url }}{{ tag_name | slugify }}/">
        {{ tag_name }} ({{ tag[1].size }})
      </a>
    </li>
  {% endfor %}
</ul>
