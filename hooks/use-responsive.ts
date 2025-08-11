"use client";

import { useState, useEffect } from "react";

interface Breakpoint {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

const breakpoints: Breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      setIsMobile(width < breakpoints.md);
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
      setIsDesktop(width >= breakpoints.lg);
      setIsLandscape(width > height);
    }

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBreakpoint = (breakpoint: keyof Breakpoint) => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBelowBreakpoint = (breakpoint: keyof Breakpoint) => {
    return windowSize.width < breakpoints[breakpoint];
  };

  const getResponsiveValue = <T>(mobile: T, tablet: T, desktop: T): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getResponsiveClass = (
    mobile: string,
    tablet: string,
    desktop: string
  ): string => {
    return getResponsiveValue(mobile, tablet, desktop);
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isBreakpoint,
    isBelowBreakpoint,
    getResponsiveValue,
    getResponsiveClass,
    breakpoints,
  };
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export function useOrientation() {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return orientation;
}

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  return isTouchDevice;
}
