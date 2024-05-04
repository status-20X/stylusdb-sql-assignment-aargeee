const readCSV = require("./csvReader")
const parseQuery = require("./queryParser")

const executeSELECTQuery = async (query) => {

    const {fields, table, whereClauses} = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    const filteredData = whereClauses.length > 0 
    ? data.filter(row => whereClauses.every(clause => evaluateContiion(row, clause))) 
    : data;

    return filteredData.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            if (!(field in row)) throw new Error("Field DNE");
            filteredRow[field] = row[field];
        })
        return filteredRow;
    });
}

const evaluateContiion = (row, clause) => {
    const {field, operator, value} = clause;
    if (!(field in row)) throw new Error("Field DNE");
    switch (operator) {
        case '=': return row[field] === value;
        case '!=': return row[field] !== value;
        case '>': return row[field] > value;
        case '<': return row[field] < value;
        case '>=': return row[field] >= value;
        case '<=': return row[field] <= value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

module.exports = executeSELECTQuery;