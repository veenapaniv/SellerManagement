"use strict"


$(document).ready(function(){
	var fileName;
	var inventoryData;
	document.getElementById("file").addEventListener("change", function(){
		var file = document.getElementById("file");
		fileName = file.files.item(0).name;
	});
	document.getElementById("submitBtn").addEventListener("click", submitProduct, false);
	function submitProduct(){
		//if($("#productForm").valid()) {
		var editObj = JSON.parse(localStorage.getItem("editObj"));
			if(!editObj) {
				$.ajax({
					type: "GET",
					url: "http://localhost:8080/SellerManagement/data/inventory.json",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function(data) {
						inventoryData = data;
						addInventory(data);
					},
					error: function() {
						alert("Data not found");
					}
				});
			} else {
				inventoryData = editObj.data;
				addInventory(editObj.data);
			}
		//}
	}
	function addInventory(inventoryData){
		var addProduct = inventoryData.length;
		inventoryData[addProduct] = {};
		inventoryData[addProduct].productId = Math.floor(1+Math.random() *700000);
		inventoryData[addProduct].product = fileName;
		inventoryData[addProduct].companies = $("#companies").val();
		inventoryData[addProduct].stock = $("#stock").val();
		inventoryData[addProduct].sold = 0;
		inventoryData[addProduct].returned = 0;
		inventoryData[addProduct].amount = $("#amount").val();
		inventoryData[addProduct].shipping = $("#shipping").val();
		inventoryData[addProduct].lastUpdated = new Date().toISOString().slice(0,10);
		var editObj = new Object();
		editObj.id = "";
		editObj.data = inventoryData
		localStorage.setItem("editObj", JSON.stringify(editObj));
		window.location.replace("inventory.html")
	}
});