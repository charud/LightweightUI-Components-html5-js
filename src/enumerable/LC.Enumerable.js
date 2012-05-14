var LC = LC || {};

LC.Enumerable = function(array)
{
	var me = {};

	me.first = function(predicate)
	{
		for(var i in array)
		{
			if(true === predicate(array[i])) 
			{
				return array[i];
			}
		}
	}

	return me;
};
