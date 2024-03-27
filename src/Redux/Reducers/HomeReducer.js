import { homeActions } from "../ActionTypes";

const initialState = {
  url: {},
  genres: {},
};

export const HomeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case homeActions.GET_API_CONFIGURATION:
      return {
        ...state,
        url: payload,
      };

    case homeActions.GET_ALL_GENERES:
      return {
        ...state,
        genres: payload,
      };

    default:
      return state;
  }
};
