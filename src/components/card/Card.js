import React from "react";
import { Card } from "semantic-ui-react";

const CardExtraContent = props => (
  <Card>
    <Card.Content textAlign={"center"} header={props.header} />
    <Card.Content description={props.description} />
    <Card.Content extra>
      {/* <Icon name="user" /> */}
      <div>
        <div>{props.date}</div>
        <div>{props.time}</div>
      </div>
    </Card.Content>
  </Card>
);

export default CardExtraContent;
