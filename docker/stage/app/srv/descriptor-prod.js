//var BASES = process.env.BASES.split(',')
let CONSUL = process.env.CONSUL_SERVICE_HOST || 'localhost'
let Seneca = require('seneca')

Seneca({tag: 'descriptor'})
  .test('print')

  .use('consul-registry', {
    host: CONSUL
  })

  .use('entity')
  .use('jsonfile-store', {folder: __dirname+'/../data'})

  .use('../descriptor.js')

  .add('role:info,need:part', (msg,reply) => {
    reply()

    this.act('role:descriptor,cmd:get', {name:msg.name}, (err,mod) => {
      if( err ) return reply(err)
      this.act('role:info,collect:part,part:descriptor',
               {name:msg.name, data:this.util.clean(mod.data$())})
    })
  })

  .use('mesh', {
    listen: [
      {pin: 'role:descriptor'},
      {pin: 'role:info,need:part', model:'observe'}
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
