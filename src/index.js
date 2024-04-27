import reader from "./CSVReader";

export const ERR_COLUMN_DNE = new Error("Column does not exist");

const executeSELECTQuery = async ({ fields, table }) => {
  const data = await reader(`./db/${table}.csv`);

  if (data.length > 0) {
    fields.forEach((field) => {
      if (!(field in data[0])) throw ERR_COLUMN_DNE;
    });
  }

  const filteredData = data.map((row) => {
    const filteredRow = {};
    fields.forEach((field) => {
      filteredRow[field] = row[field];
    });
    return filteredRow;
  });
  return filteredData;
};

export default executeSELECTQuery;
