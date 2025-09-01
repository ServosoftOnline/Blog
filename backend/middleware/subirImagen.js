import multer from 'multer';

// Multer usa multer.memoryStorage() para que el archivo se almacene en la memoria del servidor
const storage = multer.memoryStorage();

// Solo se permiten estas extensiones
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten JPG, JPEG, PNG y GIF.'), false);
  }
};

// Creación del middleware de subida
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de 5 MB
  }
});

export default upload;