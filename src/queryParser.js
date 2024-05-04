const parseQuery = (query) => {
    const SELECTQueryRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;;
    const match = query.match(SELECTQueryRegex);

    if (match) {
        const [, columns, table, whereClause] = match;
        return {
            fields: columns.split(",").map(col => col.trim().toLowerCase()),
            table: table.trim().toLowerCase(),
            whereClauses: whereClause ? parseWhereClauses(whereClause.trim()) : []
        }
    } else {
        throw new Error("Invalid Query Format")
    }

}

const parseWhereClauses = (whereClause) => {
    const conditions = whereClause.split(/ AND | OR /i);
    return conditions.map(condition => {
        const [field, operator, value] = condition.split(/\s+/);
        return {field: field.trim().toLowerCase(), operator: operator.trim(), value: value.trim()};
    })
} 

module.exports = parseQuery;