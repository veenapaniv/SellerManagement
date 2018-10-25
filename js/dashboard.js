$(document).ready(function(){
    //Ajax to get "Trending Channels this Month" info
$(".seller-hamburger").click(function(){
     $.ajax({
    type: 'POST',
    url: 'http://localhost/Demo/sampleJson',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(jsonData) {
        //alert(jsonData.profile_details.name);
    },
    error: function() {
        //alert('Error');
    }
});
})
    

  
})

$(window).on("load", loadTrendingNews);

function loadTrendingNews() {
    xhr = new XMLHttpRequest();
    xhr.open("get", "http://localhost/Demo/customer1.xml",false);
    xhr.send(null);
    newsArray = xhr.responseXML.getElementsByTagName("news");
    
    displayNews();
}

function displayNews() {
    var parentUnorderedList = document.getElementById("trendingNewsList");

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