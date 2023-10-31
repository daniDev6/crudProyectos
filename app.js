import express, { json } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload';

import perfilRoutes from './routes/perfil.routes.js'
import proyectosRoutes from './routes/proyectos.routes.js'

const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp',
    safeFileNames: true, 
    preserveExtension: true 

}))
app.use('/',perfilRoutes)
app.use('/',proyectosRoutes)
app.get('/',(req,res)=>{
    res.send('hola mundo')
})
export default app





