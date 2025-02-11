// hooks/useScrollOnMobile.ts
import { useEffect, RefObject } from 'react';

export function useScrollOnMobile<T extends HTMLElement>(
  ref: RefObject<T>,
  trigger: boolean,
  options = {
    behavior: 'smooth' as ScrollBehavior,
    block: 'start' as ScrollLogicalPosition,
    mobileOnly: true
  }
) {
  useEffect(() => {
    if (!trigger) return;
    
    const shouldScroll = options.mobileOnly 
      ? window.innerWidth < 1024 
      : true;

    if (shouldScroll && ref.current) {
      ref.current.scrollIntoView({
        behavior: options.behavior,
        block: options.block
      });
    }
  }, [trigger, ref, options]);
}