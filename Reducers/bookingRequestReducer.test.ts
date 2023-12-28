import { expect, test } from "bun:test";
import { State } from "../Models/State";
import { Accommodations } from "../Models/Accommodations";
import { bookingRequestReducer } from "./bookingRequestReducer";
import { BookingRequest } from "../Events/BookingRequest";
import { LocalDateRange } from "../Models/LocalDateRange";
import { LocalDate } from "../Models/LocalDate";
import { Accommodation } from "../Models/Accommodation";
import { stubCustomer } from "../Models/stubCustomer";

test("ignore booking request for unknown accommodation", () => {
  const initialState = new State(new Accommodations([]));

  const newState = bookingRequestReducer(
    initialState,
    new BookingRequest({
      index: undefined,
      bookings: [
        {
          accommodation: "test",
          period: new LocalDateRange(
            new LocalDate(2022, 2, 4),
            new LocalDate(2022, 2, 6)
          ),
        },
      ],
      customer: stubCustomer(),
      id: "0a535bd5-5f81-4f19-9177-60c30e447e66",
    })
  );

  expect(newState.accommodations.all).toEqual([]);
});

test("occupy accommodation", () => {
  const initialState = new State(
    new Accommodations([new Accommodation("testRoom", "", [])])
  );

  const newState = bookingRequestReducer(
    initialState,
    new BookingRequest({
      index: undefined,
      bookings: [
        {
          accommodation: "testRoom",
          period: new LocalDateRange(
            new LocalDate(2022, 2, 4),
            new LocalDate(2022, 2, 6)
          ),
        },
      ],
      customer: stubCustomer(),
      id: "0a535bd5-5f81-4f19-9177-60c30e447e66",
    })
  );

  expect(
    newState.accommodations.all.find((a) => a.name === "testRoom")?.occupations
  ).toEqual([
    new LocalDateRange(new LocalDate(2022, 2, 4), new LocalDate(2022, 2, 6)),
  ]);
});
