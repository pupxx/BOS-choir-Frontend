import { FETCH_ADMIN_MEMBER_LIST } from "../../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ADMIN_MEMBER_LIST:
      let array = [];
      action.payload.forEach(el => {
        let obj = {};
        obj.name = `${el.firstname} ${el.lastname}`;
        obj.memberID = el.memberID;
        obj.address = `${el.address1} ${el.address2} ${el.city}, ${el.prov} ${
          el.postal
        }`;
        obj.phone = el.phone;
        obj.email = el.email;
        obj.church = el.churchname;
        obj.part = el.part;
        array.push(obj);
      });

      return _.mapKeys(array, "memberID");
    default:
      return state;
  }
}
