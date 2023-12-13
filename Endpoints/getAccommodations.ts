import { State } from "../Models/State";

export const getAccommodations = (state: State) => {
  return state.accommodations.all;
};
