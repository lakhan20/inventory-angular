export interface AddProduct {
    product_name:string,
    product_description:string,
    product_price:number,
    product_available_qty:number,
    product_total_qty:number,
    product_mrp:number,
    product_discount:number,
    is_available:boolean,
    is_pieces:boolean,
    product_image:string,
    subCategory_id:number
}
