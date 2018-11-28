//Created by Group5
//ID's: 700690160, 700688256, 700688506
"use strict"
var newsArray;
var cost;
$(document).ready(function(){  
    //on load function to bind Hamburger 
	$(window).on("load", function(){
		loadTrendingNews();
		$("#openHamburger").on("click",openHamburger);
		$("#closeHamburger").on("click",closeHamburger);
        //jQuery on load function which calls the different functions to load dashboard data
        loadDashboardData();
	});
    //load the Sales Images of that particular customer as soon as the document loads
    loadSalesImage();
    //Ajax to get "Trending Channels for today" info
    $(".seller_statistics_nav li:nth-child(1)").click(function(){
        console.log("you clicked on today");
        loadSalesFiguresForToday();
    });
    //Ajax to get "Trending Channels this Last week" info
    $(".seller_statistics_nav li:nth-child(2)").click(function(){
        loadSalesFiguresForLastWeek();
    });
    //Ajax to get "Trending Channels this Last month" info
    $(".seller_statistics_nav li:nth-child(3)").click(function(){
        loadSalesFiguresForLastMonth();
    });
    
    //Anonymous function to find cost of the selected product
    document.getElementById("cust_products").addEventListener("change",function(){
        var productID = $("#cust_products").val();
        findCost(productID);
    },false);
    //calculate the profit for the given quantity for the selected product
    $("#calculate").click(function(){
        calculateProfit(cost);
    })
});//end ready function

//on load of the browser window, load different data on the landing page
function loadDashboardData(){
    //load the news content
    loadTrendingNews();
    //load sales data for today because this tab is populated by default on load of the page
    loadSalesFiguresForToday();
    //load trending products for the month
    loadTopSellingProductsThisMonth();
    //fill the products in dropdown for profit calculator
    fillProducts();
}//end loadDashboardData

function loadSalesImage()
{
    //make a call to the dashboard.json and fetch the sales image to populate on the dashboard
    $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/dashboard.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success, populate the image on dashboard
        var imageSrc = jsonData.profile_details.sales_image;
        $("#sales_image").attr("src","../images/sales-graph.png");
       
    },
    error: function() {
        console.log('Error loading the image');
    }
});
    
}//end loadSalesImage

function calculateProfit(cost){
    //get the values necessary from the user selection
    var productID = $("#cust_products").val();
    var shippingPrice = $("#shipping").val();
    var stock = $("#stock").val();
    var costOfProduct = $("#price").val();
    var profit;
    //add validations such that the page shows errors when the fields are left unfilled
    if(productID && shippingPrice && stock){
        //if shipping price and stock are not numbers throw an error
        if(isNaN(shippingPrice) || isNaN(stock))
            {
                alert("Only Numericals are allowed");
            }
        //else calculate profit which will be - (costOfProduct * stock) - (shippingPrice * stock)
        else{
            profit = (costOfProduct*stock) - (shippingPrice*stock);
        $("#result").html("Your approximate profit for the product "+productID+" for "+stock+" units would be $"+profit.toFixed());
        }// end if/else
        
    }
    else{
        alert("Please enter all the details appropriately");
    }//end if/else
}//end calculateProfit

function findCost(selectedProduct){
    
    //for the product that the user has selected, let's find out the MRP from json file
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/inventory.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success function, fill the dropdown with customer products from inventory json
        
        for(var i in jsonData)
            { 
               if(jsonData[i].productId == selectedProduct)
                   {
                       cost = jsonData[i].amount;
                   }
            }
        $("#price").val(cost);
        
    },
    error: function() {
        console.log('I guess the product you are looking for is not listed, check your list again!');
    }
         
});
    
}//end findCost

//Load Seller Statistics from the json file for today for this particular customer.
function loadSalesFiguresForToday(){
    //Make an ajax request, get the json file
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/dashboard.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success, populate the appropriate values in the html
        $("#today .confirmed li.sales").text("Number of Sales: "+jsonData.sales_info.today.sold) ;
        $("#today .confirmed li.sites").text("Sites: "+jsonData.sales_info.today.selling_channels) ;
        $("#today .cancelled li.sales").text("Number of Sales: "+jsonData.sales_info.today.cancelled) ;
        $("#today .cancelled li.sites").text("Sites: "+jsonData.sales_info.today.cancelled_channels) ;
        $("#today .return li.sales").text("Number of Sales: "+jsonData.sales_info.today.returns) ;
        $("#today .return li.sites").text("Sites: "+jsonData.sales_info.today.returned_channels) ;
    },
    error: function() {
        console.log('Error in loading the sales details for Today');
    }
});
}//end loadSalesFiguresForToday

//Load Seller Statistics from the json file for Last week for this particular customer.
function loadSalesFiguresForLastWeek(){
    //Make an ajax request, get the json file
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/dashboard.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success, populate the appropriate values in the html
        $("#week .confirmed li.sales").text("Number of Sales: "+jsonData.sales_info.week.sold) ;
        $("#week .confirmed li.sites").text("Sites: "+jsonData.sales_info.week.selling_channels) ;
        $("#week .cancelled li.sales").text("Number of Sales: "+jsonData.sales_info.week.cancelled) ;
        $("#week .cancelled li.sites").text("Sites: "+jsonData.sales_info.week.cancelled_channels) ;
        $("#week .return li.sales").text("Number of Sales: "+jsonData.sales_info.week.returns) ;
        $("#week .return li.sites").text("Sites: "+jsonData.sales_info.week.returned_channels) ;
    },
    error: function() {
        console.log('Error in loading the sales details for Last week');
    }
});
}//end loadSalesFiguresForLastWeek

//Load Seller Statistics from the json file for Last Month for this particular customer.
function loadSalesFiguresForLastMonth(){
    //Make an ajax request, get the json file
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/dashboard.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success, populate the appropriate values in the html
        $("#month .confirmed li.sales").text("Number of Sales: "+jsonData.sales_info.month.sold) ;
        $("#month .confirmed li.sites").text("Sites: "+jsonData.sales_info.month.selling_channels) ;
        $("#month .cancelled li.sales").text("Number of Sales: "+jsonData.sales_info.month.cancelled) ;
        $("#month .cancelled li.sites").text("Sites: "+jsonData.sales_info.month.cancelled_channels) ;
        $("#month .return li.sales").text("Number of Sales: "+jsonData.sales_info.month.returns) ;
        $("#month .return li.sites").text("Sites: "+jsonData.sales_info.month.returned_channels) ;
    },
    error: function() {
        console.log('Error in loading the sales details for Last Month');
    }
});
}//end loadSalesFiguresForLastMonth

//load the top selling products from the json again
function loadTopSellingProductsThisMonth(){
    var table = document.getElementById("trending_products");
     //Make an ajax request, get the json file
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/dashboard.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success function, dynamically create the table.
        while(document.getElementById("top_products").firstChild){
            document.getElementById("top_products").removeChild(document.getElementById("top_products").firstChild);
        }//end ehile
        var length = jsonData.top_selling_products.products.length;
        for(var i=0;i<length;i++){
            var topProductRow = document.createElement("tr");
            var rowNumber = document.createElement("th");
            var products = document.createElement("td");
            var saleNum = document.createElement("td");
            rowNumber.innerHTML= i+1;
            products.innerHTML=jsonData.top_selling_products.products[i];
            saleNum.innerHTML=jsonData.top_selling_products.number_of_products_sold[i];
            
            topProductRow.appendChild(rowNumber);
            topProductRow.appendChild(products);
            topProductRow.appendChild(saleNum);
            
            document.getElementById("top_products").appendChild(topProductRow);
            
        }
    },
    error: function() {
        console.log('Error in loading top selling products for this month');
    }
});
}//end loadTopSellingProductsThisMonth

function fillProducts(){
    //get the select tag
    var selectTag = document.getElementById("cust_products");
    //make an ajax call to inventory.json to get all product id's
     $.ajax({
    type: 'GET',
    url: 'http://localhost/SellerManagement/data/inventory.json',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //in the success function, fill the dropdown with customer products from inventory json
        
        for(var i in jsonData)
            {
               var optionTag = document.createElement("option");
               optionTag.value = jsonData[i].productId;
               optionTag.innerHTML = jsonData[i].productId;
               selectTag.appendChild(optionTag);
            }
        //display cost for default product
        findCost($("#cust_products").val());
    },
    error: function() {
        console.log('Error in loading the products for the dropdown');
    }
});   
}//end fillProducts

function loadTrendingNews() {
    //get the xml file which has the news content
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost/SellerManagement/data/customer1.xml",false);
    xhr.send(null);
    newsArray = xhr.responseXML.getElementsByTagName("news");
    
    displayNews();
}//end loadTrendingNews

function displayNews() {
    var parentUnorderedList = document.getElementById("trendingNewsList");
    //populate the news in the list element one by one.
    for(var i=0;i<newsArray.length;i++){
        var newsList = document.createElement("li");
        newsList.setAttribute("class","list-group-item");
        var listAnchor = document.createElement("a");
        var newsDiv = document.createElement("div");
        var newsItem = newsArray.item(i);
        var newsId = newsItem.getElementsByTagName("id").item(0).firstChild.nodeValue;
        listAnchor.setAttribute("href","#"+newsId);
        listAnchor.setAttribute("data-toggle","collapse");
        listAnchor.setAttribute("style","text-decoration:none;");
        listAnchor.setAttribute("aria-expanded","true");
        newsDiv.setAttribute("id",newsId);
        newsDiv.setAttribute("class","collapse in");
        newsDiv.setAttribute("aria-expanded","true");
        
        newsList.appendChild(listAnchor);
        newsList.appendChild(newsDiv);
        parentUnorderedList.appendChild(newsList);
        
        listAnchor.innerHTML = newsItem.getElementsByTagName("heading").item(0).firstChild.nodeValue;
        newsDiv.innerHTML = newsItem.getElementsByTagName("news_snippet").item(0).firstChild.nodeValue;
        
        
    }//end for
   
}//end function display()

//hamburgerwidth change on click
function openHamburger() {
		$("#hamburgerClass").css("width", "250px");
}//end function openHamburger
	
function closeHamburger() {
		$("#hamburgerClass").css("width", "0px");
}//end function closeHamburger