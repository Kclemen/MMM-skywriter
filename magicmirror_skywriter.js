socketNotificationReceived: function(notification, payload) {
		if (payload.action == "login"){
			if (this.current_user_id != payload.user){
				this.logout_user()
			}
			if (payload.user == -1){
				this.current_user = this.translate("stranger")
				this.current_user_id = payload.user;
			}
			else{				
				this.current_user = this.config.users[payload.user];
				this.current_user_id = payload.user;
				this.login_user()
			}
			
			this.sendNotification("SHOW_ALERT", {type: "notification", message: this.translate("message").replace("%person", this.current_user), title: this.translate("title")});
		}
		else if (payload.action == "logout"){
			this.logout_user()
			this.current_user = null;
		}
},