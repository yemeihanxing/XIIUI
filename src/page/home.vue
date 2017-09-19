<template>
  <div>
    <header class="header_content">
      <div class="container">
        <h1>管理控制台</h1>
        <span class="s_id" v-show="collection_id">({{collection_id}})</span>
        <div class="fr">
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm" @click="control_eidt">编辑</button>
          </a>
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm" @click="control_del">删除</button>
          </a>
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm" @click="get_data()">保存</button>
          </a>
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm">失效</button>
          </a>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="message">
        <div class="row">
          <div class="col-sm-6">
            <label>名称：</label>
            <a @click="open_message_dialog" data-backdrop="static"><span>{{message_data.title}}</span></a>
          </div>
          <div class="col-sm-6">
            <label>地址：</label>
            <a @click="open_message_dialog"><span>{{message_data.path}}</span></a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <label>机械名称：</label>
            <a @click="open_message_dialog"><span>{{message_data.machine_name}}</span></a>
          </div>
          <div class="col-sm-6">
            <label>权限：</label>
            <a @click="open_message_dialog"><span>{{transform[message_data.permission]}}</span></a>
          </div>
        </div>
      </div>

      <!--查询设置-->
      <div class="check_setting">
        <div class="h3_item">
          <h3 class="fs16">查询设置</h3>
          <div class="fr add-btn">
            <button typeof="button" @click="setting_add('setting')" data-toggle="modal" data-backdrop="static"
                    data-target="#setting" class="btn btn-primary btn-sm">添加
            </button>
          </div>
        </div>
        <div class="panel-table" v-if="setting_add_data.length>0">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>数据类型</th>
              <th>操作</th>
            </tr>
            </thead>
            <thead>
            <tr v-for="m in setting_add_data" class="table_tr">
              <td>{{m.name}}<span v-if="m.request" class="red"> (必须)</span></td>
              <td>{{transform[m.type]}}</td>
              <td>{{transform[m.data_type]}}</td>
              <td v-if="!m.key">
                <a data-toggle="modal" data-target="#setting" class="edit" @click="setting_edit(m)">编辑</a> |
                <a href="javascript:;" class="del" @click="search_del(m,'setting')">删除</a>
              </td>
              <td v-else>
                <span>无</span>
              </td>
            </tr>
            </thead>
          </table>
        </div>
        <div class="check_failed">
          <label class="text-right">失败返回：</label>
          <div class="failed_item">
            <span>失败反馈</span>
          </div>
        </div>
      </div>

      <!--搜索数据-->
      <div class="check_data">
        <div class="h3_item">
          <h3 class="fs16">搜索数据</h3>
          <div class="fr add-btn">
            <button type="button" @click="setting_add('search')" data-toggle="modal" data-backdrop="static"
                    data-target="#type_dialog"
                    class="btn btn-primary btn-sm">添加
            </button>
          </div>
        </div>
        <div class="checking" v-for="m in search_data">
          <div v-if="m.type=='find'" class="check_content">
            <div class="check_content-header" :class="{find_color:m.type=='find'}">
              <h3 class="fs16">查询数据库 ：{{m.name}}</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm"
                        @click="search_edit(m,'search')">编辑
                </button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">model：</label>
                <div class="check_content-title">{{m.model}}</div>
              </div>
              <div class="check_content-item border">
                <label class="check_content-label">pager：</label>
                <div class="check_content-title">
                  <span>page：{{m.pager.page}}</span>
                  <span style="padding-left: 80px"></span>
                  <span>limit：{{m.pager.limit}}</span>
                </div>
              </div>
              <!--查询-->
              <div class="table-responsive" v-if="m.querys.length>0">
                <table class="table">
                  <caption>查询：</caption>
                  <thead>
                  <tr>
                    <th>字段</th>
                    <th>键</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="i in m.querys" class="table_tr">
                    <td>{{i.field}}</td>
                    <td>{{i.key}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--字段集-->
              <div class="table-responsive">
                <table class="table">
                  <caption>字段集：</caption>
                  <thead>
                  <tr>
                    <th>字段</th>
                    <th>键</th>
                    <th>数据类型</th>
                  </tr>
                  </thead>
                  <tbody v-if="m.fields.length>0">
                  <tr v-for="i in m.fields" class="table_tr">
                    <td>{{i.field}}</td>
                    <td>{{i.key}}</td>
                    <td>{{transform[i.data_type]}}</td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr class="table_tr">
                    <td colspan="3">
                      全部
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>

            </div>
          </div>
          <div v-if="m.type=='group'" class="check_content">
            <div class="check_content-header" :class="{group_color:m.type=='group'}">
              <h3 class="fs16">组合</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" data-backdrop="static" class="btn btn-primary btn-sm"
                        @click="search_edit(m,'search')">编辑
                </button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">键值：</label>
                <div class="check_content-title">{{m.key}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">新字段：</label>
                <div class="check_content-title">{{m.new_field}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.new_field1_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2名称：</label>
                <div class="check_content-title">{{m.new_field2_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">one：</label>
                <div class="check_content-title">{{m.one}}</div>
              </div>
            </div>
          </div>
          <div v-if="m.type=='get_key'" class="check_content">
            <div class="check_content-header" :class="{get_key_color:m.type=='get_key'}">
              <h3 class="fs16">获取键值</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-backdrop="static" data-target="#query" class="btn btn-primary btn-sm"
                        @click="search_edit(m,'search')">编辑
                </button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">键值：</label>
                <div class="check_content-title">{{m.key}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.new_field1_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2名称：</label>
                <div class="check_content-title">{{m.new_field2_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2_get：</label>
                <div class="check_content-title">{{m.field2_get}}</div>
              </div>

            </div>
          </div>
          <div v-if="m.type=='set_key'" class="check_content">
            <div class="check_content-header" :class="{set_key_color:m.type=='set_key'}">
              <h3 class="fs16">设置键值</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" data-backdrop="static" class="btn btn-primary btn-sm"
                        @click="search_edit(m,'search')">编辑
                </button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">键值：</label>
                <div class="check_content-title">{{m.key}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">fields：</label>
                <div class="check_content-title">{{m.fields}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.field1_name}}</div>
              </div>
            </div>
          </div>
          <div v-if="m.type=='get_value'" class="check_content">
            <div class="check_content-header" :class="{get_value_color:m.type=='get_value'}">
              <h3 class="fs16">获取值</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-backdrop="static" data-target="#query" class="btn btn-primary btn-sm"
                        @click="search_edit(m,'search')">编辑
                </button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">键值：</label>
                <div class="check_content-title">{{m.key}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">field：</label>
                <div class="check_content-title">{{m.field}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.field1_name}}</div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>

      <!--输出设置-->
      <div class="output_setting">
        <div class="h3_item">
          <h3 class="fs16">输出设置</h3>
        </div>
        <div class="outputing">
          <div class="output_content">
            <div class="output_content-header">
              <h3 class="fs16">success</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#output" data-backdrop="static" class="btn btn-primary btn-sm"
                        @click="output_eidt">编辑
                </button>
              </div>
            </div>
            <div class="output_content-items">
              <div class="output_content-item">
                <label class="output_content-label"> 类型：reduce</label>
              </div>
              <!--字段集-->
              <div class="table-responsive">
                <table class="table">
                  <caption>字段集：</caption>
                  <thead>
                  <tr>
                    <th>类型</th>
                    <th>值</th>
                    <th>数据类型</th>
                    <th>键</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="table_tr" v-for="m in output_data.success.fields">
                    <td>{{transform[m.type]}}</td>
                    <td>{{m.value}}</td>
                    <td>{{transform[m.data_type]}}</td>
                    <td>{{m.key}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="outputing">
          <div class="output_content">
            <div class="output_content-header">
              <h3 class="fs16">error</h3>
              <div class="fr add-btn">
                <button class="btn btn-primary btn-sm">编辑</button>
              </div>
            </div>
            <div class="output_content-items">
              <div class="output_content-item">
                <label class="output_content-label">类型：error</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--模型背景-->
    <div class="modal fade" id="search_setting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header header">
            <h4 class="modal-title">
              查询设置
            </h4>
            <div class="add-seach_btn">
              <button type="button" class="btn btn-primary btn-sm">添加</button>
            </div>
          </div>
          <div class="modal-body">
            <div class="body_content">
              <div class="content_item">
                <label class="col-sm-3">单行输入框：</label>
                <input type="text" class="">
              </div>
              <div class="content_item">
                <label class="col-sm-3">多行输入框：</label>
                <label>
                  <textarea name="MSG" cols="40" rows="4"></textarea>
                </label>
              </div>
              <div class="content_item">
                <label class="col-sm-3">多选框：</label>
                <span><input type="checkbox"></span>
                <span><input type="checkbox"></span>
              </div>
              <div class="content_item">
                <label class="col-sm-3">单选框：</label>
                <label class="radio-inline">
                  <input type="radio" name="optionsRadiosinline" id="optionsRadios3" value="option1" checked> 选项 1
                </label>
                <label class="radio-inline">
                  <input type="radio" name="optionsRadiosinline" id="optionsRadios4" value="option2"> 选项 2
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--确认弹窗-->
    <n-dialog v-show="dialog" :msg="tip" @sure="sureDialog" @cancel="dialog=false"></n-dialog>
    <!--设置弹窗-->
    <s-dialog :data="data" @on-setting-result-confirm="onSettingResultConfirm" :state="states"></s-dialog>
    <!--类型弹窗-->
    <t-dialog @select_type_confirm="select_type_confirm"></t-dialog>
    <!--搜索弹窗-->
    <q-dialog
      :select_type="select_type"
      :data="amend_find_data"
      :other_data="amend_other_data"
      @on-search-result-confirm="onSearchResultConfirm"
      @search_back="search_back"
      :states=states
      :search_keys="search_keys"
    >
    </q-dialog>

    <m-dialog :data="amend_message_data" @message_confirm="message_confirm"></m-dialog>

    <o-dialog :data="amend_output_data" @on-output-result="onOutputResult"></o-dialog>

    <c-dialog :collection_data="collection_data" @on-control-edit-result="onControlEditResult"></c-dialog>

  </div>

</template>

<script>
  import _ from 'lodash'
  import deal from '../utils/dataClass'
  import localEvent from '../utils/local'
  import nDialog from '../components/dialog.vue';
  import sDialog from '../components/setting_dialog.vue';
  import tDialog from '../components/type_dialog.vue';
  import qDialog from '../components/query_dialog.vue';
  import oDialog from '../components/output_dialog.vue';
  import mDialog from '../components/message_dialog.vue';
  import cDialog from '../components/collection_dialog.vue';
  import * as data from '../utils/datas';
  import axios from 'axios';
  import qs from 'qs';

  export default {
    name: 'home',
    data() {
      return {
        data_list: data.data_list,
        data_type_list: data.data_type_list,
        transform: data.transform,
        collection_index: '',
        collection_state: 'add',
        // 1.基本信息
        amend_message_data: {},
        message_data: {
          title: '',
          machine_name: '',
          path: '/xii_ui/xiiui.html',
          permission: '',
          permissions: ['read', 'write']
        },
        collection_data: '',
        //2.设置数据
        setting_add_data: [],//查询设置数据

        // 选择查询的类型
        select_type: 'find',// 选择查询类型的变量
        // 3.查询数据
        search_data: [],// 查询数据
        amend_find_data: {pager: {page: '', limit: 30}, fields: [], querys: [], keys: []},// 查询类型为find的默认数据
        amend_other_data: {},// 查询类型为其它的类型的默认数据
        search_keys: [], // 查询数据类型为find时，具体查询处的key是下拉选择
        // 4.输出数据
        amend_output_data: {},
        output_data: {
          success: {
            type: 'reduce', fields: [{type: 'statics', value: 'false', data_type: 'bool', key: 'error'},
              {type: 'statics', value: 'true', data_type: 'bool', key: 'success'},
              {type: 'body', value: 'search.group_1', data_type: 'default', key: 'data'}]
          }
        },

        // 其余的
        collection_id: '',
        tip: '',  //显示确认弹窗的文字
        dialog: false,  // 是否显示确认弹窗
        select_data: '',// 点击删除时选定的数据
        data: {},// (设置项与查询项)修改传递给组件的中间变量
        states: '',// 添加与修改的状态
        type: '',// 删除时是否为设置或者搜索的变量
      }
    },
    methods: {

      /* message信息 */
      message_confirm(data) {
        this.message_data = _.assign(this.message_data, data);
        console.log('message_data:', this.message_data);
        $('#message').modal('hide');
      },
      open_message_dialog() {
        this.amend_message_data = _.cloneDeep(this.message_data);
        $('#message').modal('show');
      },

      // setting 操作
      setting_add(type) {
        this.states = 'add';
        console.log('this.select_type2', this.select_type);

        this.search_keys = _.reduce(this.setting_add_data, function (result, li) {

          result.push({key: li.title, machine_name: li.machine_name});

          return result;
        }, []);
        console.log('this.setting_add_data:', this.setting_add_data);
      },
      onSettingResultConfirm(item) {
        if (this.states == "add") {
          item._id = deal.for_id();
          item = deal.for_title(item);
          this.setting_add_data.push(item);
        } else {
          // 修改已存在的数据
          let index = _.findIndex(this.setting_add_data, {_id: item._id});
          item = deal.for_title(item);
          this.setting_add_data[index] = _.assign(this.setting_add_data[index], item);
        }
        this.search_keys = _.reduce(this.setting_add_data, function (result, li) {
          result.push({key: li.title, machine_name: li.machine_name});
          return result;
        }, []);
        $('#setting').modal('hide');
        this.data = {};
        console.log('this.setting_add_data:', this.setting_add_data);
      },
      setting_edit(m) {
        this.states = 'edit';
        this.data = _.cloneDeep(m);
      },
      search_del(m, type) {
        // 弹窗
        this.select_data = m;
        this.dialog = true;
        this.type = type;
        this.tip = '删除后无法恢复，确认删除吗？';
      },
      sureDialog() {
        if (this.type == 'setting') {
          if (this.select_data) {
            let index = _.findIndex(this.setting_add_data, {'_id': this.select_data._id})
            if (index >= 0) {
              this.setting_add_data.splice(index, 1);
            }
          }
        } else {
          console.log('this.select_data:', this.select_data);
          if (this.select_data) {
            let index = _.findIndex(this.search_data, {'_id': this.select_data._id});
            console.log('this.index:', index);
            if (index >= 0) {
              this.search_data.splice(index, 1);
              if (this.select_data.type === 'find') {
                deal.removeKeysData(this.setting_add_data);
              }
            }
          }

        }
        this.dialog = false;
      },

      // search 操作
      // 选择类型弹窗，点击确认时调用的方法
      select_type_confirm(select_type) {

        this.select_type = select_type;
        console.log('this.select_type1', this.select_type);
        this.states = 'add';
        $('#type_dialog').modal('hide');
        $('#query').modal('show');
      },
      onSearchResultConfirm(item) {
        console.log('item:', item);
        const Super = this;
        if (this.states == 'add') {
          item = deal.for_search_title(item);
          item._id = deal.for_id();
          this.search_data.push(item);

        } else {
          item = deal.for_search_title(item);
          let index = _.findIndex(this.search_data, {_id: item._id});
          console.log('index:', index);
          if (index >= 0) {
            this.search_data[index] = _.assign(this.search_data[index], item);
          }
        }
        // 判断keys是否存在数据，如果存在数据，那么把数据显示在查询模块上
        if (item.keys && item.keys.length) {
          // 1.先获取保存数据,如果存在数据，则删除原先的，然后再加上新的
          deal.removeKeysData(Super.setting_add_data);
          deal.addKeysData(item.keys, Super.setting_add_data, item.key);
        } else {
          // 当前点击确认的数据是不是保存里的数据，是就删除，不是就不理会
          let current_data = _.find(deal.getKeysData(), {'key': item.key});
          console.log('dd:', current_data);
          if (current_data) {
            deal.removeKeysData(Super.setting_add_data);
          }
        }
        // 1.

        $('#query').modal('hide');
        this.amend_find_data = {pager: {page: '', limit: 30}, fields: [], querys: [], keys: []};
        this.amend_other_data = {};
      },
      search_back() {

        this.amend_find_data = {pager: {page: '', limit: 30}, fields: [], querys: [], keys: []};
        this.amend_other_data = {};
      },
      search_edit(m) {
        this.states = 'edit';
        this.select_type = m.type;
        console.log('key:', m);
        console.log('this.setting_add_data:', _.cloneDeep(this.setting_add_data));
        if (m.type == 'find') {
          console.log('是find:', m);

          this.search_keys = _.reduce(this.setting_add_data, function (result, li) {
//          if (li.key == m.key && m.keys.length) {
//
//          } else {
//            result.push({key: li.title, machine_name: li.machine_name});
//          }
            if (!m.keys.length) {
              result.push({key: li.title, machine_name: li.machine_name});
            }
            return result;
          }, []);
          console.log(' this.search_keys:', this.search_keys);


          this.amend_find_data = _.cloneDeep(m);
        } else {
          console.log('不是find:', m);
          this.amend_other_data = m;
        }
      },

      // output 操作
      output_eidt() {
        this.amend_output_data = _.cloneDeep(this.output_data.success);
      },
      onOutputResult(item) {
        _.assign(this.output_data.success, item);
        $('#output').modal('hide');
      },

      // 发送数据
      get_data() {
        let obj = {};
        const Super = this;
        console.log('setting_data_add:', setting_add_data);
        let setting_add_data = _.keyBy(this.setting_add_data, 'machine_name');
        console.log('setting_data_add:', setting_add_data);

        obj._id = this.collection_id;

        obj.condition = this.message_data;

        obj.query = setting_add_data;

        obj.search = this.search_data;

        obj.output = this.output_data;

        console.log('this.output_data.success:', this.output_data);

        axios.post('http://localhost:3001/test', {
          obj,
        })
          .then(function (response) {
            console.log(response);
            if (Super.collection_state == 'edit') {
              Super.collection_id = '';
              Super.collection_state = 'add'
            }
            Super.control_del();
            localEvent.editCollectionData(Super.collection_state, Super.collection_index, obj);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 删除所有数据
      control_del() {
        this.message_data = {
          title: '',
          machine_name: '',
          path: '/xii_ui/xiiui.html',
          permission: '',
          permissions: ['read', 'write']
        };
        this.setting_add_data = [];
        this.search_data = [];
        this.output_data = {
          success: {
            type: 'reduce', fields: [{type: 'statics', value: 'false', data_type: 'bool', key: 'error'},
              {type: 'statics', value: 'true', data_type: 'bool', key: 'success'},
              {type: 'body', value: 'search.group_1', data_type: 'default', key: 'data'}]
          }
        }

      },
      //获取api表里所有的数据
      control_eidt() {
        const Super = this;
        localEvent.getCollectionData(function (data) {
          Super.collection_data = data;
          $('#collection').modal('show');
        })
      },
      onControlEditResult(index) {
        console.log('index:', index);
        this.collection_index = index;
        this.collection_state = 'edit'
        let editData = this.collection_data[index];
        console.log('editData:', editData);
        this.collection_id = editData._id;
        this.message_data = editData.condition;
        this.setting_add_data = editData.query;
        this.search_data = editData.search;
        this.output_data = editData.output;
        $('#collection').modal('hide');
      }
    },
    components: {
      sDialog,
      nDialog,
      tDialog,
      qDialog,
      mDialog,
      oDialog,
      cDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
