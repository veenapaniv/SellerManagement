//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"

$(document).ready(function(){
	var onloadSelected = [{name: "amazon", value:"Amazon"}, {name: "walmart", value: "Walmart"}, {name: "etsy", value: "Etsy"}];
	var channels = [{name: "amazon", value:"Amazon"}, {"name": "etsy", value: "Etsy"}, {name: "bestbuy", value: "Best Buy"}, {name: "ebay", value: "Ebay"}, {name: "macys", value: "Macy's"},{name: "walmart", value:"Walmart"}];
	$(window).on("load", function(){
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
		$("#saveBtn").on("click", saveFunction);
		$("#okBtn").on("click", okFunction);
		$("#alertMsg").hide();
        //function call to display the channel checkboxes which user can select
		displayCheckBoxes();
        //on load default checked channels, and add default selection to the list
		onloadChannels();
        //when user checks the checkbox, toggle the checkbox and add selection to the list
		onChangeChannels();
	});//end on load function
	
	//hamburgerwidth change on click
	function openHamburger() {
		$("#hamburgerClass").css("width", "250px");
	}//end function openHamburger
	
	function closeHamburger() {
		$("#hamburgerClass").css("width", "0px");
	}//end function closeHamburger
		
	function displayCheckBoxes(){
        //get the channels-container div which is the parent div for the checkboxes
		var channelsContainer = document.getElementById("channels-container");
        //loop appropriately as per the number of channels in the channels array
		for(var i=0; i< channels.length; i++){
            //dynamically create the checkboxes and append to the div
			var input = document.createElement("input");
			input.setAttribute("type","checkbox");
			input.setAttribute("name", channels[i].name);
			input.setAttribute("value", channels[i].value);
			input.setAttribute("id", channels[i].name);
			input.setAttribute("class", "checkboxes");
			channelsContainer.appendChild(input);
			var label = document.createElement("label");
			label.setAttribute("for", channels[i].name);
			channelsContainer.appendChild(label);
		}//end for
	}//end function displayCheckBoxes
	
	function onloadChannels(){
        //on load of the page initially, few of the channels are defaultly selected which are stored in an array: onloadSelected
		for(var j=0; j<onloadSelected.length; j++){
			$("#"+onloadSelected[j].name).attr("checked", "checked");
		}//end for
        //function call to display the channels selected defaultly in a separate div
		displaySelected(onloadSelected, "selectedChannels");
	}//end function onloadChannels

	function displaySelected(onloadSelected, targetId){
        //get the div into which the list of selections is appended
		var selected = document.getElementById(targetId);
        //check if the div already has items, if it does remove them
		if(selected.hasChildNodes()) {
			selected.innerHTML = "";
		}//end if
        //create the list dynamically and append each item in the array "onloadSelected"
		var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");
        $(ul).css("margin-left","15px");
		for(var k in onloadSelected) {
			var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
			li.innerHTML = onloadSelected[k].value;
			ul.appendChild(li);
		}//end for
		$("#"+targetId).append(ul)
	}//end function displaySelected

	function onChangeChannels() {
        //onclick event when a user clicks on the checkbox, push the selection to the onloadSelected array and if the property of the attr "checked" is false, remove the item from the array
		$('input[type="checkbox"]'). click(function(){
			if($(this).prop("checked") == true){
				onloadSelected.push({name: this.name, value: this.value});
			}
			else if($(this).prop("checked") == false){
				for(var l in onloadSelected) {
					if(this.value == onloadSelected[l].value) {
						onloadSelected.splice(l, 1);
					}
				}
			}//end if/else
			displaySelected(onloadSelected, "selectedChannels");
		});		
	}//end function onChangeChannels
	
	function saveFunction(){
        //if user has not selected any item, display an alert with an error
		if(onloadSelected.length == 0){
			alert("Please select atleast one channel");
		} else {
            //else display the selection in the popup and check if the user really wants to save his selection
			displaySelected(onloadSelected, "displayingMsg");
			$("#infoModel").modal();
		}//end if/else
	}//end function saveFunction

	function okFunction(){
        //when user clicks on ok, display a message saying the changes will take effect after 24 hours
		$("#alertMsg").show();
	}//end function okFunction
});