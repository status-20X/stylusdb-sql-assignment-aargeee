import readCSV from "../src/CSVReader";

test("Read CSV", async () => {
  const data = await readCSV("./aargeee.csv");
  expect(data.length).toBeGreaterThanOrEqual(3);
  const want = [
    { id: "1", name: "akku", age: "20" },
    { id: "2", name: "aargeee", age: "21" },
    { id: "3", name: "everyone", age: "28" },
  ];
  expect(data).toStrictEqual(want);
});

import parseQuery, { ERR_INVALID_FORMAT } from "../src/QueryParser";

describe("parses query", () => {
  const testcases = [
    {
      name: "single column",
      query: "SELECT name FROM aargeee",
      result: {
        fields: ["name"],
        table: "aargeee",
      },
    },
    {
      name: "multiple columns",
      query: "SELECT name, id FROM aargeee",
      result: {
        fields: ["name", "id"],
        table: "aargeee",
      },
    },
    {
      name: "all columns",
      query: "SELECT * FROM aargeee",
      result: {
        fields: ["*"],
        table: "aargeee",
      },
    },
    {
      name: "lowercase",
      query: "select name from aargeee",
      result: {
        fields: ["name"],
        table: "aargeee",
      },
    },
  ];

  testcases.map((testcase) => {
    it(testcase.name, () => {
      const parsed = parseQuery(testcase.query);
      expect(parsed).toEqual(testcase.result);
    });
  });
});

it("throws error on wrong query", () => {
  const query = "SEL name, id FROM aargeee";
  expect(() => {
    throw parseQuery(query);
  }).toThrow(ERR_INVALID_FORMAT);
});
