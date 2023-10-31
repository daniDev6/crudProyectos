import app from './app.js'
import { connectDB } from './utils/mongoose.js'



const main=async()=>{
    app.listen(3000, ()=>{
        console.log('Server on port 3000')
    })
    await connectDB()
}

main()







