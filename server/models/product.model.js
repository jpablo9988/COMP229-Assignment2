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
    price: Double,
    quantity: Int32,
    category:
    {
        type: String,
        required: [true, 'A category is requiered']
    }

  }) 
export default mongoose.model('User', ProductSchema)
