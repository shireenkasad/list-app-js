var newTask = document.getElementById("user-input");
var todoListArea = document.getElementById("todo-list");
var doneListArea = document.getElementById("done-list");
var addButton = document.querySelector(".add");


// model

function Task (_name, _status){
	this.name = _name;
	this.status = "incomplete";	
}

Task.prototype.getItem = function(){
	return this;
}
Task.prototype.updateStatus = function(_newStatus){
	this.status = _newStatus;
}
Task.prototype.updateItem = function(_newName){
	this.name = _newName;
}


// collection

function List(){  
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


// app

function onAdd(){	
	var task = new Task(newTask.value);
	list.add(task);
	
	var allItems = list.getAll();
	listView.listHTML(allItems);
	newTask.value = "";
}

var list = new List();

addButton.addEventListener("click", onAdd, false);





