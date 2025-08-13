---
layout: single
title: "Blog"
permalink: /blog/
author_profile: true
classes: wide
---

Welcome to my blog! Here I share short thoughts, deep dives, and technical explorations related to science, code, data, and curiosity.

<!-- Contenedor de cards -->
<section id="blog-posts" class="home-cards" style="margin-top: 2.75rem;"></section>

<!-- Inyectamos datos de posts desde Jekyll -->
<script>
  const posts = [
    {% for post in site.posts %}
    {
      url: "{{ post.url | relative_url }}",
      title: {{ post.title | jsonify }},
      excerpt: {{ post.excerpt | strip_html | strip_newlines | truncate: 220 | jsonify }},
      image: "{{ post.header.teaser | default: post.image | default: site.teaser | relative_url }}",
      author: {{ site.author.name | jsonify }},
      avatar: "{{ site.author.avatar | relative_url }}",
      day: "{{ post.date | date: '%d' }}",
      month: "{{ post.date | date: '%B' | upcase }}",
      year: "{{ post.date | date: '%Y' }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>

<!-- Construcción de cards (pinta primero; sincroniza después) -->
<script>
  (function () {
    const container = document.getElementById('blog-posts');
    if (!container || !Array.isArray(posts)) return;

    const BASE = '{{ site.baseurl | default: "" }}';
    function canonicalSlug(pathname) {
      let s = pathname || "/";
      if (BASE && s.startsWith(BASE)) s = s.slice(BASE.length);
      if (!s.startsWith("/")) s = "/" + s;
      s = s.replace(/\/index\.html$/i, "/").replace(/\/{2,}/g, "/");
      if (s !== "/" && !s.endsWith("/")) s += "/";
      return s.toLowerCase();
    }
    function fullUrl(relative){try{return new URL(relative,location.origin).toString();}catch{return relative;}}
    function getLocalCount(k){const v=localStorage.getItem(k);return v?parseInt(v,10):0;}
    function setLocalCount(k,v){localStorage.setItem(k,String(v));}
    function getLikeState(slug){return localStorage.getItem(`like_state_${slug}`)==='1';}
    function setLikeState(slug,b){localStorage.setItem(`like_state_${slug}`, b?'1':'0');}

    const cards = [];
    posts.forEach(p => {
      const card = document.createElement('article');
      card.className = 'blogcard';

      const imgUrl = p.image && p.image !== "{{ '' | relative_url }}" ? p.image : "/assets/images/placeholder-940x540.png";
      const absoluteUrl = fullUrl(p.url);
      const slug = canonicalSlug(p.url);

      card.innerHTML = `
        <div class="blogcard__thumb"><img src="${imgUrl}" alt=""></div>
        <div class="blogcard__body">
          <h2 class="blogcard__title"><a href="${p.url}">${p.title}</a></h2>
          <div class="blogcard__author">
            <img src="${p.avatar}" alt="${p.author}">
            <span class="blogcard__author-name">${p.author}</span>
          </div>
          <div class="blogcard__sep"></div>
          <p class="blogcard__excerpt">${p.excerpt}</p>
        </div>
        <div class="blogcard__date">
          <span class="day">${p.day}</span>
          <span class="mon">${p.month}</span>
          <span class="year">${p.year}</span>
        </div>
        <ul class="blogcard__actions">
          <li>
            <span class="action action-view action--readonly" title="Views">
              <i class="fa fa-eye"></i> <span class="count" data-role="views">0</span>
            </span>
          </li>
          <li>
            <button class="action action-like" type="button" title="Like">
              <i class="fa fa-heart" data-role="heart"></i> <span class="count" data-role="likes">0</span>
            </button>
          </li>
          <li>
            <button class="action action-share" type="button" title="Share">
              <i class="fa fa-share-alt"></i>
            </button>
          </li>
        </ul>
        <a class="blogcard__fab" href="${p.url}" title="Read"><i class="fa fa-arrow-right"></i></a>
      `;

      const viewsEl = card.querySelector('[data-role="views"]');
      const likesEl = card.querySelector('[data-role="likes"]');
      const heartIcon = card.querySelector('[data-role="heart"]');
      const likeBtn = card.querySelector('.action-like');

      const viewsKey = `views_${slug}`;
      const likesKey = `likes_${slug}`;

      viewsEl.textContent = getLocalCount(viewsKey);
      likesEl.textContent = getLocalCount(likesKey);
      if (getLikeState(slug)) heartIcon.classList.add('is-liked');

      likeBtn.addEventListener('click', async () => {
        if (likeBtn.disabled) return; likeBtn.disabled = true;
        const was = getLikeState(slug);
        let l = parseInt(likesEl.textContent || '0', 10);
        if (was) { l = Math.max(0,l-1); heartIcon.classList.remove('is-liked'); setLikeState(slug,false); }
        else     { l = l+1;             heartIcon.classList.add('is-liked');    setLikeState(slug,true);  }
        setLocalCount(likesKey, l);
        likesEl.textContent = l;

        try {
          const sb = (window.__supabaseReady && typeof window.__supabaseReady.then==='function') ? await window.__supabaseReady : null;
          if (sb) {
            const delta = was ? -1 : 1;
            const { data, error } = await sb.rpc('add_like', { p_slug: slug, p_delta: delta });
            if (!error && data && typeof data[0]?.likes === 'number') {
              likesEl.textContent = String(data[0].likes);
              setLocalCount(likesKey, data[0].likes);
            }
          }
        } catch {}
        likeBtn.disabled = false;
      });

      const shareBtn = card.querySelector('.action-share');
      shareBtn.addEventListener('click', async () => {
        try {
          if (navigator.share) await navigator.share({ title: p.title, url: absoluteUrl });
          else { await navigator.clipboard.writeText(absoluteUrl); shareBtn.title='Link copied!'; setTimeout(()=>shareBtn.title='Share',1200); }
        } catch {}
      });

      container.appendChild(card);
      cards.push({ slug, viewsEl, likesEl, viewsKey, likesKey });
    });

    window.__cardsForSync = cards;
  })();
</script>

<!-- Sincroniza métricas cuando el SDK esté listo + en foco + cada 30s -->
<script>
  (function () {
    let syncing = false;
    let lastSync = 0;
    const MIN_GAP = 8000;   // no sincronizar más de 1 vez cada 8s
    const POLL_MS = 30000;  // refresco periódico (ajústalo a tu gusto)

    async function doSync() {
      if (!window.__cardsForSync || syncing) return;
      const now = Date.now();
      if (now - lastSync < MIN_GAP) return;

      // Obtén el cliente (ya cargado o cuando la promesa se resuelva)
      const sb = window.__supabase || (window.__supabaseReady && await window.__supabaseReady);
      if (!sb) return;

      syncing = true;
      try {
        const slugs = window.__cardsForSync.map(c => c.slug);
        if (!slugs.length) return;

        const { data, error } = await sb
          .from('post_metrics')
          .select('slug,views,likes')
          .in('slug', slugs);

        if (!error && Array.isArray(data)) {
          const map = new Map(data.map(r => [r.slug, r]));
          for (const c of window.__cardsForSync) {
            const m = map.get(c.slug);
            if (m) {
              c.viewsEl.textContent = m.views;
              c.likesEl.textContent = m.likes;
              localStorage.setItem(c.viewsKey, String(m.views));
              localStorage.setItem(c.likesKey, String(m.likes));
            }
          }
          lastSync = Date.now();
        }
      } catch (_) {
        /* ignora errores de red */
      } finally {
        syncing = false;
      }
    }

    // 1) Intenta sincronizar ahora mismo si se puede
    doSync();

    // 2) Cuando el loader emita el evento (SDK listo), sincroniza
    document.addEventListener('supabase:ready', () => { doSync(); });

    // 3) Al volver a la pestaña/ventana (mejora UX)
    window.addEventListener('focus', () => { doSync(); });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) doSync();
    });

    // 4) Polling suave cada 30s (cámbialo o elimina esta línea si no lo quieres)
    setInterval(() => { doSync(); }, POLL_MS);
  })();
</script>
