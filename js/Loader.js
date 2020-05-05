
class Loader {
	constructor(parent) {
		this.parent = parent;
		this.loader,
			this.createLoader();
	}

	createLoader() {
		let myspinner = document.createElement("div");
		myspinner.classList.add("none", "spinner-border");
		myspinner.id = "loader";
		this.loader = myspinner;
		this.parent.append(this.loader);
	}

	showLoader() {
		this.loader.classList.remove("none");
	}

	hideLoader() {
		this.loader.classList.add("none");
	}
}
