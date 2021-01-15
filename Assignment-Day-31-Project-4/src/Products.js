import React, { Component } from 'react';
import "./Products.css";
import Product from "./Product";

class Products extends Component {

    

    constructor(props) {

        super(props);
        if (localStorage.getItem('products') == null) {
            this.allProducts = [];
        }
        else {
            this.allProducts = JSON.parse(localStorage.getItem('products'));
        }
        
        this.state = {
            products: this.allProducts,
            errors: [
                { error: null },
                { error: null },
                { error: null },
                { error: null }
            ]
        }
        
        this.product = {};
        this.fields = {};
    }

    getProductDetails(event, key) {
        
        this.product[key] = event.target.value;
        this.fields[key] = event.target;
    }

    formValidation = () => {
        let errorcount = 0;
        let errors = this.state.errors;
        if (this.product.name === "" || this.product.name === undefined) {
            errorcount++;
            errors[0].error = "Name is required";
        }
        else {
            errors[0].error = null;
        }

        if (this.product.price === "" || this.product.price === undefined) {
            errorcount++;
            errors[1].error = "Price is required";
        }
        else {
            errors[1].error = null;
        }

        if (this.product.quantity === "" || this.product.quantity === undefined) {
            errorcount++;
            errors[2].error = "Quantity is required";
        }
        else {
            errors[2].error = null;
        }

        if (this.product.color === "" || this.product.color === undefined) {
            errorcount++;
            errors[3].error = "Color is required";
        }
        else {
            errors[3].error = null;
        }

        this.setState({ errors: errors });

        if (errorcount === 0) {
            return true;
        }

        return false;
    }

    addProduct = () => {

        if (this.formValidation() === true) {
            let product = new Product(this.product);
            this.allProducts.unshift(product);
    
            // Storing data in local storage
            localStorage.setItem('products', JSON.stringify(this.allProducts));
            this.setState({ products: this.allProducts });
            this.fields.name.value = "";
            this.fields.price.value = "";
            this.fields.color.value = "";
            this.fields.quantity.value = "";  
        }
        else {
            console.log("Solve the Errors");
        }

        
    }

    deleteProduct = (productindex) => {
        this.allProducts.splice(productindex, 1);
        // Storing data in local storage
        localStorage.setItem('products', JSON.stringify(this.allProducts));
        this.setState({ products: this.allProducts });
    }

    searchProduct = (event) => {
        let userInput = event.target.value;
        let filteredProducts = this.allProducts.filter((product) => {
            return product.name.toLowerCase().includes(userInput.toLowerCase());
        });

        this.setState({ products: filteredProducts });
    }
    render() {

        let products = null;

        if (this.allProducts.length === 0) {
            products = (<div className="alert alert-danger">No Products Present. Please add some!!</div>);
        }

        else {

            products = this.state.products.map((product, index) => {
                return (
                    <div className="card" key={index} style={{ width: "20rem", margin: "20px" }}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h3>{product.name}</h3></li>
                            <li className="list-group-item">Price: {product.price}</li>
                            <li className="list-group-item">Quantity: {product.quantity}</li>
                            <li className="list-group-item">Color: {product.color}</li>
                            <li className="list-group-item"><button className="btn btn-danger" onClick={()=>{this.deleteProduct(index)}}>Delete Product</button></li>
                        </ul>
                    </div>
                );
            })
        }
        return (
            <div className="container main-container">

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search Product" onChange={(event)=>{this.searchProduct(event)}} />
                </div>

                <div className="row" style={{marginLeft:"0px"}}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" onChange={(event)=>{this.getProductDetails(event, "name")} }/>
                    </div>

                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Price" onChange={(event)=>{this.getProductDetails(event, "price")} }/>
                    </div>

                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Quantity" onChange={(event)=>{this.getProductDetails(event, "quantity")} }/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Color" onChange={(event)=>{this.getProductDetails(event, "color")} }/>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={()=>{this.addProduct()}}>Add Product</button>
                    </div>
                </div>

                <div>
                    {
                        this.state.errors.map((errorObj) => {
                            if (errorObj.error != null) {
                                return (<div className="alert alert-danger">{errorObj.error}</div>); 
                            }
                            else {
                                return null;
                            }
                            
                        })
                    }
                </div>

                <h2>All Products</h2>
                <div className="row" style={{ marginLeft: "0px", marginTop: "30px" }}>
                    {products}
                </div>
            </div>
        );
    }
}

export default Products;