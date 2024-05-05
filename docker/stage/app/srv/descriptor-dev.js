let Seneca = require('seneca')
Seneca({tag: 'descriptor', timeout: 5000})
  //.test('print')
  .use('../descriptor.js')
  .listen(9015)
  .client({pin:'role:store', port:9045})