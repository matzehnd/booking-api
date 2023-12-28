import { BookingRequest } from "../Events/BookingRequest";
import { Accommodation } from "../Models/Accommodation";
import { Accommodations } from "../Models/Accommodations";
import { State } from "../Models/State";

export const bookingRequestReducer = (
  state: State,
  bookingRequest: BookingRequest
) => {
  const existingIndex = state.accommodations.all.findIndex(
    (a) => a.name === bookingRequest.accommodation
  );

  if (existingIndex < 0) {
    return state;
  }

  const accommodation = state.accommodations.all[existingIndex];

  const accommodations = [
    ...state.accommodations.all.toSpliced(
      existingIndex,
      1,
      new Accommodation(accommodation.name, accommodation.description, [
        ...accommodation.occupations,
        bookingRequest.period,
      ])
    ),
  ];

  return new State(new Accommodations(accommodations));
};
