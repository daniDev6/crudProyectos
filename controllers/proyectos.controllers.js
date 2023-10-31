import Proyecto from '../models/proyectos.model.js'
import {uploadProyectImage,deleteProyectImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'








export const getProyectos=async(req,res)=>{
    try {
        const proyecto=await Proyecto.find()

        console.log('hola')
        res.send(proyecto)
    } catch (error) {
        res.status(500).send(error.message)
    }
};
export const addProyecto=async(req,res)=>{
    try {
        const proyect=await Proyecto.findOne({name:req.body.url})
        if(proyect){
            if(req.files?.image){
                await fs.unlink(req.files.image.tempFilePath)
            }
            return res.send('proyecto ya existe')
        }
        const proyectNew=new Proyecto(req.body)
        if(req.files?.image){
            const tempFilePath=req.files.image.tempFilePath
            const originalName=req.files.image.name
            const fileExtencion=originalName.split('.').pop()


            const proyectImg=await uploadProyectImage(req.files.image.tempFilePath)
            proyectNew.image={
                public_id: proyectImg.public_id,
                secure_url: proyectImg.secure_url
            }
            const newTempFilePath=`${tempFilePath}.${fileExtencion}`
            fs.rename(tempFilePath,newTempFilePath,(err)=>{
                if(err){
                    console.log(err)
                }   
            })
            await fs.unlink(req.files.image.tempFilePath)
            console.log(req.files.image.tempFilePath)
            console.log('se subio la imagen')
        }else{
            console.log('proyecto sin imagen')
        }
        await proyectNew.save()
        res.json(proyectNew)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const updateProyecto=async(req,res)=>{
    try {
        const {id}=req.params
        const proyect=await Proyecto.findById(id)
        if(!proyect){res.send('proyecto no encontrado')}
        if(proyect.image?.public_id){
            await deleteProyectImage(proyect.image.public_id)
        }
        const newProyect=await Proyecto.findByIdAndUpdate(id,req.body,{new:true})
        if(req.files?.image){
            const newImage=await uploadProyectImage(req.files.image.tempFilePath)
            newProyect.image={
                public_id: newImage.public_id,
                secure_url: newImage.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
        }
        await newProyect.save()
        res.json(newProyect)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getByIdProyecto=async(req,res)=>{
    try {
        const {id}=req.params
        const proyect=await Proyecto.findById(id)
        if(!proyect){res.send('proyecto no encontrado')}
        res.json(proyect)


    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deleteProyecto=async(req,res)=>{
    try {
        const {id}=req.params
        const proyect=await Proyecto.findById(id)
        if(!proyect){res.send('proyecto no encontrado')}
        if(proyect.image?.public_id){
            await deleteProyectImage(proyect.image.public_id)
        }
        await Proyecto.findByIdAndDelete(id)
        res.json('proyecto eliminado')

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const addProyects=async(req,res)=>{
    try {

        const proyect=await Proyecto.insertMany(req.body)
        res.json(proyect)
    } catch (error) {
        res.status(500).send(error.message)
    }
}



export const getProyectByUserId=async(req,res)=>{
    try{
        const {id}=req.params
        const resultado=await Proyecto.aggregate([
            {
                $lookup:{
                    from:'perfiles',
                    localField:'author',
                    foreignField:'_id',
                    as:'proyectosAuthor'
                },
            },
            {$unwind:'$proyectosAuthor'}
            
        ])
        res.json(resultado)
    }catch(error){
        res.status(500).send(error.message)
    }
}