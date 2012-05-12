var LC = LC || {};

LC.Data = (function(me)
{
    var _data = {};

    me.get = function(element, key)
    {
        
        return _data[element]; 
    };

    me.set = function(element, key, object)
    {
        _data[element] = object;
    };

    return me;
})(LC.Data || {});