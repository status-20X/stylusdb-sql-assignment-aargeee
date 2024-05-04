const readCSV = require("./csvReader")
const parseQuery = require("./queryParser")

const executeSELECTQuery = async (query) => {

    const {fields, table, whereClauses} = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    const filteredData = whereClauses.length > 0 ? 
        data.filter(row => whereClauses.every(clause => {
            return row[clause.field] === clause.value;
        })) : data;

    return filteredData.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            if (!(field in row)) throw new Error("Field DNE");
            filteredRow[field] = row[field];
        })
        return filteredRow;
    });
}

module.exports = executeSELECTQuery;