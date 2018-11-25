//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"

$(document).ready(function(){
	var inventoryData;
	var xhr;
	var url;
	var trow = "";
	var invTitles = ["productId", "product", "stock", "companies", "sold", "returned", "amount", "shipping", "lastUpdated", "owner"]
	
	//on load function invoking
	$(window).on("load", function(){
		getInventory();
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
	});
	function getInventory(){
		try {
		xhr = new XMLHttpRequest();
		url= "http://localhost/SellerManagement/data/catalogue.json";
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
			} //end if
		}, false);
		xhr.open("GET", url, true);
		xhr.send();
		} catch(ex) {
			alert("XHR FAILED");
		} //end try catch
	}//end function getInventory 
	
	//hamburgerwidth change on click
	function openHamburger() {
		$("#hamburgerClass").css("width", "250px");
	}//end function openHamburger
	
	function closeHamburger() {
		$("#hamburgerClass").css("width", "0px");
	}//end function closeHamburger
});