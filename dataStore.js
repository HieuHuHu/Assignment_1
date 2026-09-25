const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

async function readData() {
    const fileContent = await fs.promises.readFile(dataPath, 'utf8');
    return JSON.parse(fileContent);
}

async function writeData(data) {
    await fs.promises.writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`);
}

function getId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

module.exports = { readData, writeData, getId };