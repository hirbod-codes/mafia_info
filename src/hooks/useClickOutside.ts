import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(onOutsideClick: (() => void) | (() => Promise<void>)) {
    const ref = useRef<T>(null);

    useEffect(() => {
        function handleClick(e: PointerEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onOutsideClick();
            }
        }

        document.addEventListener("pointerdown", handleClick);

        return () => {
            document.removeEventListener("pointerdown", handleClick);
        };
    }, [onOutsideClick]);

    return ref;
}