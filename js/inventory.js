//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"

$(document).ready(function(){
	//variables for displaying inventory
	var inventoryData;
	var invTitles = ["productId", "product", "stock", "companies", "sold", "returned", "amount", "shipping", "lastUpdated"];
	var editObj = JSON.parse(localStorage.getItem("editObj")); //retrieving localStorage
	
	//event listeners on load
	$(window).on("load",function() {
		retrieveInventory();
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
		$("#addProdBtn").on("click", function(){
			window.location.replace("products.html");
		});
	});//end function onload
	
	//ajax call to retrieve inventory
	function retrieveInventory(){
		//if object is present in localStorage then that object is used else ajax is invoked to get inventory data
		if(!editObj) {
			try {
				$.ajax({
					type: "GET",
					url: "http://localhost/SellerManagement/data/inventory.json",
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
			} catch(e) {
				alert("ajax failed");
			}//end try catch
		} else {
			inventoryData = editObj.data;
			displayInventory(editObj.data);
		}
	}//end function retrieveInventory
	
	//create image in table
	function createImg(i, titles, trow, inventory) {
		var img = document.createElement("img");
		img.src = "../images/" + inventory[i].product;
		img.border=3;
		img.height=100;
		img.width=100;
		titles.product.appendChild(img);
		trow.appendChild(titles.product);
	}//end function createImg
	
	//create list in table
	function createList(inventory, i, titles, trow){
		var ul = document.createElement("ul");
		for(var j=0;j<inventory[i].companies.length;j++) {
			var li = document.createElement("li");
			li.innerHTML = inventory[i].companies[j];
			ul.appendChild(li);
		}
		titles.companies.appendChild(ul);
		trow.appendChild(titles.companies);
	}//end function createList
	
	//create edit button
	function createEditButton(i){
		var editButton = document.createElement("button");
		editButton.append(document.createTextNode("Edit"));
		editButton.setAttribute("class", "btn btn-success");
		editButton.setAttribute("id", i);
		editButton.addEventListener("click", function(e){
			editFunction(e.target.id);
		}, false);
		return editButton;
	}//end function editButton
	
	//create delete button
	function createDeleteButton(i) {
		var deleteButton = document.createElement("button");
		deleteButton.append(document.createTextNode("Delete"));
		deleteButton.setAttribute("id", i);
		deleteButton.setAttribute("class", "btn btn-danger");
		//modal is displayed on click of delete button
		deleteButton.setAttribute("data-toggle", "modal");
		deleteButton.setAttribute("data-target", "#myModal")
		deleteButton.addEventListener("click", function(e){
			deleteFunction(e.target.id);
		}, false);
		return deleteButton
	}//end function createDeleteButton
	
	//inventory is displayed in a table after retrieving data
	function displayInventory(invData) {
		var inventory = invData;
		var titles = new Object();
		var tBody = document.getElementById("tBody");
		for(var i in inventory) {
			var trow = document.createElement("tr");
			trow.setAttribute("id", "invRow"+i);
			//data is being set in a table
			for(var k in invTitles) {
				titles[invTitles[k]] = document.createElement("td");
				if(invTitles[k] != "companies" && invTitles[k] != "product") {
					titles[invTitles[k]].innerHTML = inventory[i][invTitles[k]];
					trow.appendChild(titles[invTitles[k]]);
				} else if(invTitles[k] == "product") {
					createImg(i, titles, trow, inventory);
				} else {
					createList(inventory, i, titles, trow);
				}
			}//end for
			//functionality for edit button in table
			var editButton = createEditButton(i);
			//functionality for delete button in table
			var deleteButton = createDeleteButton(i);
			//items appending to their parent
			titles.action = document.createElement("td");
			titles.action.appendChild(editButton);
			titles.action.appendChild(deleteButton);
			trow.appendChild(titles.action);
			trow.appendChild(titles.action);
			tBody.appendChild(trow);
		}//end for 
	}//end function displayInventory
	
	//adding modal functionality on click of delete
	function deleteFunction(id){
		var deleteProduct =document.getElementById("deleteProduct");
		localStorage.setItem("currentId", id);
		deleteProduct.addEventListener("click", function(e){
				deleteProducts();
			}, false);
	}//end function deleteFunction
	
	//setting localStorage and redirecting to edit on click of edit button
	function editFunction(id){
		var localObj = new Object();
		localObj.id = id;
		localObj.data = inventoryData
		localStorage.setItem("editObj", JSON.stringify(localObj));
		window.location.replace("edit.html");
	}//end function editFunction
	
	//this function is invoked when yes is clicked in delete modal
	function deleteProducts() {
		var id = localStorage.getItem("currentId");
		var trowId = document.getElementById("invRow"+id);
		var tBody = document.getElementById("tBody");
		if(trowId && trowId.parentNode) {
			trowId.parentNode.removeChild(trowId);
		}
		inventoryData.splice(id,1);
	}//end function deleteProduct 
	
	//hamburgerwidth change on click
	function openHamburger() {
		$("#hamburgerClass").css("width", "250px");
	}//end function openHamburger
	
	function closeHamburger() {
		$("#hamburgerClass").css("width", "0px");
	}//end function closeHamburger
});
