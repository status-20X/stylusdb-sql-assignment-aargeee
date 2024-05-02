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

test("Execute Select Query", async () => {
  const query = {
    fields: ["*"],
    table: "aargeee",
  };
  const result = await executeSELECTQuery(query);
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).toHaveProperty("age");
  expect(result[0]).toHaveProperty("id");
  const want = [
    { id: "1", name: "akku", age: "20" },
    { id: "2", name: "aargeee", age: "21" },
    { id: "3", name: "everyone", age: "28" },
  ];
  expect(result).toEqual(want);
});

test("Execute SELECT with WHERE clause", async () => {
  const query = {
    fields: ["name"],
    table: "aargeee",
    condition: [
      {
        field: "id",
        operator: "=",
        value: "1",
      },
    ],
  };

  const result = await executeSELECTQuery(query);
  expect(result.length).toBe(1);
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).not.toHaveProperty("id");
  expect(result[0]).not.toHaveProperty("age");
  expect(result).toEqual([{ name: "akku" }]);
});

test("Execute SELECT with WHERE clause uppercase column", async () => {
  const query = {
    fields: ["name"],
    table: "aargeee",
    condition: [
      {
        field: "id",
        operator: "=",
        value: "1",
      },
    ],
  };

  const result = await executeSELECTQuery(query);
  expect(result.length).toBe(1);
  expect(result[0]).toHaveProperty("name");
  expect(result[0]).not.toHaveProperty("id");
  expect(result[0]).not.toHaveProperty("age");
  expect(result).toEqual([{ name: "akku" }]);
});

test("Execute SELECT with WHERE clause non existing column", async () => {
  const query = {
    fields: ["name"],
    table: "aargeee",
    condition: [
      {
        field: "idk",
        operator: "=",
        value: "1",
      },
    ],
  };
  await expect(executeSELECTQuery(query)).rejects.toThrow(ERR_COLUMN_DNE);
});
