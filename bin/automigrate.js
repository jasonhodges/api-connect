var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mymongo;
ds.automigrate('Customer', function(err) {
  if (err) throw err;

  var customers = [
    {
      name: 'John Doe'
    },
    {
      name: 'Jane Doe'
    },
  ];
  var count = customers.length;
  customers.forEach(function(customer) {
    app.models.Customer.create(customer, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});