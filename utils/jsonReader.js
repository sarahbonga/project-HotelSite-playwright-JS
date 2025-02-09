const fs = require('fs');
const path = require('path');

function readJSON(fileName) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${fileName}`), 'utf8'));
};

module.exports = {
    ValidUserAccount: readJSON('ValidUserAccount.json'),
    InvalidUserAccount: readJSON('InvalidUserAccount.json')
};
