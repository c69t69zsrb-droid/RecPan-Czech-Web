import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/hooks/useLanguage";

const greenIcon = L.divIcon({
  className: "facility-marker",
  html: `<div style="
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4CAF50;
    border: 2px solid #E6E6E6;
    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const hqIcon = L.divIcon({
  className: "facility-marker hq",
  html: `<div style="
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4CAF50;
    border: 2px solid #111820;
    box-shadow: 0 0 0 6px rgba(76, 175, 80, 0.2);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export default function FacilityMap() {
  const { t, language } = useLanguage();
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const facilities = [
    { name: t("facilityMap.pribramName"), coords: [49.6111, 14.0056], status: t("facilityMap.status"), capacity: t("facilityMap.capacity"), isHQ: true },
  ];

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [49.8, 15.5],
      zoom: 7,
      minZoom: 6,
      maxZoom: 12,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    facilities.forEach((facility) => {
      const isHQ = facility.isHQ;
      const marker = L.marker(facility.coords, {
        icon: isHQ ? hqIcon : greenIcon,
      }).addTo(map);

      marker.bindTooltip(
        `<div style="font-family: 'Poppins', sans-serif; padding: 4px 2px;">
          <div style="font-size: 11px; font-weight: 600; color: #111820; margin-bottom: 2px;">${facility.name}</div>
          <div style="font-size: 9px; color: #4CAF50; text-transform: uppercase; letter-spacing: 0.1em;">${facility.status}</div>
          <div style="font-size: 9px; color: rgba(17,24,32,0.4); margin-top: 2px;">${facility.capacity}</div>
        </div>`,
        {
          direction: "top",
          offset: [0, -8],
          className: "facility-tooltip",
        }
      );
    });

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mapRef.current) {
            setTimeout(() => mapRef.current.invalidateSize(), 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ background: "#E6E6E6" }} />;
}