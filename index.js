(function () {
	let vm = this;
	let bestLocalCafe_lat = 33.621030;
	let bestLocalCafe_long = -117.922658;
	let gmapBtn, bmapBtn;
	let gmap, gmapTarget, gmapOptions;
	let bmap, bmapTarget, bmapOptions;

	// === VARIABLE HOIST ===
	vm.showGmap = true;

	// === FUNCTION HOIST ===
	vm.initGmap = _initGmap;
	vm.initBmap = _initBmap;

	// === LOCAL FUNCTIONS ===
	function showMap(btnTarget) {
		switch (btnTarget.id) {
			case "gmapBtn":
				bmapBtn.classList.remove("btn-selected");
				gmapBtn.classList.add("btn-selected");

				gmapTarget.classList.remove("map-hidden");
				bmapTarget.classList.add("map-hidden");

				return;
			case "bmapBtn":
				gmapBtn.classList.remove("btn-selected");
				bmapBtn.classList.add("btn-selected");

				bmapTarget.classList.remove("map-hidden");
				gmapTarget.classList.add("map-hidden");

				return;
			default:
				return;
		}
	}

	// === HOISTED FUNCTIONS ===
	function _initGmap() {
		gmapOptions = {
			zoom: 11,
			center: {
				lat: bestLocalCafe_lat,
				lng: bestLocalCafe_long,
			},
		};

		gmap = new google.maps.Map(gmapTarget, gmapOptions);

		const infowindow = new google.maps.InfoWindow({
			content: `
        <div id="content">
          <div id="siteNotice"></div>
          <h4 id="firstHeading" class="firstHeading">Mariner's Coffee Shop</h1>
          <div id="bodyContent">
            <p>Best small breakfast cafe around!</p>
          </div>
        </div>
      `,
		});

		const marker = new google.maps.Marker({
			position: gmapOptions.center,
			map: gmap,
			title: "Mariner's Coffee Shop",
		});

		marker.addListener("click", function () {
			infowindow.open(gmap, marker);
		});
	}

	function _initBmap() {
		bmapOptions = {
			zoom: 11,
			center: new Microsoft.Maps.Location(
				bestLocalCafe_lat,
				bestLocalCafe_long
			),
			mapTypeId: Microsoft.Maps.MapTypeId.road,
		};

		bmap = new Microsoft.Maps.Map(bmapTarget, bmapOptions);

		const pushpin = new Microsoft.Maps.Pushpin(bmapOptions.center, {
			text: "M",
			title: "Mariner's Coffee Shop",
			subTitle: "Best Locals Cafe",
			color: "#ee5253",
		});

		bmap.entities.push(pushpin);
	}

	function initialize() {
		gmapBtn = document.getElementById("gmapBtn");
		bmapBtn = document.getElementById("bmapBtn");

		gmapTarget = document.getElementById("gmap");
		bmapTarget = document.getElementById("bmap");

		// Register btn click handler
		document.addEventListener("click", (event) => {
			const target = event.target.closest("btn");

			if (event.target) {
				event.preventDefault();
				showMap(event.target);
			}
		});
	}

	// === INIT ===
	initialize();
})();
