import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState } from "./order.state";

export const ORDER_STATE_NAME='products';

const getProductState=createFeatureSelector<OrderState>(ORDER_STATE_NAME);
export const getProducts=createSelector(getProductState,state=>{
    return state.products;
})