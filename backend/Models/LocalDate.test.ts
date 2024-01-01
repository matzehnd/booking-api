import { expect, test } from "bun:test";
import { LocalDate } from "./LocalDate";

test("parse", () => {
  const res = LocalDate.schema.parse("2022-03-02");
  console.log("res :>> ", res);

  expect(res instanceof LocalDate).toBe(true);
});
