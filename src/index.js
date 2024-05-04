const readCSV = require("./csvReader")
const parseQuery = require("./queryParser")

const executeSELECTQuery = async (query) => {

    const {fields, table, whereClause} = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    const filteredData = whereClause ? 
        data.filter(row => {
            const [field, value] = whereClause.split("=").map(s => s.trim())
            return row[field] == value
        }) : data;

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