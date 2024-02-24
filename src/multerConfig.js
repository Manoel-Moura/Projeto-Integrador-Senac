import multer from 'multer'
import path from 'path'

export default{
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'src/front/assets/media/uploads')
        },
        filename: (req, file, genName) => {
            const extension = path.extname(file.originalname)
            const name = path.basename(file.originalname,extension)

            genName(null, `${name}-${Date.now()}${extension}`)
        }
    })
}
