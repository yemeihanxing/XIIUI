<template>
  <div class="modal fade" id="setting">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            修改设置
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-sm-2 control-label">类型<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <select class="form-control input-sm" v-model="item.type" :value="getData">
                  <option v-for="m in data_list" :value="m.type">{{tranform[m.type]}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">数据类型<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <select class="form-control input-sm" v-model="item.data_type">
                  <option v-for="m in data_type_list" :value="m.data_type">{{tranform[m.data_type]}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">名称<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <input class="form-control" type="text" v-model="item.title">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">值:</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" v-model="item.value">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">机器名称<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" v-model="item.machine_name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">请求:</label>
              <div class="col-sm-5 sport">
                <!--<input type="text"class="form-control"v-model="item.request">-->
                <div class="checkbox" name="sport" value="basketball">
                  <ins
                    @click="requestClick()"
                    @mouseout="hoverOut()"
                    @mouseover="hoverOver()"
                    :class="{'checked':ins,'hover':hover}"></ins>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {
        data_list: [{type: 'query'}, {type: 'statics'}, {type: 'body'}, {type: 'login'}, {type: 'NULL'}],
        tranform: {
          'string': '字符串', 'int': '整型', 'NULL': '空', 'array': '数组', 'objectId': 'objectId', 'number': '数字',
          'json': 'json', 'default': 'default', 'boolean': '布尔类型', 'body': 'body值', 'statics': '固定值', 'query': '查询',
          'login': '登陆用户ID', 'search': '搜索获取'
        },
        data_type_list: [{data_type: 'string'},
          {data_type: 'NULL'}, {data_type: 'array'},
          {data_type: 'objectId'},
          {data_type: 'number'},
          {data_type: 'int'},
          {data_type: 'json'},
          {data_type: 'default'},
          {data_type: 'boolean'}],
        item: {data: '', data_type: '', title: ''},
        ins:'',
        hover:'',
        index:0
      }
    },
    methods: {
      confirm() {
        this.index++;
        this.item.request = this.ins;
        this.item.machine_name = this.item.machine_name +'_'+ this.index.toString();
        this.$emit('confirm', this.item);
        this.item = {};
        this.ins = false;
        $('#setting').modal('hide')
      },
      back() {
        $('#setting').modal('hide');
        this.item = {};
        this.ins = false;
      },
      requestClick() {
        this.ins = !this.ins;
        if(this.ins){
          this.hover = true
        }else {
          this.hover = false;
        }

      },
      hoverOut() {
        this.hover = false
      },
      hoverOver() {
         this.hover = true;
      }
    },

    computed: {
      getData: function () {
        this.ins = this.data.request;
        return this.item = this.data;
      }
    }
  }
</script>
<style>
  #ceshi .item {
    border: 0;
    box-shadow: none;
  }
</style>
