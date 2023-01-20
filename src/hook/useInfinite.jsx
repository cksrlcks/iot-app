import { useEffect, useState, useRef } from 'react';
import axios from '../lib/axios';
import { useInView } from 'react-intersection-observer';

export default function useInfinite(url, size, id, logMode) {
    //logMode는 테스트용으로 임시로 넣은값 (운행일지에서 넘어올때 패스경로 적은데이터로 보여주려고)
    const [data, setData] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [ref, inView] = useInView();
    const [isLoading, setIsLoading] = useState(false);
    const page = useRef(0);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(
                    `${url}?size=${size}&page=${page.current}${id ? `&id=${id}` : ''}${
                        logMode ? '&test="small"' : ''
                    }`
                );
                setData((prev) => [...prev, ...data.lists]);
                setHasNextPage(data.lists.length === size);
                setTotalCount(data.totalCount);
                if (data.lists.length) {
                    page.current = page.current + 1;
                }
                setIsLoading(false);
            } catch (err) {
                alert(err);
                console.error(err);
                setIsLoading(false);
            }
        };

        if (inView && hasNextPage && !isLoading) {
            fetch();
        }
    }, [hasNextPage, inView, isLoading, logMode, id, size, url]);

    return { data, hasNextPage, isLoading, totalCount, ref, inView, page };
}
