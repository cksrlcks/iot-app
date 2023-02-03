import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

export default function useFetch(url, option) {
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, option);
    return { data, error, isLoading, mutate };
}
