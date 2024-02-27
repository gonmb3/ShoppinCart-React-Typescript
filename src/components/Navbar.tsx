import {
  Button,
  Container,
  Nav,
  NavbarBrand as NavbarBs,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa6";
import { useShoppingCart } from "../context/cartContext";

const Navbar = () => {
   const {openCart, cartQuantity, } = useShoppingCart()

  return (
    <NavbarBs>
      <Container className="d-flex  justify-content-between align-items-center border-bottom p-3 shadow-md">
        <Nav className="text-black">
          <Nav.Link to="/" as={NavLink} className="text-secondary fw-bold">
            Home
          </Nav.Link>
          <Nav.Link to="/tienda" as={NavLink} className="text-secondary fw-bold">
            Tienda
          </Nav.Link>
          <Nav.Link to="/nosotros" as={NavLink} className="text-secondary fw-bold">
            Nosotros
          </Nav.Link>
        </Nav>
        <Button
        onClick={openCart}
          className=""
          variant="outline-primary"
          style={{ position: "relative" }}
        >
          <FaCartPlus size={25} />
          <div
            className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
            style={{ width: "1.5rem", height: "1.5rem", position: "absolute", right:-10 , bottom:-10, transform:"translate:(25%, 25%)"}}
          >
            {cartQuantity}
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
