var LC = LC || {};
/* 
   @author Charlie Rudenstål 
   @url https://github.com/charlie-rudenstal/LightweightUI-Components-html5-js 
*/

LC.Events = (function(me)
{
	// Objects cannot be used as keys, the workaround is to keep them
	// as values in a separat array and track them by index
	var _events = {};
	var _objects = [];

	me.on = function(object, eventName, callback)
	{
		// Get index of object for which this event should be associated
		var objectIndex = _objects.indexOf(object);
		if(objectIndex == -1) // object does not already exist, add it and retrieve its index
		{
			var objectIndex = _objects.push(object) - 1;
			_events[objectIndex] = {};
		}
	
		// Add the callback to the associated object index and event name		
		_events[objectIndex][eventName.toLowerCase()] = callback;
	};

	me.trigger = function(object, eventName, parameters)
	{
		// Get the associated object index if any objects for this event exists
		var objectIndex = _objects.indexOf(object);
		if(objectIndex == -1) return; // object does not exist
		
		// And fire the event if the event name exists for this object index
		if(!!_events[objectIndex][eventName.toLowerCase()])
		{
			_events[objectIndex][eventName.toLowerCase()](parameters);
		}
	};

	return me;
})(LC.LC || {});
