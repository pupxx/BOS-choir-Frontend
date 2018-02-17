import React from "react";
import { Card, Icon } from "semantic-ui-react";

const CardExtraContent = props => (
  <Card>
    <Card.Content textAlign={"center"} header={props.header} />
    <Card.Content description={props.description} />
    <Card.Content extra>
      <Icon name="user" />
      Something to go here
    </Card.Content>
  </Card>
);

export default CardExtraContent;
