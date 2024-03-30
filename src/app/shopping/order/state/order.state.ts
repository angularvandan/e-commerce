export interface OrderState{
    products:any[];
}
// let localProduct=JSON.parse(localStorage.getItem('products')||'[]');
export const initialState:OrderState={
    products:[]
}