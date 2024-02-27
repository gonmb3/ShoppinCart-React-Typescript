import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

{
  /* provide type props  */
}
type ShoppingCartProviderProps = {
  children: ReactNode;
};
{
  /* cart item TYPE */
}
type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQty: (id: number) => void;
  decreaseCartQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shoppinCart", []);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);

  const openCart = () => {
    setIsOpenCart(true)
  }
  
  const closeCart = () => {
    setIsOpenCart(false)
  }

  {
    /* cart items quantity */
  }
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  {
    /* add to cart & increase quantity */
  }
  function increaseCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  {
    /* decrease quantity */
  }
  function decreaseCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  {
    /* remove from cart */
  }
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)



  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQty,
        decreaseCartQty,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,      
      }}
    >
      {children}
      <ShoppingCart isOpenCart={isOpenCart} />
    </ShoppingCartContext.Provider>
  );
}
