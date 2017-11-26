// @flow
export function updateProgressbar(progress: number, message?: string = '') {
  return {
    type: 'UPDATE_PROGRESS_BAR',
    progress,
    message
  };
}

export function saveData(data: {}) {
  return {
    type: 'NEW_SCRAPPED_DATA',
    data
  };
}

export function setCurrentPatch(currentPatch: string) {
  return {
    type: 'SET_CURRENT_PATCH',
    currentPatch
  };
}
