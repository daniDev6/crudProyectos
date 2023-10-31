import { v2 as cloudinary } from "cloudinary";
import { API_KEY_CLOUD, API_NAME_CLOUD, API_KEY_SECRET } from "../config.js";


cloudinary.config({
    cloud_name: API_NAME_CLOUD,
    api_key: API_KEY_CLOUD,
    api_secret: API_KEY_SECRET,
    secure: true//se comunique de forma segura
});




export async function uploadPerfilImage(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "perfiles"
    })
}

export async function deletePerfilImage(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}
export async function uploadProyectImage(filePath) {
    return cloudinary.uploader.upload(filePath, {
        folder: "proyectos"
    })
}

export async function deleteProyectImage(public_id) {
    return await cloudinary.uploader.destroy(public_id)
}




