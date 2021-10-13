import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ModalCart({ checked }) {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const total = useSelector((state) => state.cart.cartTotalPrice);

  //lấy ra tên phường quận tp đã chọn
  const province = useSelector((state) => state.location.province);
  const district = useSelector((state) => state.location.district);
  const ward = useSelector((state) => state.location.ward);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Submit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>My Cart</ModalHeader>
        <ModalBody>
          {cartItem.map((item, index) => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>Price : {item.price}</td>
                <td>Quantity : {item.quantity}</td>
                <td>Total : {item.price * item.quantity}</td>
              </tr>
            );
          })}
          SubTotal : {total}
          <br />
          Method : {checked.map((item) => item)}
          <br />
          Province : {province}, District: {district}, Ward: {ward}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalCart;
