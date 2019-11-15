
export function weiboimg(req,type,value,callback) {
    var url = '/weiboimg'
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();
    param.append('type', type);
    param.append('value', value);
    req.post(url, param, config).then(function(result) {
        callback(result.data);
                               
    }) 

}