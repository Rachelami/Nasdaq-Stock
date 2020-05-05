
(async function() {
	let symbol = new URLSearchParams(window.location.search);
	let companySymbol = symbol.get("symbol");
	companySymbol = companySymbol.split(","); //[1,2,3,4]
	for (let OneSymbol of companySymbol) {
		const CompInfo = new CompanyInfo(
			document.getElementById("CompInfo"),OneSymbol );
		await CompInfo.HtmlConstructor();
	}
})();
