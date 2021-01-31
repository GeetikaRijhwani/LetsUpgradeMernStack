const http = require("http");
const fs = require("fs");
const url = require("url");
// Reading the file

// fs.readFile("./products.json", "utf-8", (err, data) => {
//     res.writeHead(200, {
//         "Content-Type": "application/json"
//     });
//     res.end(data);
// });

const productsString = fs.readFileSync("./products.json", "utf-8");
const products = JSON.parse(productsString);

// creation of server

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
  });

  if (req.method == "OPTIONS") {
    res.end();
  }

  // console.log(path);
  if (path.pathname == "/" || path.pathname == "/products") {
    res.end(productsString);
  }
  
  else if (path.pathname == "/product") {


     if (req.method == "GET") {
       const id = path.query.id;
       console.log(id);
      const singleData = products.find((ele) => {
        return ele.id == id;
      });
       
       console.log(singleData);

      res.end(JSON.stringify(singleData));
     }
     
     else if (req.method == "POST") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        let product = JSON.parse(body);
        product.id = Number(product.id);
        product.rating = 0;
        product.rating_count = 1;
        products.push(product);
        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
          res.end(JSON.stringify({ message: "Product Added" }));
        });
      });
     }
     
     else if (req.method == "PUT") {
      //Product ID
      const id = path.query.id;

      //Product Data
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        let product = JSON.parse(body);

        products.forEach((ele) => {
          if (ele.id == id) {
            ele.title = product.title;
            ele.type = product.type;
            ele.description = product.description;
            ele.price = product.price;
          }
        });

        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
          const updatedProduct = products.find((ele) => {
            return ele.id == id;
          });
          console.log(updatedProduct);
          res.end(JSON.stringify(updatedProduct));
        });
      });
     }
     
      else if (req.method == "DELETE") {
        //Product ID
        const id = path.query.id;

        products.forEach((ele, index) => {
          if (ele.id == id) {
            products.splice(index, 1);
          }
        });

        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
          res.end(JSON.stringify({ message: "Product Deleted" }));
        });
      }
  }
  else if (path.pathname == "/updateRating") {
    
    if (req.method == "PUT") {
     
    
      //Product ID
      const id = path.query.id;

      //Product Data
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        let product = JSON.parse(body);

        products.forEach((ele) => {
          if (ele.id == id) {
            ele.rating += product.rating;
            ele.rating_count += 1;
          }
        });

        fs.writeFile("./products.json", JSON.stringify(products), (err) => {
          const updatedProduct = products.find((ele) => {
            return ele.id == id;
          });
          console.log(updatedProduct);
          res.end(JSON.stringify(updatedProduct));
        });
      });
    }
  }
      
  
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Not Found anything for this URL" }));
  }
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Server is running");
});
