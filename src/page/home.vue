<template>
  <div>
    <header class="header_content">
      <div class="container">
        <h1>管理控制台</h1>
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
          <div class="col-md-6">
            <label>名称：</label>
            <a class="javascript:;"><span>春日知白健康科技有限公司</span></a>
          </div>
          <div class="col-md-6">
            <label>地址：</label>
            <a class="javascript:;"><span>/xii-ui/xii_ui.html</span></a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>ID：</label>
            <a class="javascript:;"><span>59771540fe55320b9c0c30d7</span></a>
          </div>
          <div class="col-md-6">
            <label>权限：</label>
            <a class="javascript:;"><span>修改权限</span></a>
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
              <td :class="{'red':m.request}">{{m.name}}</td>
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

        <!--<div class="checking" v-for="m in search_add_data">-->
        <!--<div class="check_content">-->
        <!--<div class="check_item">-->
        <!--<label>名称：</label>-->
        <!--<span>{{m.name}}</span>-->
        <!--</div>-->
        <!--<div class="check_item">-->
        <!--<label>类型：</label>-->
        <!--<span>{{tranform[m.type]}}</span>-->
        <!--</div>-->
        <!--<div class="check_item">-->
        <!--<label>数据类型：</label>-->
        <!--<span>{{tranform[m.data_type]}}</span>-->
        <!--</div>-->
        <!--<div class="check_item">-->
        <!--<label>操作:</label>-->
        <!--<a data-toggle="modal" data-target="#setting" class="edit" @click="setting_edit(m)">编辑</a> |-->
        <!--<a href="javascript:;" class="del" @click="search_del(m,'setting')">删除</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div>-->
        <!--</div>-->
        <!--</div>-->


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
            <div class="check_item">
              <label>类型：</label>
              <a data-toggle="modal" data-target="#query"  @click="search_edit(m)"><span>find</span></a>
            </div>
            <div class="check_item">
              <label>pager：</label>
              <a data-toggle="modal" data-target="#query"  @click="search_edit(m)"><span>页</span></a>
            </div>
            <div class="check_item">
              <label>fields：</label>
              <a data-toggle="modal" data-target="#query"  @click="search_edit(m)"><span>字段集</span></a>
            </div>
            <div class="check_item">
              <label>query：</label>
              <a data-toggle="modal" data-target="#query"  @click="search_edit(m)"><span>查找</span></a>
            </div>
            <div class="item">
              <label>操作:</label>
              <a data-toggle="modal" data-target="#query" class="edit" @click="search_edit(m,'search')">编辑</a> |
              <a href="javascript:;" class="del" @click="search_del(m,'search')">删除</a>
            </div>
          </div>
          <div v-if="m.type=='group'" class="check_content">
            <div class="check_item">
              <label>类型：</label>
              <a data-toggle="modal" data-target="#query" @click="search_edit(m)"><span>{{m.type}}</span></a>
            </div>
            <div class="item">
              <label>操作:</label>
              <a data-toggle="modal" data-target="#query" class="edit" @click="search_edit(m)">编辑</a> |
              <a href="javascript:;" class="del" @click="search_del(m,'search')">删除</a>
            </div>
          </div>
          <div v-if="m.type=='get_key'" class="check_content">
            <div class="check_item">
              <label>类型：</label>
              <a data-toggle="modal" data-target="#query" @click="search_edit(m)"><span>{{m.type}}</span></a>
            </div>
            <div class="item">
              <label>操作:</label>
              <a data-toggle="modal" data-target="#query" class="edit" @click="search_edit(m)">编辑</a> |
              <a href="javascript:;" class="del" @click="search_del(m,'search')">删除</a>
            </div>
          </div>
          <div v-if="m.type=='set_key'" class="check_content">
            <div class="check_item">
              <label>类型：</label>
              <a data-toggle="modal" data-target="#query"  @click="search_edit(m)"><span>{{m.type}}</span></a>
            </div>
            <div class="item">
              <label>操作:</label>
              <a data-toggle="modal" data-target="#query" class="edit" @click="search_edit(m)">编辑</a> |
              <a href="javascript:;" class="del" @click="search_del(m,'search')">删除</a>
            </div>
          </div>
          <div v-if="m.type=='get_value'" class="check_content">
            <div class="check_item">
              <label>类型：</label>
              <a data-toggle="modal" data-target="#query"@click="search_edit(m)"><span>{{m.type}}</span></a>
            </div>
            <div class="item">
              <label>操作:</label>
              <a data-toggle="modal" data-target="#query" class="edit" @click="search_edit(m)">编辑</a> |
              <a href="javascript:;" class="del" @click="search_del(m,'search')">删除</a>
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
        <div class="outputting">
          <div>输出什么</div>
          <div>输出什么</div>
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
    <s-dialog :data="data" @confirm="confirm"></s-dialog>
     <!--类型弹窗-->
    <t-dialog @select_type_confirm="select_type_confirm"></t-dialog>
     <!--搜索弹窗-->
    <q-dialog
      :select_type="select_type"
      :data="amend_find_data"
      :other_data="amend_other_data"
      @on-result-confirm="onResultConfirm"
      @search_back="search_back"></q-dialog>

    <!--<n-details v-show="details_show" :detail_data="detail_data" :type="show_detail_type"></n-details>-->
    <!--<n-test :data="data"@ceshi="ceshi"></n-test>-->
    <!--<button @click="btn">点击父传值给子了</button>-->
  </div>

</template>

<script>
  import _ from 'lodash'
  import deal from '../utils/dataClass'
  import nDialog from '../components/dialog.vue';
  import sDialog from '../components/setting_dialog.vue';
  import tDialog from '../components/type_dialog.vue';
  import qDialog from '../components/query_dialog.vue';

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
        tranform: {
          'string': '字符串', 'int': '整型', 'NULL': '空', 'array': '数组', 'objectId': 'objectId', 'number': '数字',
          'json': 'json', 'default': 'default', 'boolean': '布尔类型', 'body': 'body值', 'statics': '固定值', 'query': '查询',
          'login': '登陆用户ID', 'search': '搜索获取'
        },
        select_data: '',
        tip: '',
        search_add_data: [],
        search_data: [],
        showDialog: false,
        dialog: false,
        tips: '',
        data: {},
        amend_find_data: {model:'',pager: {page: '', limit: 30}, fields: [], query: []},
        amend_other_data: {},
        detail_data: {},
        select_type: '',
        states: '',
        type: '',
      }
    },
    methods: {
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
       console.log('select_type:',select_type);
       this.select_type = select_type;
       this.states = 'add';
        $('#type_dialog').modal('hide');
        $('#query').modal('show');
      },

      onResultConfirm(item) {
        console.log('item:', item);
        if (this.states == 'add') {
          item._id = deal.for_id();
          this.search_data.push(item);
        } else {
          let index = _.findIndex(this.search_data, {_id: item._id});
          console.log('index:', index);
          if (index >= 0) {
            this.search_data[index] = _.assign(this.search_data[index], item);
          }
        }
        $('#query').modal('hide');
        this.amend_find_data = {model:'',pager: {page: '', limit: ''}, fields: [], query: []};
        this.amend_other_data = {};
      },
      search_back() {
        this.amend_find_data = {model:'',pager: {page: '', limit: ''}, fields: [], query: []};
        this.amend_other_data = {};
      },
      search_edit(m) {
        this.states = 'edit';
        this.select_type = m.type;
        if (m.type == 'find') {
          console.log('是find:', m);
          this.amend_find_data = m;
        } else {
          console.log('不是find:', m);
          this.amend_other_data = m;
        }
      },
    },
    components: {
      sDialog,
      nDialog,
      tDialog,
      qDialog
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
