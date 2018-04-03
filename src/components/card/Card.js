import React from "react";
import { Card } from "semantic-ui-react";
import classes from "./card.css";

const CardExtraContent = props => (
  <Card>
    <Card.Content textAlign={"center"} header={props.header} />
    <Card.Content description={props.description} />
    <Card.Content description>
      {/* <Icon name="user" /> */}
      {props.extraContent}
    </Card.Content>
  </Card>
);

export default CardExtraContent;
