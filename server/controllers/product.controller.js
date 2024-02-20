import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

	const create = async (req, res) => 
    { 
        const user = new Product(req.body) 
        try {
        await user.save()
        return res.status(200).json({ 
        message: "Product succesfully created!"
        })
        } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
        }  
    }       
	const list = async (req, res) => { 
        try {
        let products
        if (req.query.name)
        {
            products = await Product.find({"name" : {$regex : req.query.name}}).select('name description price quantity category') 
        }
        else
        {
            products = await Product.find().select('name description price quantity category') 
        }
        res.json(products)
        } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 

        })
        } 
    }
    
	const id = async (req, res, next, id) => { 
        try {
        let products = await Product.findById(id) 
        if (!products)
        return res.status('400').json({ 
        error: "The product has not been found"
        })
        req.profile = products 
        next()
        } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve the product"
        }) 
        }
        }
        
    const read = (req, res) => {
        //req.profile.salt = undefined
        return res.json(req.profile) 
        }
    
    const update = async (req, res) => { 
            try {
            let product = req.profile
            product = extend(product, req.body) 
            await product.save()
            //product.salt = undefined
            res.json(product) 
            } catch (err) {
            return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
            })
            } 
        }
                
        const remove = async (req, res) => { 
            try {
            let product = req.profile
            let deletedProduct = await product.deleteOne() 
            //deletedProduct.salt = undefined
            res.json(deletedProduct) 
            } catch (err) {
            return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
            })
            } 
        }
            
    const deleteAll = async(req, res) => {
        try {
            let products = await Product.find().deleteMany({})
            res.json(products)
            } catch (err) {
            return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
            })
            } 
     }
	export default { create, id, read, list, remove, update, deleteAll}

    