const chalk     = require('chalk');
const assert    = require('assert').strict;
const resolver  = require('../../index');
const path      = require('path');

const _resolver = (config = {}) =>
    resolver({ ...config, silent : true });

const describe = (title, cb) =>
{
    console.log(title);
    cb();
};

const test = (title, cb) =>
{
    try
    {
        cb();
        console.log(`\t${chalk.green('\u2611')} ${title}`);
    }
    catch
    {
        console.error(`\t${chalk.red('\u2612')} ${title}`);
    }
}

describe('resolver', () =>
{
    test('By default returns "null"', () =>
        assert.equal(_resolver(), null));

    test('Returns existing file path', () =>
        assert.equal(
            _resolver({ file : path.join('tests', '_runner') }),
            path.resolve(__dirname, '..', '_runner.js')));

    test('Returns "null" for non existing file path into context', () =>
        assert.equal(_resolver({
            file    : path.join('source', 'foo'),
            ext     : undefined,
            module  : 'chalk'
        }), null));

    test('Returns file path for existing file from context', () =>
        assert.equal(
            _resolver({
                file    : path.join('source', 'index'),
                ext     : undefined,
                module  : 'chalk'
            }),
            path.resolve('node_modules', 'chalk', 'source', 'index.js')
        ));

    test('Returns file path for existing file with extension different from ".js"', () =>
        assert.equal(
           _resolver({ file : 'package', ext : '.json' }),
           path.resolve('package.json')
        ));
});
