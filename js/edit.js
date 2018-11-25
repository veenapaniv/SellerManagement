//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"

$(document).ready(function(){
	//variables for editing
	var intervalSet
	var editObj = JSON.parse(localStorage.getItem("editObj")); // retrieving localStorage
	var editData = editObj.data[editObj.id];
	var editVals = ["productId", "stock", "companies", "sold", "returned", "amount", "shipping"]; //items in inventory for looping
	
	//on load functionality
	$(window).on("load",function() {
		$("#submitBtn").on("click", submitEdit);
		//values set on load
		for(var i in editVals) {
			$("#"+editVals[i]).val(editData[editVals[i]]);
		}
		//disable submit if all mandatory values are not filled
		disableSubmit();
		$("#backBtn").on("click", function(){
			window.location.replace("inventory.html");
		});
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
	});//end on load
	
	function disableSubmit() {
		intervalSet = window.setInterval(function(){
			for(var j in editVals) {
				if(!$("#"+editVals[j]).val()) {
					$("#submitBtn").attr("disabled", true);
					break;
				} else {
					$("#submitBtn").attr("disabled", false);
				}
			}//end if/else
		}, 100);//end interval`
	}// end function disableSubmit
	
	//checking if valid amount/shipping/stock is entered
	function validate() {
		if(!isNaN($("#amount").val()) && !isNaN($("#shipping").val()) && !isNaN($("#stock").val())) {
			return true;
		} else {
			return false;
		}//end if/else
	}//end function validate
	
	//function on click of submit
	function submitEdit(){
		if(validate()) {
			var editObj = JSON.parse(localStorage.getItem("editObj"));
			editObj.data[editObj.id].companies = $("#companies").val();
			editObj.data[editObj.id].stock = $("#stock").val();
			editObj.data[editObj.id].amount = $("#amount").val();
			editObj.data[editObj.id].shipping = $("#shipping").val();
			editObj.data[editObj.id].lastUpdated = new Date().toISOString().slice(0,10);
			localStorage.setItem("editObj", JSON.stringify(editObj));
			window.location.replace("inventory.html");
		} else {
			alert("Please enter valid integer for stock/amount/shipping");
		}//end if/else
	}//end function submitEdit

	//hamburgerwidth change on click
	function openHamburger() {
		$("#hamburgerClass").css("width", "250px");
	}//end function openHamburger
	
	function closeHamburger() {
		$("#hamburgerClass").css("width", "0px");
	}//end function closeHamburger
});
