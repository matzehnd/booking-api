import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class Id extends String {
  private constructor(description: string) {
    super(description);
  }
  public static schema = z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      "incorrect Id pattern"
    )
    .transform((data) => new Id(data));

  public static from(data: unknown | Id): WithError<Id, ZodError> {
    if (data instanceof Id) {
      return [data, undefined];
    }
    const res = Id.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }
}
