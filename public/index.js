'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'convargo': 0,
    'treasury': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function getTruckers(id){
  for(var la=0;la<truckers.length;la++){
    if(truckers[la].id==id){
      return la;
    }
  }
}
function updateVolumePrice(volume){
  if(volume>25){
    return 0,5;
  }
  else if (volume>10) {
    return 0,7;
  }
  else if (volume>5) {
    return 0.9;
  }
  else{
    return 1;
  }
}
function price(nb){
  var place=getTruckers(deliveries[nb].truckerId);
  var price=truckers[place].pricePerKm*deliveries[nb].distance;
  var coefVolume=updateVolumePrice(deliveries[nb].volume);
  if(deliveries[nb].options.deductibleReduction)
  {
    price+=(truckers[place].pricePerVolume+1)*deliveries[nb].volume*coefVolume;
    deliveries[nb].commission.convargo+=deliveries[nb].volume*coefVolume;
  }
  else{
    price+=truckers[place].pricePerVolume*deliveries[nb].volume;
  }
  deliveries[nb].price+=price;
}

function commission(nb){
  var totalcom=deliveries[nb].price*0.3;
  deliveries[nb].commission.insurance+=totalcom*0.5;
  deliveries[nb].commission.treasury+=Math.trunc(deliveries[nb].distance/500);
  var totalcom=deliveries[nb].price*0.3;
  deliveries[nb].commission.convargo+=totalcom*0.5-Math.trunc(deliveries[nb].distance/500);
}

function paying(){
  for(var tourne=0;tourne<deliveries.length;tourne++){
    price(tourne);
    commission(tourne)
    actors[tourne].payment[0].amount+=deliveries[tourne].price;
    actors[tourne].payment[1].amount+=deliveries[tourne].price-deliveries[tourne].commission.insurance;
    actors[tourne].payment[1].amount+=-deliveries[tourne].commission.treasury;
    actors[tourne].payment[1].amount+=-deliveries[tourne].commission.convargo
    actors[tourne].payment[2].amount+=deliveries[tourne].commission.treasury;
    actors[tourne].payment[3].amount+=deliveries[tourne].commission.insurance;
    actors[tourne].payment[4].amount+=deliveries[tourne].commission.convargo;
  }

}
paying();

//Done


console.log(truckers);
console.log(deliveries);
console.log(actors);
