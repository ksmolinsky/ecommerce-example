import React, { Component } from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {
    //Executes when the component is mounted
    constructor(props) {
    //console.log("constructor-Shopping Car")
    super(props); //calling super class's constructor
    //initialization of the state    
    this.state= { 
        products: [
         ],
        }
    } 
    render() {
        //console.log("render-ShoppingCart")
        return (
            <div className="container-fluid">
                <h4>Shopping Cart</h4>

                <div className="row">
                    {this.state.products.map((prod) => {
                        return (
                        <Product 
                        key={prod.id} 
                        product={prod}
                        onIncrement={this.handleIncrement}
                        onDecrement={this.handleDecrement}
                        onDelete={this.handleDelete}
                        > 
                        <button className="btn btn-primary">Buy Now</button>
                        </Product>
                        )
                    })}
                </div>
            </div>
        );
    }
    //render ends here

    //Executes after constructor and render method (includes life cycle of child components, if any) of current component
    componentDidMount = async () => {
        //fetch data from data source

        var response = await fetch("http://localhost:5001/product", {method: "GET"});
        var prods = await response.json();
        console.log(prods);

        this.setState({ products: prods });
        
        //console.log("componentDidMount-ShoppingCart")
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log("componentDidUpdate-ShoppingCart", prevProps, prevState, this.props, this.state);

       // if (prevProps.x != this.props.x)
        {
            //make http call
        }
    }

    componentWillUnmount() {
        //console.log("componentWillUnmount - ShoppingCart")
    }

    componentDidCatch(error, info) {
        //console.log("componentDidCatch - Shopping Cart")
        //console.log(error, info)

        localStorage.lastError = `${error}\n${JSON.stringify(info)}`;

    }

    handleIncrement = (product, maxValue) => {
        //get index of selected product
        let allProducts = [...this.state.products];
        let index = allProducts.indexOf(product);

        if(allProducts[index].quantity < maxValue) {
        allProducts[index].quantity++;

        //update the state of the current component (parent component)
        this.setState({products: allProducts});

        }
    };

    handleDecrement = (product, minValue) => {
        //get index of selected product
        let allProducts = [...this.state.products];
        let index = allProducts.indexOf(product);

        if(allProducts[index].quantity > minValue) {
        allProducts[index].quantity--;

        //update the state of the current component (parent component)
        this.setState({products: allProducts});
     };
    }

    //executes when the user clicks on Delete (x) button in the Product component
    handleDelete = (product) => {
        //get index of selected product
        let allProducts = [...this.state.products];
        let index = allProducts.indexOf(product);

        if(window.confirm("are you sure to delete?")){

        //delete product based on index
        allProducts.splice(index, 1);

        //update the state of current component (parent component)
        this.setState({ products: allProducts});
        }
    }

    
}
