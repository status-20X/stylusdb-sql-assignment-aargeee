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
      condition: condition ? parseWHEREClauses(condition) : undefined,
    };
  } else {
    throw ERR_INVALID_FORMAT;
  }
};

const parseWHEREClauses = (fullString) => {
  const conditions = fullString.split(/ AND | OR /i);
  return conditions.map((condition) => {
    const match = condition.match(/(.*?)(=|!=|>|<|>=|<=)(.*)/);
    if (!match) throw ERR_INVALID_FORMAT;
    const [, field, operator, value] = match;
    return { field: field.trim(), operator, value: value.trim() };
  });
};
