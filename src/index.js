import reader from "./CSVReader";

export const ERR_COLUMN_DNE = new Error("Column does not exist");

const executeSELECTQuery = async ({ fields, table, condition }) => {
  const data = await reader(`./db/${table}.csv`);

  if (fields.length === 1 && fields[0] === "*") {
    // Return all data if fields contain only "*"
    fields = Object.keys(data[0]);
  }

  let filteredData = condition
    ? data.filter((row) => {
        let [field, value] = condition.split("=").map((s) => s.trim());
        field = field.toLowerCase();
        if (!(field in row)) throw ERR_COLUMN_DNE;
        return row[field] === value;
      })
    : data;

  if (data.length > 0) {
    fields.forEach((field) => {
      if (!(field in data[0])) throw ERR_COLUMN_DNE;
    });
  }

  const responseData = filteredData.map((row) => {
    const filteredRow = {};
    fields.forEach((field) => {
      filteredRow[field] = row[field];
    });
    return filteredRow;
  });
  return responseData;
};

export default executeSELECTQuery;
