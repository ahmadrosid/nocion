export const readImage = async (file) => {
    return new Promise((resolve, reject) => {
        if (!file.type) {
            reject('Error: file.type not supported in this browser')
        }
    
        if (!file.type.match("image.*")) {
            reject('Error: Selected file is not image.')
        }
    
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", result => {
            resolve(result.target.result)
        })
    })
}