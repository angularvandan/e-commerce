import {  createAction, props } from "@ngrx/store";

const ADD_LOCAL_TO_STATE ='[order page] add product';
const UPDATE_COUNT='[order page] update product';
const CANCEL_PRODUCT='[order page] cancel product';
export const addLocalToState=createAction(ADD_LOCAL_TO_STATE);
export const updateCount=createAction(UPDATE_COUNT,props<{payload:{id:any,count:any}}>());
export const cancelProduct=createAction(CANCEL_PRODUCT,props<{id:string}>());
