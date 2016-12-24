var View = {
    render: function(templateName, model) {
        templateName = templateName + 'Template';
        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        return renderFn(model);
    },
	toggleActive: function(a,b) {
		a.classList.toggle('active');
		b.classList.toggle('active');
	}
	
	
};



