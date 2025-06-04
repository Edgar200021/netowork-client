import { useRef, useSyncExternalStore } from "react";

export const useMediaQuery = (query: string, cb?: () => void) => {
	const mediaQuery = useRef(window.matchMedia(query));

	return useSyncExternalStore(
		(callback) => {
			mediaQuery.current.addEventListener("change", callback);
			return () => {
				mediaQuery.current.removeEventListener("change", callback);
			};
		},

		() => {
			if (cb && mediaQuery.current.matches) {
				cb?.();
			}

			return mediaQuery.current.matches;
		},
	);
};
