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
        if(li.request){
          li.name = li.title+'('+li.machine_name+':'+li.value+")"+"(必须)"
        }else{
          li.name = li.title+'('+li.machine_name+':'+li.value+")"
        }
      }else{
        if (li.request){
          li.name = li.title+'('+li.machine_name+")"+"(必须)"
        }else{
          li.name = li.title+'('+li.machine_name+")"
        }
      }

    })
    return data;
  }
}
