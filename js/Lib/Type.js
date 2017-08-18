var Type = 
	{
		ARRAY      : 'ARRAY',
		DATE       : 'DATE',
		FUNCTION   : 'FUNCTION',
		MYSQL_DATE : 'MYSQL_DATE',
		NAN        : 'NAN',
		NULL       : 'NULL',
		NUMBER     : 'NUMBER', 
		OBJECT     : 'OBJECT',
		STRING     : 'STRING',
		UDEFINED   : 'UNDEFINED',
		
		_mysql_date_regex : /^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|11)(-)([0][1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(02)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02)(-)(29)))(\s([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))?$/,
		
		identify :
			function(v){
				if(v === undefined){
					return Type.UNDEFINED;
				}
				if(v === null){
					return Type.NULL;
				}
				
				if(typeof v === 'string' || v instanceof String){
					if(Type._mysql_date_regex.test(v)){
						return Type.MYSQL_DATE;
					}
					return Type.STRING;
				}
				if(Object.prototype.toString.call(v) === "[object Date]"){
					return Type.DATE;
				}
				if(typeof v === 'number'){
					if(isNaN(v)){
						return Type.NAN;
					}
					return Type.NUMBER;
				}
				if(typeof v === 'object'){
					return Type.OBJECT;
				}
				if(typeof v === 'array'){
					return Type.ARRAY;
				}
				if(typeof v === 'function'){
					return Type.FUNCTION;
				}		
				throw 'Unknown Type';
			},
		is :
			function(val, type){
				return type === Type.identify(val);
			}
	};


