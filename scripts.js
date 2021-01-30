let table =
{ 
	"snoop dogg": ["https://www.billboard.com/articles/news/64310/snoop-dogg-disney-sued-over-alleged-rape",
		"https://www.cbsnews.com/news/snoop-dogg-hit-with-25m-rape-suit/"],

	"xxxtentacion": ["https://www.bbc.com/news/entertainment-arts-45971796",
		"https://pitchfork.com/news/xxxtentacion-confessed-to-domestic-abuse-secret-recording-listen/"],

	"tekashi69": ["https://pitchfork.com/news/tekashi-6ix9ine-sued-for-2015-sexual-assault-of-a-minor/",
		"https://www.bbc.com/news/newsbeat-45146400"],
	"6ixn9ne": ["https://pitchfork.com/news/tekashi-6ix9ine-sued-for-2015-sexual-assault-of-a-minor/",
		"https://www.bbc.com/news/newsbeat-45146400"],

	"chris brown": ["https://www.npr.org/2019/01/22/687346330/chris-brown-arrested-on-charges-of-rape-in-paris",
		"https://www.billboard.com/articles/news/269279/chris-brown-charged-with-assault-on-rihanna"],
	
	"roman polanski": ["https://www.vox.com/culture/2017/8/17/16156902/roman-polanski-child-rape-charges-explained-samantha-geimer-robin-m", "https://apnews.com/article/e087fdee79e74caf99caa27edd8a8887", "https://www.hollywoodreporter.com/news/roman-polanski-rape-victim-unveils-591015", "https://www.rollingstone.com/culture/culture-news/roman-polanskis-alleged-sexual-assaults-what-you-need-to-know-117579/"]
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

	let help_btn = document.getElementById("help-us-out");
	help_btn.onclick = function()
	{
		if(window.screen.width < 955)
			window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfJXPiwAfBXKwsNMtoyvRSWAsp0oiMI7yn7JPGh_r8AErbR9Q/viewform";
		else
		{
			let box = document.getElementById("main");
			box.style.paddingBottom = "5%";
			box.innerHTML = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfJXPiwAfBXKwsNMtoyvRSWAsp0oiMI7yn7JPGh_r8AErbR9Q/viewform?embedded=true" width="640" height="570" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>';
		}
	}
}

function hammingDistance(target, actual)
{
	let max = (target.length > actual.length) ? target.length : actual.length;
	let min = (target.length > actual.length) ? actual.length : target.length;
	let distance = max - min;

	for(let i = 0; i < target.length; ++i)
		if(target[i] != actual[i])
			distance++;

	return distance;
}

function fuzzySearch(target)
{
	const THRESHOLD = 5;
	for(let key in table)
	{
		if(hammingDistance(target, key) <= THRESHOLD)
			return [true, key];
	}
	return [false, ""];
}

function search(target)
{
	target = target.toLowerCase();
	let targetFontColor = "#65334D";

	let box = document.getElementById("main");
	box.innerHTML = "<h2>Is <i><span style=\"color:" + targetFontColor + "\">" + target + "</span></i> an abuser?</h2><hr>";
	let h3 = document.createElement("h3");

	let targetFound = target in table;

	let fuzzyTargetFound, fuzzyTargetCorrection;
	if(!targetFound)
	{
		[fuzzyTargetFound, fuzzyTargetCorrection] = fuzzySearch(target);
		console.log("Target not found: " + target);
		console.log("Fuzzy target found? " + fuzzyTargetFound + ", " + fuzzyTargetCorrection);
	}


	if(targetFound)
	{
		box.style.paddingBottom = "10%";

		h3.textContent = "This person has been accused of sexual misconduct. Read more about it here:";
		h3.style.color = "red";
		box.appendChild(h3);

		for(let i = 0; i < table[target].length; ++i)
		{
			let url = table[target][i];

			let p = document.createElement("p");
			p.innerHTML = "<a href = \"" + url + "\">" + url + "</a>";

			let frame = document.createElement("iframe");
			frame.src = url;
			frame.height = "350px";
			frame.className = "preview"

			box.appendChild(p);
			box.appendChild(frame);
		}
	}
	else if(fuzzyTargetFound)
	{
		h3.innerHTML = "DID YOU MEAN:  <i><span class=\"fuzzy_suggestion\">" + fuzzyTargetCorrection + "</span></i>?";
		box.appendChild(h3);
		h3.onclick = function()
		{
			search(fuzzyTargetCorrection);
			return;
		}
	}
	else
	{
		h3.textContent = "NO.";
		h3.style.color = "green";

		let p = document.createElement("p");
		p.innerHTML = "Well, maybe. This just means that there are no known allegations against <i><span style=\"color:" + targetFontColor + "\">" + target + "</span></i> as of now, or that we don't have them in our database.";
		box.appendChild(h3);
		box.appendChild(p);
	}
}

main();
