<template>
  <div class="modal fade"id="collection">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">api表</h4>
          <div class="collection-btn">
             <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
         </div>
      </div>
        <div class="modal-body collection_content">
          <div class="table-responsive">
            <table class="table">
              <caption>api表的数据：</caption>
              <thead>
              <tr>
                <th>名称</th>
                <th>机械名称</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr class="table_tr"v-for="(value,key) in collection_data">
                <td>{{value.condition.title}}</td>
                <td>{{value.condition.machine_name}}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-sm"@click="edit(key)">编辑</button> |
                  <button type="button" class="btn btn-danger btn-sm">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props:['collection_data'],
        data(){
            return{}
        },
        methods:{
          back(){
            $('#collection').modal('hide');
          },
          edit(index){
            this.$emit('on-control-edit-result',index);
          }
        }
    }
</script>
<style>
</style>
