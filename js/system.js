var idThemeHelper;


class Student {
    constructor (cName,cEmail,cUid,cHomeworks,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType
        this._homeworks = cHomeworks;
        this._themes = cThemes
    }

    get name() {
        return this._name
    }

    set name( value ) {
        this._name = value;
    }

    get email() {
        return this._email
    }

    set email( value ) {
        this._email = value;
    }

    get uid() {
        return this._uid
    }

    set uid( value ) {
        this._uid = value;
    }

    get homeworks() {
        return this._homeworks
    }

    set homeworks( value ) {
        this._homeworks = value;
    }

    get themes() {
        return this._themes
    }

    set themes( value ) {
        this._themes = value;
    }

    get type() {
        return this._type
    }

    set type( value ) {
        this._types = value;
    }



}

var userS = new Student('','','',[],'','')

class Themes {
    constructor(id,nombre,descripcion,trabajos,archivo,link, tutorId){
        this._id=id;
        this._name=nombre;
        this._description=descripcion;
        this._works=trabajos;
        this._worksArray=trabajos;
        this._file=archivo;
        this._link=link;
        this._tutorId=tutorId;
    }

    get id() {
        return this._id
    }

    set id( value ) {
        this._id = value;
    }

    get name() {
        return this._name
    }

    set name( value ) {
        this._name = value;
    }

    get description() {
        return this._description
    }

    set description( value ) {
        this._description = value;
    }

    get tutorId() {
        return this._tutorId
    }

    set tutorId( value ) {
        this._tutorId = value;
    }

    get link() {
        return this._link
    }

    set link( value ) {
        this._link = value;
    }

    get file() {
        return this._file
    }

    set file( value ) {
        this._file = value;
    }

    get _works() {
        return this._worksArray
    }

    set _works(value ) {
        this._worksArray = value;
    }

}

var globalThemes = []
var ownThemes = []


class Teacher {
    constructor (cName,cEmail,cUid,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType;
        this._themes = cThemes;
    }

    get name() {
        return this._name
    }

    set name( value ) {
        this._name = value;
    }

    get email() {
        return this._email
    }

    set email( value ) {
        this._email = value;
    }

    get uid() {
        return this._uid
    }

    set uid( value ) {
        this._uid = value;
    }

    get themes() {
        return this._themes
    }

    set themes( value ) {
        this._themes = value;
    }

    get type() {
        return this._type
    }

    set type( value ) {
        this._types = value;
    }

    UploadTheme(Name, Description, Link,fileUrl){
        console.log(Name+Description+Link+fileUrl)
        var newthemekey = firebase.database().ref().child('posts').push().key;
        firebase.database().ref('Themes/' + newthemekey).set({
            name: Name,
            description: Description,
            link: Link,
            file:fileUrl,
            teacher: firebase.auth().currentUser.uid
        })

    }

    UploadFile(e) {
        var UploadTheme = document.getElementById("UploadTheme")
        UploadTheme.style.display = "none";
        var file = e.target.files[0];

        var storageRef = firebase.storage().ref('Theme/' + file.name);
        var task = storageRef.put(file);
        task.on('state_changed',
            function progress(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },function(error){

            },
            function(){
                task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    console.log(downloadURL);
                    var Name = $("#exampleFormControlInput1").val();
                    var Description = $("#exampleFormControlInput3").val();
                    var link = $("#exampleFormControlInput2").val();
                    console.log(Name + Description + link)
                    tutor.UploadTheme(Name, Description, link,downloadURL);


                })
            }
        );

    }

    viewMyThemes(){
        var themes = document.getElementById("tutorThemes");
        themes.innerHTML=""
        firebase.database().ref('Themes/').once('value', function(snapshot){
            snapshot.forEach(theme => {
                if(theme.val().teacher===firebase.auth().currentUser.uid){
                    console.log(theme.val());
                    themes.innerHTML+='<a href="#" class="list-group-item list-group-item-action">'+
                '<div class="d-flex w-100 justify-content-between">'+
                  '<h5 class="mb-1">'+theme.val().name+'</h5>'+
                  '<small>Tema</small>'+
                '</div>'+
                '<p class="mb-1">'+theme.val().description+'</p>'+
                '<small> <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModalScrollable">Revisar Trabajos</button></small>'+
                '<small> <button href='+theme.val().file+' type="button" class="btn btn-outline-secondary" >Revisar Archivo</button></small>'+
              '</a>'
                }
                
            });
        })
    }

}

var teacher = new Teacher('','','',[],'');

