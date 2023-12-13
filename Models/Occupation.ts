import { LocalDate } from "./LocalDate";

export class Occupation {
  public constructor(
    public readonly from: LocalDate,
    public readonly to: LocalDate
  ) {}
}
