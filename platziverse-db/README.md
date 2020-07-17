# platziverse-db

##Usage
``` js
const setupDatabase = require('platziverse-db');

setup(config).then(db => {
  const { Agent, Metric } = db;
}).catch(err => console.error(err));
```