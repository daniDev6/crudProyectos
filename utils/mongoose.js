import {connect} from 'mongoose'
import {DB_MONGOATLAS} from '../config.js'

export const connectDB = async()=>{
    try {
        await connect(DB_MONGOATLAS,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error.message)
    }
    
}









