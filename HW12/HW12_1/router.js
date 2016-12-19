module.exports = () => {
	let Router = {
		handle: function (route) {
			var routeName = route + 'Route';

			Controller[routeName]();
		}
	};
	
	return Router;


}