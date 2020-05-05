class Marquee {
	constructor(parent) {
		this.parent = parent;
	}

	async getStockData() {
		let response = await fetch(
			"https:financialmodelingprep.com/api/v3/stock/real-time-price"
		);
		let data = await response.json();
		return data.stockList;
	}

	async load() {
		let stockData = await this.getStockData();
		stockData.map(stock => {
			let { symbol, price } = stock;
			return this.createMarquee(symbol, price);
		});
	}

	createMarquee(symbol, price) {
		let stockContainer = document.createElement("div");
		let stockSymbol = document.createElement("span");
		let stockPrice = document.createElement("span");
		stockSymbol.innerHTML = symbol;
		stockContainer.classList.add("mx-3");
		stockSymbol.classList.add("mx-1");
		stockPrice.innerHTML = price;
		stockPrice.classList.add("green");
		stockContainer.appendChild(stockSymbol);
		stockContainer.appendChild(stockPrice);
		this.parent.appendChild(stockContainer);
	}
}
