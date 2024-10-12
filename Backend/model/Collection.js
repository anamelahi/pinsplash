// models/Collection.js
import { Schema, model } from 'mongoose';

const CollectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      id: String,
      url: String,
      alt_description: String,
    },
  ],
});

export default model('Collection', CollectionSchema);
