
$( document ).ready(function() {
    init_teacherControls();
});

function init_teacherControls(){
   $(".Teacher-ownThemes").click(function (){
        $(".Teacher-myListGlobal").css('display','none');  
        $(".Teacher-myList").css("display","block");
        tutor.viewMyThemes() 
   });

   $(".Teacher-addTheme").click(function (){
        $(".Teacher-myListGlobal").css("display","block");  
        $(".Teacher-myList").css("display","none");  
    });
}
var tutor;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user)
        console.log(firebase.auth().currentUser);
        if (firebase.auth().currentUser != null) {
            var userInfo = firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value', function (snapshot) {
                console.log(snapshot.val());
                console.log("logeado")
                snap = snapshot.val()
                tutor= new Teacher(snap.name,firebase.auth().currentUser.email,firebase.auth().currentUser.uid,null,snap.type)
            })
        }

    }
})

var fileButton = document.getElementById("Teacher-themeFile");

fileButton.addEventListener('change', function(e){
    tutor.UploadFile(e);
})



function seeDocument(downloadUrl){
    window.open( 
        downloadUrl, "_blank"); 
}






