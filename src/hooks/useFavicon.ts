"use client";

import { useEffect, useRef } from "react";
import { generateFaviconSvg, svgToDataUrl } from "@/lib/utils/favicon";
import { tierColor } from "@/lib/utils/tier";
import type { Tier } from "@/types/database";

export function useFavicon(tier: Tier, isStreaming: boolean) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const color = tierColor(tier);

    function setFavicon(svg: string) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml";
        document.head.appendChild(link);
      }
      link.type = "image/svg+xml";
      link.href = svgToDataUrl(svg);
    }

    if (isStreaming) {
      let frame = 0;
      intervalRef.current = setInterval(() => {
        frame = (frame + 1) % 2;
        const opacity = frame === 0 ? 1 : 0.4;
        setFavicon(generateFaviconSvg(color, opacity));
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setFavicon(generateFaviconSvg(color, 1));
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tier, isStreaming]);
}
