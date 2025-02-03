import { useEffect, useState } from "react";
const useInfiniteScroll = (loadMore: () => void, offset = 200) => {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - offset && !isFetching) {
        setIsFetching(true);
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, loadMore]);
  useEffect(() => {
    if (isFetching) {
      setTimeout(() => setIsFetching(false), 1000);
    }
  }, [isFetching]);
  return { isFetching };
};

export default useInfiniteScroll;
