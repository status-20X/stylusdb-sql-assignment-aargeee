export const ERR_INVALID_FORMAT = new Error("Invalid query format");

export default parseQuery = (query) => {
  const queryRegex = /SELECT (.+) FROM (.+)/i;
  const match = query.match(queryRegex);

  if (match) {
    const [, fields, table] = match;
    return {
      fields: fields.split(",").map((field) => field.trim()),
      table: table.trim(),
    };
  } else {
    throw ERR_INVALID_FORMAT;
  }
};
