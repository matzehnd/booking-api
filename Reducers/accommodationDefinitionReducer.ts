import { AccommodationDefinition } from "../Events/AccommodationDefinition";
import { Accommodation } from "../Models/Accommodation";
import { Accommodations } from "../Models/Accomodations";
import { State } from "../Models/State";

export const accommodationDefinitionReducer = (
  state: State,
  accommodationDefinition: AccommodationDefinition
) => {
  const existingIndex = state.accommodations.all.findIndex(
    (a) => a.name === accommodationDefinition.name
  );
  const accommodation = new Accommodation(
    accommodationDefinition.name,
    accommodationDefinition.description,
    []
  );
  const accommodations =
    existingIndex >= 0
      ? [...state.accommodations.all.splice(existingIndex, 1, accommodation)]
      : [...state.accommodations.all, accommodation];
  return new State(new Accommodations(accommodations));
};
