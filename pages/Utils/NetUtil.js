export  default  class NetUtil{
    static get(url){
       /* return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json)
                .then(result=>{
                    resolve(result)
                })
                .catch(error=>{
                    reject(error)
                });
        })*/


        return new Promise((resolve, reject)=> {

                fetch(url)
                    .then((response)=>response.json())
                    .catch((error)=> {
                        reject(error);
                    }).then((responseData)=> {
                        resolve(responseData);
                })
        })

    }


    static post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                        method:'POST',
                        header:{
                            'Accept':'application/json',
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify(data)
                        })
                .then(result=>{
                    resolve(result)
                })
                .catch(error=>{
                    reject(error)
                });
        })
    }

}