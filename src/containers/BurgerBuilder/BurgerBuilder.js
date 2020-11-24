import React, {Component} from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // };
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: null
    };

    componentDidMount() {
        // axios.get("https://react-my-burger-ef2e2.firebaseio.com/ingredients.json").then(response => {
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error: true});
        // });
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        // this.setState({purchasable: sum > 0});
        return sum > 0;
    };

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // this.setState({purchasing: false});
        // alert('You continue!');


        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Max Pain",
        //         address: {
        //             street: "Test street 1",
        //             zipCode: "4123",
        //             country: "Nepal"
        //         },
        //         email: "test@gmail.com"
        //     },
        //     deliveryMethod: "fastest"
        // };
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({loading: false, purchasing: false})
        // }).catch(error => {
        //     // console.log(error);
        //     this.setState({loading: false, purchasing: false})
        // });'


        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+queryString
        // });

        this.props.history.push( '/checkout');
    };

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   disabled={disabledInfo}
                                   price={this.props.price}
                                   ordered={this.purchaseHandler}
                                   purchasable={this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            );
            orderSummary = <OrderSummary purchaseCancelled={this.purchaseCancelHandler}
                                         purchaseContinued={this.purchaseContinueHandler}
                                         price={this.props.price.toFixed(2)}
                                         ingredients={this.props.ings}/>;
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner/>;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngerdient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngerdient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
