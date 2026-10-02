(function () {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const reject = document.getElementById("cookie-reject");
  const key = "claramente-cookies";

  function canShowAds() {
    return localStorage.getItem(key) === "accepted";
  }

  function mountAdsense() {
    if (!window.ADS_CONFIG || !window.ADS_CONFIG.enabled) return;
    if (!canShowAds()) return;
    if (document.querySelector('script[data-adsense="1"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.dataset.adsense = "1";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + window.ADS_CONFIG.adsenseClient;
    s.crossOrigin = "anonymous";
    document.head.appendChild(s);
    document.querySelectorAll("[data-ad-placeholder]").forEach(function (slot) {
      slot.innerHTML = "";
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", window.ADS_CONFIG.adsenseClient);
      ins.setAttribute("data-ad-slot", slot.dataset.adSlot || "");
      ins.setAttribute("data-ad-format", slot.dataset.adFormat || "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      slot.appendChild(ins);
      slot.classList.add("live");
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    });
  }

  if (banner && !localStorage.getItem(key)) {
    banner.classList.add("show");
  } else {
    mountAdsense();
  }

  if (accept) {
    accept.addEventListener("click", function () {
      localStorage.setItem(key, "accepted");
      banner.classList.remove("show");
      mountAdsense();
    });
  }
  if (reject) {
    reject.addEventListener("click", function () {
      localStorage.setItem(key, "rejected");
      banner.classList.remove("show");
    });
  }

  const form = document.getElementById("contacto-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = document.getElementById("form-ok");
      const err = document.getElementById("form-error");
      if (err) err.hidden = true;
      if (ok) ok.hidden = true;
      const btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (ok) ok.hidden = false;
          } else {
            if (err) err.hidden = false;
          }
        })
        .catch(function () {
          if (err) err.hidden = false;
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Enviar"; }
        });
    });
  }

  const news = document.getElementById("newsletter-form");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      const note = document.getElementById("news-ok");
      if (note) note.hidden = false;
      news.reset();
    });
  }
})();
