import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "reactstrap";
import { removeItem, subTotal } from "../features/cartSlice";
import { decreaseItem, increaseItem } from "../features/cartSlice";
import Checkbox from "./Checkbox";
import Location from "./Location";
import ModalCart from "./ModalCart";

function Cart() {
  const [checked, setChecked] = useState([])
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const total = useSelector((state) => state.cart.cartTotalPrice)
  const districtSelected = useSelector((state) => state.location.districtSelected)
  const wardSelected = useSelector((state) => state.location.wardSelected)
  console.log(districtSelected, wardSelected)

  useEffect(() => {
    dispatch(subTotal());
  }, [cartItem, dispatch])

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseItem(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseItem(id));
  };

  return (
    <div className="container">
      {cartItem.length == 0 ? (
        <h1 style={{ textAlign: "center" }}>Cart Empty</h1>
      ) : (
        <div>
          <Table borderless>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item, index) => {
                return (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="quantity" style={{ display: "flex" }}>
                        <Button onClick={() => handleDecrease(item.id)}>
                          -
                        </Button>
                        <div>{item.quantity}</div>
                        <Button onClick={() => handleIncrease(item.id)}>
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                      <Button onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Checkbox checked={checked} setChecked={setChecked}/>
          <Location />
          <h3>SubTotal : {total}</h3>
          <ModalCart checked={checked} total={total} cartItem={cartItem}/>
        </div>
      )}
    </div>
  );
}

export default Cart;
