import { useEffect, useState } from 'react';

export default function useNewsPagging(pageNumber, newsIds) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allNews, setallNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const page_size = 20;

  useEffect(() => {
    setLoading(true);
    setError(false);
    const news = newsIds.slice((pageNumber - 1) * page_size, pageNumber * page_size);
    setallNews((prevNews) => [...new Set([...prevNews, ...news])]);

    setHasMore(news.length > 0);
    setLoading(false);
  }, [pageNumber, newsIds, page_size]);

  return {
    loading,
    error,
    allNews,
    hasMore
  };
}
