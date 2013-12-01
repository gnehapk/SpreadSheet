(function () {
	
	window.addEventListener("load", onload, false);

	function onload() {
		var rowName = new Array();
		var colName = new Array();
		var chunks = new Array();
		var el = init(3, 3, rowName, colName);
		var cells = Array.prototype.slice.call(document.querySelectorAll("td"));

		cells.forEach(function(cell) {

				cell.addEventListener("click", function(evt) {
						var txtField = Array.prototype.slice.call(this.querySelectorAll("input"));
						
						if(txtField.length === 0) {
							var input = document.createElement("input");
							input.type = "text";
							input.className = "inputField";
							input.value = this.innerHTML;
							this.innerHTML = "";

							evt.currentTarget.appendChild(input);
							evt.stopPropagation();

							this.firstChild.addEventListener("blur", function(evt) {
								var inputField = document.getElementsByClassName("inputField"); 
								var value = inputField[0].value;

								if(value.charAt(0) === '=') {
									chunks = calculate(value);
									//value = eval(value.substr(1));
								}

								var parentElement = evt.currentTarget.parentElement;
								var deletedNode = evt.currentTarget.parentElement.removeChild(inputField[0]);
								deletedNode = null;
								parentElement.innerHTML =  value;
							}, false);
					}
				}, false);
			}			
				
		);
	};

	function calculate(value) {
		var str, chunks, length;

		str = value.substr(1);
		chunks = splitExp(str);
		length = chunks.length;

	};

	function splitExp(str) {
		var op = ['+', '-', '*', '/'];
		var length = str.length;
		var chunks = new Array();
		var chunk = new Array();
		var i = 0, j = 0;

		for (var i = 0; i < length; i++) {
			j=0;
			op.some(function(item, index, array) {
				
				/*if(i === length) {
					return chunks
				}*/

				if(item === str[i]) {
					chunk[j] = '/0';
					chunks.push(chunk);
				} else if(str[i] === '\0') {
					chunk[j] = '/0';
					chunks.push(chunk);
				} else {
					chunk[j] = str[i];
					j++;
				};
			});

		};
	};

	function init(row, col, rowName, colName) {
		var el = document.createElement("table");
		createTableHeader(col+1, el, colName);
		createTableBody(col+1, row, el, rowName);

		document.body.appendChild(el);
	};

	function createTableBody(col, row, el, rowName) {
		var tBody;

		tBody = document.createElement("tBody");
		el.appendChild(tBody);
		col = col - 1;

		for (var i = 0; i < row; i++) {
			r = document.createElement("tr");
			r.className = "tableRow";
			c = document.createElement("th");
			c.innerHTML = i+1;
			rowName.push(i+1);
			r.appendChild(c);

			c = document.createElement("td");
			c.innerHTML = "";
			r.appendChild(c);

			c = document.createElement("td");
			c.innerHTML = "";
			r.appendChild(c);

			c = document.createElement("td");
			c.innerHTML = "";
			r.appendChild(c);

			/*for (var j = 0; j < col; i++) {
				c = document.createElement("td");
				c.innerHTML = "";
				r.appendChild(c);
			};	*/																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																												

			tBody.appendChild(r);
		};
	};

	function createTableHeader(col, el, colName) {
		var r, c, head, colHead;

		head = document.createElement("thead");
		r = document.createElement("tr");
		r.className = "tableRow";
		head.appendChild(r);
		colHead = document.createElement("th");
		colHead.value = "";
		r.appendChild(colHead);
		col = col - 1;
		charCode = 65;

		for (var i = 0; i < col; i++) {
			c = document.createElement("th");
			c.innerHTML = String.fromCharCode(charCode++);	
			colName.push(c.innerHTML);
			r.appendChild(c);	

		};

		el.appendChild(head);
	};

})();