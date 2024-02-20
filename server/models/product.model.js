import { Double, Int32 } from 'bson'
import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true,
        required: [true,'a Name is required']
        },
    description: {
        type: String, 
        required: false
        },
    price: 
    {
        type : Number,
        required : [true,'a price is required'],
        min: [0, 'Price cannot be less than 0'],
    },
    quantity: 
    {
        type: Number,
        required : [true,'a Quantity is required'],
        min: [0, 'Quantity cannot be less than 0'],
        validate : {
            validator : Number.isInteger,
            message   : 'Quantity is not an integer value'
          }
    },
    category:
    {
        type: String,
        required: [true, 'A category is required']
    }

  }) 
export default mongoose.model('Product', ProductSchema)
