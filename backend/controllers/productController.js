import { sql } from "../config/db.js"
export const getProducts =async (req, res)=>{
    try {
        const products = await sql`
            SELECT * from products
            ORDER BY created_at DESC
        `;
        console.log("fetched product");
        
        res.status(200).json({success:true, data: products})
    } catch (error) {
        console.log("Error getProducts", )
        res.status(500).json({success:false, message: "Internal server Error"})
    }
}
export const createProduct =async (req, res)=>{
    const {name, price, image} = req.body

    if(!name || !price ||!image){
        return res.status(400).json({success:false, message: "All fields are required"})
    }
    try {
        const newProduct = await sql `
        INSERT INTO products (name, price, image)
        VALUES (${name},${price},${image})
        RETURNING *
        `
        console.log("new product added.")
        res.status(201).json({success:true, data: newProduct[0]})

    } catch (error) {
        console.log("Error in createProduct function", )
        res.status(500).json({success:false, message: "Internal server Error"})
    }
}
export const getProduct = async (req, res)=>{
    const {id} = req.params

    try {
        const product = await sql`
            SELECT * FROM products WHERE id=${id}
        `;
        res.status(200).json({success:true, data: product[0]})

    } catch (error) {
        console.log("Error in getProduct function", )
        res.status(500).json({success:false, message: "Internal server Error"})
    }
}
export const updateProduct = async (req, res)=>{
    const {id} = req.params;
    const {name, price, image} = req.body;

    try {
        const updatedProduct= await sql `
        UPDATE products
        SET name=${name}, price=${price},image=${image}
        WHERE id=${id}
        RETURNING *
        `;
        if(updatedProduct.length === 0){
            return res.status(404).json({
                success:false, 
                message: "Product not found"
            });
        }

        res.status(200).json({success:true, data: updatedProduct[0]})

    } catch (error) {
        console.log("Error in updateProduct function", )
        res.status(500).json({success:false, message: "Internal server Error"})
    }
}
export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedProduct = await sql `
            DELETE FROM products WHERE id=${id} RETURNING *
        `;
        if(deletedProduct.length === 0){
            return res.status(404).json({
                success:false, 
                message: "Product not found"
            });
        }
        res.status(200).json({success:true, data: deletedProduct[0]})

    } catch (error) {
        console.log("Error in deleteProduct function", )
        res.status(500).json({success:false, message: "Internal server Error"})
    }
}