Baseline started from this example: https://daily.dev/blog/build-a-chat-app-using-grpc-and-reactjs#build-the-ui

## Start the app
`yarn start:server`
## Start the api
`yarn start:server`
## Start Envoy
`docker build -t grpc-expo .`

### Why is this needed
Browsers have to connect to gRPC services via a special proxy. This proxy is a process that can send HTTP/2 calls. So we send an HTTP 1.1 call to the proxy from the browser, the proxy gets it and calls the gRPC server via HTTP/2 sending the request URL and parameters with it. Then, it receives a response from the gRPC server via HTTP/2, the response is now sent to the client via HTTP 1.1 by the proxy. The ideal proxy process for this is Envoy.

* browser call ChatService methods on port 8080 via HTTP 1.1.
* Docker running on 9091 receives the call and makes HTTP/2 call to gRPC running on 9090 passing the URL address and request params.
* gRPC server sends a response to the Envoy via HTTP/2 on 9091, Envoy sends the response to the browser client via HTTP 1.1 on port 3000.

## Generate protoc files (chat_grpc_web_pb, chat_pb)

```md
brew install protobuf
brew install protoc-gen-grpc-web

protoc -I=. packages/app/chat.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```