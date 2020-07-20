module.exports = function setupMetric(MetricModel, AgentModel){
  async function findByAgentUuid(uuid){
    //SELECT type FROM metrics m JOIN agents a ON a.uuid= m.uuid
    //GROUP BY type WHERE a.uuid= ${uuid}
    return MetricModel.findAll({
      attributes: [ 'type' ],
      group: [ 'type' ],
      include: [{
        attributes: [],
        model: AgentModel,
        where: {
          uuid,
        }
      }],
      raw: true,
    })
  }

  async function findByTypeAgentUuid(type, uuid){
    // SELECT id, type, value, createdAt FROM metrics m JOIN agents a ON
    // a.uuid= m.uuid WHERE type=${type} AND uuid=${uuid}
    // ORDER BY TYPE DESC  LIMIT 20
    return MetricModel.findAll({
      attributes:['id', 'type', 'value', 'createdAt'],
      where: {
        type
      },
      limit: 20,
      order: [[ 'createdAt', 'DESC' ]],
      include: [{
        attributes: [],
        model: AgentModel,
        where: {
          uuid
        }
      }],
      raw: true,
    })
  }

  async function create(uuid, metric){
    const agent = await AgentModel.findOne({
      where: {
        uuid
      }
    })

    if(agent){
      Object.assign(metric, {agentId: agent.id});
      const result = await MetricModel.create(metric);
      return result.JSON()
    }
  }

  return {
    create,
    findByAgentUuid,
    findByTypeAgentUuid,
  }
}