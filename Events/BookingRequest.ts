import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";
import { Event } from "./Event";
import { LocalDateRange } from "../Models/LocalDateRange";

export class BookingRequest implements Event {
  public readonly event = BookingRequest.name;
  public readonly index: number | undefined;
  public readonly accommodation: string;
  public readonly period: LocalDateRange;
  constructor(data: {
    index: number | undefined;
    accommodation: string;
    period: LocalDateRange;
  }) {
    this.index = data.index;
    this.accommodation = data.accommodation;
    this.period = data.period;
  }

  public static schema = z
    .object({
      index: z.number().optional(),
      accommodation: z.string(),
      period: LocalDateRange.schema,
    })
    .transform(
      (data) =>
        new BookingRequest({
          accommodation: data.accommodation,
          index: data.index,
          period: data.period,
        })
    );

  public static from(
    data: unknown | BookingRequest
  ): WithError<BookingRequest, ZodError> {
    if (data instanceof BookingRequest) {
      return [data, undefined];
    }
    const res = this.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }

    return [res.data, undefined];
  }
}
