import type { appStateType } from '../reducers/appReducer';

export default {
  app: {
    selectedSubApp: 'Home'
  },
  ping: {
    completed: 0,
    ping: -1
  }
};

export type stateType = {
  app: appStateType
};
