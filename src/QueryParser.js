export const ERR_INVALID_FORMAT = new Error("Invalid query format");

export const OPERATOR = {
  EQUALS: "=",
};

export default parseQuery = (query) => {
  const queryRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
  const match = query.match(queryRegex);

  if (match) {
    const [, fields, table, condition] = match;
    return {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
      condition: condition
        ? condition.split(",").map((cond) => cond.trim())
        : [],
    };
  } else {
    throw ERR_INVALID_FORMAT;
  }
};
