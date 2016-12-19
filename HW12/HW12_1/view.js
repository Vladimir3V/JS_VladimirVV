module.exports = () => {
	let View = {
		render: function (templateName, model) {
			templateName = templateName + 'Template';

			var templateElement = document.getElementById(templateName),
				templateSource = templateElement.innerHTML,
				renderFn = Handlebars.compile(templateSource);

			return renderFn(model);
		}
	};
	
	return View;

}
