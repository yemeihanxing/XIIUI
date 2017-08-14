<template>

  <div class="modal fade" id="details">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header header">
          <h4 class="modal-title">
            参数说明
          </h4>
        </div>
        <div class="modal-body">
          <div class="type_find_items"v-if="detail_data.type=='find'">
            <div v-show="type=='find'">
              <div class="type_find_item">
                <label class="type_find_label fl">type：</label>
                <p>{{detail_data.type}}</p>
              </div>
              <div class="type_find_item">
                <label class="type_find_label fl">data_type：</label>
                <p>{{detail_data.data_type}}</p>
              </div>
              <div class="type_find_item">
                <label class="type_find_label fl">title：</label>
                <p>{{detail_data.title}}</p>
              </div>
              <div class="type_find_item">
                <label class="type_find_label fl">key：</label>
                <p>{{detail_data.key}}</p>
              </div>
              <div class="type_find_item">
                <label class="type_find_label fl">model：</label>
                <p>{{detail_data.model}}</p>
              </div>
            </div>
            <div v-show="type=='pager'">
              <div class="type_find_item">
                <label class="type_find_label fl">page：</label>
                <p>{{detail_data.pager.page}}</p>
              </div>
              <div class="type_find_item">
                <label class="type_find_label fl">limit：</label>
                <p>{{detail_data.pager.limit}}</p>
              </div>
            </div>
            <div v-show="type=='fields'"class="type_find_fields">
              <div>
                <h4>fields：</h4>
              </div>
              <div class="type_find_field"v-for="m in detail_data.fields">
                <div class="type_find_item">
                  <label class="type_find_label fl">field：</label>
                  <p>{{m.field}}</p>
                </div>
                <div class="type_find_item">
                  <label class="type_find_label fl">key：</label>
                  <p>{{m.key}}</p>
                </div>
                <div class="type_find_item">
                  <label class="type_find_label fl">data_type：</label>
                  <p>{{m.data_type}}</p>
                </div>
              </div>
            </div>
            <div v-show="type=='query'"class="type_find_query">
              <div>
                <h4>query：</h4>
              </div>
              <div class="type_find_query_item"v-for="i in detail_data.query">
                <div class="type_find_item">
                  <label class="type_find_label fl">field：</label>
                  <p>{{i.field}}</p>
                </div>
                <div class="type_find_item">
                  <label class="type_find_label fl">key：</label>
                  <p>{{i.key}}</p>
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
   props:['detail_data','type']
  }
</script>
<style>
</style>
