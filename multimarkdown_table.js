function format_table(argument) {
	let empty_list = new Array;
	for (let i = 0; i < argument.rows.length; i++)
	{
		let row = argument.rows[i];
		for (let j = 0; j < row.cells.length; j++)
		{
			let cells = row.cells;
			let colspan = 1, rowspan = 1;
			let nextNode = cells[j].nextElementSibling;
			if (cells[j].innerText != '' || cells[j].firstElementChild)
				while (nextNode && nextNode.innerText == '' && !nextNode.firstElementChild)
				{
					empty_list.push(nextNode);
					nextNode = nextNode.nextElementSibling;
					colspan++;
				}
			if (colspan != 1)
				cells[j].setAttribute('colspan', colspan.toString());
			if (cells[j].innerText != "^^")
				for (let k = i+1; k < argument.rows.length; k++) {
					if (argument.rows[k].cells[j].innerText == "^^")
					{
						empty_list.push(argument.rows[k].cells[j])
						rowspan++;
					}
					else
						break;
				}
			if (rowspan != 1)
				cells[j].setAttribute('rowspan', rowspan.toString());
		}
	}
	for (let i = 0; i < empty_list.length; i++)
		empty_list[i].remove();
}

window.onload = function()
{
	let li = document.body.getElementsByTagName("table");
	for (let i = 0; i < li.length; i++)
		format_table(li[i]);
}
