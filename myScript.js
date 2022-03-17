$(document).ready(function(){
  
  $("nav input, nav .btn").on("click", function () {
    $(".my-backdrop, .my-modalbox").animate({"opacity": "0.5"}, 300, "linear");
    $(".my-modalbox").animate({"opacity": "1.0"}, 300, "linear");
    $(".my-backdrop, .my-modalbox").css("display", "block");
  });
  $(".my-closebox").on("click", function() {
    close_box();
  })
  $(".my-backdrop").on("click", function() {
    close_box();
  })
  function close_box() {
    $(".my-backdrop, .my-modalbox").animate({"opacity": "0"}, 300, "linear");
    $(".my-backdrop, .my-modalbox").css("display", "none");
  }

  //Function Load News
  headLines("en", "breaking-news");
  $("#language-top, #topic").on("change", function(){
    let language = $("#language-top").val();
    let topic = $("#topic").val();
    headLines(language, topic);
  })
  function headLines(lang, topic) {
    let newsList = $("#news-list");
    const apiKey = '9a78ca94bee6d5d5e61bf0fa3c94c0bc';
    let url = `https://gnews.io/api/v4/top-headlines?lang=${lang}&topic=${topic}&token=${apiKey}`;
    $("div.contain-loader").show();
    $(newsList).html("");
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        data.articles.forEach(function(article) {
          let li = $("<li></li>").addClass("row list-unstyled");
          let divTop = $("<div></div>").addClass("row");
          let divH3 = $("<div></div>").addClass("col-sm-12 mobile-h3");
          let divBottom = $("<div></div>").addClass("row");
          let divLeft = $("<div></div>").addClass("col-sm-5");
          let divRight = $("<div></div>").addClass("col-sm-7");
          let img = $("<img>");
          let h3 = $("<h3></h3>");
          let spanDes = $("<span></span>");
          let date = (new Date(article.publishedAt)).toUTCString();
          let spanDate = $("<span></span>").text(date);
          let aImg = $("<a></a>");
          let aH3 = $("<a></a>");
          let aSource = $("<a></a>")
          let divSource = $("<div></div>").addClass("div-source");
          let space = $("<b></b>").text(" - ");
          //Div Left
          $(aImg).attr({
            "href": article.url,
            "target": "_blank"
          });
          $(img).attr({
            "src": article.image,
          });
          $(aImg).append(img)
          $(divLeft).append(aImg);
          //Div Right
          $(aSource).attr({
            "href": article.source.url,
            "target": "_blank",
          })
          $(spanDes).text(article.description);
          $(aSource).text(article.source.name);
          $(divSource).append(aSource, space, spanDate);
          $(divRight).append(divSource, spanDes);
          $(divBottom).append(divLeft, divRight);
          //Div Top
          $(aH3).attr({
            "href": article.url,
            "target": "_blank",
          });
          $(aH3).text(article.title);
          $(h3).append(aH3);
          $(divH3).append(h3);
          $(divTop).append(divH3);
          //Add li
          $(li).append(divTop, divBottom);
          $(newsList).append(li, "<hr>");
          $("div.contain-loader").hide();
        })
      })
  }
  $("language-top").on("change", headLines)


  //Set ISO time
  function ISODateString(d) {
    function pad(n) {return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
  }

  //Set max date of input type date
  let maxDate = (new Date()).toISOString().split("T")[0];
  $("input[type='date']").attr("max", maxDate);
  //Function Search Keyword News
  const searchForm = $("#search");
  const keyWord = $("#key-word");
  const newsList = $("#news-list");
  $("#from").change(function() {
    let min = new Date($("#from").val());
    let minDate = min.toISOString().split("T")[0];
    $("#to").attr("min", minDate);
  })
  searchForm.on("submit", reqNews);
  function reqNews(e) {
    e.preventDefault();
    $("div.contain-loader").show();
    close_box();
    let search = (keyWord.val()).replace(/\s/g, '+');
    let from;
    let fromDate = "";
    if ($("#from").val() !== "") {
      from = new Date($("#from").val());
      fromDate = ISODateString(from);
    }
    let to;
    let toDate = "";
    if ($("#to").val() !== "") {
      to = new Date($("#to").val());
      toDate = ISODateString(to);
    }
    let lang = $("#language").val();
    let sortBy = $("#sort").val();
    const apiKey = "9a78ca94bee6d5d5e61bf0fa3c94c0bc";
    let url = `https://gnews.io/api/v4/search?q=${search}&lang=${lang}&from=${fromDate}&to=${toDate}&sortby=${sortBy}&token=${apiKey}`;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        $(newsList).html("");
        data.articles.forEach(function(article) {
          let li = $("<li></li>").addClass("row list-unstyled");
          let divTop = $("<div></div>").addClass("row");
          let divH3 = $("<div></div>").addClass("col-sm-12 mobile-h3");
          let divBottom = $("<div></div>").addClass("row");
          let divLeft = $("<div></div>").addClass("col-sm-5");
          let divRight = $("<div></div>").addClass("col-sm-7");
          let img = $("<img>");
          let h3 = $("<h3></h3>");
          let spanDes = $("<span></span>");
          let date = (new Date(article.publishedAt)).toUTCString();
          let spanDate = $("<span></span>").text(date);
          let aImg = $("<a></a>");
          let aH3 = $("<a></a>");
          let aSource = $("<a></a>")
          let divSource = $("<div></div>").addClass("div-source");
          let space = $("<b></b>").text(" - ");
          //Div Left
          $(aImg).attr({
            "href": article.url,
            "target": "_blank"
          });
          $(img).attr({
            "src": article.image,
          });
          $(aImg).append(img)
          $(divLeft).append(aImg);
          //Div Right
          $(spanDes).text(article.description);
          $(aSource).text(article.source.name);
          $(divSource).append(aSource, space, spanDate);
          $(divRight).append(h3, divSource, spanDes);
          $(divBottom).append(divLeft, divRight);
          //Div Top
          $(aH3).attr({
            "href": article.url,
            "target": "_blank",
          });
          $(aH3).text(article.title);
          $(aSource).attr({
            "href": article.source.url,
            "target": "_blank",
          })
          $(h3).append(aH3);
          $(divH3).append(h3);
          $(divTop).append(divH3);
          //Add li
          $(li).append(divTop, divBottom);
          $(newsList).append(li, "<hr>");
        })
      })
    $(searchForm)[0].reset();
    $("div.contain-loader").hide();
  }

});