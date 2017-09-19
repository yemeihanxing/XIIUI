/**
 * Created by xikakera on 2017/7/29.
 */

const lodash = require('lodash');
const ObjectId = require('mongodb').ObjectID;
const local =new require('./dataClass');
/**
 * @property {object}  search_obj
 * @property {string}  search_obj.title
 * @property {string}  search_obj.path
 * @property {string}  search_obj.machine_name
 * @property {ObjectId}  search_obj._id
 * @property {array}  search_obj.permission
 * @property {object}  search_obj.query_error
 * @property {object}  search_obj.query
 * @property {string}  search_obj.query.*.type
 * @property {string}  search_obj.query.*.data_type
 * @property {string}  search_obj.query[].title
 * @property {string}  search_obj.query[].machine_name
 * @property {string}  search_obj.query[].value
 * @property {string}  search_obj.query[].request
 * @property {array}  search_obj.search
 *
 * @property {object} search_obj.search.single_find
 * @property {string}  search_obj.search.single_find.type                  - 固定值: find
 * @property {string}  search_obj.search.single_find.data_type
 * @property {string}  search_obj.search.single_find.key
 * @property {string}  search_obj.search.single_find.title
 * @property {string}  search_obj.search.single_find.model                  - search model name @see XII.getModel(model)
 * @property {object}  search_obj.search.single_find.pager
 * @property {array}  search_obj.search.single_find.fields
 * @property {object}  search_obj.search.single_find.fields.single
 * @property {string}  search_obj.search.single_find.fields.single.field
 * @property {string}  search_obj.search.single_find.fields.single.key
 * @property {string}  search_obj.search.single_find.fields.single.data_type
 * @property {array}  search_obj.search.single_find.query
 * @property {object}  search_obj.search.single_find.query.single
 * @property {string}  search_obj.search.single_find.query.single.filed  - search field
 * @property {string}  search_obj.search.single_find.query.single.key  - query key
 *
 * @property {object} search_obj.search.single_group
 * @property {string} search_obj.search.single_group.type                   - 固定值: group
 * @property {string} search_obj.search.single_group.field1
 * @property {string} search_obj.search.single_group.field1_name
 * @property {string} search_obj.search.single_group.field2
 * @property {string} search_obj.search.single_group.field2_name
 * @property {string} search_obj.search.single_group.new_field
 * @property {boolean} search_obj.search.single_group.one
 *
 * @property {object} search_obj.search.single_get_key
 * @property {string} search_obj.search.single_get_key.type                   - 固定值: get_key
 * @property {string} search_obj.search.single_get_key.field1
 * @property {string} search_obj.search.single_get_key.field1_name
 * @property {string} search_obj.search.single_get_key.field2
 * @property {string} search_obj.search.single_get_key.field2_get
 * @property {string} search_obj.search.single_get_key.field2_name
 * @property {string} search_obj.search.single_get_key.new_field
 *
 * @property {object} search_obj.search.single_set_key
 * @property {string} search_obj.search.single_set_key.type                   - 固定值: set_key
 * @property {string} search_obj.search.single_set_key.fields
 * @property {string} search_obj.search.single_set_key.field1_name
 *
 * @property {object} search_obj.search.single_get_value
 * @property {string} search_obj.search.single_get_value.type                   - 固定值: get_value
 * @property {string} search_obj.search.single_get_value.field
 * @property {string} search_obj.search.single_get_value.field1_name
 *
 * @property {object}  search_obj.output
 * @property {object}  search_obj.output.success
 * @property {object}  search_obj.output.error
 * */

class DB_SEARCH {
  constructor(xii) {
    this.xii = xii;
  }

  /**
   * 获取查询参数
   * @param {search_obj.query} query
   * @param {object} data
   * */
  async getQuery(query = {}, data = {}) {
    let result = {};
    let errors = {};


    for (let key  in query) {// 循环query
      let setting = query[key];// query中key对应的值

      let method = await this.queryTypeMethod(setting.type);// 传入设置的类型type，返回一个函数
      setting.key = key;


      try {
        let _data;// 定义一个_data变量
        if (lodash.has(data, key)) { // 判断data对象是否存在key这个值
          _data = data[key];// 如果data存在key这个值，把key对应的值赋值给_data
        } else {
          _data = await method(this, setting, data[key]);// 把this,setting,data[key]的值传入method函数中，返回一个值
        }

        if (!_data && setting.request) {// 如果_data没值并且setting.request存在
          // throw new Error('');
          errors[key] = setting.title + ' 是必须填写的!';
        } else {
          let typeMethod = await this.typeTypeMethod(setting.data_type);// 传入数据类型，返回一个函数

          result[key] = await typeMethod(_data);// 返回一个值赋值给result[key]
        }
      } catch (e) {
        errors[key] = e.message;
      }
    }

    if (Object.keys(errors).length) {
      let e = new Error('获取查询参数错误!', 3010);
      e.data = errors;

      throw e;
    }

    return result;
  }

  /**
   * @param {search_obj.search} search
   * @param {object} query
   * */
  async getSearch(search, query) {
    let result = {};///定义一个变量result
    for (let index in search) {//循环search
      let setting = search[index];// search对应的值(0,1,2,3,...)赋值给setting
      query = lodash.assign(query,local.get_key_data());
      console.log('------------query-----------:',query)
      setting.key = setting.key || ('search_' + (index + 1));

      let method = await this.searchTypeMethod(setting.type);//传入search的类型，返回一个函数

      result[setting.key] = await method(this, setting, query, result);// 传参，返回的值赋值给result
    }

    return result;
  }

  // query result: { bookName: '帝霸' }
  // search result: { search_1:
  //   [ { book_id: 597efc1f27b1f0359c39ee8a, title: '契子（读者必看 非常重要）' },
  //     { book_id: 597efc1f27b1f0359c39ee8a, title: '第一章 三鬼爷(上)' } ] }
  async output(output, search, query, err) {
    let data, setting;
    if (err) {// 如果err有
      setting = output.error;// output.error赋值给setting
      data = err;
    } else {
      setting = output.success;// output.success赋值给setting
      data = {search, query};
    }

    let method = await this.outputTypeMethod(setting.type);

    return await method(this, setting, data);
  }

  async outputQueryError(error, data, code) {
    let method = await this.outputTypeMethod(error.type);

    return await method(this, error, {data, code});
  }

  /**
   * 查询数据库
   *
   * @param {search_obj} obj
   * @param {object} query_data
   * */
  async find(obj, query_data = {}) {
    let query = {}, err, search, result;

    if (obj.query) {
      // 查询数据
      try {
        query = await this.getQuery(obj.query, query_data);
      } catch (e) {
        err = e;
      }
      if (err) {
        return await this.outputQueryError(obj.query_error, err.data, err.code);
      }
    }

    console.log('query result:', query);

    if (obj.search) {
      // 搜索数据
      try {
        search = await this.getSearch(obj.search, query);
      } catch (e) {
        err = e;
      }
    }

     console.log('search result:', search);
    local.clear_key_data()

    if (obj.output) {
      result = await this.output(obj.output, search, query, err);
    }
    console.log('output result:', result);
    return result;
  }

  async typeValue(type, value) {
    let method = await this.typeTypeMethod(type);
    return await method(value);
  }

  /**
   * @param {search_obj.search.single_find} setting
   * @param value
   * */
  async field2key(setting, value) {
    if (setting.data_type) {
      value = this.typeValue(setting.data_type, value);
    }
    return value;
  }

  async typeTypeMethod(type) {
    let def = 'default';// 定义def变量的值为default
    return default_methods.type[type || def] || default_methods.type[def];// 传入数据类型的值
  }

  async queryTypeMethod(type) {
    return default_methods.query[type];
  }

  async searchTypeMethod(type) {
    return default_methods.search[type];
  }

  async outputTypeMethod(type) {
    return default_methods.output[type];
  }

// 1.疑问:query里的数据是什么呢?
  // 2.初始化类的时候，应该传什么时去能够这样进行这样的调用
  getQueryData(key) {

    // return "";

    // ctx = {query:{},body:{}}
    // let query = this.xii.ctx.query;
    // console.log('------------key:-----------:',key);
    let query = this.xii.ctx.query;
      // console.log('------------query:-----------:',query);
    if (!key) {
      // console.log('------------query1:-----------:',query);
      return query;
    }
    // console.log('------------query2:-----------:',query[key]);
    return query[key];
  }

  getBodyData(key) {
    let query = this.xii.ctx.body;

    if (!key) {
      return query;
    }

    return query[key];
  }

  getLoginUserData() {
    let user = this.xii.ctx.user;

    return user._id;
  }

  async dbFind(model_name, query, limit, page) {
    let model = this.xii.getModel(model_name);

    return await model.findPage(query, limit, page);
  }

  async dbFindOne(model_name, query) {

    let model = this.xii.getModel(model_name);
    return await model.findOne(query);
  }

  async searchQuery2key(setting, query) {
    let _query = {};// 定义一个变量_query

// 这里我把query改成了querys
    if (setting.querys && setting.querys.length) {// 这判断setting.query是否存在并且setting.query.length的长度是否大于0
      setting.querys.forEach(function (q) {// forEach循环setting.query.

        if (lodash.isArray(query[q.key])) {
          _query[q.field] = {$in: query[q.key]};
        } else if (lodash.isObject(query[q.key])) {
          _.forEach(query[q.key], function (value, key) {
              _query[q.field + '.' + key] = value;
          })
        } else {
          _query[q.field] = query[q.key];// setting.qeury里的key在设置里边对应的值赋值给_query的setting.qeury里的field
        }
      });
    }

    return _query;//返回_query
  }
}


let default_methods = {
  query: {
    // 固定值
    statics: async (db_search, setting, default_data) => {
      return default_data || setting.value;
    },
    // ?查询值
    query: async (db_search, setting, default_data) => {

      return default_data || db_search.getQueryData(setting.key) || setting.value;
    },
    // post body 值
    body: async (db_search, setting, default_data) => {
      return default_data || db_search.getBodyData(setting.key) || setting.value;
    },
    // 登陆用户ID
    login: async (db_search, setting, default_data) => {
      return default_data || db_search.getLoginUserData() || setting.value;
    },
    // 在查询数据库后获取
    search: async (db_search, setting, default_data) => {
      return default_data || null;
    },
    // 空
    NULL: async (db_search, setting, default_data) => {
      return null;
    },
  },
  search: {
    /**
     * 查询数据方法: 查询
     * @param {DB_SEARCH} db_search
     * @param {search_obj.search.single_find} setting
     * @param {object} query
     * @param {object} prev_search
     * */
    find: async (db_search, setting, query = {}, prev_search) => {
      let pager = setting.pager || {};// 如果设置里的pager存在，赋值pager，如果不存在则赋值{}
      let page = setting.pager.page || query.page || 0;// 如果存在page，则赋值给page，否则赋值0

      let _query = await db_search.searchQuery2key(setting, query);// 判断是否存在setting.query。返回一个对象给_query
      let data, result;


      // page为空并且pageccr.limit ===1，只能查找一个
      if (!page && parseInt(pager.limit || 0) === 1) {
        let d = await db_search.dbFindOne(setting.model, _query);//把数据库表名与参数传进去查找

        data = d ? [d] : [];//如果查找到有值，将其变成一个数组，否则以空数组[]
      } else {// 查找多个
        data = await db_search.dbFind(setting.model, _query, pager.limit, page);
      }

      // 获取field
      if (data.length) {// 判断查找的data的长度是否大于0
        result = [];
        for (let val of data) {// for循环data

          let d = {};// 定义一个对象{}
          let key = {};
          if (lodash.has(setting, 'fields') && setting.fields.length) {// 判断setting中是否有字符集fields
            for (let _set of setting.fields) {// setting.fields进行循环
              let _val = lodash.get(val, _set.field);//  lodash.get得到_set.field,然后赋值给_val
              if (lodash.has(_set, 'data_type')) {// 判断字段集是否存在data_type
                _val = await db_search.typeValue(_set.data_type, _val);//有的话得到_val
              }
              lodash.set(d, _set.key, _val);// 把_set.key,_val.作为key,value的实行放入到d对象中
            }

          } else {

            d = val;// 如果不存在fields，直接把val赋值给d
          }

          // 在这里把field字段对应的数据的集合找出来，存放
          if (lodash.has(setting, 'keys') && setting.keys.length) {
            for (let _key of setting.keys) {
              let keys = lodash.map(data, _key.field);
              if (lodash.has(_key, 'data_type')) {
                for (let li of keys) {
                  li = await db_search.typeValue(_key.data_type, li);//有的话得到_val
                }
              }
              local.set_key_data(keys,_key.machine_name);
            }
          }


          result.push(d); // 把d放入到result中

        }


        return result;// 返回result
      }

      return [];
    },
    /**
     * 查询数据方法: 组合
     *
     * @param {DB_SEARCH} db_search
     * @param {search_obj.search.single_group} setting
     * @param {object} query
     * @param {object} prev_search
     * */
    group: async (db_search, setting, query = {}, prev_search) => {
      // 复制第一个数据field1_name
      let result = lodash.cloneDeep(prev_search[setting.field1_name]);
      // 使用 filed2 重新组合第二个数据?
      // map_data ={u1:[{u:'u1'}],u2:[{u:'u2'}]}
      let map_data = lodash.keyBy(prev_search[setting.field2_name], setting.field2);

      if (setting.one) {// 如果存在one

        map_data = lodash.mapValues(map_data, '0');

      }

      // 设置新键的值
      lodash.forEach(result, function (data) {
        // lodash.get({fl:'123',u:'u1'},'u')的值为了u1
        // map_data[u1] = [{u:'u1'}]
        lodash.set(data, setting.new_field, map_data[lodash.get(data, setting.field1)]);
      });

      return result;
    },
    /**
     * 查询数据方法: 获取键值
     *
     * @param {DB_SEARCH} db_search
     * @param {search_obj.search.single_get_key} setting
     * @param {object} query
     * @param {object} prev_search
     * */
    get_key: async (db_search, setting, query = {}, prev_search) => {
      // 复制第一个数据
      let result = lodash.cloneDeep(prev_search[setting.field1_name]);
      // 使用 filed2 重新组合第二个数据 _()弄成这样就可以使用链式
      let map_data = lodash(prev_search[setting.field2_name])
        .mapKeys(setting.field2)
        .mapValues(setting.field2_get)
        .value();

      // 设置新键的值
      lodash.forEach(result, function (data) {
        // setting.new_field作为object里的key,map_data[lodash.get(data, setting.field1)]作为object里的value
        lodash.set(data, setting.new_field, map_data[lodash.get(data, setting.field1)]);
      });

      // 循环完后把 return result
      return result;
    },
    /**
     * 查询数据方法: 设置键值
     *
     * @param {DB_SEARCH} db_search
     * @param {search_obj.search.single_set_key} setting
     * @param {object} query
     * @param {object} prev_search
     * */
    set_key: async (db_search, setting, query = {}, prev_search) => {
      // 深度复制prev_search[setting.field1_name];
      let result = lodash.cloneDeep(prev_search[setting.field1_name]);
      let fields = setting.fields; // 此处是字符串，

      lodash.forEach(result, function (value) {
        Object.assign(value, {fields: fields});
      });

      return result;
    },
    /**
     * 查询数据方法: 获取内容
     *
     * @param {DB_SEARCH} db_search
     * @param {search_obj.search.single_get_value} setting
     * @param {object} query
     * @param {object} prev_search
     * */
    get_value: async (db_search, setting, query = {}, prev_search) => {
      return lodash.cloneDeep(lodash.get(prev_search[setting.field1_name], setting.field));
    },
  },
  output: {
    output: async (db_search, setting, data) => {
      if (setting.field) {
        return lodash.get(data, setting.field);
      }
      return data;
    },
    error: async (db_search, setting, data) => {
      return Object.assign({error: true, success: false}, lodash.pick(data, ['code', 'message', 'data']));
    },
    // db_search = this, setting = output.success data = {query,search}
    reduce: async (db_search, setting, data) => {
      let result = {};

      for (let _set of setting.fields) {// 循环setting.fields

        let value; // 设置变量value
        switch (_set.type) { // 判断_set.type类型
          case 'statics':
            value = await db_search.typeValue(_set.data_type, _set.value);// 传入_set.data.type(数据类型),和_set.value(值),返回
            break;
          case 'get':
          default:
            value = await db_search.typeValue(_set.data_type, lodash.get(data, _set.value));
            break;
        }
        // 把值赋值给result

        result[_set.key] = value;
      }
      // 把值赋值给result
      return result;
    },
  },
  type: {
    string: async (value) => {

      try {
        return value.toString();
      } catch (e) {
      }
      return '';
    },
    NULL: async (value) => {
      return null;
    },
    array: async (value) => {
      return lodash.isArray(value) && value || value && [value] || [];
    },
    objectId: async (value) => {

      return new ObjectId(value);
    },
    number: async (value) => {
      return lodash.isNumber(value) ? value : (value && parseFloat(value) || 0);
    },
    int: async (value) => {
      return parseInt(value) || 0;
    },
    json: async (value) => {

      let result = null;
      try {
        result = JSON.parse(value);

      } catch (e) {
        //
      }

      return result;
    },
    'default': async (value) => {
      return value;
    },
    bool: async (value) => {
      if ((value || '').toLocaleLowerCase() === 'false') {
        return false;
      }
      return Boolean(value);
    }
  },
};


module.exports = DB_SEARCH;
