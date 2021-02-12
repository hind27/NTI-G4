const mongoose = require('mongoose')
var mongooseTypePhone = require('mongoose-type-phone');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        maxLength:15,
        default:'new user'
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    phone: {
        type: mongoose.SchemaTypes.Phone,
        required: 'Phone number should be set correctly',
        allowBlank: false,
        allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
        phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
        defaultRegion: 'EG',
        parseOnGet: false
    } ,
    tokens :[
        {
            token :{type : String}
        }
    ]
   
},{
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 12)
    next()
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, '123456')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findUser = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    flag = await bcrypt.compare(password, user.password)
    if(!flag) throw new Error('invalid pass')
    return user
}
const User = mongoose.model('User', userSchema)
module.exports =User