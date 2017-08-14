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
 * @property {object} search_obj.search.single_set_key.type                   - 固定值: set_key
 * @property {object} search_obj.search.single_set_key.fields        object? or string   fields or field1 ？
 * @property {object} search_obj.search.single_set_key.field1_name
 *
 * @property {object} search_obj.search.single_get_value
 * @property {object} search_obj.search.single_get_value.type                   - 固定值: get_value
 * @property {object} search_obj.search.single_get_value.field
 * @property {object} search_obj.search.single_get_value.field1_name
 *
 * @property {object}  search_obj.output
 * @property {object}  search_obj.output.success
 * @property {object}  search_obj.output.error
 * */
