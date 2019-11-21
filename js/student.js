$( document ).ready(function() {
    init_studentControls();
    init_getAllThemes();
    init_addTheme();
});

function init_studentControls(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', function(snapshot) {
               if(snapshot.val().type === 'teacher'){

               }else{
                userS.name = snapshot.val().name;
                userS.uid = snapshot.val().uid;
                userS.type = snapshot.val().type;
                if(snapshot.val().homeworks !== undefined){
                    userS.homework = snapshot.val().homework;
                    
                }
                if(snapshot.val().themes !== undefined){
                    userS.themes = snapshot.val().themes;
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

function init_getAllThemes(){
    firebase.database().ref('Themes/').once('value', function(snapshot) {
        globalThemes = []
        snapshot.forEach(theme => {
            var tempTheme = new Themes(theme.key,theme.val().name,theme.val().description,[],theme.val().file,theme.val().link,theme.val().teacher);
            globalThemes.push(tempTheme)
        });
        globalThemes.forEach(themes =>{
            $( ".Student-myListGlobalAppend" ).append( "<a href='#' class='list-group-item list-group-item-action'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"+themes.name+"</h5><small>Tema</small></div><p class='mb-1'>"+themes.description+"</p><small> <button type='button' class='btn btn-outline-secondary globalIndividualTheme' name='"+themes.name+"' data-toggle='modal' data-target='#exampleModalScrollable3'>Añadir tema</button></small></a>" );  
        })
         
    })
}


function init_addTheme(){
    $(document).on('click','.globalIndividualTheme',function(){
        var name = $( this ).attr('name');
        console.log(userS);
        globalThemes.forEach(themes =>{
            if(themes.name === name && userS.themes.includes(themes) === false){
                var myRef = firebase.database().ref('Users/' + firebase.auth().currentUser.uid+"/homeworks").push();
                var key = myRef.key;
                var newData={
                    name: themes.name,
                    description: themes.description,
                    uid: key,
                    teacher: themes.tutorId,
                    video: themes.link,
                    file: themes.file,
                    works: themes._works
                 }
                myRef.set(newData);
            }
        })
    })
}