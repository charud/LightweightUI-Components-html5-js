var LC = LC || {};

LC.Dropdown = function(options)
{
	var me = {};
    var _element;
    var _itemTemplate;

    var _items = [];
    var _multipleSelection;

	me.init = function()
	{
		_element = options.element;
        _multipleSelection = options.multipleSelection || false;

        // Retrieve all items that are already populated in the element
        // Retrieve all items that are already populated in the element
        LC.Element.foreachChild(_element, function(child)
        {
            _items.push({
                content: child.innerHTML,
                value: child.value
            });
        });
    
        // Register click handler for selection
        _element.addEventListener("mousedown", onListboxClicked, true);
        _element.addEventListener("keydown", onListboxKeydown, true);

        me.invalidateItems();
	};

	me.init();
	return me;
};

// Manual attachment.
LC.Dropdown.apply = function(elements, options)
{
    LC.Component.apply(LC.Dropdown, elements, options);
}

// Automatic attachment. Applies the LC.Listbox to all selects with size != 0
// or with any element using data-component="listbox"
LC.Dropdown.applyAll = function(options)
{
    return LC.Dropdown.apply("select[size=0], *[data-component=dropdown]", options);    
}