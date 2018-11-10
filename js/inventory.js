"use strict"

$(document).ready(function(){
	var inventoryData;
	var invTitles = ["productId", "product", "stock", "companies", "sold", "returned", "amount", "shipping", "lastUpdated"]
	var editObj = JSON.parse(localStorage.getItem("editObj"));
	if(!editObj) {
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/SellerManagement/inventory.json",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				inventoryData = data;
				displayInventory(data);
			},
			error: function() {
				alert("Data not found");
			}
		});
	} else {
		inventoryData = editObj.data;
		displayInventory(editObj.data);
	}
	function displayInventory(invData) {
		var inventory = invData;
		var titles = new Object();
		var tBody = document.getElementById("tBody");
		for(var i in inventory) {
			var trow = document.createElement("tr");
			
			
			for(var k in invTitles) {
				titles[invTitles[k]] = document.createElement("td");
				if(invTitles[k] != "companies" && invTitles[k] != "product") {
					titles[invTitles[k]].innerHTML = inventory[i][invTitles[k]];
					trow.appendChild(titles[invTitles[k]]);
				} else if(invTitles[k] == "product") {
					var img = document.createElement("img");
					img.src = "../images/" + inventory[i].product + ".jpg";
					img.border=3;
					img.height=100;
					img.width=100;
					titles.product.appendChild(img);
					trow.appendChild(titles.product);
				} else {
					var ul = document.createElement("ul");
					for(var j=0;j<inventory[i].companies.length;j++) {
					var li = document.createElement("li");
					li.innerHTML = inventory[i].companies[j];
					ul.appendChild(li);
			}
			titles.companies.appendChild(ul);
			trow.appendChild(titles.companies);
				}
			}
			var editButton = document.createElement("input");
			editButton.value="Edit";
			editButton.type="button";
			editButton.id= i;
			editButton.addEventListener("click", function(e){
				editFunction(e.target.id);
			}, false);
			var deleteButton = document.createElement("input");
			deleteButton.value="Delete";
			deleteButton.type="button";
			deleteButton.id= i;
			deleteButton.addEventListener("click", function(e){
				deleteFunction(e.target.id);
			}, false);
			titles.action = document.createElement("td");
			titles.action.appendChild(editButton);
			titles.action.appendChild(deleteButton);
			trow.appendChild(titles.action);
			trow.appendChild(titles.action);
			tBody.appendChild(trow);
		}//end for 
	}

	function editFunction(id){
		var localObj = new Object();
		localObj.id = id;
		localObj.data = inventoryData
		localStorage.setItem("editObj", JSON.stringify(localObj));
		window.location.replace("edit.html");
	}
	function deleteFunction(id) {
		inventoryData.splice(id,1);
		var tBody = document.getElementById("tBody");
		tBody.innerHTML = "";
		displayInventory(inventoryData);
	}  
});
