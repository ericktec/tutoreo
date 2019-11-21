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

var userS = new Student('','','',[],[],'');


class Teacher {
    constructor (cName,cEmail,cUid,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType
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

var teacher = new Teacher('','','',[],'');


class Themes {
    constructor (cName,cdescription,cuid,cteacher,cvideo,cfile) {
        this._name = cName;
        this._description = cdescription;
        this._uid = cuid;
        this._teacher = cteacher;
        this._video = cvideo;
        this._file = cfile;
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
    
    get uid() {
        return this._uid
    }
 
    set uid( value ) {
        this._uid = value;
    }

    get teacher() {
        return this._teacher
    }
 
    set teacher( value ) {
        this._teacher = value;
    }

    get video() {
        return this._video
    }
 
    set video( value ) {
        this._video = value;
    }

    get file() {
        return this._file
    }
 
    set file( value ) {
        this._file = value;
    }
 
}

var globalThemes = []