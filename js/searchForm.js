class SearchForm {
	constructor(parent, spinner) {
		this.spinner = spinner;
		this.parent = parent;
	}

	async tickerSearchFun(callback) {
		let fragment = document.createDocumentFragment();

		let searchContiner = document.createElement("div");
		searchContiner.classList.add("flex", "bar-design");

		let input = document.createElement("INPUT");
		input.setAttribute("type", "text");
		input.setAttribute("id", "userInput");
		input.setAttribute("placeholder", "Search for company..");
		let searchBtn = document.createElement("div");
		searchBtn.classList.add("search-button");
		searchBtn.id = "searchBtn";
		searchBtn.addEventListener("click", callback);

		searchContiner.appendChild(input);
		searchContiner.appendChild(searchBtn);
		fragment.appendChild(searchContiner);
		this.parent.appendChild(fragment);
		document.getElementById("searchBtn").innerHTML = "Search";
		this.EnterFun(userInput, searchBtn);

		let GroupBtnID = document.getElementById("GroupBtnID");
		this.TopRightComper(GroupBtnID);
	}

	EnterFun(userInput, searchBtn) {
		let inputID = document.getElementById("userInput");
		inputID.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				document.getElementById("searchBtn").click();
			}
		});
	}

	TopRightComper(GroupBtnID) {
		let TopRightComperBtn = document.createElement("Button");
		TopRightComperBtn.classList.add(
			"btn",
			"btn-secondary",
			"TopRightComperBtn"
		);
		TopRightComperBtn.setAttribute("type", "button");
		TopRightComperBtn.innerText = "Compare Companies";
		document.getElementById("TopRightComperBtn").appendChild(TopRightComperBtn);
	}
}
