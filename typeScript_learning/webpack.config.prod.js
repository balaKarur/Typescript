//if webpack config file changed need to restart the server
var path = require('path');
var cleanPlugin = require("clean-webpack-plugin");
module.exports = {
    mode:"production",
    entry:'./ts/importExport/postObj.ts',
    output:{
        filename:"webpack_bundle.js",
        path:path.resolve(__dirname,'dist'),
       
    },
   
   
    //module mean set of rules
    module:{
       rules: [{
            test: /\.ts$/,//find all the file name which ends with .ts then apply ts-loader 
            use:"ts-loader",//ts-loader convert teh ts file to js,
            exclude:/node_modules/,

       }]
    },
    resolve:{
        //import { Post } from "./Ipost.js"; -> here no need to mention .js webpack will resolve the file
        extensions:['.ts','.js']
    },
    plugins:[
        new cleanPlugin.CleanWebpackPlugin()
    ]
}