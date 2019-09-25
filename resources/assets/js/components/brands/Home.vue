<template>
	<div>
      <router-link to="/brand/new"> <el-button type="primary">新增</el-button></router-link>

      <el-table :data="brands" style="width: 100%" text-align:center>
            <el-table-column label="品牌ID"   prop="id"></el-table-column>
            <el-table-column label="缩略图"   prop="image">
                 <template slot-scope="scope">
                 <img :src="scope.row.image" class="thumb" height="50px" width="50px">
                 </template>
            </el-table-column>
            <el-table-column label="品牌名称"   prop="name"></el-table-column>
            <el-table-column label="品牌网址"   prop="url"></el-table-column>
            <el-table-column label="描述信息"   prop="description"></el-table-column>
            <el-table-column label="排序"  prop="sort_order"></el-table-column>

            <el-table-column label="是否显示"  prop="is_show">
                <template slot-scope="scope">
                    <i :class="scope.row.is_show | checkOrClose"></i>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="mini"
                    type="danger"

                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
<!--                    给分页组件绑定页面切换事件，页面切换则触发：更改当前需要显示的页面参数-->
                </template>
            </el-table-column>


      </el-table>
      <el-pagination
              background
              layout="prev, pager, next"
              :total= "page.total"
              :page-size= "page.pageSize"
              @current-change = "handleCurrentChange">

      </el-pagination>
    </div>
</template>


<script>
  export default {
      data() {
          return {
              brands: [],
              //定义分页的总
              page: {
                  total: 0,
                  pageSize: 0,
                  current_page:1

              }
          }
      },
      //显示是否对勾的图标
      filters: {
          checkOrClose(value) {
              return value ? 'el-icon-check' : 'el-icon-close'
          }

      },
      created() {
          this.init()
          // axios.get('http://localhost:8000/admin/shop/brands?page={this.page.current_page}').then(res => {
          //     console.log(res)
          //     let ress = res.data.data.brands
          //     this.brands = ress.data
          //     this.page = {
          //         total: ress.total,
          //         pageSize: ress.per_page,
          //         current_page: ress.current_page

          //     }
          // })



      },
      methods: {
          //分页
          init() {
              axios.get(`http://localhost:8000/admin/shop/brands?page=${this.page.current_page}`).then(res => {
                  let ress = res.data.data.brands
                  //页面数据
                  this.brands = ress.data
                  //分页数据他，定义页面的总数，页面条数，当前显示页面
                  this.page = {
                      total: ress.total,
                      pageSize: ress.per_page,
                      current_page: ress.current_page

                  }
              })
          },
          //分页，当你点击哪一个页，获取哪一页的数据
          handleCurrentChange(val) {
              this.page.current_page= val
                console.log(this.page.current_page)
              this.init()

          },
          //删除
          handleDelete(index,row){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  axios.delete (`http://localhost:8000/admin/shop/brands/${row.id}`).then(res => {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'

                  })
                  this.init()
                  //     this.brands.splice(index, 1)
              })


              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });


          },
          //编辑页面，获取id,将数据通过id分辨不同的数据
          handleEdit(index,row){
              console.log(row)
              this.$router.push({name:'pagechange',params:{id:row.id}})


            }
      }

  }




</script>


<style>
  body{
     height:100%
  }
  .el-main{
    line-height: 54px;
    text-align:left;

  }

  .el-pager{
      line-height: 54px;
      text-align:left;
  }
  .el-table td, .el-table th{
      text-align:center;
  }


</style>