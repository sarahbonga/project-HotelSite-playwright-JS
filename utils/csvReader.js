const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Function to read CSV file and return the records as an array
function readCSV(fileName) {
  const records = parse(fs.readFileSync(path.join(__dirname, `../data/${fileName}`), 'utf8'), {
    columns: true,
    skip_empty_lines: true
  });
  return records;
};

module.exports = { E2E_TestData: readCSV('E2E_BookingReservation_TestData.csv') };