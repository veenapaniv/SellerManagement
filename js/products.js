//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"


//variables for adding a product
var fileName;
var inventoryData;
var intervalSet;
var editVals = ["file", "stock", "companies", "amount", "shipping"];

function disableSubmit() {
	intervalSet = window.setInterval(function(){
		for(var j in editVals) {
			if(!$("#"+editVals[j]).val()) {
				document.getElementById("submitBtn").disabled = true;
				break;
			} else {
				document.getElementById("submitBtn").disabled = false;
			}
		}//end for
	}, 100)//end interval
}//end function disableSubmit
	
//checking if valid amount/stock/shipping is entered
function validate() {
	if(!isNaN($("#amount").val()) && !isNaN($("#shipping").val()) && !isNaN($("#stock").val())) {
		return true;
	} else {
		return false;
	}//end if/else
}//end function validate

//function triggered on click of submit
function submitProduct(){
	if(validate()) {
		//valid data entered
		//if object is present in localStorage then that object is used else ajax is invoked to get inventory data
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
	} else {
		alert("Please enter valid integer for stock/amount/shipping");
	}//end if/else
}//end function submitProduct
	
//function invoked when data is retieved from ajax
function addInventory(inventoryData){
	//each item of product is set based on the values entered and set in localStorage and redirected to invantory page
	var setObj = new Object();
	setObj.productId = Math.floor(1+Math.random() *700000);
	setObj.product = fileName;
	setObj.companies = $("#companies").val();
	setObj.stock = $("#stock").val();
	setObj.sold = 0;
	setObj.returned = 0;
	setObj.amount = $("#amount").val();
	setObj.shipping = $("#shipping").val();
	setObj.lastUpdated = new Date().toISOString().slice(0,10);
	inventoryData.unshift(setObj); //to add product to top of the list
	var editObj = new Object();
	editObj.id = "";
	editObj.data = inventoryData
	localStorage.setItem("editObj", JSON.stringify(editObj));
	window.location.replace("inventory.html")
}//end function addInventory	
	
//hamburgerwidth change on click
function openHamburger() {
	$("#hamburgerClass").css("width", "250px");
}//end function openHamburger

function closeHamburger() {
	$("#hamburgerClass").css("width", "0px");
}//end function closeHamburger
	
//on load functionality
window.addEventListener("load", function(){
	//getting file name on change
		document.getElementById("file").addEventListener("change", function(){
			var file = document.getElementById("file");
			fileName = file.files.item(0).name;
		});
		//disabling submit if values are not filled
		disableSubmit();
		document.getElementById("submitBtn").addEventListener("click", submitProduct, false);
		//reset functionality--anonymous function
		document.getElementById("resetBtn").addEventListener("click", function(){
			location.reload();
		}, false);
		document.getElementById("backBtn").addEventListener("click", function(){
			window.location.replace("inventory.html");
		}, false);
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
},false); //end on load