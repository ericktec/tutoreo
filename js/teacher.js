
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
        tutor.viewProposals()
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

function obtenerTrabajos(key) {
    console.log(key);

    var modalBody = document.getElementById("modalHomework");
    modalBody.innerHTML=""
    firebase.database().ref('Homeworks/').once('value', function (snapshot) {
        snapshot.forEach(homework => {
            console.log(homework.val().idTeacher + firebase.auth().currentUser.uid + homework.val().idTheme + key)
            if (homework.val().idTeacher === firebase.auth().currentUser.uid && homework.val().idTheme === key) {
                modalBody.innerHTML += '<a href="#" class="list-group-item list-group-item-action">'+
                    '<div class="d-flex w-100 justify-content-between">'+
                        '<h5 class="mb-1">Entregable</h5>'+
                    '</div>'+
                    '<small></small><div class="input-group Teacher-calificationSelect">'+
                        '<select class="custom-select" id="'+homework.key+'" aria-label="Example select with button addon">'+
                           ' <option selected>Calificación</option>'+
                            '<option value="1">1</option>'+
                            '<option value="2">2</option>'+
                            '<option value="3">3</option>'+
                            '<option value="4">4</option>'+
                            '<option value="5">5</option>'+
                            '<option value="6">6</option>'+
                           ' <option value="7">7</option>'+
                            '<option value="8">8</option>'+
                            '<option value="9">9</option>'+
                            '<option value="10">10</option>'+
                        '</select>'+
                        '<div class="input-group-append">'+
                            '<button onclick=seeDocument(\''+homework.val().urlTrabajo+'\') class="btn btn-outline-secondary" type="button">Ver Trabajo</button>'+
                            '<button onclick=gradeHomework(\''+homework.key+'\') class="btn btn-outline-secondary" type="button">Calificar</button>'+
                        '</div>'+
                   ' </div>'+
                '</a>'
            }
            
        });
    })

}

function gradeHomework(key){
    var grade=document.getElementById(key).value;
    console.log(grade)
    firebase.database().ref('Homeworks/' + key).update({
        calificacion:grade
    })
}








