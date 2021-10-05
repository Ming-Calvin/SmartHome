<template>
	<view>
		<view class="bg-img  flex align-center" style="background-image: url(../../static/image/background.jpg);height: 414upx;">
			<view class="padding-xl text-white">
				
				<view class="" style="float:left;">
					<view class="cu-avatar xl round margin-left" style="background-image:url(https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=255540472,3722890280&fm=26&gp=0.jpg);"></view>
				</view>
					
				<view class="" style="float:left;margin-left: 30rpx;">
					<view class="padding-xs text-xxl text-bold">
						{{user.nickname}}
					</view>
					<view class="padding-xs text-lg">
						{{user.username}}
					</view>
				</view>	
			
			</view>
		</view>
	
	
		<view class="">
			<view class="cu-list menu" style="margin-top: 20rpx;">
				
				<view v-if="!is_login" class="cu-item" @tap="jump_to_login">
					<view class="content">
						<text class="cuIcon-friendfill text-grey"></text>
						<text class="text-grey">登录</text>
					</view>
				</view>
			
					
				<view v-if="is_login" class="cu-item" @tap="logout">
					<view class="content">
						<text class="cuIcon-friendfill text-grey"></text>
						<text class="text-grey">登出</text>
					</view>
				</view>
		
			</view>	
		</view>
		
	</view>	
</template>

<script>
	var common= require("@/common.js");
		export default {
			data() {
				return {
					is_login:false,
					user:{},
				}
			},
			
			onShow() {
				this.is_login=common.is_login;
				this.user=common.user;
			},
			
			methods: {
				jump_to_login:function(){
					uni.navigateTo({
						url:"/pages/login/login"
					})
				},
				
				logout:function(){
					//TODO 用户注销
					common.is_login=false;
					this.is_login=common.is_login;
					this.user={}
					uni.clearStorage();
				},
			}
		}
</script>

<style>

</style>
