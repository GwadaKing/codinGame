$(function() {
  "use strict";
  var html="";  
  var answer="";
  var $submit=$("#submit");
  var $content=$("#content");
  var $footer=$("footer");
  function searchThat() {   
    var $goSearch=$("#goSearch").val();
    var apiRequest="https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&limit=20&srsearch="+$goSearch+"&callback=?";
    // REQUETE AJAX ET INSERTION DES RESULTATS
    function protect() {
      $.getJSON(apiRequest, function(json) {      
        $.each(json.query.search, function (a,value) {
          if (value=="") {
            $content.text("Sorry there is no results matching your search.");
          } 
          else {
            html+="<div class=\"list-group text-primary\">";
            html+="<a href=\"https://en.wikipedia.org/wiki/"+json.query.search[a].title+"\" class=\"list-group-item\" target=\"_blank\"><h4>"+json.query.search[a].title+" : </h4>"+json.query.search[a].snippet+"</a>";       
          }
        }); // fin boucle $.each a
        html+="\n &nbsp;</div>";        
        $content.html(html);
        $footer.html("<p class=\"text-center\">Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc., a non-profit organization</p>")
      }); // fin requete $getJSON
    }; protect();
  };   // fin fonction searchThat()
  // SOUMISSION FORMULAIRE QUAND CLIC SUBMIT
  $submit.click(function(e) {    
    $content.empty();
    e.preventDefault();
    html="";
    searchThat(); // appel fonction     
  })
}); // fin $(function()