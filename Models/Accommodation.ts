import { z } from "zod";
import { Description } from "./Description";

export class Accommodation {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: Description
  ) {}
}
