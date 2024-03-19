import { Button, Card, Col, Row } from "antd";

type TData = {
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  collectionName: string;
  trackName: string;
  collectionPrice: string;
};

type TCardItem = {
  data?: TData;
  refValue?: any;
  keyValue?: string | number;
  className?: string;
};

const CardItem = (props: TCardItem) => {
  const { data, refValue = null, keyValue, className } = props;

  return (
    <Card key={keyValue} ref={refValue} className={className}>
      <Row gutter={20}>
        <Col span={8}>
          <div onClick={() => window.open(data?.artistViewUrl)}>
            <img src={data?.artworkUrl100} alt={data?.artworkUrl100} />
            <div className="play-button">
              <img src={require("./../../assets/play-button.png")} alt="play-button" />
            </div>
          </div>
        </Col>
        <Col span={16} className="card-info">
          <div className="title">
            <h6>{data?.artistName}</h6>
            <h3>{data?.trackName}</h3>
            <span>{data?.collectionName}</span>
          </div>
          <div className="price">
            <Button type="primary" className="pop-btn">
              Pop
            </Button>
            <h3>$ {data?.collectionPrice}</h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CardItem;
