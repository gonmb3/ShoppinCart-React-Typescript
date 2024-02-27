import { useShoppingCart } from "../context/cartContext"
import storeItems from "../data/items.json"
import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../utils/CurrencyFormar"


type CartItemsProps ={
    id: number,
    quantity: number
}

const CartItem = ({id, quantity}: CartItemsProps) => {

    const {removeFromCart} = useShoppingCart();
    const item = storeItems.find(i => i.id === id)
    if(item == null) return null

  return (

    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        {/* img */}
        <img src={item.url}  style={{width:"125px", height:"75px", objectFit:"cover"}} />
            <div className="me-auto">
            <div>
             {/* name & quantity */}
           {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize:".7rem"}}> X{quantity} </span> }
        </div>
         {/* format currency price */}
        <div className="text-muted" style={{fontSize:".75rem"}}>
            {formatCurrency(item.price)}
        </div>
            </div>
        {/* format currency price * quantity */}
        <div >
            {formatCurrency(item.price * quantity)}
        </div>
        <Button variant="outline-danger" size={"sm"} onClick={() => removeFromCart(item.id) }>&times;</Button>
    </Stack>
  )
}

export default CartItem