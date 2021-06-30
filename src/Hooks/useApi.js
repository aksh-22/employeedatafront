import { useEffect, useState } from "react";

const useApiFetch = (url) => {
  const [fetchData, setFetchData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    dataFetch();
  }, [url]);

  const dataFetch = () => {
    setIsloading(true);
    fetch(url)
      .then((res) => res?.json())
      .then((data) => setFetchData(data?.data))
      .catch((err) => setHasError(true))
      .finally(() => setIsloading(false));
  };
  return { isloading, hasError, fetchData };
};

export default useApiFetch;
