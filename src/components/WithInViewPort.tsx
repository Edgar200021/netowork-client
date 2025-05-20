import { useInViewPort } from "@/hooks/useInViewPort";
import { type ReactElement, useRef } from "react";

interface Props<T extends HTMLElement> {
	renderElement: (ref: React.RefObject<T>, isInView: boolean) => ReactElement;
	options?: IntersectionObserverInit;
}

export const WithInViewPort = <T extends HTMLElement>({
	renderElement,
	options,
}: Props<T>) => {
	const targetRef = useRef<T>(null);
	const isInView = useInViewPort(targetRef, options);

	return renderElement(targetRef, isInView);
};
