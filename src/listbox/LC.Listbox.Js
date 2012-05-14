/* 
   @author Charlie Rudenstål 
   @url https://github.com/charlie-rudenstal/LightweightUI-Components-html5-js 
*/

var LC = LC || {};

LC.Listbox = function(options)
{
    var me = {};
    var _element;
    var _itemTemplate;

    var _items = [];
    var _multipleSelection = false;

    me.init = function()
    {
        _element = options.element;
        _multipleSelection = options._multipleSelection || false;

        // Retrieve all items that are already populated in the element
        var elmItems = _element.childNodes;
        for(var i in elmItems)
        {
            if(elmItems[i].nodeType != 1) continue; // ignore non-elements

            var elmItem = elmItems[i];
            _items.push({
                content: elmItem.innerHTML,
                value: elmItem.value
            })
        }
    
        // Register click handler for selection
        _element.addEventListener("mousedown", onListboxClicked, true);
        _element.addEventListener("keydown", onListboxKeydown, true);

        me.invalidateItems();
    };

    var onListboxClicked = function(e)
    {
        // Get the clicked item element
        var elmItem = e.target;
        if(elmItem == null) return;

        // Get index of element in list
        for(var index = 0, e = elmItem; e = e.previousSibling; ++index);

        // Get the item object and mark it as selected
        // and deselect other items if multiple selection is disabled
        for(var i in _items)
        {
            if(i == index) _items[i].selected = true;
            else if(false == _multipleSelection) _items[i].selected = false;
        }

        me.invalidateSelection();
    };

    var onListboxKeydown = function(e)
    {
        //console.log("key down");
    }

    me.invalidateSelection = function()
    {
        var listElements = _element.childNodes;
        for(var i in listElements)
        {
            if(listElements[i].nodeType != 1) continue; // ignore non-elements
            
            var listElement = listElements[i];
            var item = _items[i];
            if(item.selected)
            {
                LC.Element.addClass(listElement, "selected");
            }
            else
            {
                LC.Element.removeClass(listElement, "selected");
            }
        }
    };  

    me.invalidateItems = function()
    {
        var elmTemplate = getItemTemplate();

        var htmlItems = "";
        for(var i in _items)
        {
            var item = _items[i];
            htmlItems += LC.Templating.render(elmTemplate, item, true);
        }
        _element.innerHTML = htmlItems;
    };

    me.setItems = function(items)
    {
        _items = items;
    }

    var getItemTemplate = function()
    {
        if(!_itemTemplate) 
        {
            // Try to find a child with the class "template" inside the element and use that
            // Don't forget the remove the .template class from the template or else all generated
            // elements would inherit it
            _itemTemplate = Sizzle(".template", _element)[0];
            if(_itemTemplate) 
            {
                LC.Element.removeClass(_itemTemplate, ".template");
            }

            // Otherwise fallback to a clone of the first child and clear its innerHTML
            // so that we at least get an element with the same type as its sibblings    
            if(!_itemTemplate)
            {
                // Find first real element among child nodes
                var firstChild = new LC.Enumerable(_element.childNodes)
                                    .first(LC.Element.isValidNode);

                // And use it
                if(firstChild)
                {
                    _itemTemplate = firstChild.cloneNode(true);
                    _itemTemplate.innerHTML = "[content]";
                }
            }

            // As a last resort, use a div
            if(!_itemTemplate)
            {
                _itemTemplate = document.createElement("div");
                _itemTemplate.innerHTML = "[content]";
            }

        }
        return _itemTemplate;
    };

    me.init();
    return me;
};

// Manual attachment.
LC.Listbox.apply = function(elements)
{
    // Ignore if no element, or an invalid element, was specified
    if(!elements) return;

    // Parse any strings with sizzle
    if(typeof elements == "string") elements = Sizzle(elements);

    // If user entered an array or if sizzle returned an array 
    // we'd like to loop through it. Convert single elements to an array
    // to make it consistent
    if(elements.constructor != Array) elements = [elements];

    // Create LC.Listbox objects and return them as an array
    var lcListboxes = [];
    for(var i in elements)
    {
        var lcListbox = new LC.Listbox({ element: elements[i] });
        lcListboxes.push(lcListbox);
    }
    return lcListboxes;
}

// Automatic attachment. Applies the LC.Listbox to all selects with size != 0
// or with any element using data-component="listbox"
LC.Listbox.applyAll = function()
{
    return LC.Listbox.apply("select[size!=0], *[data-component=listbox]");    
}