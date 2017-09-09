// @flow
import {  } from '../actions/settingsActions';

export type settingsStateType = {

};

type actionType = {
  type: string,
  value?: any
};

export default function app(state: settingsStateType = {}, action: actionType) {
  switch (action.type) {
    default:
      return state;
  }
}
