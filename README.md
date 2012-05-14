LightweightUI-Components-html5-js
=================================

Lightweight UI Components for HTML5 and Javascript using semantic and intuitive syntax

General
-------

Use your regular semantic HTML and apply these behaviors using one of two methods:

### Manual attachment

Will apply the component behaviors to a specific HTML element, or multiple if an array of elements are sent in

Example:

HTML

	<select id="mySelect"> ... </select>

JS

	LC.Listbox.apply(document.getElementById("mySelect"));

Will apply the Listbox behavior to the specified element if it is found. Return the newly created instance of LC.Listbox associated with the specified element.

Because LC use Sizzle internally the following shortcut may also be used

	LC.Listbox.apply("#mySelect");

If a selector match multiple elements the behavior will be applied to all of the elements.

### Automatic attachment

Will try to find and apply component behaviors to all elements in the document that match the requirements of the component

Example

HTML 
	
	<select size="4"> ... </select>

JS
	
	LC.Listbox.applyAll();

Will apply Listbox behaviors to the <select> box because it 1) Is a <select> and 2) Has a size attribute larger than 1. Returns an array with all LC.Listbox instances that were created.

Behaviours will also be applied to elements with a data-component attribute that matches the components name, for example

	<ul data-component="listbox">
		<li>Item 1</li>
		<li>Item 2</li>
	</ul>

### Item templates

An item template is used for all rendering of items. The components will use use one of three strategies when determing which template to use

1. Look for a child with the class "template" and clone it
2. Look at the first child and clone it but clear its innerHTML
3. Create an empty div

Listbox
-------

A regular select

	<select id="mySelect" size="4">
		<option value="1">Item 1</option>
		<option value="2">Item 2</option>
		<option value="3">Item 3</option>
	</select>

And attaching the behaviors using manual attachment

	LC.Listbox.apply(document.getElementById('mySelect'));

Will result in a LC.Listbox which can be styled by applying a class

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

Because some web browsers, like Chrome, strips HTML out of <option> elements Listboxes may also be created by using an <ul> or <ol> element and manual attachment


Templating
-------

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
		body = "Pisa without its precariously tilted landmark is like San
		Francisco without the Golden Gate or London without Buckingham Palace",
		author = "William Harris"
	};
	
	var elmRenderedArticle = LC.Templating.render(elmArticle, article);

Will result in a new rendered DOM element 

	<article id="myArticle">
		<header>
			<h1>Will the Leaning Tower of Pisa ever fall?</h1>
		</header>
		<p>Pisa without its precariously tilted landmark is like San
		Francisco without the Golden Gate or London without Buckingham Palace</p>
		<p>By <em>William Harris</em></p>
	</article>

Which can replace the original template using

	elmArticle.parentNode.replaceChild(elmRenderedArticle, elmArticle);

