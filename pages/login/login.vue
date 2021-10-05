<template>
	<view>
		<view>
			<view class="login-logo">
				<image src="../../static/image/login.png" mode="" style="width: 50%;"></image>
			</view>
		</view>
	
		<view  style="margin-top: 120rpx;">
			
			<input class="login-input" style="text" value="" v-model="user.username" placeholder="请输入用户名"/>
			<input class="login-input" password="true" style="text" value="" v-model="user.password"  placeholder="请输入密码"/> 
			
			<button type="primary" style="margin-top: 40rpx;width: 50%;border-radius: 40rpx;" @tap="login">登录</button>
			
			<navigator url="/pages/reg/reg" class="text-center margin-top-lg">
				<text class="text-gray text-sm ">还没有账号？点击注册</text>
			</navigator>
			
			<navigator url="/pages/profile/profile" open-type="switchTab"  class="text-center margin-top-lg">
				<text class="text-gray text-sm ">返回首页</text>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	var common= require("@/common.js");
	export default {
		data() {
			return {
				user:{},
			}
		},
		methods: {
			login:function(){
				console.log(this.user);
				
				if(!this.user.username||!this.user.password){
					uni.showToast({
						title:"用户名密码不能为空",
						icon:"none",
					})
				}
				
				uni.showLoading({
					title:"登陆中"
				});
				
				uni.request({
					url: common.api_server+'user/login', //仅为示例，并非真实接口地址。
						 data: {
								username:this.user.username,
								password:this.user.password,
								},
						method:"POST",
						header: {
								'content-type': 'application/x-www-form-urlencoded',
								"Accept-Language":"zh-CN"
								},
								success: (res) => {
								console.log(res.data);
								if(res.data.code==0){
									common.is_login=true;
									 
									 uni.showToast({
										title:"登录成功",
										icon:"success",
									})
									
									try {
										uni.setStorageSync('user_id', res.data.data.user_id);
										uni.setStorageSync('username', res.data.data.username);
										uni.setStorageSync("nickname",res.data.data.nickname);
										uni.setStorageSync("token",res.data.data.token)
										common.load_user();
										} catch (e) {
										// error
										}
										
										uni.switchTab({
											url: '/pages/profile/profile'
											});
											
									}else{
										uni.showToast({
										title:res.data.msg,
										icon:"none",
									})
									}
								},
								fail:(res) =>{
									uni.showToast({
										title:res.errMsg,
										icon:"none",
										})
								},
								complete: () => {
									uni.hideLoading();
								}
							})
			}
		}
	}
</script>

<style>
	@import url("@/static/form.css");
</style>
