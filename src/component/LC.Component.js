var LC = LC || {};
LC.Component = LC.Component || {};

// Manual attachment.
LC.Component.apply = function(ComponentModule, elements, options)
{
    // Ignore if no element, or an invalid element, was specified
    if(!elements) return;
    options = options || {};

    // Parse any strings with sizzle
    if(typeof elements == "string") elements = LC.Lib.Sizzle(elements);

    // If user entered an array or if sizzle returned an array 
    // we'd like to loop through it. Convert single elements to an array
    // to make it consistent
    if(elements.constructor != Array) elements = [elements];

    // Create LC.Listbox objects and return them as an array
    var lcComponents = [];
    for(var i in elements)
    {
        options.element = elements[i];
        var lcComponent = new ComponentModule(options);
        lcComponents.push(lcComponent);
    }
    return lcComponents;
}