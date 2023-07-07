import { useEffect, useRef } from "react";

/**
 * 
 * @param value the value to track
 * @returns the older value
 */
export function usePreviousValue<T>(value: T): T {
    const ref = useRef<T>(value);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  