module.exports = {


  friendlyName: 'Get customer list',


  description: '',


  inputs: {

    name: {
      type: 'string'
    },

    page: {
      description: 'Page Number of the Pagenation',
      type: 'number'
    },

    limit: {
      description: 'Limit Records Per Page',
      type: 'number'
    },

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    var numRecords = 0;
    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit); //Get page limit from helper
    var formatedPage = await sails.helpers.parsePage(inputs.page);  //Get presnt page from helper
    var filter = {};

    if(inputs.name){
      
      filter.name = {
        'contains': inputs.name
      };

    }

    // FIND CUSTOMERS MEMBERS
    var data = await Customer.find({
      where: filter,
    }).meta({makeLikeModifierCaseInsensitive: true}).paginate(formatedPage, formatedLimit).sort('createdAt DESC');

    // RECORDS
    numRecords = await Customer.count(); //Get number records
    var pageCount = Math.ceil(numRecords / formatedLimit); //for get page count numRecords / formatedLimit


    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
    });

  }


};
