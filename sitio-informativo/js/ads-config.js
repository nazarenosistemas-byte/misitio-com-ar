/* ============================================================
   CONFIGURACIÓN DE GOOGLE ADSENSE — Claramente (misitio.com.ar)
   ------------------------------------------------------------
   PASO 1: Creá tu cuenta en https://ads.google.com
   PASO 2: Cuando Google te apruebe, te da un Publisher ID con
           forma de "ca-pub-1234567890123456". Pegalo abajo.
   PASO 3: En AdSense > Anuncios > Unidades, creá 3 unidades y
           copiá sus IDs numéricos (ej: 1234567890) en los
           data-ad-slot de las páginas:
             - 0000000001 → banner superior (index.html)
             - 0000000002 → lateral 300x250 (index + artículos)
             - 0000000003 → in-article (dentro de los artículos)
   PASO 4: Activá la línea `enabled: true` (solo después del
           paso 2; antes Google podría rechazar el sitio).
   NOTA: También tenés que descomentar tu línea en ads.txt.
   ============================================================ */
window.ADS_CONFIG = {
  adsenseClient: "ca-pub-XXXXXXXXXXXXXXXX",
  enabled: false
};
