var FullScreenMessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('full-screen-message-box');
		MessageBox.call(this, args);
	};

FullScreenMessageBox.prototype = Object.create(MessageBox.prototype);
FullScreenMessageBox.prototype.constructor = FullScreenMessageBox;