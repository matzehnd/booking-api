import { z } from "zod";
import { LocalDate } from "./LocalDate";

export class LocalDateRange {
  public constructor(
    public readonly from: LocalDate,
    public readonly to: LocalDate
  ) {}

  public static schema = z.object({
    from: LocalDate.schema,
    to: LocalDate.schema,
  });
}
