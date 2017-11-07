// We have multiple happypack plugins, its' better to use one shared thread pool
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = happyThreadPool;
