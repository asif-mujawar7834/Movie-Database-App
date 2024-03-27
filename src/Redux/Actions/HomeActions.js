import { homeActions } from "../ActionTypes";

export const fetchAPIConfiguration = (payload) => {
  return {
    type: homeActions.GET_API_CONFIGURATION,
    payload,
  };
};

export const getAllGenres = (payload) => {
  return {
    type: homeActions.GET_ALL_GENERES,
    payload,
  };
};
