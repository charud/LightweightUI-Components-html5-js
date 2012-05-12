var LC = LC || {};

LC.Listbox = function(options)
{
    var me = {};
    var _element;

    me.init = function()
    {
        _element = options.element;
    };

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