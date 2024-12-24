'use client';

import { fetchAllLinks } from '@/src/data/linkQueries';

import { useEffect } from 'react';
import useFetch from './useFetch';
import { URL } from '@prisma/client';

const useFetchLinks = (userId: string) => {
  const linksFetch = useFetch({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: URL[] = await fetchAllLinks(userId);
        linksFetch.setData(res);
      } catch (e) {
        linksFetch.setData(null);
        linksFetch.setError('Error fetching Link');
      } finally {
        linksFetch.setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return {
    links: linksFetch.data,
    loading: linksFetch.loading,
    error: linksFetch.loading,
  };
};
export default useFetchLinks;
