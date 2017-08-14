/**
 * Created by xikakera on 2017/7/29.
 */

const lodash = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

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

    for (let key in query) {
      let setting = query[key];
      let method = await this.queryTypeMethod(setting.type);
      setting.key = key;

      try {
        let _data;
        if (lodash.has(data, key)) {
          _data = data[key];
        } else {
          _data = await method(this, setting, data[key]);
        }

        if (!_data && setting.request) {
          // throw new Error('');
          errors[key] = setting.title + ' 是必须填写的!';
        } else {
          let typeMethod = await this.typeTypeMethod(setting.data_type);
          result[key] = await typeMethod(_data);
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
    let result = {};
    for (let index in search) {
      let setting = search[index];
      setting.key = setting.key || ('search_' + (index + 1));

      let method = await this.searchTypeMethod(setting.type);

      result[setting.key] = await method(this, setting, query, result);
    }

    return result;
  }

  async output(output, search, query, err) {
    let data, setting;
    if (err) {
      setting = output.error;
      data = err;
    } else {
      setting = output.success;
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

    console.log(query);

    if (obj.search) {
      // 搜索数据
      try {
        search = await this.getSearch(obj.search, query);
      } catch (e) {
        err = e;
      }

    }

    if (obj.output) {
      result = await this.output(obj.output, search, query, err);
    }

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
    let def = 'default';
    return default_methods.type[type || def] || default_methods.type[def];
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

  getQueryData(key) {
    let query = this.xii.ctx.query;

    if (!key) {
      return query;
    }

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
    let _query = {};
    if (setting.query && setting.query.length) {
      setting.query.forEach(function (q) {
        _query[q.field] = query[q.key];
      });
    }

    return _query;
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
      let pager = setting.pager || {};
      let page = setting.pager.page || query.page || 0;
      let _query = await db_search.searchQuery2key(setting, query);
      let data, result;
      // 找一个
      if (!page && parseInt(pager.limit || 0) === 1) {
        let d = await db_search.dbFindOne(setting.model, _query);

        data = d ? [d] : [];
      } else {
        data = await db_search.dbFind(setting.model, _query, pager.limit, page);
      }

      // 获取field
      if (data.length) {
        result = [];
        for (let val of data) {
          let d = {};
          if (lodash.has(setting, 'fields')) {
            for (let _set of setting.fields) {
              let _val = lodash.get(val, _set.field);
              if (lodash.has(_set, 'data_type')) {
                _val = await db_search.typeValue(_set.data_type, _val);
              }
              lodash.set(d, _set.key, _val);
            }

          } else {
            d = val;
          }

          result.push(d);
        }

        return result;
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
      // 复制第一个数据
      let result = lodash.cloneDeep(prev_search[setting.field1_name]);
      // 使用 filed2 重新组合第二个数据
      let map_data = lodash.groupBy(prev_search[setting.field2_name], setting.field2);
      if (setting.one) {
        map_data = lodash.mapValues(map_data, '0');
      }

      // 设置新键的值
      lodash.forEach(result, function (data) {
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
      // 使用 filed2 重新组合第二个数据
      let map_data = lodash(prev_search[setting.field2_name])
        .mapKeys(setting.field2)
        .mapValues(setting.field2_get)
        .value();

      // 设置新键的值
      lodash.forEach(result, function (data) {
        lodash.set(data, setting.new_field, map_data[lodash.get(data, setting.field1)]);
      });

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
      let result = lodash.cloneDeep(prev_search[setting.field1_name]);
      let fields = setting.fields;

      lodash.forEach(result, function (value) {
        Object.assign(value, fields);
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
    reduce: async (db_search, setting, data) => {
      let result = {};

      for (let _set of setting.fields) {
        console.log(_set);
        let value;
        switch (_set.type) {
          case 'statics':
            value = await db_search.typeValue(_set.data_type, _set.value);
            break;
          case 'get':
          default:
            value = await db_search.typeValue(_set.data_type, lodash.get(data, _set.value));
            break;
        }

        result[_set.key] = value;
      }

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
