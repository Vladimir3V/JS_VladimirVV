var View = {
    render: function(templateName, model) {
		console.log(model);
        templateName = templateName + 'Template';
        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
		
        return renderFn(model);
    }
	
}


