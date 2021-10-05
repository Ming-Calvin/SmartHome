<template>
	<view>
		<view class="">
			<button class="cu-btn block line-orange lg" @tap="showModal">
			<text class="cuIcon-add"></text> 增加设备</button>
		</view>

		<view class="">
			<view class="device-wrap" v-for="(single_device,index) in devices" :key="index">
				<view class="" style="float: left;">
					<image class="device-avatar" src="/static/icon/device.png" mode=""></image>
				</view>

				<view class="" style="float: left;margin-top: 20rpx;">
					<view class="">
						<text class="text-bold text-xl">{{single_device.name}}</text>
					</view>
					<view class="">
						<text class="text-red">单价: ¥{{single_device.price}}</text>
					</view>
					<view class="btn-wrap">
						<button class="cu-btn round line-cyan"@tap="modify_modal.show(single_device)">修改</button>
						<button class="cu-btn round line-cyan" @tap="delete_device(single_device.id)">删除</button>
					</view>
				</view>
			</view>
		</view>

		<view class="" style="clear: both;"></view>

		<view class="cu-modal" :class="show_device_modal==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">增加设备</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input class="login-input" style="text" v-model="device.name" placeholder="请输入设备名称" />
					<input class="login-input" style="text" v-model="device.price" placeholder="单价" />

				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="add_device_json">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modify_modal.display==true?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改设备信息</view>
					<view class="action" @tap="modify_modal.close()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<input class="login-input" style="text" v-model="modify_modal.device.name" placeholder="请输入设备名称" />
					<input class="login-input" style="text" v-model="modify_modal.device.price" placeholder="单价" />
		
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="modify_modal.close()">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="add_device_json">确定</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var common = require("@/common.js");
	export default {
		data() {
			return {
				show_device_modal: false,
				device: {},
				modify_modal:{
					display:false,
					device:{},
					show(device){
						this.device =device
						this.display =true
					},
					close(){
						this.display =false
						this.device={}
					},
					submit(){
						
					}
					
				},

				devices: [],

			}
		},
		onLoad() {

		},
		onShow() {
			if (common.require_login()) {
				this.pull_devices();
			}

		},
		onPullDownRefresh() {
			this.pull_devices();
		},
		methods: {
			showModal(e) {
				this.show_device_modal = true;
			},
			hideModal(e) {
				this.show_device_modal = false;
			},
			
			delete_device: function(device_id) {
				//console.log(device_id);
				var _self = this;
				uni.showModal({
					title: '确认',
					content: '是否删除该设备',
					success: function(res) {
						if (res.confirm) {
							uni.request({
								url: common.api_server + 'device/delete',
								header: {
									"Accept-Language": "zh-CN",
									"token": common.user.token,
								},
								data: {
									device_id: device_id
								},
								success: function() {
									uni.showToast({
										title: "已删除",
										icon: "success",
										duration: 3000
									})
								},
								fail: function() {

								},
								complete: function() {
									setTimeout(_self.pull_devices(), 2000)

								}
							})

						}
					}
				});



			},
			pull_devices: function() {
				uni.showLoading({

				})
				var _self = this;
				uni.request({
					url: common.api_server + "device/get_all",
					header: {
						"Accept-Language": "zh-CN",
						"token": common.user.token,
					},
					success: function(res) {
						if (res.data.code > 0) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

						_self.devices = res.data.data.devices;
						//_self.devices.reverse()
						//console.log(res);

					},
					fail: function(res) {
						console.log(res);
					},
					complete: function() {
						uni.hideLoading()
						uni.stopPullDownRefresh();

					}
				})
			},
			add_device: function() {
				//form-encode

				uni.request({
					url: common.api_server + "device/add",
					data: {
						device_name: this.device.name,
						device_price: this.device.price,
						owner: common.user.user_id,
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Accept-Language": "zh-CN"
					},
					success: function(res) {
						console.log(res);
					},
				});
			},
			add_device_json: function() {
				//post json
				this.device.owner = common.user.user_id;
				var _self = this;
				uni.request({
					url: common.api_server + "device/add_v2",
					data: this.device,
					method: "POST",
					header: {
						"Accept-Language": "zh-CN",
						"token": common.user.token,
					},
					success: function(res) {
						console.log(res);
						//清空输入框
						_self.device = {};
						//关闭/隐藏输入对话框
						_self.show_device_modal = false;
						//给个提示
						uni.showToast({
							title: "已保存",
							duration: 3000,
						})
						//TODO 刷新设备列表
						_self.pull_devices();
					},
				});
			},

		}
	}
</script>

<style>
	@import url("@/static/form.css");

	.login-input {
		padding-left: 0rpx;
	}

	.device-wrap {
		float: left;
		margin: 20rpx;
		/* border: #AAAAAA solid 1rpx; */
		border-radius: 10rpx;
		background-color: #FFFFFF;
		box-shadow: 5px 5px 20px #999999;
	}

	.device-avatar {
		width: 200rpx;
		height: 200rpx;
	}

	.btn-wrap {
		width: 460rpx;
		text-align: right;
		margin-right: 20rpx;
	}
</style>
