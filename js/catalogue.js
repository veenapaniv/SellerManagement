"use strict"

$(document).ready(function(){
	var inventoryData;
	var xhr;
	var url;
	var trow = "";
	var invTitles = ["productId", "product", "stock", "companies", "sold", "returned", "amount", "shipping", "lastUpdated", "owner"]
	//var editObj = JSON.parse(localStorage.getItem("editObj"));
	try {
		xhr = new XMLHttpRequest();
		url= "http://localhost:8080/SellerManagement/data/catalogue.json";
		xhr.addEventListener("readystatechange", function(){
			if(xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {
				var responseData = JSON.parse(xhr.responseText);
				for(var i=0; i< responseData.length; i++) {
					var td = "";
					for(var j=0;j< invTitles.length;j++) {
						var inv = invTitles[j];
						if(inv == "product") {
							inv = "<img border=3 height=100 width=100 src=" + "../images/" + responseData[i][inv] + " alt =" +invTitles[j] + "/>";
							td += "<td>" + inv + "</td>";
						} else if (inv == "companies") {
							var li = "";
							for(var k=0;k<responseData[i][inv].length;k++) {
								li += "<li>" + responseData[i].companies[k] + "</li>";
							}
							var ul = "<ul>" + li + "</ul>"
							td += "<td>" + ul + "</td>";
						}else {
							td += "<td>" + responseData[i][inv] + "</td>";
						}
						
						 
					}
					trow += "<tr>" + td + "</tr>";
				}
				document.getElementById("tBody").innerHTML = trow;
				/* var weather = JSON.parse(xhr.responseText); // received json file, parsed it as json and stored it in weather
				var title = "<h3>" + weather.query.results.channel.title + "</h3>";
				var todaysWeather = "<p>" + weather.query.results.channel.item.description + "</p>";
				var todaysDate = "<p>" + weather.query.results.channel.item.pubDate + "</p>";
				document.getElementById("jsonJsOut").innerHTML = title + todaysDate + todaysWeather; */
			} //end if
		}, false);
		xhr.open("GET", url, true);
		xhr.send();
	} catch(ex) {
		alert("XHR FAILED");
	} //end try   
});
