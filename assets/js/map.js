/* map.js — 충칭 Leaflet 지도 컨트롤러 (지연 초기화, 1회만 생성) */

window.GoChina = window.GoChina || {};

GoChina.createMapController = (spots) => {
  let ready = false;

  const init = () => {
    const mapEl = document.getElementById("chongqingMap");
    if (!mapEl || ready || !window.L) return;
    ready = true;

    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    const map = L.map(mapEl, {
      scrollWheelZoom: false,
      zoomControl: true,
      dragging: !touchDevice
    });

    const mapWrap = mapEl.closest(".map-wrap");
    const lockButton = document.getElementById("mapLock");
    if (touchDevice && mapWrap && lockButton) {
      mapWrap.classList.add("is-touch");
      lockButton.addEventListener("click", () => {
        if (map.dragging.enabled()) {
          map.dragging.disable();
          lockButton.textContent = "지도 이동 켜기";
          lockButton.setAttribute("aria-pressed", "false");
        } else {
          map.dragging.enable();
          lockButton.textContent = "지도 이동 중 · 다시 잠그기";
          lockButton.setAttribute("aria-pressed", "true");
        }
      });
    }

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
      subdomains: "abcd",
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    }).addTo(map);

    const bounds = [];
    spots.forEach((spot, index) => {
      bounds.push([spot.lat, spot.lng]);
      const marker = L.marker([spot.lat, spot.lng], {
        title: `${index + 1}. ${spot.name}`,
        icon: L.divIcon({
          className: "map-marker",
          html: `<span>${index + 1}</span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      })
        .addTo(map)
        .bindPopup(`
          <span class="map-popup-title">${index + 1}. ${spot.name}</span>
          <span class="map-popup-meta">${spot.en}<br>${spot.cn}<br>${spot.note}<br>${spot.lat.toFixed(4)}, ${spot.lng.toFixed(4)}</span>
        `);

      if (!window.matchMedia("(max-width: 720px)").matches) {
        marker.bindTooltip(spot.en, {
          permanent: true,
          direction: "top",
          offset: [0, -18],
          className: "map-tooltip"
        });
      }
    });

    map.fitBounds(bounds, { padding: [24, 24] });
    window.setTimeout(() => map.invalidateSize(), 120);
  };

  return { init };
};
