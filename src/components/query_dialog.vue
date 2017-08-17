<template>
  <div class="modal fade" id="query">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            类型设置
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form">

            <div class="form-group">
              <label class="col-sm-2 control-label">类型:</label>
              <div class="col-sm-6">
                <label class="control-label">{{select_type}}</label>
              </div>
            </div>
            <!--type==file-->
            <div v-show="select_type=='find'">
              <div class="form-group">
                <label class="col-sm-2 control-label">键:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="find_item.key":vale="getFindData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="find_item.title">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">model:</label>
                <div class="col-sm-5">
                  <select class="form-control input-sm" v-model="find_item.model">
                    <option v-for="m in model_list" :value="m.model">{{tranform[m.model]}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">pager:</label>
                <div class="col-sm-10">
                  <label class="fl control-label">page:</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="find_item.pager.page">
                  </div>
                  <label class="fl control-label">limit：</label>
                  <div class="col-sm-3">
                    <input type="text" placeholder="30" class="form-control" v-model="find_item.pager.limit">
                  </div>
                </div>
              </div>

              <!--查询添加-->
              <div class="form-group form-query">
                <label class="col-sm-2 control-label">查询:</label>
                <div class="col-sm-3">
                  <span class="btn btn-primary" @click="query_add">添加</span>
                </div>
              </div>
              <div class="querys" v-if="find_item.query.length>0">
                <div class="querys_item" v-for="i in find_item.query">
                  <div class="form-group querys_label">
                    <label class="col-sm-2  control-label">field:</label>
                    <div class="col-sm-3">
                      <!--<input type="text" class="form-control" v-model="i.field">-->
                      <select class="form-control input-sm" v-model="i.field">
                        <option v-for="m in field_list" :value="m.field">{{tranform[m.field]}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">键:</label>
                    <div class="col-sm-3">
                      <!--<input type="text" class="form-control" v-model="i.key">-->
                      <select class="form-control input-sm" v-model="i.key">
                        <option v-for="m in key_list" :value="m.key">{{tranform[m.key]}}</option>
                      </select>
                    </div>
                    <button type="button" class="del btn btn-danger" @click="del(i._id,'query')">删除</button>
                  </div>
                </div>
              </div>
              <div class="querys form-horizontal"v-else>
                <div class="form-group querys_label">
                  <label class="col-sm-2 control-label">没有</label>
                </div>
              </div>

              <!--字段集添加-->
              <div class="form-group form-query">
                <label class="col-sm-2 control-label">字段集:</label>
                <div class="col-sm-3">
                  <span class="btn btn-primary"@click="fields_add">添加</span>
                </div>
              </div>
              <div class="fields" v-if="find_item.fields.length>0">
                <div class="fields_item" v-for="m in find_item.fields">
                  <div class="form-group fields_label">
                    <label class="col-sm-2  control-label">field:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.field">
                    </div>
                    <label class="control-label fl">键:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.key">
                    </div>
                    <label class="control-label fl">数据类型:</label>
                    <div class="col-sm-3">
                      <select class="form-control input-sm" v-model="m.data_type">
                        <option v-for="m in data_type_list" :value="m.data_type">{{tranform[m.data_type]}}</option>
                      </select>
                    </div>
                  </div>
                  <button type="button" class="del btn btn-danger" @click="del(m._id,'field')">删除</button>
                </div>
              </div>
              <div class="querys form-horizontal"v-else>
                <div class="form-group querys_label">
                  <label class="col-sm-2 control-label">全部</label>
                </div>
              </div>

            </div>
            <!--type==group-->
            <div v-show="select_type=='group'">
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1" :value="getOtherData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field2">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field2_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">new_field:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.new_field">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">one:</label>
                <div class="col-sm-5">
                  <!--// true or false-->
                  <label class="radio-inline">
                    <input type="radio" name="optionsRadiosinline" v-model="item_data.one" value=true checked> true
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="optionsRadiosinline" v-model="item_data.one" value=false checked> false
                  </label>
                </div>
              </div>
            </div>
            <!--type==get_key-->
            <div v-show="select_type=='get_key'">
              <div class="form-group">
                <label class="col-sm-2 control-label">field1:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1" :value="getOtherData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field2">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field2_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2_get:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field2_get">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">新字段:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.new_field">
                </div>
              </div>

            </div>
            <!--type==get_key-->
            <div v-show="select_type=='set_key'">
              <div class="form-group">
                <label class="col-sm-2 control-label">fields：</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.fields" :value="getOtherData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1名称：</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
            </div>
            <!--type==get_value-->
            <div v-show="select_type=='get_value'">
              <div class="form-group">
                <label class="col-sm-2 control-label">field:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field" :value="getOtherData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <n-dialog v-show="dialog" :msg="tips" @sure="sureDialog" @cancel="dialog=false"></n-dialog>
  </div>
</template>
<script>
  import data_class from '../utils/dataClass'
  import nDialog from '../components/dialog.vue'
  import $ from 'jquery';

  export default {
    props: ['select_type','data','other_data','states','item_key'],
    data() {
      return {
        tranform: {
          string: '字符串', int: '整型', NULL: '空', array: '数组', objectId: 'objectId', number: '数字',
          json: 'json', 'default': 'default', boolean: '布尔类型', book: '书', user: '用户', author: '作者',
          field1:'字段1',field2:'字段2',field3:'字段3',key1:'键1',key2:'键2',key3:'键3'
        },
        data_type_list: [{data_type: 'string'},
          {data_type: 'NULL'}, {data_type: 'array'},
          {data_type: 'objectId'},
          {data_type: 'number'},
          {data_type: 'int'},
          {data_type: 'json'},
          {data_type: 'default'},
          {data_type: 'boolean'}],
        model_list: [{model: 'book'}, {model: 'user'}, {model: 'author'}],
        field_list: [{field: 'field1'}, {field: 'field2'}, {field: 'field3'}],
        key_list: [{key: 'key1'}, {key: 'key2'}, {key: 'key3'}],
        find_item: {pager: {page: '', limit: 30}, fields: [], query: []},
        item_data: {},
        tips: '',
        dialog: false,
        select_id: '',
        select_state: '',
      }
    },
    methods: {
      back() {
        $('#query').modal('hide');
        this.$emit('search_back',this.key);
      },
      confirm() {

        if (this.select_type == 'find') {
          this.find_item.type = this.select_type;
          this.$emit('on-result-confirm', this.find_item,this.key);
        } else {
          this.item_data.type = this.select_type;
          this.$emit('on-result-confirm', this.item_data,this.key);
          this.item_data = {};
        }

      },
      fields_add() {//添加字段集
        console.log('--fields add:--');
        this.find_item.fields.push({
          _id: data_class.for_id(),
          field: '',
          key: '',
          data_type: '',
        })
      },
      del(_id, state) {
        this.dialog = true;
        this.select_id = _id;
        this.select_state = state;
        this.tips = '确认要删除吗？删除后无法恢复!'
      },
      query_add() {//添加查询
        this.find_item.query.push({
          _id: data_class.for_id(),
          field: '',
          key: '',
        })
      },
      sureDialog() {
        let index;
        if (this.select_state == 'field') {
          index = _.findIndex(this.find_item.fields, {_id: this.select_id});
          if (index >= 0) {
            this.find_item.fields.splice(index, 1);
          }
        } else {
          index = _.findIndex(this.find_item.query, {_id: this.select_id});
          if (index >= 0) {
            this.find_item.query.splice(index, 1);
          }
        }
        this.dialog = false;
      }
    },
    components: {
      nDialog
    },
    computed: {
      getFindData: function () {
        console.log('this.data：', this.data);
        if(this.states=='add'){
          this.data.key = 'search_'+this.item_key;
        }
        return this.find_item = this.data
//          return _.assign(this.find_item,this.data);
      },
      getOtherData: function () {
        return this.item_data = this.other_data;
      }
    }
  }
</script>
<style>
</style>
