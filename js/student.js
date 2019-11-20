$( document ).ready(function() {
    init_studentControls();
});

function init_studentControls(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var userInfo = firebase.database().ref('Users/' + firebase.auth().currentUser.uid);
            userInfo.on('value', function(snapshot) {
               if(snapshot.val().type === 'teacher'){
                   //mandar al usuario a teacher.html
               }else{
                Student.name = snapshot.val().name;
                Student.uid = snapshot.val().uid;
                Student.type = snapshot.val().type;
                if(snapshot.val().homeworks !== undefined){
                    Student.homework = snapshot.val().homework;
                    
                }
                if(snapshot.val().themes !== undefined){
                    Student.themes = snapshot.val().themes;
                }
               }
            });
        } else {
          // regresar a index.html
        }
    });
    $(".Student-ownThemes").click(function (){
        $(".Student-myListGlobal").css('display','none');  
        $(".Student-myList").css("display","block");  
   });

   $(".Student-globalReseach").click(function (){
        $(".Student-myListGlobal").css("display","block");  
        $(".Student-myList").css("display",'none');  
    });
}