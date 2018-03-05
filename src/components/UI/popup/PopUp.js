import React from "react";
import { Popup } from "semantic-ui-react";

const PopUp = props => (
  <Popup trigger={props.trigger} wide position={props.position} hoverable>
    <Popup.Header>{props.name}</Popup.Header>
    <Popup.Content>{props.content}</Popup.Content>
  </Popup>
);

export default PopUp;
