const net = require("net");

class Request {
    //method, url = host + post + path
    //body : k:v
    //headers
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"
        }
        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
           this.bodyText = Object.keys(this.body).map(key => '${key}=${encodeURIComponent(this.body[key])}').join('&');
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString (){
        return '${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => '${key}: ${this.headers[key]}').join('\r\n')}\r
\r
${this.bodyText}'
    }

    send(connection){
        return new Promise((resolve, reject) =>{
            if(connection){
                connection.write(this.toString());
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                },()=>{
                    connection.write(this.toString())
                })
            }
            client.on('data',(data)=>{
                console.log(data.toString());
                client.end();
            })
            client.on('error',(data)=>{
                client.end();
            })
        })
    }
}

class Response {

}

class ResponseParse {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_VALUE = 3;
        this.WAITING_HEADER_LINE_END = 4;
        this.WAITING_HEADER_BLOCK_END = 5;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
    }
    receive(string){

    }
    receiveChar(char){

    }
}

const client = net.createConnection({
    host:'127.0.0.1',
    port:3000
},()=>{
    console.log('connect to server');

    let request = new Request({
        method:'POST',
        host:'127.0.0.1',
        port:'3000',
        path:'/',
        body:{
            name:'alley'
        }
    })

    console.log(request.toString())
    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Length: 20\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('\r\n');
    // client.write('field1=aaa&code=x%3D1\r\n');
});
