module.exports = {
	is_login: false,

	api_server: 'http://localhost:8888/',

	user: {},

	load_user: function () {
		this.user.user_id = uni.getStorageSync("user_id")
		this.user.username = uni.getStorageSync("username")
		this.user.nickname = uni.getStorageSync("nickname")
		this.user.token = uni.getStorageSync('token')
		if (this.user.user_id) {
			this.is_login = true;
		}
		console.log(this, '1');
	},

	load_user: function () {
		this.user.user_id = uni.getStorageSync("user_id")
		this.user.username = uni.getStorageSync("username")
		this.user.nickname = uni.getStorageSync("nickname")
		this.user.token = uni.getStorageSync('token')
		if (this.user.user_id) {
			this.is_login = true;
		}
	},

	require_login: function () {
		if (!this.is_login) {
			uni.navigateTo({
				url: "/pages/login/login"
			})
			return false;
		} else {
			return true;
		}
	},


};