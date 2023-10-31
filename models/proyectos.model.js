import {Schema,model} from 'mongoose'

const proyectoSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:'sin descripcion',
        trim:true
    },
    image:{
        public_id: String,
        secure_url: String
    },
    author:{
        type:Schema.Types.ObjectId,
        default:null
    },
    backend: String,
    frontend: String
    
},{collection:'proyectos',timestamps:true})


const Proyecto=model('Proyecto',proyectoSchema)

export default Proyecto






