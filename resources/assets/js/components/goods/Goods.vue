<template>
    <div>
        <el-form :inline="true" :model="product"   class="demo-form-inline" style="width:100%">
            <el-form-item>
                <el-input width="30" v-model="product.name" placeholder="商品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select  v-model="product.category_id" placeholder="分类" size="small">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select  v-model="product.brand_id" placeholder="品牌" size="small">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-checkbox >置顶</el-checkbox>
                <el-checkbox >推荐</el-checkbox>
                <el-checkbox >热销</el-checkbox>
                <el-checkbox >新品</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-select  v-model="product.is_onsale" placeholder="上架状态" size="small">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="product.created_at"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']"
                        size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" >查询</el-button>
            </el-form-item>
            <el-form-item>
                <router-link to="/goods/new">
                <el-button size="small" type="primary" ><i class="el-icon-edit">新增</i></el-button>
                </router-link>
            </el-form-item>
        </el-form>
        <el-table
                :data="products"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="#"
                    width="40">
            </el-table-column>
            <el-table-column
                    label="缩略图"
            >
                <template slot-scope="scope">
                    <img :src="'http://images.canon4ever.com/'+scope.row.image" class="thumb" width="60"
                         height="60">
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名称">

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
                    prop="is_onsale"
                    label="上架"
                    width="45">
            </el-table-column>
            <el-table-column
                    prop="is_top"
                    label="置顶"
                    width="45">
            </el-table-column>
            <el-table-column
                    prop="is_recommend"
                    label="推荐"
                    width="45">
            </el-table-column>
            <el-table-column
                    prop="is_hot"
                    label="热销"
                    width="45">
            </el-table-column>
            <el-table-column
                    prop="is_new"
                    label="新品"
                    width="45">
            </el-table-column>
            <el-table-column label="库存" >
                <template slot-scope="scope">
                    <el-input class="elinpue" v-model="scope.row.stock"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="上架时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
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

    .el-table {
        font-size: 12px;
    }
</style>
<script>

    export default {
        data() {
            return {
                product: {
                    name: '',
                    category_id: '',
                    brand_id: '',
                    is_onsale: '',
                    created_at: ''
                },
                value: '',
                products: [],
                page: {
                    total: 0,
                    pageSize: 0,
                    currentPage: 0
                }


            }
        },
        created() {
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
            init(){
                axios.get(`http://localhost:8000/admin/shop/products?page=${this.page.currentPage} `).then(res => {

                    this.products = res.data.data.products.data;
                    let ress = res.data.data.products;
                    this.page = {
                        total: ress.total,
                        pageSize: ress.per_page,
                        currentPage: ress.current_page
                    }

                })

            },
            onSubmit() {
                console.log('submit!');
            },
            handleCurrentPage(val){
               this.page.currentPage=val
                this.init()
            },
            handleDelete(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete (`http://localhost:8000/admin/shop/products/${row.id}`).then(res => {
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

            }
        }
    }
</script>
