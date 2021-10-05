<template>
	<view>
		<view>
			<view class="login-logo">
				<image src="../../static/image/login.png" mode="" style="width: 50%;"></image>
			</view>
		</view>
	
		<view  style="margin-top: 120rpx;">
			
			<input class="login-input" style="text" v-model="user.username" placeholder="请输入用户名" />
			<input class="login-input" style="text" v-model="user.nickname" placeholder="请输入昵称" />
			<input class="login-input" password="true" style="text" v-model="user.password" placeholder="请输入密码" />
			<input class="login-input" password="true" style="text" v-model="user.password_confirm" placeholder="请再次输入密码" />

			
			<button type="primary" style="margin-top: 40rpx;width: 50%;border-radius: 40rpx;" @tap="do_reg">注册</button>
			
			<navigator url="/pages/login/login" class="text-center margin-top-lg">
				<text class="text-gray text-sm ">已有有账号？点击登入</text>
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
				user: {},
			}
		},
		methods: {
		do_reg: function() {
			if (this.user.password == this.user.password_confirm) {
				uni.showLoading({
				})
			uni.request({
				url: common.api_server+'user/reg', //仅为示例，并非真实接口地址。
				data: {
						username:this.user.username,
						password:this.user.password,
						nickname:this.user.nickname,
					},
						method:"POST",
						header: {
							    'content-type': 'application/x-www-form-urlencoded',
								"Accept-Language":"zh-CN"
							    },
							    success: (res) => {
							        console.log(res.data);   
									 if(res.data.code==0){
										uni.navigateBack({	
										});
										uni.showToast({
										 	title:"恭喜，用户注册成功，请登录",
										 	icon:"success",
											duration:3000,
										 })
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
							});
						}else{
							uni.showToast({
								title:"两次输入的密码不一致",
								icon:"none"
							})
						}
					},
				}
			}
</script>

<style>
	@import url("@/static/form.css");
</style>
