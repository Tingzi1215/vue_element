<template>
    <div>
    <b>新增品牌</b>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
            <el-form   :model="product" :rules="rules" ref="product" label-width="100px" class="demo-product">

                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="product.name"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="category_id">
                    <el-select
                            v-model="product.category_id"
                            placeholder="请选择分类"
                            filterable
                            multiple>
                        <el-option-group
                                v-for="category in categories"
                                :key="category.id"
                                :lable="category.name">
                        <!--                <el-option label="顶级分类" :value="0"></el-option>-->
                            <el-option
                                    v-for="item in category.children"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id" >

                            </el-option>
                        </el-option-group>

                    </el-select>
                </el-form-item>
                <el-form-item label="单价" prop="price">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="product.stock"></el-input>
                </el-form-item>
                <el-form-item label="缩略图" prop="image">
                    <el-upload
                            v-model="product.image"
                            class="upload-demo"
                            drag
                            :before-upload="beforeUpdown"
                            :on-success="handleSuccess"
                            :on-exceed="handleExceed"
                            :limit="1"
                            :on-remove="handleRemove"
                            action= "/admin/photo"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="品牌描述" prop="description">
                    <el-input type="textarea" v-model="product.description"></el-input>
                </el-form-item>
                <el-form-item label="是否上架" prop="is_onsale">
                    <el-switch v-model="product.is_onsale"></el-switch>
                </el-form-item>
                <el-form-item label="加入推荐" >
                    <el-checkbox v-model="product.is_top">置顶</el-checkbox>
                    <el-checkbox v-model="product.is_recommend">推荐</el-checkbox>
                    <el-checkbox v-model="product.is_hot">热销</el-checkbox>
                    <el-checkbox v-model="product.is_new">新品</el-checkbox>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>

            <el-button type="primary" @click="submitForm('product')">立即创建</el-button>

            <el-button @click="resetForm('product')">重置</el-button>

    </el-tabs>

    </div>
</template>

<style>
    .el-main{
     line-height:10px;
    }
</style>
<script>
    export default {
        data() {
            return {
                //将所有数据定义并返回，名字要与上面的v-model一样，数据名字与prop一样
                categories:[],
                product: {
                    name: '',
                    category_id: '',
                    brand_id: '',
                    is_top: false,
                    is_new: false,
                    is_hot: false,
                    is_recommend: false,
                    is_onsale: true,
                    created_at: '',
                    price:'',
                    stock:'',
                    description:''

                },
                activeName: 'first',
                //表单验证，制定每种表单的验证方式，required的意思是，必填项，需要什么样的验证就写什么，不能多写
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ]


                }
            };
        },
        created() {
           this.init()


        },


        //表单完成后，提交表单
        methods: {
          init() {
              axios.get(`http://localhost:8000/admin/shop/categories`).then(res => {

                  this.categories = res.data.data.categories
              })
          },
            submitForm(formName) {
                //获取数据，并且将数据发送给后端
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://localhost:8000/admin/shop/products`, this.product).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你添加成功',
                                type: 'seccess'
                            });
                            //成功后，页面跳转到首页
                            this.$router.push({name: 'goods'})

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            beforeUpdown(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';

                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传的图片只能是JPG,PNG或者GIF格式');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('图片不能超过2M')
                    return false
                }
            },
            handleSuccess(response, file, fileList) {
                this.product.image = response.image_url;


            },
            handleExceed(files, fileList) {
                this.$message.warning('只能上传一张图片，请先删除之前的图片再上传');
                return false
            },
            handleRemove(file, fileList) {
                this.product.image = ''


            },
            handleClick(tab, event) {
                console.log(tab, event);
            }

        }
    }
</script>