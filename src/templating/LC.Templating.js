/* 
   @author Charlie Rudenstål 
   @url https://github.com/charlie-rudenstal/LightweightUI-Components-html5-js 
*/

var LC = LC || {};

LC.Templating = (function(me)
{
    // Wraps the template in a div to get its outerHtml. This is important so that
    // template placeholders can be used even in the template tag
    me.render = function(elmTemplate, data, returnHtml)
    {
        var newElement = $(elmTemplate).clone();
        var wrappedNewElement = $("<div>").append(newElement);
        var outerHtml = wrappedNewElement.html(); 

        for(var i in data) 
        {
            //outerHtml = outerHtml.replace("[" + i + "]", data[i]); // only 1 occurrence
            // For general [tags]
            outerHtml = outerHtml.replace(new RegExp("\\[" + i + "\\]", "g"), data[i]); // all occurrences
            
            // For conditionl tags [ifBoolean?write this]
            if(data[i]) 
            {
                outerHtml = outerHtml.replace(new RegExp("\\["+ i + "\\?(.+?)\\]", "gi"), "$1");
            }
            else
            {
                // Remove conditional tags if boolean was not satisfied
                outerHtml = outerHtml.replace(new RegExp("\\["+ i + "\\?(.+?)\\]", "gi"), "");
            }
        }

        if(returnHtml) return outerHtml;

        wrappedNewElement.html(outerHtml);
        newElement = $($(wrappedNewElement).children()[0]);
        newElement.attr("id", null);

        return newElement;
    };

    // Takes an element and replaces it with an identical element with rendered data (using [tags])
    // Or, if the data is an array renders data inside the element using a tag with class="template" as a item template.
    me.fill = function(element, data)
    {
        var $element = $(element);

        if($.isArray(data))
        {
            var template = $element.find(".template").get(0);
            $element.children("*:not(.template)").remove();
            for(var i in data)
            {
                if(typeof data[i] == "undefined" || typeof data[i] == "function") continue;
                var $elm = $(LC.Templating.render(template, data[i]));
                $elm.removeClass("template");
                $element.append($elm);
            }
        }
        else
        {
            var template = $element;
            var $elm = $(LC.Templating.render(template, data));
            $element.replaceWith($elm);
        }   
    }

    return me;

})(LC.Templating || {});