<template>
  <div>
    <header class="header_content">
      <div class="container">
        <h1>管理控制台</h1>
        <span class="s_id">(59771540fe55320b9c0c30d7)</span>
        <div class="fr">
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm">删除</button>
          </a>
          <a href="javascript:;">
            <button type="button" class="btn btn-primary btn-sm">保存</button>
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
            <button typeof="button" @click="search_add" data-toggle="modal" data-backdrop="static"
                    data-target="#setting" class="btn btn-primary btn-sm">添加
            </button>
          </div>
        </div>
        <div class="panel-table"v-if="search_add_data.length>0">
          <table class="table table-striped text-center">
            <thead>
            <tr>
              <th>名称</th>
              <th>产品</th>
              <th>数量</th>
              <th>操作</th>
            </tr>
            </thead>
            <thead>
            <tr v-for="m in search_add_data"class="table_tr">
              <td>{{m.name}}<span v-if="m.request"class="red"> (必须)</span></td>
              <td>{{m.type}}</td>
              <td>{{m.data_type}}</td>
              <td>
                <a data-toggle="modal" data-target="#setting" class="edit" @click="setting_edit(m)">编辑</a> |
                <a href="javascript:;" class="del" @click="search_del(m,'setting')">删除</a>
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

      <!--查询数据-->
      <div class="check_data">
        <div class="h3_item">
          <h3 class="fs16">查询数据</h3>
          <div class="fr add-btn">
            <button type="button" @click="search_add" data-toggle="modal" data-backdrop="static" data-target="#type_dialog"
                    class="btn btn-primary btn-sm">添加
            </button>
          </div>
        </div>
        <div class="checking" v-for="m in search_data">
          <div v-if="m.type=='find'" class="check_content">
              <div class="check_content-header">
                <h3 class="fs16">查询：{{m.name}}</h3>
                <div class="fr add-btn">
                  <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm" @click="search_edit(m,'search')">编辑</button>
                  <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
                </div>
              </div>
              <div class="check_content-items">
                <div class="check_content-item">
                  <label class="check_content-label">类型：</label>
                  <div class="check_content-title">{{m.type}}</div>
                </div>
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
                <div class="table-responsive"v-if="m.query.length!=0">
                  <table class="table">
                      <caption>查询：</caption>
                    <thead>
                    <tr>
                      <th>字段</th>
                      <th>键</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="i in m.query"class="table_tr">
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
            <div class="check_content-header">
              <h3 class="fs16">group</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm" @click="search_edit(m,'search')">编辑</button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">类型：</label>
                <div class="check_content-title">{{m.type}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1：</label>
                <div class="check_content-title">{{m.field1}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.field1_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2：</label>
                <div class="check_content-title">{{m.field2}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2名称：</label>
                <div class="check_content-title">{{m.field2_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">新字段：</label>
                <div class="check_content-title">{{m.new_field}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">one：</label>
                <div class="check_content-title">{{m.one}}</div>
              </div>
            </div>
          </div>
          <div v-if="m.type=='get_key'" class="check_content">
            <div class="check_content-header">
              <h3 class="fs16">get_key</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm" @click="search_edit(m,'search')">编辑</button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">类型：</label>
                <div class="check_content-title">{{m.type}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1：</label>
                <div class="check_content-title">{{m.field1}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段1名称：</label>
                <div class="check_content-title">{{m.field1_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2：</label>
                <div class="check_content-title">{{m.field2}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2名称：</label>
                <div class="check_content-title">{{m.field2_name}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">字段2_get：</label>
                <div class="check_content-title">{{m.field2_get}}</div>
              </div>
              <div class="check_content-item">
                <label class="check_content-label">新字段：</label>
                <div class="check_content-title">{{m.new_field}}</div>
              </div>
            </div>
          </div>
          <div v-if="m.type=='set_key'" class="check_content">
            <div class="check_content-header">
              <h3 class="fs16">set_key</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm" @click="search_edit(m,'search')">编辑</button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">类型：</label>
                <div class="check_content-title">{{m.type}}</div>
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
            <div class="check_content-header">
              <h3 class="fs16">get_value</h3>
              <div class="fr add-btn">
                <button data-toggle="modal" data-target="#query" class="btn btn-primary btn-sm" @click="search_edit(m,'search')">编辑</button>
                <button href="javascript:;" class="btn btn-danger btn-sm" @click="search_del(m,'search')">删除</button>
              </div>
            </div>
            <div class="check_content-items">
              <div class="check_content-item">
                <label class="check_content-label">类型：</label>
                <div class="check_content-title">{{m.type}}</div>
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
                <button data-toggle="modal" data-target="#output" class="btn btn-primary btn-sm"@click="output_eidt">编辑</button>
              </div>
            </div>
            <div class="output_content-items">
              <div class="output_content-item">
                <label class="output_content-label">类型：</label>
                <div class="output_content-title">reduce</div>
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
                  <tr class="table_tr"v-for="m in output_data.success.fields">
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
                <button data-toggle="modal" data-target="#output" class="btn btn-primary btn-sm">编辑</button>
              </div>
            </div>
            <div class="output_content-items">
              <div class="output_content-item">
                <label class="output_content-label">类型：</label>
                <div class="output_content-title">error</div>
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
    <n-dialog v-show="dialog" :msg="tips" @sure="sureDialog" @cancel="dialog=false"></n-dialog>
     <!--设置弹窗-->
    <s-dialog :data="data" @confirm="confirm" :state="states"></s-dialog>
     <!--类型弹窗-->
    <t-dialog @select_type_confirm="select_type_confirm"></t-dialog>
     <!--搜索弹窗-->
    <q-dialog
      :select_type="select_type"
      :data="amend_find_data"
      :other_data="amend_other_data"
      @on-result-confirm="onResultConfirm"
      @search_back="search_back"
      :item_key = item_key
      :states=states>
    </q-dialog>

    <m-dialog :data="amend_message_data"@message_confirm="message_confirm"></m-dialog>

    <o-dialog :data="amend_output_data"@on-output-result="onOutputResult"></o-dialog>

  </div>

</template>

<script>
  import _ from 'lodash'
  import deal from '../utils/dataClass'
  import nDialog from '../components/dialog.vue';
  import sDialog from '../components/setting_dialog.vue';
  import tDialog from '../components/type_dialog.vue';
  import qDialog from '../components/query_dialog.vue';
  import oDialog from '../components/output_dialog.vue';
  import mDialog from '../components/message_dialog.vue';

  export default {
    name: 'home',
    data() {
      return {
        data_list: [{type: 'query'}, {type: 'statics'}, {type: 'body'}, {type: 'login'}, {type: 'NULL'}],
        data_type_list: [{data_type: 'string'},
          {data_type: 'NULL'}, {data_type: 'array'},
          {data_type: 'objectId'},
          {data_type: 'number'},
          {data_type: 'int'},
          {data_type: 'json'},
          {data_type: 'default'},
          {data_type: 'boolean'}],
        transform: {
          'string': '字符串', 'int': '整型', 'NULL': '空', 'array': '数组', 'objectId': 'objectId', 'number': '数字',
          'json': 'json', 'default': 'default', 'boolean': '布尔类型', 'body': 'body值', 'statics': '固定值', 'query': '查询',
          'login': '登陆用户ID', 'search': '搜索获取','read':'读','write':'写','':''
        },
        select_data: '',
        tip: '',
        data:{},
        amend_message_data:{},
        message_data:{title:'公司',machine_name:'机器名',path:'/xii_ui/xiiui.html',permission:'',permissions:['read','write']},
        search_add_data: [],//查询设置数据
        search_data: [],// 查询数据
        output_data:{success:{type:'reduce',fields:[{type: 'statics', value: 'false', data_type: 'boolean', key: 'error'},
          {type: 'statics', value: 'true', data_type: 'boolean', key: 'success'},
          {type: 'statics', value: 'search.set_key.0', data_type: 'default', key: 'data'}]},error:{type:'output'}},
        showDialog: false,
        dialog: false,
        tips: '',
        amend_find_data: {pager: {page: '', limit: 30}, fields: [], query: []},
        amend_other_data: {},
        detail_data: {},
        amend_output_data:{},
        select_type: '',
        states: '',
        type: '',
        item_key:0,
      }
    },
    methods: {
      /* message信息 */
      message_confirm(data){
        this.message_data = _.assign(this.message_data,data);
        console.log('message_data:',this.message_data);
        $('#message').modal('hide');
      },
      open_message_dialog(){
         this.amend_message_data = _.cloneDeep(this.message_data);
        $('#message').modal('show');
      },

      search_add() {

        this.states = 'add';
      },
      confirm(item) {
        if (this.states == "add") {
          item._id = deal.for_id();
          this.search_add_data.push(item);
          this.search_add_data = deal.for_title(this.search_add_data);
        } else {
          // 修改已存在的数据
          let index = _.findIndex(this.search_add_data, {_id: item._id});
          this.search_add_data[index] = _.assign(this.search_add_data[index], item);
          this.search_add_data = deal.for_title(this.search_add_data);
        }
        $('#setting').modal('hide');
        this.data = {};
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
        this.tips = '删除后无法恢复，确认删除吗？';
      },
      sureDialog() {
        if (this.type == 'setting') {
          if (this.select_data) {
            let index = _.findIndex(this.search_add_data, {'_id': this.select_data._id})
            if (index >= 0) {
              this.search_add_data.splice(index, 1);
            }
          }
        } else {
          console.log('this.select_data:', this.select_data);
          if (this.select_data) {
            let index = _.findIndex(this.search_data, {'_id': this.select_data._id});
            console.log('this.index:', index);
            if (index >= 0) {
              this.search_data.splice(index, 1);
            }
          }

        }
        this.dialog = false;
      },

      // 选择类型弹窗，点击确认时调用的方法
      select_type_confirm(select_type){

       this.select_type = select_type;
       this.states = 'add';
       if(select_type=='find'){
         this.item_key = this.item_key + 1;
       }
        $('#type_dialog').modal('hide');
        $('#query').modal('show');
      },

      onResultConfirm(item,key) {
        console.log('item:', item);

        if (this.states == 'add') {
          item = deal.for_search_title(item);
          item._id = deal.for_id();
          this.search_data.push(item);

        } else {
          if(item.type=='find'){
            item = deal.for_search_title(item);
          }
          let index = _.findIndex(this.search_data, {_id: item._id});
          console.log('index:', index);
          if (index >= 0) {
            this.search_data[index] = _.assign(this.search_data[index], item);
          }
        }
        $('#query').modal('hide');
        this.amend_find_data = {pager: {page: '', limit: 30}, fields: [], query: []};
        this.amend_other_data = {};
      },
      search_back(key) {
        this.amend_find_data = {pager: {page: '', limit: 30}, fields: [], query: []};
        this.amend_other_data = {};
      },
      search_edit(m) {
        this.states = 'edit';
        this.select_type = m.type;
        if (m.type == 'find') {
          console.log('是find:', m);
          this.amend_find_data = _.cloneDeep(m);
        } else {
          console.log('不是find:', m);
          this.amend_other_data = m;
        }
      },

      output_eidt(){
        this.amend_output_data = _.cloneDeep(this.output_data.success);
      },
      onOutputResult(item){
        _.assign(this.output_data.success,item);
        $('#output').modal('hide');
      }
    },
    components: {
      sDialog,
      nDialog,
      tDialog,
      qDialog,
      mDialog,
      oDialog,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #337ab7;
  }
</style>
