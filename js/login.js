$(document).ready(function () {
    init_loginControls();
    init_wow();
});

function init_loginControls() {
    $(".Login-registerHint").click(function () {
        $(".Register-formRow").css("display", "flex");
        $(".Login-formRow").css("display", "none");
    });

    $(".Login-loginHint").click(function () {
        $(".Register-formRow").css("display", "none");
        $(".Login-formRow").css("display", "flex");
    });

    $(".Login-submitButtonRegister").click(function () {
        var email = $("#registerEmail").val();
        var password = $("#registerPassword").val();
        var name = $("#registerName").val();
        if (email.length > 0 && password.length > 0 && name.length > 0) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
                firebase.database().ref('Users/' + firebase.auth().currentUser.uid).set({
                    type: 'student',
                    name: name,
                    homeworks:[],
                    uid: firebase.auth().currentUser.uid,
                    themes:[],
                }).then(()=>{
                    if (firebase.auth().currentUser != null) {
                        var snap;
                        var userInfo = firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value', function(snapshot) {
                            console.log(snapshot.val());
                            console.log("logeado")
                            snap=snapshot.val();
                        }).then(()=>{
                            if (snap.type === 'teacher') {
                                window.location.replace('teacher.html');
                            } else {
                                window.location.replace('student.html');
                            }
                        })
                    }
                })
            })
            .catch(function (error) {

            });
        }
        //enviar usuario a student.html
    });

    $(".Login-submitButton").click(function () {
        var snap;
        var email = $("#loginEmail1").val();
        var password = $("#loginPassword1").val();
        if (email.length > 0 && password.length > 0) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
                console.log("inicio")
                if (firebase.auth().currentUser != null) {
                    var userInfo = firebase.database().ref('Users/' + firebase.auth().currentUser.uid);
                    userInfo.once('value', function(snapshot) {
                        console.log(snapshot.val());
                        console.log("logeado")
                        snap = snapshot.val();
                    }).then(()=>{
                        if (snap.type === 'teacher') {
                            window.location.replace('teacher.html');
                        } else {
                            window.location.replace('student.html');
                        }
                    })
                }
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                console.log("test");
            });
        }
    });
}





function init_wow() {
    new WOW().init();
}