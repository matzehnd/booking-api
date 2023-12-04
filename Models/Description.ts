import { z } from "zod";

export class Description extends String {
  public static schema = z.string();
  public static from(data: unknown): Description {
    return new Description(this.schema.parse(data));
  }
}
