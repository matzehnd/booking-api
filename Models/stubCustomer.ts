import { Address } from "./Address";
import { Customer } from "./Customer";
import { Email } from "./Email";

export const stubCustomer = () =>
  new Customer({
    firstname: "Peter",
    lastname: "Meier",
    email: Email.schema.parse("a@t.ch"),
    address: new Address({
      country: "CH",
      locality: "A",
      postalCode: "111",
      street: "street",
    }),
  });
