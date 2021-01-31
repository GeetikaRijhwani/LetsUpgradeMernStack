import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import "./SingleProduct.css"

class SingleProduct extends Component {
  _isMounted = false;
  
  
  averageRating = 0;
  widthPercent = 0;
  constructor(props) {
    super(props);
    
    this.id = this.props.match.params.id;

    this.state = {
      product: {}
    };
  }
  greyStarRating = () => {
    let greystars = [];
    for (let i = 1; i <= 5; i++) {
    greystars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: "grey", fontSize:"20px" }} />);
    }
    return greystars;
  }
  
  goldStarRating = () => {
    let goldstars = [];
    for (let i = 1; i <= 5; i++) {
    goldstars.push(<FontAwesomeIcon icon={faStar} key={i} style={{ color: "gold", fontSize:"20px" }} />);
      
    }
    return goldstars;
 }
    

  componentWillUnmount = () => {
    this._isMounted = false;
  };


  componentDidMount = () => {
    this._isMounted = true;
    fetch("http://localhost:8000/product?id=" + this.id)
      .then((response) => response.json())
      .then((product) => {
        if (this._isMounted) {
          this.setState({ product: product });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.product);
    
    let averageRating = this.state.product.rating / this.state.product.rating_count;
    let widthPercent = Math.round((averageRating / 5) * 100);
    console.log(widthPercent);

    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <h1 className="text-center">{this.state.product.title}</h1>
        <div className="card col-md-8 offset-2">
          <div
            className="card-body"
            style={{ fontSize: "40px", textAlign: "center" }}
          >
            <p>
              {this.state.product.emoji} {this.state.product.emoji} {this.state.product.emoji}
            </p>
            {(this.state.product.foodCategory === "veg") ? (
              <span><FontAwesomeIcon icon={faCircle} style={{ color: "green", fontSize:"40px" }} /></span>
            ):
              (
                <span><FontAwesomeIcon icon={faCircle} style={{ color: "red", fontSize:"40px" }} /></span>
              )
          }
          </div>
          <div className="card-body">
            <p className="card-text">{this.state.product.description}</p>
          </div> 
          <ul className="list-group list-group-flush">
            <li className="list-group-item font-weight-bold">${this.state.product.price}</li>
            <li className="list-group-item">Type: {this.state.product.type}</li>
            <li className="list-group-item" style={{height:"50px"}}>
              <div id="productRating" style={{ width:"113px", position:"absolute"}}>
                <div className="dummystars" style={{ width:"100%", position:"absolute"}}>{this.greyStarRating()}</div>
                <div className="dummystars" style={{width:widthPercent+"%", position:"absolute", whiteSpace:"nowrap", overflow:"hidden"}}>{this.goldStarRating()}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
