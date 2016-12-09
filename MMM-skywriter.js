Module.register("MMM-skywriter",{
	
		gesture_up: 0,
		gesture_right: 0,	

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "gesture_observed"){
			const self = this;
			
			console.log ("socketnotificationreceived.");
		
			self.sendNotification(notification, payload);
			
			if (payload === "up"){
				console.log("test - up");
					MM.getModules().withClass(this.config.defaultClass).exceptWithClass(this.config.everyoneClass).enumerate(function(module) {
						module.hide(1000, function() {
							Log.log(module.name + ' is hidden.');
						});
					});
			
					MM.getModules().withClass("class_up_1_show").enumerate(function(module) {
						module.show(1000, function() {
							Log.log(module.name + ' is shown.');
						});
					});
			}
			else if (payload === "left"){
				console.log("test - left");
			}
			else if (payload === "down") {
				console.log("test - down");
				
				MM.getModules().withClass("class_up_1_show").enumerate(function(module) {
						module.hide(1000, function() {
							Log.log(module.name + ' is hidden by gesture.');
						});
					});
			}
		}
	},
	
	notificationReceived: function(notification, payload, sender) {
		if (notification === 'DOM_OBJECTS_CREATED') {
			MM.getModules().exceptWithClass("default").enumerate(function(module) {
				module.hide(1000, function() {
					Log.log('Module is hidden.');
				});
			});
		}
	},
	
	start: function() {
		this.current_user = null;
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
	
});