import { useCallback, useRef, useState } from "react";
import { Col, Row, Input, Modal } from "antd";
import useSearch from "./hooks/useSearch";
import CardItem from "./components/cardItem";
import CardLoading from "./components/cardLoading";
import ImageNoData from "./assets/no-data.png";
import { SearchProps } from "antd/es/input/Search";
import Header from "./components/header";

import "./App.scss";

const { Search } = Input;

function App() {
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [modal, setModal] = useState(false);
  const { loading, hasMore, data, contextHolder } = useSearch(query, limit);
  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLimit((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setQuery(value);
    setLimit(10);
    setModal(!modal);
  };

  return (
    <div className="App">
      <Header onOpenModal={() => setModal(!modal)} />
      {query && (
        <h3 className="search-for">
          Search result for : <span>{query}</span>
        </h3>
      )}
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Row gutter={[16, 16]} className="mb-2">
            {data?.map((val, i) => {
              const isRef = data.length === i + 1 ? lastElementRef : null;
              return (
                <Col xs={24} sm={24} md={12} key={i} style={{ padding: "20px 30px 0 30px" }}>
                  <CardItem data={val} refValue={isRef} keyValue={i} className="card-item" />
                </Col>
              );
            })}
          </Row>
          {!data.length && !loading && (
            <div className="no-data">
              <img src={ImageNoData} alt="no data" height="200px" />
              <h2>Ops... Data Not Found</h2>
            </div>
          )}
          {loading && <CardLoading />}
        </Col>
      </Row>
      <Modal title="Basic Modal" open={modal} onCancel={() => setModal(!modal)} footer={null}>
        <Search placeholder="Search music" allowClear onSearch={onSearch} size="large" loading={loading} />
      </Modal>
    </div>
  );
}

export default App;
