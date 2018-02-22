require('babel-register')();
require('ignore-styles');

const jsdom = require('jsdom').JSDOM;

const dom = new jsdom('<!doctype html><html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;

const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

global.window.matchMedia = global.window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {},
    };
};

global.window.localStorage = window.sessionStorage = {
    getItem: function (key) {
        return this[key];
    },
    setItem: function (key, value) {
        this[key] = value;
    },
};

configure({ adapter: new Adapter() });

global.navigator = {
    userAgent: 'node.js',
};
