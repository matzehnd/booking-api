import { BookingRequest } from "../Events/BookingRequest";
import { Accommodation } from "../Models/Accommodation";
import { Accommodations } from "../Models/Accommodations";
import { State } from "../Models/State";

export const bookingRequestReducer = (
  state: State,
  bookingRequest: BookingRequest
) => {
  const newState = bookingRequest.bookings.reduce<State>((prev, current) => {
    const existingIndex = state.accommodations.all.findIndex(
      (a) => a.name === current.accommodation
    );

    if (existingIndex < 0) {
      return prev;
    }

    const accommodation = prev.accommodations.all[existingIndex];

    const accommodations = [
      ...prev.accommodations.all.toSpliced(
        existingIndex,
        1,
        new Accommodation(accommodation.name, accommodation.description, [
          ...accommodation.occupations,
          current.period,
        ])
      ),
    ];

    return new State(new Accommodations(accommodations));
  }, state);

  return newState;
};
