var ScreenMessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('screen-message-box');
		MessageBox.call(this, args);
	};

ScreenMessageBox.prototype = Object.create(MessageBox.prototype);
ScreenMessageBox.prototype.constructor = ScreenMessageBox;