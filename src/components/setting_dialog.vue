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
                <select class="form-control input-sm" v-model="item.type" :value="getData"@change="gradeChange">
                  <option v-for="m in data_list" :value="m.type">{{transform[m.type]}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">数据类型<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <select class="form-control input-sm" v-model="item.data_type">
                  <option v-for="m in data_type_list" :value="m.data_type">{{transform[m.data_type]}}</option>
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
              <label class="col-sm-2 control-label">机械名称<span class="red">*</span>:</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" v-model="item.machine_name">
              </div>
            </div>
            <div class="form-group"v-if="showValue">
              <label class="col-sm-2 control-label">默认值:</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" v-model="item.value">
              </div>
            </div>

            <div class="form-group" v-if="showRequest">
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
    <n-tip :tip="tip"></n-tip>
  </div>
</template>
<script>
  import $ from 'jquery';
  import nTip from '../components/tip.vue';
  import dataClass from '../utils/dataClass';
  import * as data from '../utils/datas';
  export default {
    props: ['data','state'],
    data() {
      return {
        data_list: data.data_list,
        transform: data.transform,
        data_type_list: data.data_type_list,
        item: {},
        ins:false,
        hover:'',
        index:0,
        tip:'',
        showValue:true,
        showRequest:true,
      }
    },
    methods: {
      confirm() {

       // 把必填写的进行判断
       if(!this.item.type || !this.item.data_type || !this.item.title || !this.item.machine_name){
      //  提示用户填写完整
         this.tip = '必要信息没有填写完整';
         dataClass.showTip();
         return ;
       }
        this.item.request = this.ins;
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
      },
      gradeChange(){
        console.log('item.tpe:',this.item.type);
        if(this.item.type=='login'){
          this.showValue = false;
        }else{
          this.showValue = true;
        }
        if(this.item.type=='statics'){
          this.showRequest = false;
        }else{
          this.showRequest = true;
        }
      }
    },

    computed: {
      getData: function () {
        this.ins = this.data.request;
        return this.item = this.data;
      }
    },

    components: {
    nTip
  }
  }
</script>
<style>
  #ceshi .item {
    border: 0;
    box-shadow: none;
  }
</style>
