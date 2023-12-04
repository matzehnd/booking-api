import { z } from "zod";
import { Description } from "./Description";

export class Accommodation {
  public readonly name: string;
  public readonly description: Description;
  constructor(data: z.infer<typeof Accommodation.schema>) {
    this.name = data.name;
    this.description = Description.from(data);
  }

  public static schema = z.object({
    name: z.string(),
    description: Description.schema,
  });
  public static from(data: unknown): Accommodation {
    return new Accommodation(this.schema.parse(data));
  }
}
