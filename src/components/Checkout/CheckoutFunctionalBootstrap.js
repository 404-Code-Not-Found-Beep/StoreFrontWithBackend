//this component contains the code to send the order to the database
//in future this could be separated into separate components
//it uses a bootstrap form
//it is rendered by the checkout page and uses props to send the form's data to it

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import React from "react";
import { useState } from "react";

const CheckoutFunctionalBootstrap = (props) => {
  const [validated, setValidated] = useState(false);

  let localItems = localStorage.getItem("items");
  if (localItems === []) {
    localItems = null;
  }
  const submitHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      let name =
        event.currentTarget[0].value + " " + event.currentTarget[1].value;
      let street =
        event.currentTarget[2].value + " " + event.currentTarget[3].value;
      let city =
        event.currentTarget[4].value + " " + event.currentTarget[5].value;
      let postalCode = event.currentTarget[6].value;
      let ccName = event.currentTarget[7].value;
      let ccNumber = event.currentTarget[8].value;
      let ccExpiration = event.currentTarget[9].value;
      let ccCVV = event.currentTarget[10].value;
      let emailAddress = event.currentTarget[11].value;
      let username = localStorage.getItem("username");

      props.onConfirm({
        name: name,
        street: street,
        city: city,
        postalCode: postalCode,
        username: username,
        ccName: ccName,
        ccNumber: ccNumber,
        ccExpiration: ccExpiration,
        ccCVV: ccCVV,
        emailAddress: emailAddress,
      });
    }
  };

  const noItemsInCart = <h1>Cart is empty</h1>;

  const checkoutForm = (
    <Form noValidate validated={validated} onSubmit={submitHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control required type="text" placeholder="First name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>

          <Form.Control required type="text" placeholder="Last name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Street</Form.Label>
          <Form.Control required type="text" placeholder="Address" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Address.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>House Number</Form.Label>
          <Form.Control required type="text" placeholder="House Number/Name" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Number/Name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom06">
          <Form.Label>County</Form.Label>
          <Form.Control type="text" placeholder="County" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid County.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom07">
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post Code"
            required
            minLength={3}
            maxLength={5}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Post Code.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom08">
          <Form.Label>Name on card</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="John Smith"
            minLength={5}
          />
          <Form.Control.Feedback type="invalid">
            Please provide name.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom09">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="**** **** **** 1234"
            min="1000000000000000"
            max="9999999999999999"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Card number.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom10">
          <Form.Label>Expiration</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="mm/yy"
            minLength={5}
            maxLength={5}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a month/year format.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom11">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="***"
            min="100"
            max="999"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a CVV.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom12">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="me@me.com"
            minLength={5}
            maxLength={50}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Confirm Order</Button>
    </Form>
  );

  return (
    <React.Fragment>
      {localItems && checkoutForm} {!localItems && noItemsInCart}
    </React.Fragment>
  );
};

export default CheckoutFunctionalBootstrap;
