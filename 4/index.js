/*LECTURE 4: CODE EXAMPLE**********
READING INPUT AND WRITING output
***********************************
//reading inupts from the terminal 
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question("Please Enter your name: ", (name) => {
    console.log("You entered: "+name);
    r1.close();
})

r1.on('close', ()=> {
    console.log("Interface Closed");
    process.exit(0);

})*/

/*LECTURE 5: CODE EXAMPLE**********
READING INPUT AND WRITING TO A FILE
***********************************/
/*const readline = require('readline');
const fs = require('fs');
/* this method here this read file sync it reads the file synchronously so we know that JavaScript is a single threaded programming language that means it executes the JavaScript code line by line and this type of execution where the code is executed line by line in a single thread is called as synchronous execution and that means if this method is going to take let's say 10 minutes to read all the files let's say the file is very big and it takes 10 minutes for this method to read that file in that case the next line of code will have to wait for that time only once the execution of this function is complete then only the next line of code will be executed and this affects the performance of the application and that's why in node.js we also have another method to read a file but that method reads the file asynchronously that means it does not block the execution of next line of codef*/
/*let textIn = fs.readFileSync('./Files/input.txt','utf-8');
console.log(textIn)

let content = `Data read from input.txt: ${textIn} \nDate created ${new Date()}`
fs.writeFileSync('./Files/output.txt', content ) //if such a file is not present in the rquested directory then it would create that particular folder first and the it would write*/

/*LECTURE 7: CODE EXAMPLE *********************
READING AND WRITING TO FILE ASYNCHRONOUSLY
**********************************************/
/*const fs = require('fs');
fs.readFile('./Files/start.txt', 'utf-8', (error1, data1)=> {
    console.log(data1);
    fs.readFile(`./Files/${data1}.txt`, 'utf-8', (error2, data2)=> {
        console.log(data2);
        fs.readFile('./Files/append.txt', 'utf-8', (error3, data3) => {
            console.log(data3);
            fs.writeFile('./Files/output.txt', `${data2}\n\n${data3}\n\nDate created ${new Date()}`, ()=> {
                console.log("File Written Successfully");
            })
            
        }) 
    })
})
// this is callback hell and we can avoid it using async await or promise
console.log('Reading File......');*/

/*LECTURE 7: CODE EXAMPLE *********************
CREATING A SIMPLE WEB SERVER
**********************************************/
/*
const readline = require('readline')
const fs = require('fs')
const http = require('http')

const html = fs.readFileSync('./Template/index.html', 'utf-8');
// STEP 1: CREATE A SERVER

const server = http.createServer((request, response) => {
    // response.end('Hello from the server!');
    response.end(html);
    console.log('A new request received');
    // console.log(request);
})
// STEP 2: START THE SERVER
server.listen(8000,'127.0.0.1', ()=> {
    console.log('Server has started!');
})

*/


/*LECTURE 7: CODE EXAMPLE *********************
CREATING A SIMPLE WEB SERVER
**********************************************/
const readline = require('readline')
const fs = require('fs')
const http = require('http')
const url = require('url')

const html = fs.readFileSync('./Template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');

let productHtmlArray = products.map((prod) => {
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name);
    output = output.replace('{{%MODELNAME%}}', prod.productImage);
    output = output.replace('{{%MODELNO%}}', prod.modelNumber);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);

    return output;
})
// STEP 1: CREATE A SERVER

const server = http.createServer((request, response) => {
    let x = url.parse(request.url, true)// if specified true then it will pass the query string from the url and viceversa for false and this expression will return us an object
    console.log(x);
    let path = request.url;

    if(path ==='/' || path.toLocaleLowerCase()==='/home') {
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'You are in Home Page'));
    } else if(path.toLocaleLowerCase() ==='/about') {
        response.writeHead(200,
            {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        }
        );
        response.end(html.replace('{{%CONTENT%}}','You are in about page'));
    } else if(path.toLocaleLowerCase() === '/contact') {
        response.writeHead(200, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in contact page'));
    } else if(path.toLocaleLowerCase() === '/products')  {
        let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
        response.writeHead(200, {'Content-Type' : 'text/html'}); //since we are sending json data therefore application/json
        response.end(productResponseHtml);
        // console.log(productHtmlArray.join(','));
        // fs.readFile('./Data/products.json', 'utf-8', (error, data) => {
        //     response.end(data);  
        // })
    }
        else {
        response.writeHead(404, {
            'Content-Type' : 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}','Error 404: Page not found'));
    }
    // response.end(path);
    // console.log('A new request received');
    // console.log(request);
});
// STEP 2: START THE SERVER
server.listen(8000,'127.0.0.1', ()=> {
    console.log('Server has started!');
})



