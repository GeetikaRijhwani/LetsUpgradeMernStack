function createProduct() {
    let product = {};
    product.id = document.getElementById("id").value;
    product.title = document.getElementById("name").value;
    product.description = document.getElementById("description").value;
    product.price = document.getElementById("price").value;
    product.rating = document.getElementById("rating").value;
    product.type = document.getElementById("type").value;

    console.log(product);

    fetch("http://localhost:3000/product", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then((data) => {
            document.getElementById("message").innerHTML =
                `<p class="alert alert-success" style="text-transform: capitalize;">${data.message} Successfully</p>`;
            document.getElementById("addform").reset();
            console.log(data);
    })
}