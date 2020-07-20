# platziverse-mqtt


## `agent/connected`

``` js
{
  agent: {
    uuid,  //autogenerado
    username, //definir por configuración
    name, //definir por configuración
    hostname, //definir del SO
    pid, //obtener del proceso
  }
}
```

## `agent/disconnected`
``` js
{
  agent: {
    uuid,
  }
}
```

## `agent/message`
``` js
{
  agent,
  metrics: [
    {
      type,
      value,
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
```
