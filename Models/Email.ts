import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class Email extends String {
  private constructor(description: string) {
    super(description);
  }
  public static schema = z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "incorrect email pattern")
    .transform((data) => new Email(data));

  public static from(data: unknown | Email): WithError<Email, ZodError> {
    if (data instanceof Email) {
      return [data, undefined];
    }
    const res = Email.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }
}
