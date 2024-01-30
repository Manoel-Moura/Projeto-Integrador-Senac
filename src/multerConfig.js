import multer from 'multer'
import path from 'path'

export default{
    storage: multer.diskStorage({
        destination: path.resolve(__dirname,'front', 'assets', 'media', 'uploads'),
        filename: (req, file, genName) => {
            const extension = path.extname(file.originalname)
            const name = path.basename(file.originalname,extension)

            genName(null, `${name}-${Date.now()}${extension}`)
        }
    })
}
