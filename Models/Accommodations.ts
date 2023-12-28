import { Accommodation } from "./Accommodation";

export class Accommodations {
  constructor(private readonly accommodations: ReadonlyArray<Accommodation>) {}

  public get all() {
    return [...this.accommodations];
  }
}
