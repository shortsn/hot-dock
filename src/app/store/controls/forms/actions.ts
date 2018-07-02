export const FORMS_CLEAR_STATE_TYPE = '@@FORMS_CLEAR_STATE';

export const FormsActions = {
  FORMS_CLEAR_STATE: (slice: string) => ({
    type: FORMS_CLEAR_STATE_TYPE,
    payload: slice
  })
};
