import base64toblob from 'base64toblob';


export const imageCompressor = async (image) => {
    // file = '';  result = '';
    return await new Promise((resolve, reject) => {

        try {
            let compressedImages = []
            // If There's no file choosen
            Array.from(image).forEach(async file => {
                if (!file) return false
                let type = file.type
                let valid = type.indexOf("image") !== -1
                if (!valid) throw "File Type Is Not Supported. Upload an image instead";
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _fileOnLoad(file, reader).then((data) => {
                        compressedImages.push(data);
                        if (compressedImages.length === Array.from(image).length) {
                            console.log('compressedImages----------->', compressedImages)
                            resolve(compressedImages)
                        }
                        // 
                    }).catch((e) => {
                        reject(e)
                    })
                };

                

            })

        }
        catch (err) {
            console.log('error------------>', err)
            reject(err)

        }



    })
};



// Convert Base64 to Blob
const _toBlob = async (imgUrl) => {
    let blob = base64toblob(imgUrl.split(',')[1], "image/jpeg")
    let url = window.URL.createObjectURL(blob)
    return url
    // return `data:image/jpg;base64,${imgUrl.split(',')[1]}`
}

// Convert Blob To File
const _buildFile = (blob, name) => {
    return new File([blob], name, {type: "image/jpeg"})
}

/*
  when the file in loaded
*/
const _fileOnLoad = async (file, reader) => {
    return await new Promise((resolve, reject) => {
        try {
            // the file
            // make a fileinfo object
            let fileinfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kb',
                base64: reader.result,
                file: file
            }
            let result = fileinfo;
            // console.log('result-------------->', result)
            _drawImage(result).then((data) => {
                resolve(data)
            }).catch((e) => {
                reject(e)
            })

        } catch (err) {
            console.log('error------------>', err)
            reject(err)

        }




    })

}


/*
    Draw And Compress The Image
    @params {String} imgUrl
  */
const _drawImage = async (imgUrl, rerender) => {
    return await new Promise((resolve, reject) => {
        try {
            // Recreate Canvas Element
            let canvas = document.createElement('canvas');
            // Set Canvas Context

            let ctx = canvas.getContext('2d')
            // Create New Image
            let img = new Image()
            img.src = imgUrl?.base64;
            img.onload = function () {
                // Image Size After Scaling
                let scale = 100 / 100
                let width = img.width * scale
                let height = img.height * scale;
                // Set Canvas Height And Width According to Image Size And Scale
                canvas.setAttribute('width', width)
                canvas.setAttribute('height', height);
                canvas.setAttribute('id', Math.floor(100000 + Math.random() * 900000));
                ctx.drawImage(img, 0, 0, width, height);
                // Quality Of Image
                // let quality = this.props.quality ? (75 / 100) : 1
                let quality = (75 / 100);
                // If all files have been proceed
                let base64 = canvas.toDataURL('image/jpeg', quality)
                let fileName = imgUrl.file.name
                let lastDot = fileName.lastIndexOf(".")
                fileName = fileName.substr(0, lastDot) + '.jpeg';

                let objToPass = {
                    canvas: canvas,
                    original: imgUrl,
                    compressed: {
                        blob: _toBlob(base64),
                        base64: base64,
                        name: fileName,
                        file: _buildFile(base64, fileName)
                    },
                };
                objToPass.compressed.size = Math.round(objToPass.compressed.file.size / 1000) + ' kB'
                objToPass.compressed.type = "image/jpeg";

                // this.props.onDone(objToPass)
                // return objToPass
                resolve(objToPass)
            }

        } catch (err) {
            console.log('error------------>', err)
            reject(err)

        }
    })
}