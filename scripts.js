let table =
{ 
     "snoop dog":["https://www.billboard.com/articles/news/64310/snoop-dogg-disney-sued-over-alleged-rape"]
};

function main()
{
	let search_btn = document.getElementById("search-btn");
	let search_bar = document.getElementById("search-bar");
	
	search_btn.onclick = function()
	{
		search(search_bar.value);
	}

	search_bar.onkeypress = function(e)
	{
    	if(!e) e = window.event;
    	let keyCode = e.code || e.key;
		if(keyCode == 'Enter')
		{
			search(search_bar.value);
		}
		return true;
	}
}

function search(target)
{
	target = target.toLowerCase();

	let box = document.getElementById("main");
	box.innerHTML = "<h2>Is <i><span style=\"color:blue\">" + target + "</span></i> an abuser?</h2><hr>";
	let h3 = document.createElement("h3");

	if(target in table)
	{
		h3.textContent = "YES.";
		h3.style.color = "red";

		let p = document.createElement("p");
		p.textContent = table[target];
		box.appendChild(h3);
		box.appendChild(p);
	}
	else
	{
		h3.textContent = "NO.";
		h3.style.color = "green";

		let p = document.createElement("p");
		p.innerHTML = "Well, maybe. This just means that there are no known allegations against <i><span style=\"color:blue\">" + target + "</span></i> as of now.";
		box.appendChild(h3);
		box.appendChild(p);
	}
}

main();
