export class LocalDate {
  public constructor(
    public readonly year: number,
    public readonly month: number,
    public readonly day: number
  ) {}

  public get value() {
    return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day
      .toString()
      .padStart(2, "0")}`;
  }
}
