fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((products) => {
    let productsString = "";
    products.forEach((product) => {
    //   let ratingString = "";

    // let averageRating = Math.round(product.rating / product.rating_count);

    // for (let i = 1; i <= 5; i++) {
    //   if (i <= averageRating) {
    //     ratingString += ` <i class="fa fa-star" aria-hidden="true" style="color: gold; font-size: 20px;"></i>`;
    //   } else {
    //     ratingString += ` <i class="fa fa-star" aria-hidden="true" style="color: gray; font-size: 20px;"></i>`;
    //   }
    // }
      
    let dummyRating = "";
    for (let i = 1; i <= 5; i++) {
          dummyRating += ` <i class="fa fa-star notrated" aria-hidden="true" style="font-size: 20px;"></i>`;
    }
        
    let ratingString = "";
    for (let i = 1; i <= 5; i++) {
      ratingString += ` <i class="fa fa-star" aria-hidden="true" style="color: gold; font-size: 20px;"></i>`;
      }
      
      let averageRating = product.rating / product.rating_count;
      let widthPercent = Math.round((averageRating / 5) * 100);
      console.log(averageRating, widthPercent);

      productsString += `
            <div class="card product_card" style="width: 18rem;">
            <div class="card-body">
              <div class="card-title" style="font-size:50px; text-align:center;">${product.emoji}${product.emoji}${product.emoji}</div>
            </div>
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Price: &#8377; ${product.price}</li>
              <li class="list-group-item" id="rating" style="height:50px">
              <div id="productRating" style="width:112px; position:absolute">
            <div class="dummystars" style="width:100%; position:absolute">${dummyRating}</div>
            <div class="dummystars" style="width:${widthPercent}%; position:absolute; white-space:nowrap; overflow:hidden;">${ratingString}</div>
          </div>
              </li>
            </ul>
            <div class="card-body">
              <a href="product.html?id=${product.id}" class="card-link btn btn-success">View</a>
            </div>
          </div>`;
    });

    document.getElementById("product_container").innerHTML = productsString;
  });
