//var BASES = process.env.BASES.split(',')
let CONSUL = process.env.CONSUL_SERVICE_HOST || 'localhost'
let Seneca = require('seneca')

Seneca({tag: 'descriptor'})
  //.test('print')

  .use('consul-registry', {
    host: CONSUL
  })

  .use('../descriptor.js')

  .use('mesh', {
    listen: [
      {pin: 'role:descriptor'}
    ],
    //bases: BASES,
    host: '@eth0',
    //sneeze: {silent:false},
    discover: {
      registry: {
        active: true
      }
    }
  })
