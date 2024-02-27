import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/cartContext'
import CartItem from './CartItem'
import { formatCurrency } from '../utils/CurrencyFormar'
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpenCart:boolean
}

const ShoppingCart = ({isOpenCart}: ShoppingCartProps) => {
    const {closeCart, cartItems} = useShoppingCart();

  return (
    <Offcanvas show={isOpenCart} placement='end' onHide={closeCart} >
            <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Carrito</Offcanvas.Title>  
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ) )}
                    <div className="ms-auto fw-bold fs-5">
                       Total: {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total +( item?.price || 0 )* cartItem.quantity
                       }, 0)
                       )}
                    </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart