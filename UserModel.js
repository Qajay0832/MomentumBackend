import mongoose from "mongoose";
const Schema = mongoose.Schema;


// Define the function schema
const DbConfigSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const dbSchema = new mongoose.Schema({
  entities_to_mock: {
    type: [String],
  },
  is_db_mocked: {
    type: Boolean,
    required: true,
  },
  db_config: {
    type: DbConfigSchema,
    required: true,
  },
});
const functionSchema = new Schema({
    
  function: { type: String, required: true },
  dependencylibs: { type: Array, default: [] },
  params: [
    {
      identifier: { type: String, default:null },
      type: { type: String, default:null },
    },
  ],
  response_object: { type: String, default: '' },
  children: { type: [], default: [] },  // Recursive reference to the same schema for nested functions
});

// Define the main schema based on the provided structure
const proxySchema = new Schema({
  function: { type: String, required: true },
  dependencylibs: { type: Array, default: [] },
  params: [
    {
      identifier: { type: String, default:null },
      type: { type: String, default:null},
    },
  ],
  response_object: { type: String, default: '' },
  children: [functionSchema],  // Link to the function schema for child functions
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
  proxy: [proxySchema],
  dbSchema:[dbSchema],
  dependencylibs:{
    type:[String]
  }
});

// Create and export the Mongoose model
const User = mongoose.model('User', UserSchema,"momentumgraphs");

export default User;