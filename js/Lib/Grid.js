var Grid = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('grid');
		Frame.call(this, args);
		
		this.addProperty(args, 'width', true, null, parseInt);    //in px
		this.addProperty(args, 'height', true, null, parseInt);   //in px
		this.addProperty(args, 'blockSize', true, null, parseInt);//in px
		this.addProperty(args, 'initializeCell', false, function(td){return td;});
		this.element.innerHTML = '';
		this.element.style.width = this.width + 'px';
		this.element.style.height = this.height + 'px';
		
		var 
			rows = Math.round(this.height/this.blockSize),
			cols = Math.round(this.height/this.blockSize),
			tbody = document.createElement('tbody');
		;
		
		for(var i = 0; i < rows; i++){
			var tr = document.createElement('tr');
			for(var j = 0; j < cols; j++){
				var td = this.initializeCell(document.createElement('td'), i, j);
						
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		
		var table = document.createElement('table');
		table.appendChild(tbody);
		this.element.appendChild(table);
		this.table = table;
	};

Grid.prototype = Object.create(Frame.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.elementAt =
	function(i, j){
		return this.table.children[0].children[j].children[i];
	};