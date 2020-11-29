function validateName(){
    let name=document.getElementById("name").value;
    let exp = new RegExp("[A-Za-z]{3,}");
    let flag;
    if(name==""){

        document.getElementById("nameError").innerText
        ="Name should not empty";
        flag = false;
    }
    else if (!exp.test(name)) {
        document.getElementById("nameError").innerText
        ="Name should not have a number and should be atleast 3 characters";
        flag = false;
    }
    else
    {
        document.getElementById("nameError").innerText="";
        flag = true;
    }

}

function validateDesc(){
    let description=document.getElementById("description").value;
    let exp = new RegExp("^[a-zA-Z0-9!@#$&?.\"' ]{15,}");
    let flag;
    if(description==""){

        document.getElementById("descError").innerText="Description should not empty";
        flag = false;
    }
    else if (!exp.test(description)) {
        document.getElementById("descError").innerText
        ="Description should have atleast 15 characters";
        flag = false;
    }
    else
    {
        document.getElementById("descError").innerText="";
        flag = true;
    }

}

function validatePrice(){
    let price=document.getElementById("price").value;
    let exp = /^[-+]?[0-9]+\.[0-9]+$/;
    let flag;
    if(price==""){

        document.getElementById("priceError").innerText="Price should not empty";
        flag = false;
    }
    else if (!price.match(exp)) {
        document.getElementById("priceError").innerText
        ="Price should only contain Numbers and .(Decimal Notation) is Compulsory";
        flag = false;
    }
    else
    {
        document.getElementById("priceError").innerText="";
        flag = true;
    }

}

function validateRating(){
    let rating = document.getElementById("rating").value;
    let ratingNum = Number(rating);
    console.log(typeof(ratingNum));
    let flag;
    if(rating==""){

        document.getElementById("ratingError").innerText="Rating should not empty";
        flag = false;
    }
    else if(ratingNum<1 && ratingNum>6) {
        document.getElementById("ratingError").innerText="Rating should be between 1 and 5";
        flag = false;
        console.log(flag);
    }
    else
    {
        document.getElementById("ratingError").innerText="";
        flag = true;
    }

}

function validateType(){
    let type=document.getElementById("type").value;
    let exp = new RegExp("[A-Za-z]{3,}");
    let flag;
    if(type==""){

        document.getElementById("typeError").innerText
        ="Type should not empty";
        flag = false;
    }
    else if (!exp.test(type)) {
        document.getElementById("typeError").innerText
        ="Type should not have a number and should be atleast 3 characters";
        flag = false;
    }
    else
    {
        document.getElementById("typeError").innerText="";
        flag = true;
    }

}