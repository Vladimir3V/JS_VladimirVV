var Router = {
    handle: function(route) {
        var routeName = route + 'Route';

        Controller[routeName]();
    },
	  active: function(clas, id) {
        Controller.active(clas, id);
    }
};
