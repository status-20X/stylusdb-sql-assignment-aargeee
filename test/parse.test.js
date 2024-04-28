import parseQuery, { ERR_INVALID_FORMAT, OPERATOR } from "../src/QueryParser";

describe("parses query", () => {
  const testcases = [
    {
      name: "single column",
      query: "SELECT name FROM aargeee",
      result: {
        fields: ["name"],
        table: "aargeee",
        condition: [],
      },
    },
    {
      name: "multiple columns",
      query: "SELECT name, id FROM aargeee",
      result: {
        fields: ["name", "id"],
        table: "aargeee",
        condition: [],
      },
    },
    {
      name: "all columns",
      query: "SELECT * FROM aargeee",
      result: {
        fields: ["*"],
        table: "aargeee",
        condition: [],
      },
    },
    {
      name: "lowercase",
      query: "select name from aargeee",
      result: {
        fields: ["name"],
        table: "aargeee",
        condition: [],
      },
    },
    {
      name: "where clause",
      query: "SELECT name, age FROM aargeee WHERE age = 21",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: ["age = 21"],
      },
    },
    {
      name: "where clause multiple condition",
      query: "SELECT name, age FROM aargeee WHERE age = 21, id = 1",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: ["age = 21", "id = 1"],
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
