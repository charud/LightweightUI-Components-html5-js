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