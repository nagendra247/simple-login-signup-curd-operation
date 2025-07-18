const http = require("http")
const fs = require("fs")

const server=http.createServer((req,res)=>{
    const {url,method}=req
    
    console.log(url)
    console.log(method)
    if(method=== "GET"){
        switch(url){
            case "/" :fs.readFile("./pages/home.html",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/about" :fs.readFile("./pages/about.html",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/home" :fs.readFile("./styles/home.css",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/about" :fs.readFile("./styles/about.css",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/signup" :fs.readFile("./pages/signup.html",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/login" :fs.readFile("./pages/login.html",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }
                return res.end(data);
            })
            break;
            case "/deleteAcc": fs.readFile("./pages/deleteAcc.html",(err,data)=>{
                if(err){
                    console.log("erroe found during file read");
                    return res.end("Internal server error");
                }return res.end(data);
            })
            break
            case '/upDateName': fs.readFile("./pages/upDateName.html",(err,data)=>{
                if(err){
                    console.log("error found during file read")
                    return res.end("server not loading")
                }return res.end(data)
            }) 
            break;
            case '/upDatePass': fs.readFile("./pages/upDatePass.html",(err,data)=>{
                if(err){
                    console.log("error found during file read")
                    return res.end("server not loading")
                }return res.end(data)
            }) 
            break;
            default : res.end("404 page not found")
        }
    }else if(method==="POST"){
        switch(url){
            case "/signup": req.on('data',(userData)=>{
                let user=JSON.parse(userData.toString())
                console.log(user) 
                fs.readFile('./user.json',"utf-8",(err,details)=>{
                    if(err){
                        console.log("error found during file read")
                        return res.end("server problem")
                    }
                    
                    let  detailsArr =JSON.parse(details.toString())
                    let isUSer =detailsArr.filter((detail)=> detail.mail ==user.mail) 
                        
                    if(isUSer.length >0){
                            // res.end({message:"user alredy exist"})
                            res.end(JSON.stringify({message:"user alredy exists"}))
                        }else{
                            detailsArr.push(user)
                            fs.writeFile('./user.json',JSON.stringify(detailsArr),(err)=>{
                                if(err){
                                    return res.end("error found during file write")
                                }else{
                                    return res.end(JSON.stringify({message:"user added"}))
                                }
                            })
                            
                    }
                    
                })
            })
            break;
            case "/login" : req.on('data',(userData)=>{
                let user=JSON.parse(userData.toString())
                console.log(user) 
                fs.readFile('./user.json',"utf-8",(err,details)=>{
                    if(err){
                        console.log("error found during file read");
                        return res.end("servr not loading")
                    }
                    let detailsArr =JSON.parse(details.toString())
                    let isUser=detailsArr.filter((detail)=>detail.email ==user.email && detail.pass==user.pass)
                    if(isUser.length >0){
                        return res.end(JSON.stringify({message:("Login sucessfully")}))
                    }else{
                        return res.end(JSON.stringify({message:("Login failed")}))
                    }

                })
            })
        }
    }else if(method ==="DELETE"){
        switch(url){
            case "/deleteAcc" :req.on("data",(userData)=>{
                let user=JSON.parse(userData.toString())
                console.log(user)
                fs.readFile('./user.json',"utf-8",(err,details)=>{
                    if(err){
                        console.log("erroe found during read file")
                        return res.end("server not loading")
                    }
                    let detailsArr= JSON.parse(details.toString())
                    let isUser= detailsArr.filter((detail,i)=> {
                        if(detail.email == user.email && detail.pass == user.pass){
                            detail.index=i;
                            return true
                        }else{
                            return false;
                        }
                    })
                    
                    
                    if(isUser===0){
                        return res.end(JSON.stringify({message:"user not found"}))
                    } 
                    const removeUser=detailsArr.splice(isUser[0].index,1)

                    fs.writeFile('./user.json',JSON.stringify(detailsArr),(err)=>{
                        if(err){
                            return res.end("error found during file write")
                        }else{
                            return res.end(JSON.stringify({message:"user deleted",email:removeUser[0].email}))
                        }
                    })
                })
            }) 
            break;
        }
    }else if(method==="PUT"){
        switch(url){
            case "/upDateName": req.on("data",(userData)=>{
                let user=JSON.parse(userData.toString())
                console.log(user)
                fs.readFile('./user.json',"utf-8",(err,details)=>{
                    if(err){
                        console.log("erroe found during read file")
                        return res.end("server not loading")
                    }
                    let detailsArr= JSON.parse(details.toString())
                    let isUserIndex=detailsArr.findIndex((detail,i)=>{
                        if(detail.email == user.email && detail.pass == user.pass){
                            detail.index=i;
                            return true
                        }else{
                            return false
                        }
                    })

                    if(isUserIndex === -1){
                        return res.end(JSON.stringify({message:"email and password not matched"}))
                    }
                    let preValue=detailsArr.splice(isUserIndex,1,user)[0]
                    // console.log(preValue)
                    fs.writeFile('./user.json',JSON.stringify(detailsArr),(err)=>{
                        if(err){
                            return res.end({message:"error found during read file"})
                        }else{
                            return res.end(JSON.stringify({message:"user update",usn:preValue.usn}))
                        }
                    })
                })
            })
            break;
            case '/upDatePass': req.on("data",(userData)=>{
                let user=JSON.parse(userData.toString())
                console.log(user)
                fs.readFile('./user.json','utf-8',(err,details)=>{
                    if(err){
                        console.log("erroe found during read file")
                        return res.end("server not loading")
                    }
                    
                    let detailsArr= JSON.parse(details.toString())
                    let isUserIndex=detailsArr.findIndex((detail)=>{
                        if(detail.email == user.email && detail.pass == user.pass){
                            return true
                        }else{
                            return false
                        }
                    })
                    if(isUserIndex === -1){
                        return res.end(JSON.stringify({message:"email and password not matched"}))
                    }
                        let previousPass=detailsArr[isUserIndex].pass;
                     detailsArr[isUserIndex].pass=user.newpass;
                    // console.log("Previous Password:", previousPass);
                    // console.log("New Password:", user.newPass);

                    fs.writeFile('./user.json',JSON.stringify(detailsArr),(err)=>{
                        if(err){
                            return res.end({message:"error found during read file"})
                        }else{
                            return res.end(JSON.stringify({ message: "Password updated successfully",
                                previousPass: previousPass,
                                newPass: user.newPass}))
                        }
                    })
                })
            })
            break;
        }

    }
})
server.listen(3000,()=>{
    console.log("server is running on port 3000")
    console.log("http://localhost:3000")
})