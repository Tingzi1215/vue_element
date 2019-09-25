<template>
    <div>

        <router-link to="/category/add" ><el-button type="primary">添加分类</el-button></router-link>
        <el-button type="info" @click="showChildren">{{expand_word}}</el-button>


    <el-table
            style="width: 100%"
            text-align="center"
            row-key="id"
            :expand-row-keys="expand"
            :data="categories" >
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-table

                        :show-header="false"
                        :data="props.row.children"
                        style="width: 100%" text-align="center">
                    <el-table-column  width="90" prop="id"></el-table-column>
                    <el-table-column  width="160">
                        <template slot-scope="scope">
                            <img :src="scope.row.image == null? '' : 'http://images.canon4ever.com/'+scope.row.image" class="thumb">
                        </template>
                    </el-table-column>
                    <el-table-column  width="160" prop="name"></el-table-column>
                    <el-table-column  width="160" prop="url"></el-table-column>
                    <el-table-column  width="160" prop="description"></el-table-column>
                    <el-table-column width="60" >
                        <template slot-scope="scope">
                            <el-input class="elinpue" v-model="scope.row.sort_order" size="small"
                                      @change="sort_order(scope.row.id,scope.row.sort_order)">

                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column  width="100" prop="is_show">



                    </el-table-column>
                    <el-table-column>
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
            </template>
        </el-table-column>
        <el-table-column label="品牌ID" width="90" prop="id"></el-table-column>
        <el-table-column label="缩略图" width="160">
            <template slot-scope="scope" prop="image">
                <img :src="scope.row.image == null? '' : 'http://images.canon4ever.com/'+scope.row.image" class="thumb" >
            </template>
        </el-table-column>
        <el-table-column label="品牌名称" width="160" prop="name"></el-table-column>
        <el-table-column label="品牌网址" width="160" prop="url"></el-table-column>
        <el-table-column label="描述信息" width="160" prop="description"></el-table-column>
        <el-table-column label="排序"     width="60">
            <template slot-scope="scope">
            <el-input class="elinpue" v-model="scope.row.sort_order" size="small"
                        @change="sort_order(scope.row.id,scope.row.sort_order)">

            </el-input>
            </template>
        </el-table-column>

        <el-table-column label="是否显示" width="100" prop="is_show">



        </el-table-column>
        <el-table-column label="操作" >
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
    </div>
</template>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-table th{
        /*display:none*/

    }
    .el-main{
        line-height:1px;
        text-align: left;


    }
</style>

<script>
    export default {
        data() {
            return {
                categories: [],
                expand: []
            }
        },
        created() {
           this.init()

        },
        //计算机属性get
        computed: {
            expand_word: function () {

                return this.expand.length == 0 ? '展开' : '关闭';

            }
        },


        methods: {
            showChildren() {

                if (this.expand.length != 0) {
                    this.expand = []
                } else {
                    this.expand = this.categories.map(catagroy => {
                        return catagroy.id

                    })


                }
            },
            sort_order(id,sort_order_value){
                axios.patch(`http://localhost:8000/admin/shop/categories/sort_order`,{id:id,sort_order:sort_order_value}).then(res=>{

                    this.categories=res.data.data.categories;

                })
                  //当报错为422时，意思是排序数字太大
                    .catch((error)=>{
                        if(error.res&&error.res.status == '422'){
                            this.$message.erroe('排序数字不能大于99')
                        }

                })
            },
            handleDelete(index,row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete (`http://localhost:8000/admin/shop/categories/${row.id}`).then(res => {
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

            init(){
                axios.get(`http://localhost:8000/admin/shop/categories`).then(res => {

                    let ress = res.data.data
                    this.categories = ress.categories;

                })
            },
            handleEdit(index,row){
                this.$router.push({name:'rewrite',params:{id:row.id}})
            }
        }
    }
</script>
