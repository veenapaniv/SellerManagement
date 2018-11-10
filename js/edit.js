"use strict"

console.log(localStorage);

$(document).ready(function(){
	var editObj = JSON.parse(localStorage.getItem("editObj"));
	var editData = editObj.data[editObj.id];
	$("#productId").val(editData.productId);
	$("#stock").val(editData.stock);
	$("#companies").val(editData.companies);
	$("#sold").val(editData.sold);
	$("#returned").val(editData.returned);
	$("#amount").val(editData.amount);
	$("#shipping").val(editData.shipping);
	document.getElementById("submitBtn").addEventListener("click", submitEdit, false);
	function submitEdit(){
		var editObj = JSON.parse(localStorage.getItem("editObj"));
		editObj.data[editObj.id].companies = $("#companies").val();
		editObj.data[editObj.id].stock = $("#stock").val();
		editObj.data[editObj.id].amount = $("#amount").val();
		editObj.data[editObj.id].shipping = $("#shipping").val();
		editObj.data[editObj.id].lastUpdated = new Date().toISOString().slice(0,10);;
		localStorage.setItem("editObj", JSON.stringify(editObj));
		window.location.replace("inventory.html")
	}
});