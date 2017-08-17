<template>
  <div class="modal fade" id="message">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            修改参数
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-sm-2 control-label">名称<span class="red">*</span>:</label>
              <div class="col-sm-5">
                 <input type="text"class="form-control"v-model="data.title">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">机器名称<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <input type="text"class="form-control"v-model="data.machine_name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">地址<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <input type="text"class="form-control"v-model="data.path">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">权限<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <select class="form-control input-sm"v-model="data.permission">
                  <option v-for="m in data.permissions":value="m">{{tranform[m]}}</option>
                </select>
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
    props:['data'],
    data(){
      return {
        tranform:{read:'读',write:'写'}
      }
    },
    methods:{
      back(){
        $('#message').modal('hide');
      },
      confirm(){
        console.log('this.data:',this.data);
        this.$emit('message_confirm',this.data);
      }
    }
//    computed:{
//      getData:function () {
//        return this.item = this.data;
//      }
//    }
  }
</script>
<style>
</style>
