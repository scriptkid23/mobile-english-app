export function getFilename(filename){
    const req = /([\w|\s|-])*\.(?:jpg|gif|png)/g;
    return req.exec(filename)[0]
}
