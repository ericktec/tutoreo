$( document ).ready(function() {
    init_teacherControls();
});

function init_teacherControls(){
   $(".Teacher-ownThemes").click(function (){
        $(".Teacher-myListGlobal").css('display','none');  
        $(".Teacher-myList").css("display","block");  
   });

   $(".Teacher-addTheme").click(function (){
        $(".Teacher-myListGlobal").css("display","block");  
        $(".Teacher-myList").css("display","none");  
    });
}
