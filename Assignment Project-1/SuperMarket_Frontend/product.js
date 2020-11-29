let url = location.href;
let id = url.split("?")[1].split("=")[1];

let dummyRating = "";
for (let i = 1; i <= 5; i++) {
      dummyRating += ` <i class="fa fa-star notrated" aria-hidden="true" style="font-size: 20px;"></i>`;
}
    
let ratingString = "";
for (let i = 1; i <= 5; i++) {
  ratingString += ` <i class="fa fa-star" aria-hidden="true" style="color: gold; font-size: 20px;"></i>`;
}

fetch("http://localhost:3000/product?id=" + id)
  .then((response) => response.json())
  .then((product) => {

    

    let myRating = "";
    for (let i = 0; i <= 4; i++) {
      myRating += ` <i class="fa fa-star myrate notrated" onmouseover="makeRated(${i})" onmouseout="makeUnrated()" onclick="submitRating(${product.id})" aria-hidden="true" style="font-size: 20px;"></i>`;
    }

    

    let averageRating = product.rating / product.rating_count;
    let widthPercent = Math.round((averageRating / 5) * 100);
    console.log(averageRating, widthPercent);

    document.getElementById("productname").innerHTML = product.title;

    let productString = `
        <div class="card-body">
        <div class="card-body">
              <div class="card-title" style="font-size:50px;">${product.emoji}${product.emoji}${product.emoji}</div>
        </div>
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Price: &#8377; ${product.price}</li>
        <li class="list-group-item" id="rating" style="height:50px">
          <div id="productRating" style="width:112px; position:absolute">
            <div class="dummystars" style="width:100%; position:absolute">${dummyRating}</div>
            <div class="dummystars" style="width:${widthPercent}%; position:absolute; white-space:nowrap; overflow:hidden;">${ratingString}</div>
          </div>
          <div id="rating_count" style="position: absolute; left: 140px;">
          ( ${product.rating_count} Rating )
          </div>       
          
        </li>
        <li class="list-group-item" id="myrating">${myRating} ( Rate Here )</li>
        <li class="list-group-item">Type: ${product.type}</li>
        </ul>
        <div class="card-body">
            <a href="#" class="card-link btn btn-success">Buy Now</a>
        </div>`;

    document.getElementById("product").innerHTML = productString;
  });

function makeRated(index) {
  let stars = document.getElementById("myrating").children;

  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("rated");
    stars[i].classList.add("notrated");
  }

  for (let i = 0; i <= index; i++) {
    stars[i].classList.remove("notrated");
    stars[i].classList.add("rated");
  }
}

function makeUnrated() {
  let stars = document.getElementById("myrating").children;

  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("rated");
    stars[i].classList.add("notrated");
  }
}

function submitRating(id) {
  let rating = document.getElementById("myrating").getElementsByClassName("rated").length;
  
  fetch("http://localhost:3000/updateRating?id=" + id, {
    method: "PUT",
    body: JSON.stringify({ rating: rating }),
    headers: {"Content-Type": "application/json"}
  })
    .then((response) => response.json())
    .then((product) => {

    let averageRating = product.rating / product.rating_count;
    let widthPercent = Math.round((averageRating / 5) * 100);
      document.getElementById("productRating").innerHTML = `
      <div class="dummystars" style="width:100%; position:absolute">
      ${dummyRating}
      </div>
      <div class="dummystars" style="width:${widthPercent}%; position:absolute; white-space:nowrap; overflow:hidden;">
      ${ratingString}
      </div>
    `;
      
      document.getElementById("rating_count").innerHTML = `( ${product.rating_count} Rating )`;

    }).catch((err) => {
      console.log(err);
  })
}
