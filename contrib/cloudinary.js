import cloudinary from 'cloudinary';
import config from '../config/cloudinary.json';

cloudinary.config(config);

export default cloudinary;
