import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class LocalDate {
  public constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly day: number
  ) {}

  public static schema = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((data) => {
      const [year, month, day] = data.split("-");
      return new LocalDate(parseInt(year), parseInt(month), parseInt(day));
    });

  public static from(
    data: unknown | LocalDate
  ): WithError<LocalDate, ZodError> {
    if (data instanceof LocalDate) {
      return [data, undefined];
    }
    const res = LocalDate.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }

  public get value() {
    return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day
      .toString()
      .padStart(2, "0")}`;
  }
}
