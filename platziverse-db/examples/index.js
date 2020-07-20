const db= require('../')
const config = require('../config')

async function run (){
  const configLocal = {
    ...config,
  }

  const {Agent, Metric} = await db(configLocal).catch(handleFatalError)

  const agent = await Agent.createOrUpdate({
    uuid: 'yyy',
    name: 'test',
    username: 'test',
    hostname: 'test',
    pid: 1,
    connected: true,
  }).catch(handleFatalError);

  console.log('--agent--')
  console.log(agent)

  const agents = await Agent.findAll().catch(handleFatalError);
  console.log('--agents--')
  console.log(agents)

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '300',
  }).catch(handleFatalError)
  console.log('--metric--')
  console.log(metric)

  const metrics = await Metric.findByAgentUuid(agent.uuid);
  console.log('--metrics--')
  console.log(metrics)

  const metricsByType = await Metric.findByTypeAgentUuid('memory', agent.uuid).catch(handleFatalError);
  console.log('--metrics--')
  console.log(metricsByType)
  }

function handleFatalError(err){
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

run()