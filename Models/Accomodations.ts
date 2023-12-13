import { Accommodation } from "./Accommodation";

export class Accommodations {
  constructor(private readonly accommodations: Array<Accommodation>) {}

  public get all() {
    return [...this.accommodations];
  }
}
