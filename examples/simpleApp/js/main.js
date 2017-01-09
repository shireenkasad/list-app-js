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
		// Creating an internal object to hold 'Properties' or data
		// and underscore before a name is just a practice people use to denote a private
		// property or variable. One that shouldn't be accessed without a function like get() or set()
		this._props = {
			name: _name,
			status: "incomplete"
		};
		/*
			Old Code:

			this.name = _name;
			this.status = "incomplete";	
		*/
	};

	Task.prototype.get = function(_propName){
		return this._props[_propName] || null;
	}
	Task.prototype.set = function(_propName, _val){
		this._props[_propName] = _val;
		return this;
	}
	/*
		Old Code:
		Task.prototype.updateStatus = function(_newStatus){
			this.status = _newStatus;
		}
		Task.prototype.updateItem = function(_newName){
			this.name = _newName;
		}
	*/
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
	/*
		A view should only be in charge of updating itself and any children views it has. (but updating children should be just calling their render function)

		In this 'ListItemView' it takes in a model. Which is all the dynamic data for the element
		the render() pulls the  attributes 'label' and 'id' to update its element. 
		the View DOES NOT add itsself to anything. The Listview will be in charge of adding things and displaying the ListItemView's element
	*/
	var ListItemView = function(_model){
		var _this = this;
		_this.model = _model;

		//Initialize
		_this.init();
	};
	ListItemView.prototype = {
		init: function(){
			/* Make Reference to this. few reasons why people do this
				- when minifying code at the end, it will make the minify smaller
				- if you need to reference the current class object then you can with _this
			*/
			var _this = this,
				_domHolder = document.createElement("div");

			//Find Template (you can also hardcode)
			console.log(document.querySelector('.app__templates [data-template-name="list-item"]'));
			_this._htmlTemplate = document.querySelector('.app__templates [data-template-name="list-item"]').innerHTML.trim();

			//add html to dom holder. we do this because we don't know what kind of element the list item will be so we cant use
			// normla create element and the tag name. so we add the html to this container then grab the first child as the element
			_domHolder.innerHTML = _this._htmlTemplate;

			//create reference to view element
			_this.el = _domHolder.firstChild;
			_this.render();

		},
		addListeners: function(){
			var _el = this.el;
			_el.addEventListener("click", function(event) {
				var _target = event.target;
			    if (_target.className == "list-item_controls-edit"){
			    	console.log("this will edit");
			  	}
			  	else if (_target.className == "list-item_controls-delete"){
			  		console.log("this will delete");
			  	}
			});
		},
		render: function(){
			//Use the model to insert the correct data into the View's Element
			var _this = this,
				_model = _this.model,
				_label = _model.get('label'),
				_id = _model.get('id'),
				qLabel = _this.el.querySelector('.list-item__label');
			_this.el.setAttribute('data-item-id', _id);
			qLabel.innerText = _label;
		}
	};
	//TODO: started writign listview
	var ListView = function(){

	};

	var ListView = {
		listHTML: function(_allItems){
			todoListArea.innerHTML = "";
			for(var i = 0; i<_allItems.length; i++){
				ListItemView.itemHTML(_allItems[i]);
			}
		}
	}
	function onAdd(){	
		var task = new Task(newTask.value);
		list.add(task);
		
		var allItems = list.getAll();
		ListView.listHTML(allItems);
		newTask.value = "";
	}

//-- Add our classes to our namespace if you want to use it in other places
	_myNameSpace.Models.Task = Task;
	_myNameSpace.Models.List = List;
	_myNameSpace.Views.ListItemView = ListItemView;
	_myNameSpace.Views.ListView = ListView;

//-- Return the main object (optional)
	return _myNameSpace;

}(ListApp));


//-- Test
	console.log(ListApp);
	/*
		Create a Model to hold data
		Create a View to add to the DOM

	*/
	var testTaskModel = new ListApp.Models.Task(),
		testListItemView = new ListApp.Views.ListItemView(testTaskModel),
		domList = document.querySelector('body');

	//Clear the body and then add the View's DOM Element to it
	domList.innerHTML = '';
	domList.appendChild(testListItemView.el);

	// change label and render
	testTaskModel.set('label', 'Hello World!');
	testListItemView.render();

	/*	To Illustrate how the model and view work together, 
		Lets create an onclick to the body and change the Model's data and Render the View
	*/

	document.querySelector('html').addEventListener('click', function(){
		testTaskModel.set('label', 'Random Number - ' + Math.random());
		testListItemView.render();
	});