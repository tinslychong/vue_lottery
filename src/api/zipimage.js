
export function zipimage(req,file,rate,callback) {
    var url = '/zipimage'
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();
    param.append('file', file);
    param.append('rate', rate);
    req.post(url, param, config).then(function(result) {
        callback(result.data);
                               
    }) 

}