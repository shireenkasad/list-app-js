// Main entry point to start applicationi
(function(App, $){
	// Create instance of new app
	return new App.components.App({el: $('html')[0]});
}(App, jQuery))