var onlineuserarray = []


module.exports = function (io) {

    io.on("connection", (socket) => {
        console.log(("new user connected"));
        socket.on("addnewuserphonenumber",(newuserphonenumber)=>{
            var newuser = {
            user: {
                userid: socket.id,
                userphonenumber: newuserphonenumber
            }          
            }
            onlineuserarray.push(newuser)
            console.log(onlineuserarray);

            if(onlineuserarray.length % 2 != 0 || onlineuserarray.length == 0){
                console.log("all user wating to be called " + onlineuserarray[0].user.userphonenumber);
                io.to(socket.id).emit("youhavetowait")
            }
            if(onlineuserarray.length % 2 == 0){
                var randomphonenumbertobecalled = onlineuserarray[0].user.userphonenumber
                console.log("uesr to be called " + randomphonenumbertobecalled);
                io.to(socket.id).emit("callthisuser",randomphonenumbertobecalled)
                onlineuserarray = []
                console.log("final array "+ onlineuserarray +  onlineuserarray.length);
            }            
        })

        socket.on("disconnect",()=>{
            console.log("disconnect");
        })
    })
}



