

class UserModel {
    constructor(id: Number, username: String, picture: String, email: String, password: String) {
        this.id = id;
        this.username = username;
        this.picture = picture;
        this.email = email;
        this.password = password
    };

    private id: Number;
    private username: String;
    private picture: String;
    private email: String;
    private password: String;
};