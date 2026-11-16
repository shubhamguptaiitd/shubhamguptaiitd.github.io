---
date: 2026-07-29
faces: # people in the celebration photo; box = left, top, width, height as % of the photo
  - { name: "Sahil Manchanda", url: "https://www.linkedin.com/in/sahilm1992/", box: [8.6, 19.1, 9.6, 17.8] }
  - { name: "Prashant Kumar", url: "https://prashkmr.github.io/about/", box: [18.6, 29.9, 8.2, 15.2] }
  - { name: "Prof. Srikanta Bedathur", url: "https://www.cse.iitd.ac.in/~srikanta/", box: [34.3, 27.3, 4.9, 14.0] }
  - { name: "Prof. Maya Ramanath", url: "https://www.cse.iitd.ac.in/~ramanath/", box: [39.1, 39.4, 3.0, 7.9] }
  - { name: "Prof. Amitabha Bagchi", url: "https://www.cse.iitd.ac.in/~bagchi/", box: [41.1, 28.0, 4.6, 10.8] }
  - { name: "Saavi", url: "", box: [53.2, 36.2, 4.6, 10.8] }
  - { name: "Prof. Sayan Ranu", url: "https://www.cse.iitd.ac.in/~sayan/", box: [60.7, 36.2, 5.4, 11.4] }
  - { name: "Ayushee", url: "https://www.linkedin.com/in/ayushee-khandelwal-b719a41a2/", box: [83.6, 40.7, 6.4, 14.0] }
---

<div class="news-wrap">
<img class="news-photo news-photo-small news-photo-float" src="/assets/img/thesis-defence.webp" alt="Shubham presenting the PhD viva-voce on Learning on Temporal Graphs" width="480" height="360" loading="lazy" decoding="async">
<p>Defended my PhD thesis, <em>Learning on Temporal Graphs</em>, at IIT Delhi.</p>
<p>Celebration in the presence of <a href="https://www.cse.iitd.ac.in/~srikanta/">Prof. Srikanta Bedathur</a>, <a href="https://www.cse.iitd.ac.in/~sayan/">Prof. Sayan Ranu</a>, <a href="https://www.cse.iitd.ac.in/~bagchi/">Prof. Amitabha Bagchi</a>, <a href="https://www.cse.iitd.ac.in/~ramanath/">Prof. Maya Ramanath</a>, my dear friends <a href="https://www.linkedin.com/in/sahilm1992/">Sahil Manchanda</a> and <a href="https://prashkmr.github.io/about/">Prashant Kumar</a>, my wife <a href="https://www.linkedin.com/in/ayushee-khandelwal-b719a41a2/">Ayushee</a> and my daughter <span class="heart-red">Saavi</span>.</p>
</div>

<div class="photo-tags">
<img class="news-photo" src="/assets/img/thesis-celebration-800.webp" srcset="/assets/img/thesis-celebration-800.webp 800w, /assets/img/thesis-celebration-1400.webp 1400w" sizes="(min-width: 800px) 640px, 100vw" alt="Group photo at the celebration after the thesis defence" width="1400" height="787" loading="lazy" decoding="async">
{%- for face in faces %}
{%- set style = "left:" + face.box[0] + "%;top:" + face.box[1] + "%;width:" + face.box[2] + "%;height:" + face.box[3] + "%" %}
{%- if face.url %}
<a class="face" href="{{ face.url }}" style="{{ style }}" aria-label="{{ face.name }}"><span class="face-name" aria-hidden="true">{{ face.name }}</span></a>
{%- else %}
<span class="face" style="{{ style }}" tabindex="0" aria-label="{{ face.name }}"><span class="face-name heart-red" aria-hidden="true">{{ face.name }}</span></span>
{%- endif %}
{%- endfor %}
</div>

<p class="photo-hint"><span class="hint-mouse">Hover over a face to see who it is, and click to visit their page.</span><span class="hint-touch">Tap a face to visit their page.</span></p>
