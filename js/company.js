class CompanyInfo {
	constructor(parent, symbol) {
		this.parent = parent;
		this.symbol = symbol;
		this.print();
	}
	print() {
		console.log("parent:");
		console.log(this.parent);
		console.log("symbol");
		console.log(this.symbol);
	}
	HtmlConstructor() {
		let fragment = document.createElement("div");
		fragment.id = "fragment";
		let header = document.createElement("div");
		header.id = "header";

		let details = document.createElement("div");
		details.id = "details";
		details.classList.add("flex");

		let spinner = document.createElement("div");
		spinner.id = "spinner";

		let symboldescription = document.createElement("div");
		symboldescription.id = "symboldescription";
		let flexColumn = document.createElement("div");
		flexColumn.classList.add("flex-column");
		let symbolprice = document.createElement("div");
		symbolprice.id = "symbolprice";
		let symbollink = document.createElement("div");
		symbollink.id = "symbollink";
		let canvas = document.createElement("canvas");
		canvas.id = "myChart";

		flexColumn.appendChild(symbolprice);
		flexColumn.appendChild(symbollink);
		details.appendChild(spinner);
		details.appendChild(symboldescription);
		details.appendChild(flexColumn);
		fragment.appendChild(header);
		fragment.appendChild(details);
		fragment.appendChild(canvas);
		this.parent.appendChild(fragment);

		const Companycontent1 = new Companycontent(
			this.symbol,
			header,
			symboldescription,
			symbolprice,
			symbollink,
			canvas
		);
		Companycontent1.getStockInfo();
	}
}

class Companycontent {
	constructor(
		symbol,
		header,
		symboldescription,
		symbolprice,
		symbollink,
		canvas
	) {
		this.symbol = symbol;
		this.header = header;
		this.symboldescription = symboldescription;
		this.symbolprice = symbolprice;
		this.symbollink = symbollink;
		this.canvas = canvas;
	}

	createHeader(image, companyName) {
		let headerFragment = document.createDocumentFragment();
		let DOM_img = document.createElement("img");
		DOM_img.classList.add("image");
		DOM_img.src = image;
		headerFragment.appendChild(DOM_img);
		let nameContainer = document.createElement("div");
		nameContainer.classList.add("name");
		nameContainer.innerText += companyName;
		headerFragment.appendChild(nameContainer);
		this.header.appendChild(headerFragment);
	}

	createDescription(description) {
		let symbolDescriptionFragment = document.createDocumentFragment();
		let descriptionContainer = document.createElement("div");
		descriptionContainer.classList.add("description");
		descriptionContainer.innerText += description;
		symbolDescriptionFragment.appendChild(descriptionContainer);
		this.symboldescription.appendChild(symbolDescriptionFragment);
	}

	createPrice(price, changesPercentage) {
		let pricefragment = document.createDocumentFragment();
		let priceContainer = document.createElement("div");
		priceContainer.classList.add("price");
		priceContainer.innerText += `Stock Price: $${price} `;
		pricefragment.appendChild(priceContainer);
		let changesPercentageContainer = document.createElement("div");
		changesPercentageContainer.classList.add("changesPercentage");
		if (changesPercentage.includes("+") === true) {
			changesPercentageContainer.classList.add("green");
		} else {
			changesPercentageContainer.classList.add("red");
		}
		changesPercentageContainer.innerText += changesPercentage;

		pricefragment.appendChild(changesPercentageContainer);
		this.symbolprice.appendChild(pricefragment);
	}

	createWebsite(website) {
		let linkFragment = document.createDocumentFragment();
		let linkContainer = document.createElement("a");
		linkContainer.classList.add("link");
		linkContainer.href = website;
		linkContainer.innerText += website;
		linkFragment.appendChild(linkContainer);
		this.symbollink.appendChild(linkFragment);
	}

	async getStockInfo() {
		console.log("this.Symbol");
		console.log(this.symbol);

		let urlSymbolInfo = `https://financialmodelingprep.com/api/v3/company/profile/${this.symbol}`;
		await fetch(urlSymbolInfo)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let {
					image,
					companyName,
					description,
					price,
					changesPercentage,
					website
				} = data.profile;

				this.createHeader(image, companyName);
				this.createDescription(description);
				this.createPrice(price, changesPercentage);
				this.createWebsite(website);
				this.chartStockInfo();
			});
	}

	chartStockInfo() {
		let myChart = new Chart(this.canvas, {
			type: "line",
			data: {
				labels: [""],
				datasets: [
					{
						label: "stock price history",
						data: [],
						backgroundColor: ["rgba(75, 192, 192, 0.2)"],
						borderColor: [
							"rgba(255, 99, 132, 1)"
						],
						borderWidth: 1,
						radius: 0.1
					}
				]
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
				}
			}
		});

		let charinfo = `https://financialmodelingprep.com/api/v3/historical-price-full/${this.symbol}?serietype=line`;
		let allclose = [];
		fetch(charinfo)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let { datasets, labels } = myChart.data;
				for (let i = 0; i < data.historical.length; i++) {
					let { close, date } = data.historical[i];
					datasets[0].data.push(close);
					labels.push(date);
				}
				myChart.update();
			});
	}
}
