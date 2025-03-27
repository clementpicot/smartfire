// hooks/useClickOutside.ts
import { useEffect, RefObject } from "react";

type Handler = () => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(target)) {
        return;
      }

      handler();
    };

    document.addEventListener(mouseEvent, listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler, mouseEvent]);
}
