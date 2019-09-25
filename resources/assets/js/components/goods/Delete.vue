<template>
    <div>
        <el-button  type="primary" @click="allRecover">还原</el-button>
        <el-button  type="primary" @click="allDelete">删除</el-button>
    <el-table
            ref="multipleTable"
            :data="tableDel"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
                prop="id"
                label="id">
        </el-table-column>
        <el-table-column
                prop="name"
                label="商品名称">

        </el-table-column>
        <el-table-column label="缩略图">
            <template slot-scope="scope">
                <img :src="scope.row.image" class="thumb" width="60"
                     height="60">
            </template>
        </el-table-column>
        <el-table-column
                prop="category"
                label="所属分类">
            <template slot-scope="scope">
                {{scope.row.categories | join_categories}}

            </template>
        </el-table-column>
        <el-table-column
                prop="brand_id"
                label="品牌">
        </el-table-column>
        <el-table-column
                prop="price"
                label="单价">
        </el-table-column>

        <el-table-column
                prop="created_at"
                label="上架时间">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleRcover(scope.$index, scope.row)">还原
                </el-button>
                <el-button
                        size="mini"
                        type="danger"

                        @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pageSize"
                @current-change="handleCurrentPage">
        </el-pagination>
    </div>
</template>
<style>

    .el-main {
        line-height: 20px;
    }

    .el-table td, .el-table th {
        text-align: center;
    }


</style>
<script>
    export default {
        data() {
            return {
                tableDel:[],
                page: {
                    total: 0,
                    pageSize: 0,
                    currentPage: 0
                },
                checked_id:[]


            }
        },
        created(){
                this.init()

                },
        filters:{
            join_categories(value){
                let category = value .map((item)=>{
                    return item.name
                });
                return category.join("，")
            }

        },
        methods: {

            init() {
                axios.get(`/admin/shop/products/trash?page=${this.page.currentPage} `).then(res => {
                    console.log(res)
                    this.tableDel = res.data.data.products.data;
                    let ress = res.data.data.products;
                    this.page = {
                        total: ress.total,
                        pageSize: ress.per_page,
                        currentPage: ress.current_page
                    }

                })
            },
            handleCurrentPage(val){
                this.page.currentPage=val
                this.init()
            },
            //还原单条数据
            handleRcover(index,row){
                this.$confirm('此操作将还原该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(`/admin/shop/products/${row.id}/restore `).then(res => {
                        this.$message({
                            type: 'success',
                            message: '还原成功!'

                        })
                        this.init()

                    })
                })

                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消还原'
                        });

                    });

            },
            //删除单条数据
            handleDelete(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete (`/admin/shop/products/${row.id}/force_destroy  `).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'

                        })
                        this.init()

                    })
                })

                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });

                    });

            },
            handleSelectionChange(val){
                 this.checked_id = val.map(item=>{
                    return item.id
                })

            },
            allRecover(){
                if(this.checked_id.length ==0){
                    this.$message({
                        type:'error',
                        message:'请选择一条信息！'
                    })
                    return;
                }
                axios.post(`/admin/shop/products/restore_checked`,{checked_id:this.checked_id}).then(res=>{
                    this.init()
                    this.$message({
                        type:'success',
                        message:'还原成功！'
                    })

                })
                    
                },
            allDelete(){
                if(this.checked_id.length ==0){
                    this.$message({
                        type:'error',
                        message:'请选择一条信息！'
                    })
                    return;
                }
                axios.post(`/admin/shop/products/force_destroy_checked`,{checked_id:this.checked_id}).then(res=>{
                    this.init()
                    this.$message({
                        type:'success',
                        message:'删除成功！'
                    })

                })
            }


        }
    }
</script>

