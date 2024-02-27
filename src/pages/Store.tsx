import { Col, Row } from "react-bootstrap";
import items from "../data/items";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <>
      <h1>Tienda</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
