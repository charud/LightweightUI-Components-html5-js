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
        // For browsers that support outerHTML natively
        outerHtml = elmTemplate.outerHTML; 
        if(!outerHtml) 
        {
            // For the others
            var wrapper = document.createElement("div");
            wrapper.appendChild(elmTemplate.cloneNode(true));
            outerHtml = wrapper.innerHTML;
        }

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

        var wrapper = document.createElement("div");
        wrapper.innerHTML = outerHtml;
        return wrapper.children[0];
    };

    // Takes an element and replaces it with an identical element with rendered data (using [tags])
    // Or, if the data is an array renders data inside the element using a tag with class="template" as a item template.
    me.fill = function(element, data)
    {
        /*if(data.constructor == Array)
        {
            var template = Sizzle(".template", element);
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
        {*/
            var template = element;
            var newElement = LC.Templating.render(template, data);
            element.parentNode().replaceChild(newElement, element);
        //}   
    }

    return me;

})(LC.Templating || {});