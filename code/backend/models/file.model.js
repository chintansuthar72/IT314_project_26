// const mongoose = require('mongoose');

// // create chunks collection schema
// const chunkSchema = new mongoose.Schema({
//     files_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'FileCollection',   
//     },
//     n: {
//         type: Number,
//         required: true,
//     },
//     data: {
//         type: Buffer,
//         required: true,
//     },
// }, {
//     timestamps: true,
// });

// const Chunk = mongoose.model('Chunk', chunkSchema);

// // create file collection schema
// const fileCollectionSchema = new mongoose.Schema({
//     length: {
//         type: Number,
//         required: true,
//     },
//     chunkSize: {
//         type: Number,
//         required: true,
//     },
//     uploadDate: {
//         type: Date,
//         required: true,
//     },
//     md5: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     filename: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     contentType: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     aliases: {
//         type: [String],
//         required: true,
//     },
//     metadata: {
//         type: mongoose.Schema.Types.Mixed,
//         required: true,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
// }, {
//     timestamps: true,
// });

// const FileCollection = mongoose.model('FileCollection', fileCollectionSchema);

// module.exports = {
//     Chunk,
//     FileCollection,
// };


const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    data : {
        type : String,
        required : true
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
}, {
    timestamps: true,
})

const File = mongoose.model('File',fileSchema);
module.exports = File;