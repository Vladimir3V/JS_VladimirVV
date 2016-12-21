var View = {
    render: function(templateName, model) {
        templateName = templateName + 'Template';

        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        return renderFn(model);
    }
	
	
//	renderPro: function(templateName, model) {
//		
//        templateName = templateName + 'Template';
//
//        var templateElement = document.getElementById(templateName),
//            templateSource = templateElement.innerHTML,
//            renderFn = Handlebars.compile(templateSource);
////		console.log (model);
//		
////		Handlebars.registerHelper('agree_button', function() {
////	    return "<button>I agree. I " + model[7].com.details + "</button>";
////		});
//
//        return renderFn(model);
//    }
};



