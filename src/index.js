import reader from "./CSVReader";

export default executeSELECTQuery = async ({ fields, table }) => {
  const data = await reader(`./db/${table}.csv`);

  const filteredData = data.map((row) => {
    const filteredRow = {};
    fields.forEach((field) => {
      filteredRow[field] = row[field];
    });
    return filteredRow;
  });
  return filteredData;
};
