function validateId() {
    let id = document.getElementById("id").value;
    if (id == "") {
        document.getElementById("idError").innerText="ID should not empty";
        return false;
    }

    document.getElementById("idError").innerText = "";
    return true;
}

function validateName() {
    let name = document.getElementById("name").value;
    let exp = /^[a-zA-Z ]*$/; 
    console.log(exp);
    if(name==""){

        document.getElementById("nameError").innerText="Product Name should not empty";
        return false;
    }
    if (name.length < 3)
    {
        document.getElementById("nameError").innerText="Product Name should contain minimum 3 characters";
        return false; 
    }
    
    if (!exp.test(name)) {
        document.getElementById("nameError").innerText="Product Name should not contain a number";
        return false;
    }
    
    document.getElementById("nameError").innerText = "";
    return true;

}

function validateDesc(){
    let description=document.getElementById("description").value;
    let exp = new RegExp("^[a-zA-Z0-9!@#$&?.\"' ]{15,}");
    if(description==""){

        document.getElementById("descError").innerText="Description should not empty";
        return false;
    }
    if (!exp.test(description)) {
        document.getElementById("descError").innerText
        ="Description should have atleast 15 characters";
        return false;
    }
        document.getElementById("descError").innerText="";
        return true;

}

function validatePrice(){
    let price=document.getElementById("price").value;
    let exp = /^[-+]?[0-9]+\.[0-9]+$/;
    if(price==""){

        document.getElementById("priceError").innerText="Price should not empty";
        return false;
    }
    if (!price.match(exp)) {
        document.getElementById("priceError").innerText="Price should only contain Numbers and .(Decimal Notation) is Compulsory";
        return false;
    }
        document.getElementById("priceError").innerText="";
        return true;
}

function validateRating(){
    let rating = document.getElementById("rating").value;
    let ratingNum = Number(rating);
    console.log(typeof(ratingNum));
    if(rating==""){

        document.getElementById("ratingError").innerText="Rating should not empty";
        return false;
    }
    if(ratingNum<1 || ratingNum>6) {
        document.getElementById("ratingError").innerText="Rating should be between 1 and 5";
        return false;
    }
    else
    {
        document.getElementById("ratingError").innerText="";
        return true;
    }

}

function validateType(){
    let type=document.getElementById("type").value;
    let exp = /^[a-zA-Z ]*$/;
    let flag;
    if(type==""){

        document.getElementById("typeError").innerText
        ="Type should not empty";
        return false;
    }
    if (!exp.test(type)) {
        document.getElementById("typeError").innerText="Type should not contain a number";
        return false;
    }
    if (type.length < 3) {
        document.getElementById("typeError").innerText="Type should contain minimum 3 characters";
        return false;
    }
    
        document.getElementById("typeError").innerText="";
        return true;

}

let errorcount=0;
function validateForm(){
    if (validateId() == false) {
        errorcount++;
    }
    if(validateName()==false){
        errorcount++;
    }
    if (validateDesc() == false) {
        errorcount++;
    }
    if (validatePrice() == false) {
        errorcount++;
    }
    if (validateRating() == false) {
        errorcount++;
    }
    if (validateType() == false) {
        errorcount++;
    }

    console.log(errorcount);

    if(errorcount==0){
        createProduct();
    }

    errorcount=0;
}