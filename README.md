LightweightUI-Components-html5-js
=================================

Lightweight UI Components for HTML5 and Javascript using semantic and intuitive syntax

Listbox
=======

A regular select with a size larger than 1

	<select id="select" size="4">
		<option value="1">Item 1</option>
		<option value="2">Item 2</option>
		<option value="3">Item 3</option>
	</select>

And some Javascript

	LC.Listbox.apply();

Will result in a neatly designed listbox which can be styled by applying a class

	<select id="select" size="4" class="listbox">
		<option value="1">Item 1</option>
		<option value="2">Item 2</option>
		<option value="3">Item 3</option>
	</select>

And then 

	.listbox
    {
        background-color: white;
        width: 250px;
    }

    .listbox div
    {
        padding: 7px 6px;
    }

    .listbox .selected
    {
        background-color: #bbbbaa;
    }

Selected items will get a "selected" class applied to them.

Templating
==========

This element

	<article id="myArticle">
		<header>
			<h1>[title]</h1>
		</header>
		<p>[body]</p>
		<p>By <em>[author]</em></p>
	</article>

And this javascript

	var elmArticle = document.getElementById("myArticle");
	var article = {
		title = "Will the Leaning Tower of Pisa ever fall?",
		body = "Pisa without its precariously tilted landmark is like San Francisco without the Golden Gate or London without Buckingham Palace",
		author = "William Harris"
	};
	
	var elmRenderedArticle = LC.Templating.render(elmArticle, article);

Will result in a new rendered DOM element which can replace the original template using

	elmArticle.parentNode.replaceChild(elmRenderedArticle, elmArticle);