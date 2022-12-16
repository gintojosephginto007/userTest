import multer from 'multer'
import path from 'path'
// define multer storage configuration

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'assets/uploads/')
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

export default upload
