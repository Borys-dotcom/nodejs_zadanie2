const fs = require('fs');
const path = require('path');
const modules = require('./modules');

// modules.saveData(path.join(__dirname, 'data', 'inputData.txt'), path.join(__dirname, 'output'), false);
modules.saveData(path.join(__dirname, 'data', 'inputData.txt'), 'output', false);
