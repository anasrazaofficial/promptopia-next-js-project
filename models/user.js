const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: String
});

// In NextJS, APIs are serverless by default, meaning the backend is not always running, it only runs (setting-up backend, model-defining) when the API is being called. So, if the model is already created, then we must reuse it instead of creating it again.

const User = models.User || model('User', UserSchema);
export default User;