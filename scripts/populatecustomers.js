module.exports = {


  friendlyName: 'Populatecustomers',


  description: 'Populatecustomers something.',


  fn: async function () {

    var customerObj = {
      full_name : 'Praveen',
      email : 'praveen@archmage.lk',
      phone : ['0772907482','0772907483'],
      postal_address : "27/2 , Wijerama lane, gangodawila , Nugegoda",
      status : 1,
    }

    var customer = await Customer.create(customerObj).fetch();

  }


};

