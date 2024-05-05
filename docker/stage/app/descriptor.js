const Promise = require('bluebird')
const client = require('prom-client')
const ip = require('ip')

const registry = new client.Registry()

module.exports = function descriptor() {

  let Seneca = this
  let senact = Promise.promisify(Seneca.act, {context: Seneca})

  client.collectDefaultMetrics({registry})

  let gauges = {}

  function pack (begin_ts, end_ts) {
    // pack begin_ts with 1/ e_tm
    let pe_tm = 1 / (end_ts - begin_ts)
    return begin_ts + pe_tm
  }

  Seneca.add({role:'descriptor', cmd:'metrics.collect'}, async (msg, reply) => {
    try {
      let Seneca = this
      // Enable the collection of default metrics

      let r = (await registry.metrics())

      return reply(null,{result:r})
    } catch(e) {
      console.log(e)
    }
  })

  Seneca.add({role:'descriptor', cmd:'getRoot'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.get.root.ts'])
      gauges['descriptor.get.root.ts'] = new client.Gauge({
        name: 'perf_descriptor_get_root_ts',
        help: 'ts when getting the root descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let r = (await senact('role:store,cmd:getRootDescriptor',
                            {did:msg.did,cid:msg.cid,auth:msg.auth}).then ((o) => {
                              //{role: msg.role, cmd: msg.cmd}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.get.root.ts'].set({event:'descriptor.get.root', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,r)
    } catch(e) {
      console.log(e)
      gauges['descriptor.get.root.ts'].set({event:'descriptor.get.root', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'get'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.get.ts'])
      gauges['descriptor.get.ts'] = new client.Gauge({
        name: 'perf_descriptor_get_ts',
        help: 'ts when getting a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let d = (await senact('role:store,cmd:getDescriptor',
                            {id:msg.id,cid:msg.cid}).then ((o) => {
                              return o
                            }))

      let h = (await senact('role:store,cmd:getDescriptorHistory',
                            {id:msg.id,cid:msg.cid}).then ((o) => {
                              return o
                            }))
      //console.dir(JSON.stringify(h, null, 2))

      gauges['descriptor.get.ts'].set({event:'descriptor.get', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,d)
    } catch(e) {
      console.log(e)
      gauges['descriptor.get.ts'].set({event:'descriptor.get', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'addRoot'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.add.root.ts'])
      gauges['descriptor.add.root.ts'] = new client.Gauge({
        name: 'perf_descriptor_add_root_ts',
        help: 'ts when adding the root descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let r = (await senact('role:store,cmd:addRootDescriptor',
                            {cid:msg.cid,auth:msg.auth}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.add.root.ts'].set({event:'descriptor.add.root', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,r)
    } catch(e) {
      console.log(e)
      gauges['descriptor.add.root.ts'].set({event:'descriptor.add.root', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'add'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.add.ts'])
      gauges['descriptor.add.ts'] = new client.Gauge({
        name: 'perf_descriptor_add_ts',
        help: 'ts when adding a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let d = (await senact('role:store,cmd:addDescriptor',
                            {pid:msg.pid,type:msg.type,x:msg.x,y:msg.y,cid:msg.cid,auth:msg.auth}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.add.ts'].set({event:'descriptor.add', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,d)
    } catch(e) {
      console.log(e)
      gauges['descriptor.add.ts'].set({event:'descriptor.add', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'instantiate'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.instantiate.ts'])
      gauges['descriptor.instantiate.ts'] = new client.Gauge({
        name: 'perf_descriptor_instantiate_ts',
        help: 'ts when instantiating a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let d = (await senact('role:store,cmd:instantiateDescriptor',
                            {pid:msg.pid,x:msg.x,y:msg.y,cid:msg.cid,auth:msg.auth}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.instantiate.ts'].set({event:'descriptor.instantiate', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,d)
    } catch(e) {
      console.log(e)
      gauges['descriptor.instantiate.ts'].set({event:'descriptor.instantiate', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'push'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.push.ts'])
      gauges['descriptor.push.ts'] = new client.Gauge({
        name: 'perf_descriptor_push_ts',
        help: 'ts when pushing a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let d = (await senact('role:store,cmd:pushDescriptor',
                            {pid:msg.pid,x:msg.x,y:msg.y,type:msg.type,properties:msg.properties,cid:msg.cid,auth:msg.auth}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.push.ts'].set({event:'descriptor.push', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,d)
    } catch(e) {
      console.log(e)
      gauges['descriptor.push.ts'].set({event:'descriptor.push', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'upd'}, async (msg,reply) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.upd.ts'])
      gauges['descriptor.upd.ts'] = new client.Gauge({
        name: 'perf_descriptor_upd_ts',
        help: 'ts when updating a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      let d = (await senact('role:store,cmd:updDescriptor',
                            {pid:msg.pid,x:msg.x,y:msg.y,rid:msg.rid,rtype:msg.rtype,properties:msg.properties,sources:msg.sources,targets:msg.targets,type:msg.type,id:msg.id,cid:msg.cid}).then ((o) => {
                              return o
                            }))
      gauges['descriptor.upd.ts'].set({event:'descriptor.upd', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      return reply(null,d)
    } catch(e) {
      console.log(e)
      gauges['descriptor.upd.ts'].set({event:'descriptor.upd', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })

  Seneca.add({role:'descriptor', cmd:'drp'}, async (msg,done) => {

    let begin_ts = Date.now()

    if (!gauges['descriptor.drp.ts'])
      gauges['descriptor.drp.ts'] = new client.Gauge({
        name: 'perf_descriptor_drp_ts',
        help: 'ts when dropping a descriptor',
        labelNames: ['event','return_code','service','cluster','app','user','ip','cid'],
        registers: [registry]
      })

    try {
      (await senact('role:store,cmd:drpDescriptor',
                    {id:msg.id,cid:msg.cid}).then ((o) => {
                      return o
                    }))
      gauges['descriptor.drp.ts'].set({event:'descriptor.drp', return_code:'200', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:msg.cid}, pack(begin_ts, Date.now()))

      done(null,{})
    } catch(e) {
      console.log(e)
      gauges['descriptor.drp.ts'].set({event:'descriptor.drp', return_code:'500', service:'descriptor', cluster:process.env.cluster, app:process.env.app, user:process.env.user, ip:ip.address(), cid:{}}, pack(begin_ts, Date.now()))
    }
  })
}
