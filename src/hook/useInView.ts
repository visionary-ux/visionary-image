import { type RefCallback, useCallback, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../hook/useIsomorphicLayoutEffect";

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook to track element visibility using IntersectionObserver.
 * Returns a ref callback and visibility state.
 *
 * @param options - IntersectionObserver options
 * @returns [refCallback, isVisible] - Attach refCallback to element, isVisible indicates visibility
 */
export function useInView(options: UseInViewOptions = {}): [RefCallback<Element>, boolean] {
  const { rootMargin = "0px", threshold = 0 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Cleanup observer on unmount
  useIsomorphicLayoutEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Ref callback that sets up the observer
  const refCallback = useCallback(
    (element: Element | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      elementRef.current = element;

      if (!element) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { rootMargin, threshold }
      );

      observerRef.current.observe(element);
    },
    [rootMargin, threshold]
  );

  return [refCallback, isVisible];
}
