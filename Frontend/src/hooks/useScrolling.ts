import { useState, useEffect, useRef } from "react";
import { emitVisibleLines } from "@/sockets/sockets";
import type { Song } from "@/types/song";

interface UseScrollingProps {
  userRole: { isAdmin: boolean; username: string; instrument?: string };
  song: Song | null;
}

export const useScrolling = ({ userRole, song }: UseScrollingProps) => {
  const [scrolling, setScrolling] = useState(false);
  const [visibleLines, setVisibleLines] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number>(0);

  // Admin scrolling logic
  useEffect(() => {
    if (!scrolling || !contentRef.current || !song || !userRole.isAdmin) return;

    const contentElement = contentRef.current;
    let lastRevealTime = Date.now();
    const REVEAL_INTERVAL = 2000;
    let lastVisibleLines = 1;

    scrollIntervalRef.current = window.setInterval(() => {
      if (!contentElement) return;

      contentElement.scrollTo({
        top: contentElement.scrollHeight,
        behavior: "smooth",
      });

      const scrollPosition = contentElement.scrollTop;
      const scrollHeight = contentElement.scrollHeight;
      const clientHeight = contentElement.clientHeight;

      const currentTime = Date.now();
      if (
        scrollPosition + clientHeight >= scrollHeight * 0.8 &&
        currentTime - lastRevealTime >= REVEAL_INTERVAL
      ) {
        setVisibleLines((prev) => {
          const newCount = Math.min(prev + 1, song.content.length);
          if (newCount > lastVisibleLines) {
            emitVisibleLines(newCount);
            lastVisibleLines = newCount;
          }
          return newCount;
        });
        lastRevealTime = currentTime;
      }
    }, 50);

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [scrolling, song, userRole.isAdmin]);

  // User auto-scroll when new lines appear
  useEffect(() => {
    if (userRole.isAdmin || !contentRef.current || !song) return;

    if (visibleLines > 1) {
      const contentElement = contentRef.current;
      contentElement.scrollTo({
        top: contentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleLines, userRole.isAdmin, song]);

  // Reset when scrolling stops (admin only)
  useEffect(() => {
    if (!userRole.isAdmin) return;

    if (!scrolling) {
      setVisibleLines(1);
      emitVisibleLines(1);

      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [scrolling, userRole.isAdmin]);

  return {
    scrolling,
    setScrolling,
    visibleLines,
    setVisibleLines,
    contentRef,
  };
};
