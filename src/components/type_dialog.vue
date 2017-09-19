<template>
  <div class="modal fade" id="type_dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            查询设置
          </h4>
          <div class="add-seach_btn">
            <button type="button" class="btn btn-primary btn-sm" @click="back">返回</button>
            <button type="button" class="btn btn-primary btn-sm" @click="confirm">确认</button>
          </div>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form">
              <table class="table">
                <caption>类型：</caption>
                <tbody>
                <tr class="radio_item table_color" v-for="(m,key) in data_list" :class="{'success':ins===key}"name="sex" value="m.type"@click="r_click(key)">
                  <td><span>{{tranform[m.type]}}</span></td>
                  <td class="text-right">
                    <ins
                    @mouseout="hoverOut(key)"
                    @mouseover="hoverOver(key)"
                    :class="{'checked':ins===key,'hover':hover===key}"></ins>
                  </td>
                </tr>
                </tbody>
              </table>
          </form>
        </div>
      </div>
    </div>
    <!--<n-dialog v-show="dialog" :msg="tips" @sure="sureDialog" @cancel="dialog=false"></n-dialog>-->
  </div>
</template>
<script>
  import {transform} from '../utils/datas'
  export default {
    data() {
      return {
        data_list: [{type: 'find',ins:0},
          {type: 'group',ins:1},
          {type: 'get_key',ins:2},
          {type: 'set_key',ins:3},
          {type: 'get_value',ins:4}],
        tranform:transform ,
        ins:-1,
        hover: '',
      }
    },
    methods: {
      back() {
        $('#type_dialog').modal('hide');
        this.ins = -1;
        this.hover = '';
      },
      confirm() {

        let select_type;

        if(this.ins!=-1){
           let index = _.findIndex(this.data_list,{'ins':this.ins});
           select_type = this.data_list[index].type;
           this.$emit('select_type_confirm',select_type)
           this.ins = -1;
        }else{
          return;
        }
     // this.$omit调父控件的方法，并把选定的值传给home中

      },
      r_click(key) {
        this.ins = key;
      },
      hoverOver(key) {
        console.log('key:', key);
        this.hover = key
      },
      hoverOut(key) {
        this.hover = '';
      }
    }
  }
</script>
<style>
</style>
