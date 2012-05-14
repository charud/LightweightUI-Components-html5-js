// hasClass, addClass and removeClass code borrowed from 
// http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript

var LC = LC || {};

LC.Element = (function(me)
{
	me.hasClass = function(element, className)
	{
		return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	};

	me.addClass = function(element, className)
	{
		if (!me.hasClass(element, className)) element.className += " " + className;
	};

	me.removeClass = function(element, className)
	{
		if (me.hasClass(element, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
	};

	me.isValidNode = function(node)
	{
		return node.nodeType == 1;
	}

	return me;
})(LC.LC || {});
