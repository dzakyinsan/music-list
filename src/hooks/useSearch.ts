import { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

export default function useSearch(query: string, limit: number) {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const openAlert = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
      style: { marginTop: "7vh" },
    });
  };

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    let cancel: () => void;
    setLoading(true);
    axios({
      method: "GET",
      url: "https://itunes.apple.com/search",
      params: { term: query, limit: limit, entity: "song", media: "music" },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res: any) => {
        const newData = res?.data?.results?.map((val: any) => ({
          artistName: val.artistName,
          artistViewUrl: val.artistViewUrl,
          artworkUrl100: val.artworkUrl100,
          collectionName: val.collectionName,
          trackName: val.trackName,
          collectionPrice: val.collectionPrice,
        }));
        setData((prev) => {
          return [...new Set([...prev, ...newData])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        if (e.message) return openAlert(e.message);
      });

    return () => cancel();
  }, [query, limit]);

  return { loading, data, contextHolder };
}
