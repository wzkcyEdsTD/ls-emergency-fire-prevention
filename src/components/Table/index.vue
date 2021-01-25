<template>
  <div>
    <div class="el-table">
      <div class="thead">
        <span v-for="(item,index) in colName" :key="index" class="col-title">{{ item }}</span>
      </div>
      <div class="tbody">
        <div v-for="(item,index) in tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="tr">
          <slot :item="item" />
        </div>
      </div>
    </div>
    <div class="pager-box">
      <el-pagination
        background
        :page-size="pageSize"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="tableData.length"
        @current-change="handleCurrentPage"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Table',
  props: {
    colName: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    handleCurrentPage(val) {
      this.currentPage = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table {
    width: 1466px;
    // height: 70vh;
    text-align: center;
    border-bottom: 0;
    border-top:1px solid #29AEEA;
    background:#1C5B99;
    margin-bottom: 3.6vh;
    .thead {
      display: flex;
      width: 100%;
      .col-title{
        display: inline-block;
        height: 5.6vh;
        line-height: 5.83vh;
        flex: 1;
        border-right:1px solid #29AEEA;
        background:rgb(18, 118, 216);
        color:#fff;
        font-size: 20px;
      }
    }
    .tbody {
      padding: 0;
    }
    .tbody .tr{
      width: 100%;
      display: flex;
      margin-bottom: 1.7vh;
      .value {
        flex: 1;
        background:#1C5B99;
        color:#8FC8FC;
        text-align:center;
        height:4.50vh;
        line-height: 4.60vh;
        border-left:1px solid rgba(41,174,234,1);
        border-top:1px solid rgba(41,174,234,1);
        border-bottom:1px solid rgba(41,174,234,1);
      }
      .value:last-child {
        border-right: 1px solid rgba(41,174,234,1);
      }
    }
    .tbody .tr:last-child {
        margin-bottom: 0;
    }
  }
  .el-pagination {
    display: flex;
    justify-content: center;
  }
  .pager-box >>> button{
    background-color: transparent !important;
    color: #B4C2DC !important;
    border: 1px solid #0672C4;
    width: 32px;
    height: 32px;
  }
  .pager-box >>> button:hover {
      background-color: #1276D8 !important;
      color: #fff;
  }
  .pager-box >>>  .el-icon:hover {
    color:#fff
  }
  .pager-box >>> .el-pager li {
    background-color: transparent !important;
    color: #1276D8;
    width: 32px;
    height: 32px;
    line-height: 32px;
  }
  .pager-box >>> .el-pager li:hover {
    background-color: #0672C4 !important;
    color:#fff;
  }
  .pager-box >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0672C4 !important;
  }
</style>
