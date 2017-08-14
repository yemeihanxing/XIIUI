export default {
  data_list() {
    console.log('寄來');
       let data_list = [{type:'query'},{type:'statics'},{type:'body'},{type:'login'},{type:'NULL'}];
       return data_list;
     },
      tranform() {
       let transform_data = {
         'string': '字符串', 'int': '整型', 'NULL': '空', 'array': '数组', 'objectId': 'objectId', 'number': '数字',
         'json': 'json', 'default': 'default', 'boolean': '布尔类型', 'body': 'body值', 'statics': '固定值', 'query': '查询',
         'login': '登陆用户ID', 'search': '搜索获取'
       }
       return transform_data;
  }

}
