import readCSV from "../src/CSVReader";

test("Read CSV", async () => {
  const data = await readCSV("./db/aargeee.csv");
  expect(data.length).toBeGreaterThanOrEqual(3);
  const want = [
    { id: "1", name: "akku", age: "20" },
    { id: "2", name: "aargeee", age: "21" },
    { id: "3", name: "everyone", age: "28" },
  ];
  expect(data).toStrictEqual(want);
});
