import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class Description extends String {
  private constructor(description: string) {
    super(description);
  }
  public static schema = z.string().transform((data) => new Description(data));

  public static from(
    data: unknown | Description
  ): WithError<Description, ZodError> {
    if (data instanceof Description) {
      return [data, undefined];
    }
    const res = Description.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }
}
