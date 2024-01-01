import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";

export class Address {
  public readonly country: string;
  public readonly locality: string;
  public readonly postalCode: string;
  public readonly street: string;
  public constructor({
    country,
    locality,
    postalCode,
    street,
  }: {
    country: string;
    locality: string;
    postalCode: string;
    street: string;
  }) {
    this.country = country;
    this.locality = locality;
    this.postalCode = postalCode;
    this.street = street;
  }

  public static schema = z
    .object({
      country: z.string(),
      locality: z.string(),
      postalCode: z.string(),
      street: z.string(),
    })
    .transform((data) => {
      return new Address(data);
    });

  public static from(data: unknown | Address): WithError<Address, ZodError> {
    if (data instanceof Address) {
      return [data, undefined];
    }
    const res = Address.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }

  public toJSON() {
    return {
      country: this.country,
      locality: this.locality,
      postalCode: this.postalCode,
      street: this.street,
    };
  }
}
