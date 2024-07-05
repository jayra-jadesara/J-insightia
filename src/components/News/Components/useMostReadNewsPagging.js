import { useEffect, useState } from 'react';
import { GetAllMostReadNews } from '../../../utils/news-util';

export default function useMostReadNewsPagging(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mostReadNews, setMostReadNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    GetAllMostReadNews(pageNumber)
      .then((res) => {
        setMostReadNews((prevNews) => [...new Set([...prevNews, ...res])]);
        setHasMore(res.length > 0);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [pageNumber]);

  return {
    loading,
    error,
    mostReadNews,
    hasMore
  };
}
