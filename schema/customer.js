var mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
const customerSchema = Schema({ 
  customername:String,
  phoneumber:String,
  address:String,
  emailid:String,  
  customerid: {
    'type': String,
    'default': shortid.generate
  },
  adhaarid:String,
  date:String,
  dob:String
});
  module.exports = mongoose.model('Customer', customerSchema);

// const storySchema = Schema({
//     author: { type: Schema.Types.ObjectId, ref: 'Person' },
//     title: String,
//     fans: { type: Schema.Types.ObjectId, ref: 'Person' }
//     // fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
//   });
//   module.exports = mongoose.model('Story', storySchema);
