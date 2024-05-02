import reader from "./CSVReader";

export const ERR_COLUMN_DNE = new Error("Column does not exist");

const executeSELECTQuery = async ({ fields, table, condition = {} }) => {
  const data = await reader(`./db/${table}.csv`);

  if (fields.length === 1 && fields[0] === "*") {
    // Return all data if fields contain only "*"
    fields = Object.keys(data[0]);
  }

  let filteredData = data;
  if (condition && condition.length > 0) {
    filteredData = data.filter((row) => {
      let accept = true; // Initialize accept as true for no conditions
      condition.forEach((whereCondition) => {
        const [field, value] = whereCondition.split("=").map((s) => s.trim());
        if (!(field in row)) throw ERR_COLUMN_DNE;
        if (row[field] !== value) accept = false; // If any condition is not met, set accept to false
      });
      return accept;
    });
  }

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
