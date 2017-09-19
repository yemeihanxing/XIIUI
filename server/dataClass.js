
let key_data = {};
let obj = {
  set_key_data(item,setting) {
    key_data[setting] = item;
  },
  get_key_data(){
    return key_data;
  },
  clear_key_data(){
    key_data = {}
  }
};
//exports.obj = obj;
module.exports = obj;

