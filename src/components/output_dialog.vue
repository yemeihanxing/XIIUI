<template>
  <div class="modal fade" id="output">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            输出
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm()">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-horizontal">
            <div class="form-group ">
              <label class="col-sm-2 control-label">类型:</label>
              <div class="col-sm-5">
                <input class="form-control" type="text"v-model="data.type">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">字段集:</label>
            </div>
            <div class="fields" v-if="data.fields">
                <div class="fields_item"v-for="m in data.fields">
                  <div class="form-group fields_label">
                    <label class="fl control-label">类型:</label>
                    <div class="col-sm-2">
                      <select class="form-control input-sm" v-model="m.type">
                        <option v-for="i in data_list" :value="i.type">{{tranform[i.type]}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">值:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.value">
                    </div>
                    <label class="fl control-label">数据类型:</label>
                    <div class="col-sm-2">
                      <select class="form-control input-sm" v-model="m.data_type">
                        <option v-for="i in data_type_list" :value="i.data_type">{{tranform[i.data_type]}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">键:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.key">
                    </div>
                    <button class="btn btn-danger btn-sm">删除</button>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['data',],
    data(){
      return{
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
      }
    },
    methods:{
      back(){
        $('#output').modal('hide');
      },
      confirm(){
           console.log('data:',this.data);
           this.$emit('on-output-result',this.data);

      }
    }
  }
</script>
<style>
</style>
