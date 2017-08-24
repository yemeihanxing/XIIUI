export const data_type_list = [{data_type: 'string'},
  {data_type: 'NULL'}, {data_type: 'array'},
  {data_type: 'objectId'},
  {data_type: 'number'},
  {data_type: 'int'},
  {data_type: 'json'},
  {data_type: 'default'},
  {data_type: 'boolean'}];
export const transform = {
  'string': '字符串', 'int': '整型', 'NULL': '空', 'array': '数组', 'objectId': 'objectId', 'number': '数字',
  'json': 'json', 'default': 'default', 'boolean': '布尔类型', 'body': 'body值', 'statics': '固定值', 'query': '查询',
  'login': '登陆用户ID', 'search': '搜索获取','read':'读','write':'写', find: '查找', group: '组合', get_key: '获取键值',
  set_key: '设置键值', get_value: '获取值','book':'书','user':'用户','author':'作者','field1':'字段1','field2':'字段2',
  'field3':'字段3'
}
export const data_list = [{type: 'query'}, {type: 'statics'}, {type: 'body'}, {type: 'login'}, {type: 'NULL'}]
