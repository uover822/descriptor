let Seneca = require('seneca')
Seneca({tag: 'descriptor', timeout: 5000})
  //.test()
  //.test('print')
  //.use('monitor')
  .use('entity')
  .use('jsonfile-store', {folder: __dirname+'/../../data'})
  .use('../descriptor.js')
  .listen(9015)
  .client({pin:'role:reason', port:9055})
  .use('mesh')