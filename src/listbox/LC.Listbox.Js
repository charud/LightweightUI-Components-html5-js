/* 
   @author Charlie Rudenstål 
   @url https://github.com/charlie-rudenstal/LightweightUI-Components-html5-js 
*/

var LC = LC || {};

LC.Listbox = function(options)
{
    var me = {};
    var _element;
    var _newElement;
    var _items = [];
    var _multipleSelection = false;

    me.init = function()
    {
        _element = options.element;
        _multipleSelection = options._multipleSelection || false;

        // Retrieve all items that are already populated in the <select>
        var elmItems = Sizzle("option", _element);
        for(var i in elmItems)
        {
            var elmItem = elmItems[i];
            _items.push({
                content: elmItem.innerHTML,
                value: elmItem.value
            })
        }

        // Replace the <select> with a more flexible <div>-tag
        _newElement = document.createElement("div");
        _element.parentNode.replaceChild(_newElement, _element);

        // Copy properties from the original elements
        _newElement.className = _element.className;
    
        // Register click handler for selection
        _newElement.addEventListener("mousedown", onListboxClicked, false);
        _newElement.addEventListener("keydown", onListboxKeydown, true);

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
        console.log("key down");
    }

    me.invalidateSelection = function()
    {
        var listElements = _newElement.childNodes;
        for(var i in listElements)
        {
            if(listElements[i].nodeType != 1) continue; // ignore non-elements
            
            var element = listElements[i];
            var item = _items[i];
            if(item.selected)
            {
                element.className = "selected";
            }
            else
            {
                element.className = "";
            }
        }
    };  

    me.invalidateItems = function()
    {
        var elmTemplate = document.createElement("div");
        elmTemplate.innerHTML = "[content]";

        var htmlItems = "";
        for(var i in _items)
        {
            var item = _items[i];
            htmlItems += LC.Templating.render(elmTemplate, item, true);
        }
        _newElement.innerHTML = htmlItems;
    };

    me.setItems = function(items)
    {
        _items = items;
    }

    me.init();
    return me;
};

// Applies the LC.Listbox to all selects with size != 0
LC.Listbox.apply = function()
{
    var listboxes = Sizzle("select[size!=0]");
    for(i in listboxes)
    {
        var elmListbox = listboxes[i];
        var lcListbox = new LC.Listbox({ element: elmListbox });
    }        
}