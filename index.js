const path  = require('path');
const fs    = require('fs');
const chalk = require('chalk');

module.exports = (context = { file : '', ext : '.js', module : '', silent : false }) =>
{
    const { file = '', ext = '.js', module = '', silent = false } = context;

    let _file = path.join(...file.split(path.sep));
    if (!_file.endsWith(`${ext}`))
    {
        _file += `${ext}`;
    }

    let _filename = path.resolve(_file);
    let exists = fs.existsSync(_filename);
    if (!exists)
    {
        _filename = path.resolve('node_modules', ...module.split(path.sep), _file);
        exists = fs.existsSync(_filename);
    }

    if (!exists && !silent)
    {
        console.error(`[${chalk.bold.red('ERROR')}] Could not resolve: "${_filename}"`);
    }

    return exists
        ? _filename
        : null;
};
