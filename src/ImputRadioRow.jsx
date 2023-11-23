import { Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';

type props = {
  name : string,
  title : string,
  values : {[key: string]: string},
  selected : string,
  description : string,
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function ImputRadioRow(props: props) {
  return (
    <Row>
      <Col xs="12" md="3">{props.title}</Col>
      <Col xs="12" md="4">
        {Object.keys(props.values).map((k, v) => (
            <>
              <input
                type="radio"
                name={props.name}
                id = {props.name + "_" + v}
                value={v}
                checked={v == props.selected}
                onChange={props.onChange}
              />
              <label htmlFor={props.name + "_" + v}>{k}</label>
            </>
        ))}
      </Col>
      <Col xs="12" md="5"><p>{props.description}</p></Col>
    </Row>
  );
}

export default ImputRadioRow;
