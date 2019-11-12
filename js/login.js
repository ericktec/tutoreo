$( document ).ready(function() {
    init_loginControls();
    init_wow();
});

function init_loginControls(){
    $(".Login-registerHint").click(function(){
        $(".Register-formRow").css("display","flex");
        $(".Login-formRow").css("display","none");
    });

    $(".Login-loginHint").click(function(){
        $(".Register-formRow").css("display","none");
        $(".Login-formRow").css("display","flex");
    });

    $(".Login-submitButtonRegister").click(function(){
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var name = $("#registerName").val();
        if(email.length > 0 &&  password.length > 0 && name.length > 0){
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                firebase.database().ref('/Users' + firebase.auth().currentUser.uid).set({
                    type: 'student',
                    name: name,
                    homeworks:[],
                    uid: firebase.auth().currentUser.uid,
                    themes:[],
                })
            });
        }
        //enviar usuario a student.html
    });

    $(".Login-submitButton").click(function(){
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        if(email.length > 0 &&  password.length > 0){
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                //revisar type y mandar a pantalla segun tipo de student
              });
        }
    });
}




function init_wow(){
    new WOW().init();
}