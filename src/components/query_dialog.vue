<template>
  <div class="modal fade" id="query" data-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header":class="[getColor]">
          <h4 class="modal-title">
            {{getSelectType}}
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form">

            <!--type==file-->
            <div v-show="select_type=='find'">
              <div class="form-group">
                <label class="col-sm-2 control-label">键<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="find_item.key" :vale="getFindData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">名称<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="find_item.title">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">model<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <select class="form-control input-sm" v-model="find_item.model" @change="getKey">
                    <option v-for="m in model_list" :value="m">{{m}}</option>
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
                  <label class="fl control-label">limit<span class="red">*</span>：</label>
                  <div class="col-sm-3">
                    <input type="number" placeholder="30" class="form-control" v-model="find_item.pager.limit">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">sort：</label>
                <div class="col-sm-5">
                  <select class="form-control input-sm" v-model="find_item.sort" @change="getKey">
                    <option v-for="m in search_list" :value="m.field">{{m.field}}</option>
                  </select>
                </div>
              </div>

              <!--查询添加-->
              <div class="form-group form-query">
                <label class="col-sm-2 control-label">查询:</label>
                <div class="col-sm-3">
                  <span class="btn btn-primary" @click="query_add">添加</span>
                </div>
              </div>
              <div class="querys" v-if="find_item.querys.length>0">
                <div class="querys_item" v-for="(i,index) in find_item.querys">
                  <div class="form-group querys_label">
                    <label class="col-sm-2  control-label">field:</label>
                    <div class="col-sm-3">
                      <!--<input type="text" class="form-control" v-model="i.field">-->
                      <select class="form-control input-sm" v-model="i.field">
                        <option v-for="m in search_list" :value="m.field">{{m.field}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">键:</label>
                    <div class="col-sm-3">
                      <!--<input type="text" class="form-control" v-model="i.key">-->
                      <select class="form-control input-sm" v-model="i.key">
                        <option v-for="m in search_keys" :value="m.machine_name">{{m.key}}</option>
                      </select>
                    </div>
                    <button type="button" class="del btn btn-danger" @click="del(index,'query',i)">删除</button>
                  </div>
                </div>
              </div>
              <div class="querys form-horizontal" v-else>
                <div class="form-group querys_label">
                  <label class="col-sm-2 control-label">没有</label>
                </div>
              </div>

              <!--字段集添加-->
              <div class="form-group form-query">
                <label class="col-sm-2 control-label">字段集:</label>
                <div class="col-sm-3">
                  <span class="btn btn-primary" @click="fields_add">添加</span>
                </div>
              </div>
              <div class="fields" v-if="find_item.fields.length>0">
                <div class="fields_item" v-for="(m,index) in find_item.fields">
                  <div class="form-group fields_label">
                    <label class="col-sm-2  control-label">field:</label>
                    <div class="col-sm-2 col-sm_item">
                      <select class="form-control input-sm" v-model="m.field">
                        <option v-for="m in search_list" :value="m.field">{{m.field}}</option>
                      </select>
                    </div>
                    <label class="control-label fl">键:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.key">
                    </div>
                    <label class="control-label fl">数据类型:</label>
                    <div class="col-sm-3">
                      <select class="form-control input-sm" v-model="m.data_type">
                        <option v-for="m in data_type_list" :value="m.data_type">{{transform[m.data_type]}}</option>
                      </select>
                    </div>
                  </div>
                  <button type="button" class="del btn btn-danger btn-sm" @click="del(index,'field',m)">删除</button>
                </div>
              </div>
              <div class="fields form-horizontal" v-else>
                <div class="form-group querys_label">
                  <label class="col-sm-2 control-label">全部</label>
                </div>
              </div>

              <!--插入的查询字段-->
              <div class="form-group form-query">
                <label class="col-sm-2 control-label">查询字段:</label>
                <div class="col-sm-3">
                  <span class="btn btn-primary" @click="key_add">添加</span>
                </div>
              </div>
              <div class="keys" v-if="find_item.keys.length>0">
                <div class="keys_item form-horizontal" v-for="(m,index) in find_item.keys">
                  <div class="form-group keys_label">
                    <label class="col-sm-2 control-label">field:</label>
                    <div class="col-sm-3 col-sm_item">
                      <select class="form-control input-sm" v-model="m.field">
                        <option v-for="j in search_list" :value="j.field">{{j.field}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">数据类型:</label>
                    <div class="col-sm-3">
                      <select class="form-control input-sm" v-model="m.data_type">
                        <option v-for="j in data_type_list" :value="j.data_type">{{transform[j.data_type]}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group keys_label">
                    <label class="col-sm-2 control-label">名称:</label>
                    <div class="col-sm-3 col-sm_item">
                      <input type="text" class="form-control " v-model="m.title">
                    </div>
                    <label class="fl control-label">机械名称:</label>
                      <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="m.machine_name">
                      </div>

                  </div>
                  <button type="button" class="del btn btn-danger btn-sm" @click="del(index,'key',m)">删除</button>
                </div>
              </div>
              <div class="keys form-horizontal" v-else>
                <div class="form-group keys_label">
                  <label class="col-sm-2 control-label">没有</label>
                </div>
              </div>


              <!--排序-->
               <!--<div class="form-group form-query">-->
                 <!--<label class="col-sm-2 control-label">排序：</label>-->
               <!--</div>-->
               <!--<div class="sorts">-->
                <!--<div class="form-horizontal">-->
                  <!--<div class="form-group sorts_label">-->
                    <!--<label class="control-label col-sm-2">键：</label>-->
                    <!--<div class="col-sm-3 col-sm_item">-->
                      <!--<select class="form-control input-sm" >-->
                        <!--<option v-for="j in search_list" :value="j.field">{{j.field}}</option>-->
                      <!--</select>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

            </div>
            <!--type==group-->
            <div v-show="select_type=='group'">
              <div class="form-group">
                <label class="col-sm-2 control-label">键<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.key">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">new_field:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.new_field">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field1" :value="getOtherData">
                </div>
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field2">
                </div>
                <label class="col-sm-2 control-label">字段2名称:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field2_name">
                </div>
              </div>
              <div class="form-group">

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
                <label class="col-sm-2 control-label">键<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.key">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field1" :value="getOtherData">
                </div>
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段2:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field2">
                </div>
                <label class="col-sm-2 control-label">字段2名称:</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" v-model="item_data.field2_name">
                </div>
              </div>
              <div class="form-group">

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
                <label class="col-sm-2 control-label">键<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.key">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">fields:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.fields" :value="getOtherData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">字段1名称:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.field1_name">
                </div>
              </div>
            </div>
            <!--type==get_value-->
            <div v-show="select_type=='get_value'">
              <div class="form-group">
                <label class="col-sm-2 control-label">键<span class="red">*</span>:</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" v-model="item_data.key">
                </div>
              </div>
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
    <n-dialog v-show="dialog" :msg="tip" @sure="sureDialog" @cancel="dialog=false"></n-dialog>
    <n-tip :tip="tip"></n-tip>
  </div>
</template>
<script>
  import data_class from '../utils/dataClass'
  import localEvent from '../utils/local'
  import nDialog from '../components/dialog.vue'
  import nTip from '../components/tip.vue'
  import $ from 'jquery';
  import axios from 'axios'
  import * as data from '../utils/datas';

  export default {
    props: ['select_type', 'data', 'other_data','item_key', 'states', 'search_keys'],
    data() {
      return {
        data_list: data.data_list,
        transform: data.transform,
        data_type_list: data.data_type_list,
        model_list: ['book', 'category', 'author', 'chapter'],
        search_list: [],
        find_item: {pager: {page: '', limit: 30}, fields: [], querys: [],keys:[]},// 类型是find的默认值
        item_data: {},// 类型不是find的默认值
        tip: '',// 提示语
        dialog: false,// 提示框变量
        select_index: '',// 删除字段集或者查询的下坐标
        select_state: '',// 是否是字段集或者查询的下坐标
      }
    },
    methods: {
      back() {
        $('#query').modal('hide');
//        if(this.states != 'edit'){
//          this.item_key = this.item_key - 1;
//          console.log('this.item_keywewe:',this.item_key);
//        }
        this.$emit('search_back');
      },
      confirm() {

        if (this.select_type == 'find') {
          // 判断必须要填写的是否已经全部填写完了
          if (!this.find_item.key || !this.find_item.title || !this.find_item.model || !this.find_item.pager.limit) {
            this.tip = '必要信息没有填写完整';
            data_class.showTip();
            return;
          }
          // 判断是否添加了查询，添加没选定值，提示
          if (this.find_item.querys.length > 0) {
            let query_value = false;
            let breakOut = false
            _.forEach(this.find_item.querys, function (li) {
              if (!breakOut) {
                if (!li.field || !li.key) {
                  query_value = true;
                  breakOut = true;
                }
              }
            })
            if (query_value) {
              this.tip = '查询信息没有填写完整';
              data_class.showTip();
              return;
            }
          }
          // 判断是否添加了查询，添加没选定值，提示
          if (this.find_item.fields.length > 0) {
            let fields_value = false;
            let breakOut = false;
            _.forEach(this.find_item.fields, function (li) {
              if (!breakOut) {
                if (!li.field || !li.key || !li.data_type) {
                  fields_value = true;
                  breakOut = true;
                }
              }
            });
            if (fields_value) {
              this.tip = '字段集信息没有填写完整';
              data_class.showTip();
              return;
            }
          }
          // 判断是否添加了查询，添加没选定值，提示
          if (this.find_item.keys.length > 0) {
            let fields_value = false;
            let breakOut = false;
            _.forEach(this.find_item.keys, function (li) {
              if (!breakOut) {
                if (!li.machine_name || !li.title || !li.data_type || !li.type) {
                  fields_value = true;
                  breakOut = true;
                }
              }
            });
            if (fields_value) {
              this.tip = '查询字段信息没有填写完整';
              data_class.showTip();
              return;
            }
          }

          this.find_item.type = this.select_type;
          this.$emit('on-search-result-confirm', this.find_item);
        } else {
          this.item_data.type = this.select_type;
          this.$emit('on-search-result-confirm', this.item_data);
          this.item_data = {};
        }

      },
      fields_add(state) {//添加字段集
        if (!this.find_item.model) {
          this.tip = 'model不能为空';
          data_class.showTip();
          return;
        }
        this.find_item.fields.push({
          field: '',
          key: '',
          data_type: '',
        })

      },
      del(index, state, data) {// 弹出提示是否删除
        console.log('index:', index);
        if (state == 'field') {
          if (!data.field && !data.key && !data.data_type) {
            this.find_item.fields.splice(index, 1);
            return;
          }
        }
        if (state == 'query') {
          if (!data.field && !data.key) {
            this.find_item.querys.splice(index, 1);
            return;
          }
        }
        if (state == 'key') {
          if (!data.field && !data.key && !data.data_type) {
            this.find_item.keys.splice(index, 1);
            return;
          }
        }
        this.dialog = true;
        this.select_index = index;
        this.select_state = state;
        this.tip = '确认要删除吗？删除后无法恢复!'
      },
      query_add() {//添加查询
        if (!this.find_item.model) {
          this.tip = 'model不能为空';
          data_class.showTip();
          return;
        }
        this.find_item.querys.push({
          field: '',
          key: '',
        })
      },
      sureDialog() {

        if (this.select_state == 'field') {
          this.find_item.fields.splice(this.select_index, 1);
        } else if(this.select_state == 'query') {
          this.find_item.querys.splice(this.select_index, 1);
        }else{
          this.find_item.keys.splice(this.select_index,1);
        }
        this.dialog = false;
      },
      getKey() {
        const Super = this;
        if(!this.find_item.model){
          return;
        }
        localEvent.getData(this.find_item.model, {model:this.find_item.model}, function (value) {
          console.log(value);
          Super.search_list = value;
        })
      },
      key_add(){
        if (!this.find_item.model) {
          this.tip = 'model不能为空';
          data_class.showTip();
          return;
        }
        this.find_item.keys.push({
          field: '',
          type:'search',
          data_type: '',
          key: '',
          title:'',
          machine_name:''
        })
      }
    },
    components: {
      nDialog,
      nTip
    },
    computed: {
      getFindData: function () {

//        if (this.states == 'add'&&this.select_type=='find') {
//          console.log('this.item_key:',this.item_key);
//          this.data.key = 'search_' + this.item_key;
//        }
        return this.find_item = this.data
//          return _.assign(this.find_item,this.data);
      },
      getOtherData: function () {
        return this.item_data = this.other_data;
      },
      getSelectType: function () {
        switch (this.select_type) {
          case 'find':
            return '查询数据库'
            break;
          case 'group':
            return '组合'
            break;
          case 'get_key':
            return '获取键'
            break;
          case 'set_key':
            return '设置键'
            break;
          case 'get_value':
            return '获取值'
            break;
          default:
            return '查询数据库'
            break;
        }
      },
      getColor(){
        switch (this.select_type){
          case 'find':
            return 'find_color';
            break;
          case 'group':
            return 'group_color';
            break;
          case 'get_key':
            return 'get_key_color';
            break;
          case 'set_key':
            return 'set_key_color';
            break;
          default:
            return 'get_value_color';
            break;
        }
      }
    },
    beforeUpdate:function () {
//      console.log('query_dialog,beforeUpdate ')
      this.getKey();
    }
  }
</script>
<style>
</style>
