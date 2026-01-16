import { useEffect, useState } from "react";

function DataFetcher({
  url,
  baseUrl = "https://jsonplaceholder.typicode.com",
  children,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`${baseUrl}${url}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setData(null);
      });
  }, [url]);

  return children({ data, loading, error });
}

export default DataFetcher;
