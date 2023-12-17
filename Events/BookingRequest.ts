import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";
import { Event } from "./Event";
import { LocalDateRange } from "../Models/LocalDateRange";
import { LocalDate } from "../Models/LocalDate";

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

  public static schema = z.object({
    index: z.number().optional(),
    accommodation: z.string(),
    period: LocalDateRange.schema,
  });

  public static from(data: unknown): WithError<BookingRequest, ZodError> {
    const res = this.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    const [from, fromError] = LocalDate.from(res.data.period.from);
    const [to, toError] = LocalDate.from(res.data.period.to);

    if (fromError || toError) {
      return [undefined, fromError || toError || new ZodError([])];
    }

    return [
      new BookingRequest({
        accommodation: res.data.accommodation,
        index: res.data.index,
        period: new LocalDateRange(from, to),
      }),
      undefined,
    ];
  }
}
