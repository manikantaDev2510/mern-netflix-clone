// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type: String,
//         default:"",
//     },
//     searchHistory:{
//         type:Array,
//         default:[]
//     }
// })

// //                          User should be singler and 1st letter should Cap because mongose converts in purlar
// export const User =mongoose.model('User',userSchema);












import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "",
	},
	searchHistory: {
		type: Array,
		default: [],
	},
});

export const User = mongoose.model("User", userSchema);