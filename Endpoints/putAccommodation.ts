import { ZodError, z } from "zod";
import { Sink } from "../Stream/sink/Sink";
import { Description } from "../Models/Description";
import { WithError } from "../helper/WithError";
import { AccommodationDefinition } from "../Events/AccommodationDefinition";

const bodySchema = z.object({
  name: z.string(),
  description: Description.schema,
});

export const putAccommodation = async (
  sink: Sink,
  data: unknown
): Promise<WithError<void, ZodError | Error>> => {
  const res = bodySchema.safeParse(data);
  if (!res.success) {
    return [undefined, res.error];
  }
  const [_, error] = await sink.applyEvent(
    new AccommodationDefinition({
      description: res.data.description,
      name: res.data.name,
      index: undefined,
    })
  );
  return [undefined, error];
};
