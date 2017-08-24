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
                <label class="control-label">{{data.type}}</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">字段集:</label>
            </div>
            <div class="fields" v-if="data.fields">
                <div class="fields_item"v-for="(m,i) in data.fields">
                  <div class="form-group fields_label">
                    <label class="fl control-label">类型:</label>
                    <div class="col-sm-2">
                      <select class="form-control input-sm" v-model="m.type">
                        <option v-for="i in data_list" :value="i.type">{{transform[i.type]}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">值:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.value">
                    </div>
                    <label class="fl control-label">数据类型:</label>
                    <div class="col-sm-2">
                      <select class="form-control input-sm" v-model="m.data_type">
                        <option v-for="i in data_type_list" :value="i.data_type">{{transform[i.data_type]}}</option>
                      </select>
                    </div>
                    <label class="fl control-label">键:</label>
                    <div class="col-sm-2">
                      <input type="text" class="form-control" v-model="m.key">
                    </div>
                    <button class="btn btn-danger btn-sm"@click="del(i)">删除</button>
                  </div>
                </div>
              </div>

          </div>
          <button class="btn btn-primary btn-sm output_btn-add"@click="add">添加</button>
        </div>
      </div>
    </div>
    <n-dialog @cancel="cancel"@sure="sure":msg="tip"v-if="showDialog"></n-dialog>
    <n-tip :tip="tip"></n-tip>
  </div>
</template>
<script>
   import nDialog from '../components/dialog.vue'
   import nTip from '../components/tip.vue'
   import _ from 'lodash';
   import data_class from '../utils/dataClass'
   import * as data from '../utils/datas'
  export default {
    props:['data',],
    data(){
      return{
        data_list: data.data_list,
        transform: data.transform,
        data_type_list: data.data_type_list,
        showDialog:false,
        select_i:'',
        tip:''
      }
    },
    methods:{
      back(){
        $('#output').modal('hide');
      },
      confirm(){
        let fields_value = false;
        let breakOut  = false
           if(this.data.fields.length>0){
             _.forEach(this.data.fields,function (li) {
               if(!breakOut){
                 if(!li.type || !li.value || !li.data_type || !li.key){
                   fields_value = true;
                   breakOut = true;
                 }
               }
             })
             console.log('fields_value:',fields_value);
             if(fields_value){
               this.tip = '字段集信息没有填写完整';
               data_class.showTip();
               return;
             }
           }

           this.$emit('on-output-result',this.data);
      },
      add(){
        this.data.fields.push({
          type:'',
          data_type:'',
          value:'',
          key:''
        })
      },
      del(i){
//        this.data.fields.splice(i,1);
        let del_data =this.data.fields[i];
        console.log('del_data:',del_data);
        console.log('this.data.fields[i]:',this.data.fields[i]);
        if(!del_data.type && !del_data.value && !del_data.data_type && !del_data.key){
          this.data.fields.splice(i,1);
        }else{
          this.select_i = i;
          this.tip = '确认要删除吗？删除后无法恢复!';
          this.showDialog = true;
        }

      },
      cancel(){
        this.showDialog = false
      },
      sure(){
        this.data.fields.splice(this.select_i,1);
        this.showDialog = false;
      }
    },
    components:{
      nDialog,
      nTip
    }
  }
</script>
<style>
</style>
