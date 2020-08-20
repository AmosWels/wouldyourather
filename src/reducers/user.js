// authUser.js
import { SET_USER, REMOVE_AUTHED_USER } from '../actions/actionCreators';

export default function authUser(state = null, action) {
  if (action.type === SET_USER) {
    return action.id;
  }
  if (action.type === REMOVE_AUTHED_USER) {
    return action.id;
  }
  return state;
}