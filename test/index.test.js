import executeSELECTQuery, { ERR_COLUMN_DNE } from "../src/index";

test("Execute Select Query", async () => {
  const query = {
    fields: ["name", "age"],
    table: "aargeee",
  };
  const result = await executeSELECTQuery(query);
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).toHaveProperty("age");
  expect(result[0]).not.toHaveProperty("id");
  const want = [
    { name: "akku", age: "20" },
    { name: "aargeee", age: "21" },
    { name: "everyone", age: "28" },
  ];
  expect(result).toEqual(want);
});

test("Execute Select Query column dne", async () => {
  const query = {
    fields: ["name", "age", "wrong_col"],
    table: "aargeee",
  };
  await expect(executeSELECTQuery(query)).rejects.toThrow(ERR_COLUMN_DNE);
});
