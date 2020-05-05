(() => {
    const loader = new Loader(document.getElementById("spinner"));
	const marquee = new Marquee(document.getElementById("marquee"));
	marquee.load();
	const results = new SearchResults(document.getElementById("results"), loader);
	const searchForm1 = new SearchForm(document.getElementById("form"), loader);
	searchForm1.tickerSearchFun(results.getSecondFetch.bind(results));
})();

