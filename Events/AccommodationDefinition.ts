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
    this.description = data.description;
  }

  public static schema = z.object({
    index: z.number().optional(),
    name: z.string(),
    description: Description.schema,
  });

  public static from(
    data: unknown | AccommodationDefinition
  ): WithError<AccommodationDefinition, ZodError> {
    if (data instanceof AccommodationDefinition) {
      return [data, undefined];
    }
    const res = this.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [new AccommodationDefinition(res.data), undefined];
  }
}
