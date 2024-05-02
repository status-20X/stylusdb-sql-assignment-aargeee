import reader from "./CSVReader";

export const ERR_COLUMN_DNE = new Error("Column does not exist");
export const ERR_OPERATOR_DNE = new Error("Operator does not exist");

const evaluate = (row, con) => {
  const { field, operator, value } = con;
  switch (operator) {
    case "=":
      return row[field] === value;
    case "!=":
      return row[field] !== value;
    case ">":
      return row[field] > value;
    case "<":
      return row[field] < value;
    case ">=":
      return row[field] >= value;
    case "<=":
      return row[field] <= value;
    default:
      throw ERR_OPERATOR_DNE;
  }
};

const executeSELECTQuery = async ({ fields, table, condition = [] }) => {
  const data = await reader(`./db/${table}.csv`);

  if (fields.length === 1 && fields[0] === "*") {
    // Return all data if fields contain only "*"
    fields = Object.keys(data[0]);
  }

  let filteredData =
    condition.length > 0
      ? data.filter((row) =>
          condition.every((con) => {
            if (!(con.field in row)) throw ERR_COLUMN_DNE;
            return evaluate(row, con);
          }),
        )
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
