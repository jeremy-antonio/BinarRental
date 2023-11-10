import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.memoryStorage();

export default multer({ storage });
