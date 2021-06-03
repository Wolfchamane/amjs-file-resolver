const fs    = require('fs');
const path  = require('path');

fs.readdirSync(path.resolve(__dirname, 'unit'))
    .forEach(file => require(path.join(__dirname, 'unit', file)));