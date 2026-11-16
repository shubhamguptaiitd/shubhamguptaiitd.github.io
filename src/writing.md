---
layout: layouts/page.njk
permalink: /writing/
title: Writing
description: Essays on network effects, marketplaces and machine learning.
---

I write [{{ writing.publication.name }}]({{ writing.publication.url }}), a series of essays on network effects in business: what they are, where they matter, and how matching, pricing and acquisition decide whether a platform compounds. It draws on building two-sided marketplaces at Naukri and Jeevansathi and on my research in graph machine learning.

{% set essays = writing.essays %}
{% include "partials/writing-list.njk" %}

More essays are on the way. Read them all at [{{ writing.publication.name }}]({{ writing.publication.url }}).
