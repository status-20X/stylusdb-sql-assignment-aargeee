const parseQuery = (query) => {
    const SELECTQueryRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;;
    const match = query.match(SELECTQueryRegex);

    if (match) {
        const [, columns, table, whereClause] = match;
        return {
            fields: columns.split(",").map(col => col.trim().toLowerCase()),
            table: table.trim().toLowerCase(),
            whereClause: whereClause ? whereClause.trim().toLowerCase() : null
        }
    } else {
        throw new Error("Invalid Query Format")
    }

}

module.exports = parseQuery;