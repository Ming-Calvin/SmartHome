<script>
	var common= require("@/common.js");
	export default {
		onLaunch: function() {
			console.log('App Launch')
			common.load_user();	
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
