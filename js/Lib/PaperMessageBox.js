var PaperMessageBox = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('paper-message-box');
		MessageBox.call(this, args);
	};

PaperMessageBox.prototype = Object.create(MessageBox.prototype);
PaperMessageBox.prototype.constructor = PaperMessageBox;