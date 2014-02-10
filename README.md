# node AktualniVozy API

Node.js promise based wrapper over AktualniVozy.cz API.
All methods are implemented with the same name as the original API provides

## How to install
```
npm install aktualnivozy-api
```

## Setup

```javascript
var AktualnivozyApi = require('aktualnivozy-api')

var login = 'import',
  password = 'test';

var api = new AktualnivozyApi(login, password);
```


## Example usage

```javascript
return api
  .then(function() {
    return api.getAdvertisements()
  })
  .then(function(vehicles) {

    var exportedIds = [];

    vehicles.forEach(function(v) {
      exportedIds.push( parseInt(v.custom_id) );
    });

    return selectVehiclesForDelete(exportedIds);
  })
  .then(function(ids) {
    return deleteVehicles(api, ids);
  })
  .then(function() {
    return selectVehiclesForExport();
  })
  .then(function(vehicles) {
    return exportVehicles(api, vehicles);
  });
```
