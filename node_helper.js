'use strict';

const NodeHelper = require('node_helper');
const PythonShell = require('python-shell');
var pythonStarted = false

module.exports = NodeHelper.create({
  
	python_start: function () {
		const self = this;
		const pyshell = new PythonShell('modules/' + this.name + '/MMM-skywriter.py', { mode: 'json', args: [JSON.stringify(this.config)]});

		pyshell.on('message', function (message) {
      
			if (message.hasOwnProperty('status')){
			console.log("[" + self.name + "] " + message.status);
			}
			
			if (message.hasOwnProperty('gesture')){
			console.log("[" + self.name + "] " + message.gesture);
			self.sendSocketNotification("gesture" + message.gesture);
			}
		});
		
		 pyshell.end(function (err) {
			if (err) throw err;
			console.log("[" + self.name + "] " + 'finished running...');
		});
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if(notification === 'CONFIG') {
		  this.config = payload
		  if(!pythonStarted) {
			pythonStarted = true;
			this.python_start();
		  };
		};
	}
	
});