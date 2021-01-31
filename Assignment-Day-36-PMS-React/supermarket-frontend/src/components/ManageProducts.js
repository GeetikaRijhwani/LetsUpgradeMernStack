import React, { Component } from 'react';
class ManageProducts extends Component
{
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            editable: false
        };
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    componentDidMount = () => {
        this._isMounted = true;
        fetch("http://localhost:8000/")
            .then((response) => response.json())
            .then((products) => {
                if (this._isMounted) {

                    products.forEach((product) => {
                        product.editable = false;
                    })
                    console.log(products);
                    this.setState({ products: products });
                }
                
            })
            .catch((error) => {
            console.log(error);
            })
    }

   deleteProduct(id) {
     fetch("http://localhost:8000/product?id=" + id, {
            method: "DELETE"
        })
            .then(response => { response.json() })
            .then((data) => {
                console.log(data);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateOperation(index, name, event) {
        let currProducts = this.state.products;
        currProducts[index][name] = event.target.innerText;
       console.log(currProducts[index]);
    }

    updateProduct(index, id) {
        let currProducts = this.state.products;
        let product = currProducts[index];
        delete product.editable;

        fetch("http://localhost:8000/product?id=" + id, {
            method: "PUT", 
            body: JSON.stringify(product),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => { response.json() })
            .then((data) => {
                console.log(data);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }

    editableOn(index) {
        let currProducts = this.state.products;
        currProducts[index].editable = true;
        this.setState({products: currProducts});
    }
    editableOff(index) {
        let currProducts = this.state.products;
        currProducts[index].editable = false;
        this.setState({products: currProducts});
    }

    render() {
        return (
            <div className="container">
            <h1>Manage Products</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th autoFocus={true}>Description</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td contentEditable={product.editable} onKeyUp={(event) => {
                                        this.updateOperation(index, "title", event)
                                    }}>{product.title}</td>
                                    <td className="w-25" contentEditable={product.editable} onKeyUp={(event) => {
                                        this.updateOperation(index, "description", event)
                                    }}>{product.description}</td>
                                    <td contentEditable={product.editable} onKeyUp={(event) => {
                                        this.updateOperation(index, "price", event)
                                    }}>{product.price}</td>
                                    <td contentEditable={product.editable} onKeyUp={(event) => {
                                        this.updateOperation(index, "type", event)
                                    }}>{product.type}</td>
                                    <td>
                                        {(product.editable === false) ? (
                                           <button className="btn btn-primary mr-2" onClick={() => { this.editableOn(index) }}>Update</button> 
                                        ):
                                            (
                                                <button className="btn btn-success mr-2" onClick={() => {
                                                    this.updateProduct(index, product.id);
                                                    this.editableOff(index);
                                                }}>Save Changes</button>      
                                        )}
                                        
                                        <button className="btn btn-danger" onClick={() => {

                                            //actual deletion
                                            this.deleteProduct(product.id);
                                            //delete the same product from state to re-render
                                            let currProducts = this.state.products;
                                            currProducts.splice(index, 1);
                                            this.setState({products: currProducts});
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
        );
    }
}

export default ManageProducts;