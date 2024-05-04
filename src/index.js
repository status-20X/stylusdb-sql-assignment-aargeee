const readCSV = require("./csvReader")
const parseQuery = require("./queryParser")

const executeSELECTQuery = async (query) => {

    const {fields, table} = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    return data.map(row => {
        const filteredRow = {};
        fields.forEach(field => {
            if (!(field in row)) throw new Error("Field DNE");
            filteredRow[field] = row[field];
        })
        return filteredRow;
    });
}

module.exports = executeSELECTQuery;