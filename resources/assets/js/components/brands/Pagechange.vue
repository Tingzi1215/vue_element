<template>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <b>新增品牌</b>
        <el-form-item label="品牌名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="缩略图" prop="image">
            <el-upload
                    class="upload-demo"
                    drag
                    :file-list="fileList"
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

        <el-form-item label="品牌网址" prop="url">
            <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="sort_order">
            <el-input v-model="ruleForm.sort_order"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="is_show">
            <el-switch v-model="ruleForm.is_show"></el-switch>
        </el-form-item>

        <el-form-item label="品牌描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改完成</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>


    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                //将所有数据定义并返回，名字要与上面的v-model一样，数据名字与prop一样
                fileList:[],
                ruleForm: {
                    name: '',
                    url: '',
                    sort_order: 99,
                    is_show: false,
                    description: ''

                },

                //表单验证，制定每种表单的验证方式，required的意思是，必填项，需要什么样的验证就写什么，不能多写
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入商品链接', trigger: 'blur'}
                    ]

                }
            };
        },

        created() {
            //在当前页面中获取路由的id，通过id接收数据
            let id = this.$route.params.id
            axios.get(`http://localhost:8000/admin/shop/brands/${id}`).then(res => {
                console.log(res)
             this.ruleForm = res.data.data.brand;
                //将是否的图形转化为布尔值
                this.ruleForm.is_show = !!res.data.data.brand.is_show;
                this.fileList = [{name:res.data.data.brand.image,url:res.data.data.brand.image}];



            })



        },
        //表单完成后，提交表单
        methods: {
            submitForm(formName) {
                let id = this.$route.params.id
                // 获取数据，并且将数据发送给后端
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put(`http://localhost:8000/admin/shop/brands/${id}`, this.ruleForm).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你修改成功',
                                type: 'seccess'
                            });
                            //成功后，页面跳转到首页
                            this.$router.push({name: 'brand'})

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

                if(!isJPG&&!isPNG&&!isGIF ){
                    this.$message.error('上传的图片只能是JPG,PNG或者GIF格式');
                    return false;
                }
                if(!isLt2M){
                    this.$message.error('图片不能超过2M')
                    return false
                }
            },
            handleSuccess(response, file, fileList){
                console.log(response)
                this.ruleForm.image=response.image_url;


            },
            handleExceed(files, fileList){
                this.$message.warning('只能上传一张图片，请先删除之前的图片再上传');
                return false
            },
            handleRemove(file, fileList){
                this.ruleForm.image = ''

            }
        }
    }
</script>