
export function nicknameToContainerId(req,nickname,callback) {
    var  url = "weibo_api/n/" + nickname;
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();
    req.post(url, param, config).then(function(result) {
        console.log("aaaa")
        callback(result.data);
                               
    }) 

}