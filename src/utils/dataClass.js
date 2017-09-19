import _ from 'lodash'
let keysData = [];
export default {

  select_key_data(data, type) {
    if (type === 'confirm') {
      _.forEach(data, function (li, index) {
        if (index !== data.length - 1) {
          if (li.key.indexOf(',') < 0) {
            li.key = li.key + ', '
          }
        }
      })
      return data
    } else {
      _.forEach(data, function (li, index) {
        if (index === data.length - 1) {
          li.key = li.key.replace(',', '')
        }
      })
      return data
    }
  },

  for_id() {
    let _id = (new Date().getTime() - 1490242100000).toString(36)
    return _id;
  },

  for_title(data) {

    if (data.value) {
      data.name = data.title + '：' + '(' + data.machine_name + '：' + data.value + ')'
    } else {
      data.name = data.title + '：' + '(' + data.machine_name + ')'
    }

    return data;
  },

  for_search_title(item) {
    // _.forEach(data,function (li) {
    if (item.type == 'find') {
      item.name = item.title + " (" + item.key + ')';
      return item;
    }
    if (item.type == 'group' || item.type == 'get_key' || item.type == 'get_keys') {
      if (item.field1 && item.field1_name) {
        item.new_field1_name = item.field1_name + "[*]" + "[" + item.field1 + "]";
      }
      if (item.field2 && item.field2_name) {
        item.new_field2_name = item.field2_name + "[*]" + "[" + item.field2 + "]";
      }

    }
    return item

    // })
  },

  showTip() {
    $('.tip').show();
    setTimeout(function () {
      $('.tip').hide(300)
    }, 1000)
  },

  saveKeysData(datas) {
    keysData = datas;
  },

  getKeysData() {
    return keysData;
  },

  clearKeyData(){
    keysData = [];
  },

  addKeysData(keys, setting_add_data,key) {
    let change_keys = {};
    let saveData = [];
    const Super = this;
    _.forEach(keys, function (li) {
      change_keys = {
        type: li.type,
        data_type: li.data_type,
        title: li.title,
        machine_name: li.machine_name,
        key
      };
      change_keys = Super.for_title(change_keys);
      saveData.push(change_keys);
      setting_add_data.push(change_keys);
    });
    Super.saveKeysData(saveData);
  },

  removeKeysData(setting_add_data) {
    let Super = this;
    let keysData = Super.getKeysData();
    if (keysData && keysData.length) {
      _.forEach(keysData, function (li) {
        let index = _.findIndex(setting_add_data, li);

        if (index >= 0) {
          setting_add_data.splice(index, 1)
          Super.clearKeyData();
        }
      })
    }
//   addKeysData(keys){
//     _.forEach(keys, function (li) {
//
//     let change_keys = {
//           type: li.type,
//           data_type: li.data_type,
//           title: li.title,
//           machine_name: li.machine_name
//         }
//     change_keys = for_title(change_keys);
//     return change_keys;
//   }
// }
  },

  dealCollectionData(data){
    return data;
  }

}
