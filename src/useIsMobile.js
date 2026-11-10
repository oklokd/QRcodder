import { useSyncExternalStore } from 'react';

export const useIsMobile = (breakpoint = 480) => {
    const subscribe = (callback) => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        mql.addEventListener('change', callback);
        return () => mql.removeEventListener('change', callback);
    };

    const getSnapshot = () => {
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    };

    const getServerSnapshot = () => false;

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};