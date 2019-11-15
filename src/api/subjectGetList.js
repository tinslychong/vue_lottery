
export function subjectGetList(req,callback) {
    var url = '/subjectgetlist'
    let config = {
        headers: {
                        'Content-Type': 'multipart/form-data',
                }
     };
    var param = new FormData();
    req.post(url, param, config).then(function(result) {
        callback(result.data);
                               
    }) 

}