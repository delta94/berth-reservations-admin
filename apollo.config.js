// eslint-disable-next-line
require('dotenv').config({ path: '.env.development.local' });

module.exports = {
  client: {
    service: {
      name: 'Venepaikka Admin Interface',
      url: process.env.REACT_APP_API_URI,
    },
  },
};
