import { describe, expect, it } from "bun:test";
import { putBookingRequest } from "./putBookingRequest";
import { State } from "../Models/State";
import { Accommodations } from "../Models/Accommodations";
import { Accommodation } from "../Models/Accommodation";

describe("putBookingRequest", () => {
  it("should return error, if body is invalid", async () => {
    const data = { accommodation: "blub" };

    const [_res, error] = await putBookingRequest(
      new State(new Accommodations([])),
      { applyEvent: () => Promise.resolve([{ index: 1 }, undefined]) },
      data
    );
    expect(error).toBeTruthy();
  });

  it("should return no error, if body is valid", async () => {
    const data = {
      bookings: [
        {
          accommodation: "blub",
          period: {
            from: "2022-02-03",
            to: "2022-02-04",
          },
        },
      ],
      customer: {
        firstname: "ma",
        lastname: "bu",
        email: "blub@t.ch",
        address: {
          country: "ch",
          locality: "basel",
          postalCode: "4153",
          street: "Feldweg 11",
        },
      },
    };

    const [_res, error] = await putBookingRequest(
      new State(new Accommodations([new Accommodation("blub", "", [])])),
      { applyEvent: () => Promise.resolve([{ index: 1 }, undefined]) },
      data
    );
    expect(error).toBeUndefined();
  });
});
