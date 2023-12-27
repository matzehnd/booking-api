import { ZodError, z } from "zod";
import { Sink } from "../Stream/sink/Sink";
import { WithError } from "../helper/WithError";
import { BookingRequest } from "../Events/BookingRequest";
import { LocalDateRange } from "../Models/LocalDateRange";
import { State } from "../Models/State";

const bodySchema = z.object({
  accommodation: z.string(),
  period: LocalDateRange.schema,
});

export const putBookingRequest = async (
  state: State,
  sink: Sink,
  data: unknown
): Promise<WithError<void, ZodError | Error>> => {
  const res = bodySchema.safeParse(data);
  if (!res.success) {
    return [undefined, res.error];
  }

  if (
    !state.accommodations.all
      .map((a) => a.name)
      .includes(res.data.accommodation)
  ) {
    return [undefined, new Error("accommodation not found")];
  }

  const [_, error] = await sink.applyEvent(
    new BookingRequest({
      accommodation: res.data.accommodation,
      period: res.data.period,
      index: undefined,
    })
  );
  return [undefined, error];
};