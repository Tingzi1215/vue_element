<template>
	<el-container>
	  <el-header>长乐小卖部</el-header>
	  <el-container>
	    <el-aside width="200px">
			<el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
				  :router="true"
			      >

			      <el-menu-item index="/">
			        <i class="el-icon-setting"></i>
			        <span slot="title">首页</span>
			      </el-menu-item>
			      <el-submenu index="1">
			        <template slot="title">
			          <i class="el-icon-location"></i>
			          <span>商城管理</span>
			        </template>
					  	<el-menu-item index="/brand">商品品牌</el-menu-item>
		          		<el-menu-item index="/category">商品分类</el-menu-item>
					  	<el-menu-item index="/member">会员管理</el-menu-item>
					  	<el-menu-item index="/goods">商品管理</el-menu-item>
					  	<el-menu-item index="/goods/delete">回收站</el-menu-item>
					  	<el-menu-item index="/goods/statistics">仪表盘</el-menu-item>

				  </el-submenu>
			      <el-menu-item index="2">
			        <i class="el-icon-menu"></i>
			        <span slot="title">导航二</span>
			      </el-menu-item>
			      <el-menu-item index="3" disabled>
			        <i class="el-icon-document"></i>
			        <span slot="title">导航三</span>
			      </el-menu-item>
			      <el-menu-item index="4">
			        <i class="el-icon-setting"></i>
			        <span slot="title">导航四</span>
			      </el-menu-item>
			    </el-menu>

		</el-aside>
	    <el-main>
			<router-view/>
		</el-main>
	  </el-container>
	</el-container>


</template>

<script>
export default {
	name: 'App',
}
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
	html,body{
		height:100%
	}
	body>.el-container{
		height:100%
	}
	.el-container{
		height:100%
	}
	.el-aside{
		height:100%
	}
</style>
