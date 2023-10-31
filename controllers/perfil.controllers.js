import Perfil from "../models/perfil.model.js"
import {uploadPerfilImage,deletePerfilImage} from '../utils/cloudinary.js'
import fs from 'fs-extra'
export const getPerfiles=async(req,res)=>{
    try {
        const user=await Perfil.find()
        if(req.files?.image){
            await fs.unlink(req.files.image.tempFilePath)
        }
        res.json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
};
export const addPerfil=async(req,res)=>{
    try {
        const user=await Perfil.findOne({email:req.body.email})
        if(user){
            if(req.files?.image){
                await fs.unlink(req.files.image.tempFilePath)
            }
            return res.send('usuario ya registrado')

        }
        const userNew=new Perfil(req.body)
        console.log(req.files)
        if(req.files?.image){
            const tempFilePath=req.files.image.tempFilePath
            const originalName=req.files.image.name
            const fileExtencion=originalName.split('.').pop()
            console.log('no debes entrar acá')

            const imagen=await uploadPerfilImage(req.files.image.tempFilePath)
            console.log('se subio la imagen')
            userNew.image={
                public_id: imagen.public_id,
                secure_url: imagen.secure_url
            }
            const newTempFilePath=`${tempFilePath}.${fileExtencion}`
            fs.rename(tempFilePath,newTempFilePath,(err)=>{
                if(err){
                    console.log(err)
                }   
            })



            await fs.unlink(req.files.image.tempFilePath)
        }else{
            console.log('usuario sin foto de perfil')
        }

        await userNew.save()
        res.json(userNew)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const updatePerfil=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await Perfil.findById(id)
        if(!user){res.send('usuario no encontrado')}
        if(user.image?.public_id){
            await deletePerfilImage(user.image.public_id)
        }
        const userUpdated=await Perfil.findByIdAndUpdate(id,req.body,{new:true})        
        if(req.files?.image){
            const newImage=await uploadPerfilImage(req.files.image.tempFilePath)
            userUpdated.image={
                public_id: newImage.public_id,
                secure_url: newImage.secure_url
            }
            await fs.unlink(req.files.image.tempFilePath)
        }
        await userUpdated.save()
        res.json(userUpdated)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const getByIdPerfil=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await Perfil.findById(id)
        if(!user){res.send('usuario no encontrado')}
        if(req.files?.image){
            await fs.unlink(req.files.image.tempFilePath)
        }
        res.json(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const deletePerfil=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await Perfil.findById(id)
        if(req.files?.image){
            await fs.unlink(req.files.image.tempFilePath)
        }


        if(!user){res.send('usuario no encontrado')}
        if(user.image?.public_id){
            await deletePerfilImage(user.image.public_id)
        }
        await Perfil.findByIdAndDelete(id)
        res.json('usuario eliminado')



    } catch (error) {
        res.status(500).send(error.message)
    }
}




