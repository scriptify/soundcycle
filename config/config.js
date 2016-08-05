const path = require('path');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

function getEnvironment() {
  if(typeof window !== 'undefined') {
    return ENVIRONMENT;
  } else {
    return (process.env.npm_lifecycle_event === 'dev') ? DEVELOPMENT : PRODUCTION;
  }
}

const ENV = getEnvironment();

module.exports = {
  PUBLIC_PATH: path.join(__dirname, '../build'),
  APP_PATH: path.join(__dirname, '../app'),
  IMG_PATH: path.join(__dirname, '../app/img'),
  CONFIG_PATH: path.join(__dirname, '.')
};
