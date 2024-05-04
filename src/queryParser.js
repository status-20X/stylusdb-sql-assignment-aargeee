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
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereClause.split(/ AND | OR /i).map(conditionString => {
        const match = conditionString.match(conditionRegex);
        if (match) {
            const [, field, operator, value] = match;
            return { field: field.trim().toLowerCase(), operator, value: value.trim() };
        }
        throw new Error('Invalid WHERE clause format');
    });
} 

module.exports = parseQuery;