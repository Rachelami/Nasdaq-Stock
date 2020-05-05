class SearchResults {
	static url = "./compare.html?symbol="
	constructor(parent, spinner) {
		this.parent = parent;
		this.spinner = spinner;
	}

	newsearchResult() {
		let input = document.getElementById("userInput").value;
		input = input.toLowerCase();
		return input;
	}
	colorBackground(item) {
		const input = this.newsearchResult();
		let newinput = document.createElement("span");
		const pattern = new RegExp(`${input}`, `i`); 
		const highlightedName = item.replace(
			pattern,
			`<span class="yellow">${input}</span>`
		);
		newinput.innerHTML += highlightedName;


		return newinput;
	}

	async getFirstFetch() {
		this.parent.innerHTML = "";
		let userInput = await this.newsearchResult();
		let response = await fetch(
			`https://financialmodelingprep.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`
		);
		let data = await response.json();
		return data;
	}

	async getSecondFetch() {
		this.spinner.showLoader();
		let getProfiles = await this.getFirstFetch();
		let url = this.url
		let NewUrl=""
		getProfiles.map(profile =>
			fetch(
				`https://financialmodelingprep.com/api/v3/company/profile/${profile.symbol}`
			)
				.then(response => response.json())
				.then(item => {
					this.spinner.hideLoader();
					this.createResults(item, url);
				})
		);
	}

	async createResults(item, url, NewUrl) {
		let { image, companyName, changesPercentage } = item.profile;
		let fragment = document.createDocumentFragment();

		let resultsContainer = document.createElement("div");
		resultsContainer.classList.add("flex", "center");

		let ulContainer = document.createElement("ul");
		ulContainer.id = "myUL";

		let nameContainer = document.createElement("li");
		let hrefNode = document.createElement("a");
		let DOM_img = document.createElement("img");
		DOM_img.src = image;
		DOM_img.classList.add("image");
		let colouredSymbol = this.colorBackground(item.symbol);
		let colouredName = this.colorBackground(companyName);
		hrefNode.href = `./company.html?symbol=${item.symbol}`;

		let symbolSpan = document.createElement("span");
		symbolSpan.classList.add("symbolSpan");

		let compareBtn = document.createElement("button");
		compareBtn.classList.add("btn", "btn-primary");
		compareBtn.innerText = "compare";

		this.compareBtnFun(item, compareBtn, url, NewUrl);

		symbolSpan.appendChild(colouredSymbol);
		nameContainer.appendChild(DOM_img);
		hrefNode.appendChild(colouredName);
		hrefNode.appendChild(symbolSpan);
		nameContainer.appendChild(hrefNode);
		this.percentageColor(changesPercentage, nameContainer);
		nameContainer.appendChild(compareBtn);

		ulContainer.appendChild(nameContainer);
		resultsContainer.appendChild(ulContainer);
		fragment.appendChild(resultsContainer);
		this.parent.appendChild(fragment);
	}

	percentageColor(changesPercentage, nameContainer) {
		let changesPercentageContainer = document.createElement("div");

		if (changesPercentage.includes("+") === true) {
			changesPercentageContainer.classList.add("green");
		} else {
			changesPercentageContainer.classList.add("red");
		}
		changesPercentageContainer.innerText += changesPercentage;
		changesPercentageContainer.classList.add("changesPercentage");
		nameContainer.appendChild(changesPercentageContainer);
	}

	async compareBtnFun(item, compareBtn, url, NewUrl) {
		
		compareBtn.id = "compareBtnID";
		compareBtn.addEventListener("click", ()=> {

			let GroupBtn = document.createElement("button");
			GroupBtn.classList.add("btn", "btn-secondary");
			GroupBtn.setAttribute("type", "button");
			GroupBtn.innerText = `\u00D7 ${item.symbol}`;

			SearchResults.url += `${item.symbol},`
			let StringUrl = SearchResults.url.substring(0, SearchResults.url.length - 1);
			document
			.getElementById("TopRightComperBtn")
			.addEventListener("click", function() {
					location.href = `${StringUrl}`;
				});


			GroupBtn.addEventListener("click", function() {
				document.getElementById("GroupBtnID").removeChild(GroupBtn);
			});

			document.getElementById("GroupBtnID").appendChild(GroupBtn);
		});
	}
}
