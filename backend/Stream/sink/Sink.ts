import { ZodError } from "zod";
import { Event } from "../../Events/Event";
import { WithError } from "../../helper/WithError";

export interface Sink {
  applyEvent: (
    event: Event
  ) => Promise<WithError<{ index: number }, ZodError | Error>>;
}
