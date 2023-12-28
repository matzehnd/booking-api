import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";
import { Event } from "./Event";
import { LocalDateRange } from "../Models/LocalDateRange";
import { Customer } from "../Models/Customer";
import { Id } from "../Models/Id";

export class BookingRequest implements Event {
  public readonly event = BookingRequest.name;
  public readonly index: number | undefined;
  public readonly accommodation: string;
  public readonly period: LocalDateRange;
  public readonly customer: Customer;
  public readonly id: Id;

  constructor({
    accommodation,
    customer,
    index,
    period,
    id,
  }: {
    index: number | undefined;
    accommodation: string;
    period: LocalDateRange;
    customer: Customer;
    id: Id;
  }) {
    this.index = index;
    this.accommodation = accommodation;
    this.period = period;
    this.customer = customer;
    this.id = id;
  }

  public static schema = z
    .object({
      index: z.number().optional(),
      accommodation: z.string(),
      period: LocalDateRange.schema,
      customer: Customer.schema,
      id: Id.schema,
    })
    .transform((data) => new BookingRequest({ ...data, index: data.index }));

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
