import type { appStateType } from '../reducers/appReducer';

export default {
  app: {
    selectedSubApp: 'Home'
  }
};

export type stateType = {
  app: appStateType
};
