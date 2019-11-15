
export function deletesubject(req,id,callback) {
    var url = '/subjectdelete'
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();

    param.append('id', id);
    req.post(url, param, config).then(function(result) {
        callback(result.data);
                               
    }) 

}