"use client";
import React, { useEffect, useRef, useCallback } from "react";
const breakpointMap = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1600px",
  "3xl": "1728px",
};
export interface GridContainerProps {
  id: string;
  children: Record<string, React.ReactNode>;
  layout: {
    columns: string;
    height?: string;
    media?: {
      breakpoint: keyof typeof breakpointMap; // e.g., "md", "lg", "sm"
      columns: string; // e.g., "1fr 2fr", "repeat(3, 1fr)"
      height?: string;
      widthCondition?: "min" | "max" | "exact" | "exactmin" | "exactmax"; // min = >, max = <, exact = ==, exactmin = <=, exactmax = >=
    }[];
    items: {
      id: string;
      span?: number;
      height?: string;
      placeholder?: string;
      media?: {
        breakpoint: keyof typeof breakpointMap;
        span?: number;
        height?: string;
        hidden?: boolean | "hidden"; // true, false, 'hidden', or just hidden (shorthand - defaults to true)
        widthCondition?: "min" | "max" | "exact" | "exactmin" | "exactmax"; // min = >, max = <, exact = ==, exactmin = <=, exactmax = >=
      }[];
    }[];
  }[];
  gap?: number;
  className?: string;
  minHeight?: string;
}

export const GridContainer = ({
  id,
  children,
  layout,
  gap = 4,
  className = "",
  minHeight = "100px",
}: GridContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const generateClass = (rowIndex: number) =>
    `${rowIndex}-${Math.random().toString(36).substr(2, 9)}`;

  // Helper function to generate media query based on width condition
  const generateMediaQuery = useCallback(
    (
      breakpoint: keyof typeof breakpointMap,
      widthCondition?: "min" | "max" | "exact" | "exactmin" | "exactmax"
    ) => {
      const minWidth = breakpointMap[breakpoint];

      if (breakpoint === "sm") {
        return `@media not all and (min-width: 768px)`;
      }

      switch (widthCondition) {
        case "max":
          // Only widths less than breakpoint (<)
          return `@media (max-width: calc(${minWidth} - 1px))`;
        case "exact":
          // Only exact width (==)
          return `@media (min-width: ${minWidth}) and (max-width: ${minWidth})`;
        case "exactmin":
          // Exact width AND all widths less than (<=)
          return `@media (max-width: ${minWidth})`;
        case "exactmax":
          // Exact width AND all widths greater than (>=)
          return `@media (min-width: ${minWidth})`;
        case "min":
        default:
          // Only widths greater than (>)
          return `@media (min-width: calc(${minWidth} + 1px))`;
      }
    },
    []
  );

  // Helper function to check if item should be hidden
  const shouldItemBeHidden = useCallback((hidden?: boolean | "hidden") => {
    // If hidden is "hidden" string, return true
    if (hidden === "hidden") return true;
    // If hidden is true (including shorthand hidden,), return true
    if (hidden === true) return true;
    // If hidden is false, return false
    if (hidden === false) return false;
    // If hidden is undefined, return false (default visible)
    return false;
  }, []);

  // Helper function to check if all items in a row are hidden at a specific breakpoint
  const areAllItemsHidden = useCallback(
    (
      row: GridContainerProps["layout"][0],
      breakpoint: keyof typeof breakpointMap,
      widthCondition?: "min" | "max" | "exact" | "exactmin" | "exactmax"
    ) => {
      if (!row.items || row.items.length === 0) return false;

      return row.items.every((item) => {
        if (!item.media) return false;
        const mediaRule = item.media.find(
          (rule) =>
            rule.breakpoint === breakpoint &&
            rule.widthCondition === widthCondition
        );
        return shouldItemBeHidden(mediaRule?.hidden);
      });
    },
    [shouldItemBeHidden]
  );

  useEffect(() => {
    const styleId = `grid-container-responsive-styles-${generateClass}-${id}`;
    let existingStyle = document.getElementById(styleId) as HTMLStyleElement;

    if (!existingStyle) {
      existingStyle = document.createElement("style");
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }

    let css = "";

    layout.forEach((row, rowIndex) => {
      const rowClass = `grid-row-${rowIndex}-${id}`;

      if (row.media && row.media.length > 0) {
        row.media.forEach((mediaRule) => {
          const mediaQuery = generateMediaQuery(
            mediaRule.breakpoint,
            mediaRule.widthCondition
          );
          css += `
            ${mediaQuery} {
              .${rowClass} {
                grid-template-columns: ${mediaRule.columns} !important;
                ${
                  mediaRule.height
                    ? `min-height: ${mediaRule.height} !important;`
                    : ""
                }
              }
            }
          `;
        });
      }

      if (row.items) {
        row.items.forEach((item, itemIndex) => {
          const itemClass = `grid-item-${rowIndex}-${itemIndex}-${id}`;
          if (item.media && item.media.length > 0) {
            item.media.forEach((mediaRule) => {
              const mediaQuery = generateMediaQuery(
                mediaRule.breakpoint,
                mediaRule.widthCondition
              );
              const isHidden = shouldItemBeHidden(mediaRule.hidden);

              css += `
                ${mediaQuery} {
                  .${itemClass} {
                    ${
                      isHidden
                        ? "display: none !important; height: 0 !important;"
                        : ""
                    }
                    ${
                      mediaRule.span !== undefined
                        ? `grid-column: span ${mediaRule.span} !important;`
                        : ""
                    }
                    ${
                      mediaRule.height
                        ? `min-height: ${mediaRule.height} !important;`
                        : ""
                    }
                    ${
                      !isHidden &&
                      (mediaRule.span !== undefined || mediaRule.height)
                        ? "display: block !important;"
                        : ""
                    }
                  }
                }
              `;
            });
          }
        });

        // Add logic to hide entire row when all items are hidden
        const allBreakpointConditions = new Set<{
          breakpoint: keyof typeof breakpointMap;
          widthCondition?: "min" | "max" | "exact" | "exactmin" | "exactmax";
        }>();
        row.items.forEach((item) => {
          if (item.media) {
            item.media.forEach((mediaRule) => {
              allBreakpointConditions.add({
                breakpoint: mediaRule.breakpoint,
                widthCondition: mediaRule.widthCondition,
              });
            });
          }
        });

        allBreakpointConditions.forEach(({ breakpoint, widthCondition }) => {
          if (areAllItemsHidden(row, breakpoint, widthCondition)) {
            const mediaQuery = generateMediaQuery(breakpoint, widthCondition);
            css += `
              ${mediaQuery} {
                .${rowClass} {
                  display: none !important;
                  height: 0 !important;
                  min-height: 0 !important;
                }
              }
            `;
          }
        });
      }
    });

    existingStyle.textContent = css;

    return () => {
      if (existingStyle && existingStyle.textContent === css) {
        existingStyle.remove();
      }
    };
  }, [layout, id, areAllItemsHidden, generateMediaQuery, shouldItemBeHidden]);

  return (
    <div
      ref={containerRef}
      className={`grid ${className}
      `}
      style={{ gap: gap / 4 + "rem" }}>
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid grid-row-${rowIndex}-${id}`}
          style={{
            gridTemplateColumns: row.columns,
            minHeight: row.height || minHeight,
            gap: gap / 4 + "rem",
          }}>
          {row.items?.map((item, itemIndex) => {
            // Use CSS classes for responsive behavior instead of Tailwind classes
            const itemClass = `grid-item-${rowIndex}-${itemIndex}-${id}`;

            return (
              <div
                key={itemIndex}
                className={itemClass}
                style={{
                  gridColumn: item.span ? `span ${item.span}` : "auto",
                  minHeight: item.height || "auto",
                }}>
                {children[item.id] || (
                  <div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center text-gray-500'>
                    {item.placeholder || `Slot ${item.id}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
