Module.register("MMM-skywriter",{
	
		gesture_up: 0,
		gesture_right: 0,	

	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (payload.action == "up"){
			console.log("payload.action is up");
			if (gesture_up === 0) {
				gesture_up = gesture_up+1;
				if (gesture_up == 1){
					// gesture left or right controls the popup
					
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

			}
		//	this.sendNotification("gesture", "up");
		}
		else if (payload.action == "left"){
			if (gesture_up == 1) {
				// Perform action in popup with left
				Log.log('popup 1 is active - swipe left');				
			}
			else if (gesture_right === 0 ) {
				// first profile is shown, left swiping does nothing
				Log.log('first profile active - no swipe left action possible');
			}
			else if (gesture_right == 1) {
				// second profile is shown, left swiping goes back to first profile
				Log.log('2nd profile is active - left swipe to first profile');
			}
		}
		else if (payload.action == "down") {
			if (gesture_up == 1) {
				// // go back to main profile page
				Log.log('popup 1 is active - swipe down');				
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