import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class LocalDate {
  public constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly day: number
  ) {}

  public static schema = z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/);

  public static from(data: unknown): WithError<LocalDate, ZodError> {
    const res = LocalDate.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    const [year, month, day] = res.data.split("-");
    return [
      new LocalDate(parseInt(year), parseInt(month), parseInt(day)),
      undefined,
    ];
  }

  public get value() {
    return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day
      .toString()
      .padStart(2, "0")}`;
  }
}
