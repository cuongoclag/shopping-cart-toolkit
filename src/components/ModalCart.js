import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function ModalCart({checked, total, cartItem}) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>Submit</Button>
            <Modal isOpen={modal} toggle={toggle} >
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
                    Method : {checked.map(item => item)}
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalCart
