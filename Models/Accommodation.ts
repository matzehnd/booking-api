import { Description } from "./Description";
import { LocalDateRange } from "./LocalDateRange";

export class Accommodation {
  constructor(
    public readonly name: string,
    public readonly description: Description,
    public readonly occupations: ReadonlyArray<LocalDateRange>
  ) {}
}
