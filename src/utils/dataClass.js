import _ from 'lodash'
export default {
  select_key_data (data, type) {
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

  for_id(){
    let _id = (new Date().getTime() - 1490242100000).toString(36)
    return _id;
  },

  for_title(data){

    _.forEach(data,function (li) {
      if(li.value){
        li.name = li.title+'：'+'('+li.machine_name+'：'+li.value+')'
      }else{
        li.name = li.title+'：'+'('+li.machine_name+')'
      }
    });
    return data;
  },

  for_search_title(item){
    // _.forEach(data,function (li) {
    if(item.type=='find'){
       item.name = item.title+" (" + item.key + ')';
      return item;
    }
    if(item.type=='group' || item.type=='get_key'){
      if(item.field1 && item.field1_name){
        item.new_field1_name = item.field1_name + "[*]"+"["+item.field1+"]";
      }
      if(item.field2 && item.field2_name){
        item.new_field2_name = item.field2_name + "[*]"+"["+item.field2+"]";
      }

    }
    return item

    // })
  },

  showTip(){
    $('.tip').show();
    setTimeout(function () {
      $('.tip').hide(300)
    },1000)
  }
}
