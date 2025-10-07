"use client";

import React from "react";
import { useEffect } from "react";

export function useClickOutside(
  refs: Array<React.RefObject<HTMLElement | null>>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      const clickedInside = refs.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });
      if (!clickedInside) onOutsideClick();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [refs, onOutsideClick]);
}
