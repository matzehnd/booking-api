import { ZodError, z } from "zod";
import { WithError } from "../helper/WithError";
import { Address } from "./Address";
import { Email } from "./Email";

export class Customer {
  public readonly lastname: string;
  public readonly firstname: string;
  public readonly address: Address;
  public readonly email: Email;
  public constructor({
    address,
    email,
    firstname,
    lastname,
  }: {
    lastname: string;
    firstname: string;
    address: Address;
    email: Email;
  }) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.address = address;
    this.email = email;
  }

  public static schema = z
    .object({
      lastname: z.string(),
      firstname: z.string(),
      address: Address.schema,
      email: Email.schema,
    })
    .transform((data) => {
      return new Customer(data);
    });

  public static from(data: unknown | Customer): WithError<Customer, ZodError> {
    if (data instanceof Customer) {
      return [data, undefined];
    }
    const res = Customer.schema.safeParse(data);
    if (!res.success) {
      return [undefined, res.error];
    }
    return [res.data, undefined];
  }
}
