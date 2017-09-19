import axios from 'axios';

let setting = {};
let data = {};

export default {
  getData,
  setting,
  setCollectionData,
  getCollectionData,
  editCollectionData
};

function getter(name) {
  return data[name] || null;
}

function setter(name, value) {
  console.log('name:',name)
  console.log('value:',value)

  return data[name] = change_by_setting(name,value);
}

function change_by_setting(name,value) {
  if(setting[name]){
    return setting[name](value)
  }

  return change(value);
}

function change(value) {

  return value;
}


function getData(name, params, cb) {
  let value = getter(name);

  if (!value) {
    // 服务器获取

    axios.get('http://localhost:3001/getKey', {
      params
    })
      .then(function (response) {
        cb(setter(name, response.data.data));
      })
      .catch(function (error) {
        // console.log(error);
        cb(null);
      });
  } else {
    cb(value);
  }
}

// 设置，获取，修改api表

function editCollectionData(state,index,obj) {
  console.log('data:',data['apidata'])
   if(!data['apidata']){
     return;
   }
   if(state=='add'){
     data['apidata'].push(obj);
   }else{
     console.log('修改:');
     console.log(state,index,obj);
     data['apidata'][index] = Object.assign(data['apidata'][index],obj);
   }

}

function changeCollectionData(value) {
       return value;
}

function setCollectionData(CollectionData) {
  data['apidata'] = changeCollectionData(CollectionData);

}

function getCollectionData(cb) {

    let collection_data = data['apidata'];

    if(!collection_data){
      axios.get('http://localhost:3001/allApiCollection').then(function (resoponse) {
        setCollectionData(resoponse.data.data);
        cb(resoponse.data.data)
      }).catch(function (error) {
        console.log('error:',error);
      })
    }else{
      cb(collection_data)
    }

}
