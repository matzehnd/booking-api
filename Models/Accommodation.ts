import { z } from "zod";
import { Description } from "./Description";
import { Occupation } from "./Occupation";

export class Accommodation {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: Description,
    public readonly occupations: ReadonlyArray<Occupation>
  ) {}
}
