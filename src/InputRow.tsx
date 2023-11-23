import { Row, Col } from 'react-bootstrap';
import React from 'react';

type props = {
  type : string,
  id : string,
  name : string,
  min ?: number,
  max ?: number,
  description : string,
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function InputRow(props: props) {
  return (
    <Row>
      <Col xs="12" md="3"><label htmlFor={props.id}>{props.name}</label></Col>
      <Col xs="12" md="4">
        <input
          type={props.type}
          name={props.id}
          id={props.id}
          min={props.min}
          max={props.max}
          onChange={props.onChange}

      /></Col>
      <Col xs="12" md="5"><p>{props.description}</p></Col>
    </Row>
  );
}

export default InputRow;