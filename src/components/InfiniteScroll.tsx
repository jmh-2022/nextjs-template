import React, { useRef, useCallback, useEffect, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fetchNextPage: () => void;
    hasNextPage: undefined | boolean;
    clazzName?: string | undefined;
}

export const InfiniteScroll = ({ children, fetchNextPage, hasNextPage, clazzName }: Props) => {
    const loaderRef = useRef(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const target = entries[0];
            if (target.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: clazzName ? document.querySelector(`.${clazzName}`) : null,
            rootMargin: '0px',
            threshold: 0.3,
        });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => observer.disconnect();
    }, [handleObserver, clazzName]);

    return (
        <ul>
            {children}
            {hasNextPage && <div ref={loaderRef} />}
        </ul>
    );
};
