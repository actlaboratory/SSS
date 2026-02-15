import { Row, Col } from 'react-bootstrap';
import React from 'react';

type props = {
  name : string,
  title : string,
  values : {[key: string]: string},
  selected : string,
  description : string,
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void,
}

function InputRadioRow(props: props) {
  return (
    <Row>
      <Col xs="12" md="3">{props.title}</Col>
      <Col xs="12" md="4">
        {Object.entries(props.values).map(([k, v]) => (
            <React.Fragment key={v}>
              <input
                type="radio"
                name={props.name}
                id={props.name + "_" + v}
                value={v}
                checked={v === props.selected}
                onChange={props.onChange}
              />
              <label htmlFor={props.name + "_" + v}>{k}</label>
            </React.Fragment>
        ))}
      </Col>
      <Col xs="12" md="5"><p>{props.description}</p></Col>
    </Row>
  );
}

export default InputRadioRow;