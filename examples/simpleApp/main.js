/*
 * 	Keeping all of your code in a self contained function prevents 'polluting' the global space
 */
var ListApp = {};

/* 
 * We pass the 'ListApp' Object to this self contained function on top and bottom. the top can be called anything. 
 * most of the time i leave it as the same name 'ListApp' but for demo purposes well call it something different
 * bottom must be the correct name tho 'ListApp'
 */ 

(function(_myNameSpace){
	/*
	 * 	You can keep all of your code 'namespaced' by creating an object and placing all your classes in there
	 *	This helps not to 'pollute' the global environment with a bunch of variables and functions
	 */
	_myNameSpace = _myNameSpace || {};

//-- Start Models
	_myNameSpace.Models = _myNameSpace.Models || {};

//-- Start Views
	_myNameSpace.Views = _myNameSpace.Views || {};

	/*
	 	You can write this shorter:
 
		var TodoApp = {
			Models:{},
			Views:{}
		};
	 */


//-- Create Model Classes
	//Task Model
	var Task = function(_name, _status){
		this.name = _name;
		this.status = "incomplete";	
	};

	Task.prototype.getItem = function(){
		return this;
	}
	Task.prototype.updateStatus = function(_newStatus){
		this.status = _newStatus;
	}
	Task.prototype.updateItem = function(_newName){
		this.name = _newName;
	}

	/*
	 * Alternative Syntax:

	 	Task.prototype = {
			getItem; function(){

			},
			updateStatus: function(){

			}
		};
	*/

	//List Collection
	var List = function(){  
		this.tasks = [];
	}
	List.prototype.add = function(_item){
		//var task = new Task(_item);
		this.tasks.push(_item);
	}
	List.prototype.getAll = function(){
		return this.tasks;
	}
	List.prototype.getItemByIndex = function(_index) {
		return this.tasks[_index];
	}
	List.prototype.removeByIndex = function(_index) {
		this.tasks.splice(_index, 1);
		return this.tasks;
	}

//-- Create View Classes
	var listItemView = {
		itemHTML: function(_item){
			var listItem = document.createElement("li");
			var listHTML = "";
			if(_item.status === "complete"){
				listHTML += "<input type='checkbox' checked>";
			}
			else {
				listHTML += "<input type='checkbox'>";
			}
			listHTML += "<label>" + _item.name + "</label>";
			listHTML += "<input type='text'><button class='edit'>Edit</button><button class='delete'>Delete</button>";
			
			listItem.innerHTML = listHTML;
			todoListArea.appendChild(listItem);

			this.addHandlers();
		},

		addHandlers: function(){
			todoListArea.addEventListener("click", function(event) {
			    if (event.target.className == "edit"){
			    	console.log("this will edit");
			    	if(current.innerHTML == "Edit"){
			    		current.innerHTML = "Save";
			    	} else {
						current.innerHTML = "Edit";
			    	}
			  	}
			  	else if (event.target.className == "delete"){
			  		console.log("this will delete");
			  	}
			  });
		},
		onEditClick: function(){ 
			
		}
	};
	var listView = {
		listHTML: function(_allItems){
			todoListArea.innerHTML = "";
			for(var i = 0; i<_allItems.length; i++){
				listItemView.itemHTML(_allItems[i]);
			}
		}
	}
	function onAdd(){	
		var task = new Task(newTask.value);
		list.add(task);
		
		var allItems = list.getAll();
		listView.listHTML(allItems);
		newTask.value = "";
	}

//-- Add our classes to our namespace if you want to use it in other places
	_myNameSpace.Models.Task = Task;
	_myNameSpace.Models.List = List;
	_myNameSpace.Views.ListItemView = listItemView;
	_myNameSpace.Views.ListView = listView;

//-- Return the main object (optional)
	return _myNameSpace;

}(ListApp));


//-- Test
console.log(ListApp);