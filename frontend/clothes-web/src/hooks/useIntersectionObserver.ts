"use client";

import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Hook giúp phát hiện phần tử xuất hiện trong viewport.
 * Tự động ngừng quan sát sau lần xuất hiện đầu tiên để tối ưu hiệu năng.
 */
export const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  // Destructure options để đưa các giá trị nguyên thủy vào dependency array
  const { threshold, root, rootMargin } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Ngừng quan sát sau khi đã thấy phần tử
        observer.unobserve(element);
      }
    }, { threshold, root, rootMargin });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, isVisible]); 

  return [elementRef, isVisible];
};