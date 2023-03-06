//if webpack config file changed need to restart the server
var path = require('path');
module.exports = {
    entry:'./ts/importExport/postObj.ts',
    output:{
        filename:"webpack_bundle.js",
        path:path.resolve(__dirname,'dist'),
        publicPath:'/dist/'//publicPath helpfull to server  that ,it  will lookup the soure file path location ,instead fo keep in filesystem
              //if there any changes in the source file , server run and rerender teh latest changes beacuse bundle file in teh memory
              //all webpack framwork use webpack dev-server 
    },
   
    devtool:"inline-source-map",//this will enable uncompressed file for debug
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
    }
}