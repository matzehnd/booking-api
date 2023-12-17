import { ZodError, z } from "zod";
import { Description } from "../Models/Description";
import { Event } from "./Event";
import { WithError } from "../helper/WithError";

export class AccommodationDefinition implements Event {
  public readonly event = "AccommodationDefinition";
  public readonly index: number | undefined;
  public readonly name: string;
  public readonly description: Description;
  constructor(data: z.infer<typeof AccommodationDefinition.schema>) {
    this.index = data.index;
    this.name = data.name;
    this.description = Description.from(data.description);
  }

  public static schema = z.object({
    index: z.number().optional(),
    name: z.string(),
    description: Description.schema,
  });

  public static from(
    data: unknown
  ): WithError<AccommodationDefinition, ZodError> {
    const res = this.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [new AccommodationDefinition(res.data), undefined];
  }
}
