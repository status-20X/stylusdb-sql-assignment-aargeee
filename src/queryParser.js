const parseQuery = (query) => {
    const SELECTQueryRegex = /SELECT (.+) FROM (.+)/i;
    const match = query.match(SELECTQueryRegex);

    if (match) {
        const [, columns, table] = match;
        return {
            fields: columns.split(",").map(col => col.trim()),
            table: table.trim()
        }
    } else {
        throw new Error("Invalid Query Format")
    }

}

module.exports = parseQuery;