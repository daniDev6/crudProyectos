import {Schema,model} from 'mongoose'

const perfilSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    image:{
        public_id: String,
        secure_url: String
    }
},{collection:'perfiles',timestamps:true})



const Perfil=model('Perfil',perfilSchema)

export default Perfil




