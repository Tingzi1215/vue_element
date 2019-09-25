<template>
    <div>
        <el-form  style="width: 100%" :inline="true" :model="customer" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="customer.nickname"  placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="customer.openid" placeholder="openid"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="customer.sex" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="value2"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onCheck">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="customers"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="#">
            </el-table-column>
            <el-table-column
                    label="缩略图"
                   >
                <template  slot-scope="scope">
                    <img :src="scope.row.headimgurl" class="thumb" width="100"
                         height="100">
                </template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称">

            </el-table-column>
            <el-table-column
                    prop="openid"
                    label="openid">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="关注时间">
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
    .el-form {
        line-height: 10px;
    }

    .el-table thead tr {
        line-height: 10px;
    }

    .el-table td, .el-table th {
        text-align: center;
    }
</style>
<script>
    export default {
        data() {
            return {
                customers:[],
                customer: {
                    nickname:"",
                    openid:"",
                    sex:"",
                    created_at:""
                },
                value2: "",
                page: {
                    pageSize: 0,
                    total: 0,
                    current_page: 0
                }
            }
        },
        created() {
            this.init()

        },
        methods: {
            init() {
                axios.get(`/admin/shop/customers?page=${this.page.current_page}&nickname=${this.customer.nickname}
                &openid=${this.customer.openid}
                &sex${this.customer.sex}
                &created_at${this.customer.created_at}`).then(res => {
                    let respond = res.data.data.customers;
                    this.customers = respond.data;
                    this.page =
                        {
                            pageSize: respond.per_page,
                            total: respond.total,
                            current_page: respond.current_page
                }
                })
            },

            handleCurrentPage(val){
               this.page.current_page= val
                this.init()
            },

            onCheck() {
                this.init()
            },
        }
    }


</script>