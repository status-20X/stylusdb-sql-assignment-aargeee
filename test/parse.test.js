import parseQuery, { ERR_INVALID_FORMAT, OPERATOR } from "../src/QueryParser";

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
    {
      name: "where clause",
      query: "SELECT name, age FROM aargeee WHERE age = 21",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: [
          {
            field: "age",
            operator: "=",
            value: "21",
          },
        ],
      },
    },
    {
      name: "multiple where clause",
      query: "SELECT name, age FROM aargeee WHERE age = 21 AND id = 1",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: [
          {
            field: "age",
            operator: "=",
            value: "21",
          },
          {
            field: "id",
            operator: "=",
            value: "1",
          },
        ],
      },
    },
    {
      name: "multiple where clause with or",
      query: "SELECT name, age FROM aargeee WHERE age = 21 or id = 1",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: [
          {
            field: "age",
            operator: "=",
            value: "21",
          },
          {
            field: "id",
            operator: "=",
            value: "1",
          },
        ],
      },
    },
    {
      name: "incorrect where clause",
      query: "SELECT name, age FROM aargeee WHERE age = 21 6",
      result: {
        fields: ["name", "age"],
        table: "aargeee",
        condition: [
          {
            field: "age",
            operator: "=",
            value: "21",
          },
        ],
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
