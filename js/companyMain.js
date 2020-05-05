
let symbol = new URLSearchParams(window.location.search);
let companySymbol = symbol.get("symbol");

const CompInfo = new CompanyInfo(
	document.getElementById("CompInfo"),
	companySymbol
);
CompInfo.HtmlConstructor();
