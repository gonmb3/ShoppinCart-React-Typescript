import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/CurrencyFormar";
import { useShoppingCart } from "../context/cartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  url: string;
};

const StoreItem = ({ id, name, price, url }: StoreItemProps) => {

  const {getItemQuantity, increaseCartQty,decreaseCartQty,removeFromCart} = useShoppingCart()

  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={url}
        height={"200px"}
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between mb-4 align-items-base">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)} </span>
        </Card.Title>
        {/* add to cart button & +  - quantity */}
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
            onClick={() => increaseCartQty(id)}
             className="w-100"> + Agregar al carrito</Button>
          ) : (
            <div
              style={{ gap: ".5rem" }}
              className="d-flex align-items-center flex-column"
            >
              <div
                style={{ gap: ".5rem" }}
                className="d-flex align-items-center justify-content-center"
              > {/* decrease quantity */}
                 <Button onClick={() => decreaseCartQty(id)}>-</Button>
              
                <div>
                  <span className="fs-3">{quantity}</span> en el carrito
                </div>
               {/* increase quantity */}
                <Button onClick={() => increaseCartQty(id)}> +</Button>
              </div>
              <Button onClick={() => removeFromCart(id)} variant="danger">Eliminar</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
