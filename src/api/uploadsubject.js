
export function uploadsubject(req,str,id,name,diff,callback) {
    var url = '/subjectupload'
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();
    param.append('ret', str);
    param.append('id', id);
    param.append('name', name);
    param.append('diff', diff);
    req.post(url, param, config).then(function(result) {
        callback(result.data);
                               
    }) 

}