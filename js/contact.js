//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"

var contactInfo;
function setContactInfo() {
	try {
		$.ajax({
			type: "GET",
			url: "http://localhost/SellerManagement/data/contact.json",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				contactInfo = data;
				displayContactInfo(data);
			},
			error: function() {
				alert("Data not found");
			}
		});
	} catch(e) {
		alert("ajax failed");
	}
}

function createEl(tag){
	return document.createElement(tag);
}
function displayContactInfo(contactData) {
	var info = contactData;
	for(var i=1; i <=3; i++) {
		var address = document.createElement("h4");
		address.innerHTML = info["address"+i];
		$("#address").append(address);
	}
	setPhoneInfo(info);
	$("#email").append(document.createTextNode(info.email));
	var mailto = "mailTo:" + info.email;
	$("#email").attr("href", mailto);
	
}
function setPhoneInfo(contactData) {
	var info = contactData;
	for(var j in info.contact) {
		var column = document.createElement("div");
		column.setAttribute("class", "column");
		var name = createEl("h4");
		name.innerHTML = info.contact[j].name;
		var position = createEl("h5");
		position.innerHTML = info.contact[j].position;
		column.appendChild(position);
		var phone = createEl("h5");
		phone.innerHTML = info.contact[j].phone;
		column.appendChild(name);
		column.appendChild(position);
		column.appendChild(phone);
		$("#contactInfo").append(column);
	}
}

//hamburgerwidth change on click
function openHamburger() {
	$("#hamburgerClass").css("width", "250px");
}//end function openHamburger

function closeHamburger() {
	$("#hamburgerClass").css("width", "0px");
}//end function closeHamburger
	
window.addEventListener("load", function(){
	$("#header").text("Contact Us");
	$("p").append(document.createTextNode("Swing by for a cup of coffee, or call us:"));
	setContactInfo();
	$("#openHamburger").on("click",openHamburger);
	$("#closeHamburger").on("click",closeHamburger);
});