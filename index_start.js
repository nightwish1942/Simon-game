/**

@version: 0.1
@author: rui

**/



$("#paypic").hide();
$("#explain").hide();
$("#container_instruction").hide();

$("#start").click(function(){
  open("index.html");
});
  $("paypic").show();

$("#money").click(function(){

    pay();

});


$("#comments").click(function(){
  $("#container_instruction").show(function(){
    $(document).click(function(){
      $("#container_instruction").hide();
    });

  });
});

function pay(){
  $("#explain").show(function(){
    $(document).click(function(){
      $("#paypic").show();
      $(document).click(function(){
        disappear();
      });

      });
    });


}

function disappear(){
  $("#explain").hide();
  $("#paypic").hide();
}
