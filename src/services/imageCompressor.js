var file = '', reader = '', result = '', canvas = '';


export const imageCompressor = async (e) => {
    file = ''; reader = ''; result = ''; canvas = '';
    return await new Promise((resolve, reject) => {

        try {
            // If There's no file choosen
            console.log(' e.target.files---------->', e.target.files)
            file = e.target.files[0]
            if (!file) return false

            let type = file.type
            let valid = type.indexOf("image") !== -1
            if (!valid) throw "File Type Is Not Supported. Upload an image instead";
            reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                _fileOnLoad().then((data) => {
                    console.log('data--------->', data)
                    resolve(data)
                }).catch((e) => {
                    reject(e)
                })
            };


        }
        catch (err) {
            console.log('error------------>', err)
            reject(err)

        }



    })
};



// Convert Base64 to Blob
const _toBlob = async (imgUrl) => {
    // console.log('imgUrl--------->', imgUrl)
    return `data:image/jpeg;base64,${imgUrl.split(',')[1]}`
}


// Convert Blob To File
const _buildFile = (blob, name) => {
    return new File([blob], name)
}

/*
  when the file in loaded
*/
const _fileOnLoad = async () => {
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
            result = fileinfo;
            // console.log('result.base64--------->',result.base64)
            // drawImage
            _drawImage(result.base64).then((data) => {
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
    console.log('imgUrl------------>', document.getElementById("canvas"))
    return await new Promise((resolve, reject) => {
        try {
            // Recreate Canvas Element

            if (document.getElementById("canvas")) {
                console.log('exist-------')
            }
            canvas = document.createElement('canvas');
            // Set Canvas Context

            let ctx = canvas.getContext('2d')
            // Create New Image
            let img = new Image()
            img.src = imgUrl;
            img.onload = function () {
                // Image Size After Scaling
            let scale = 100 / 100
            let width = img.width * scale
            let height = img.height * scale;
            console.log( 'old',img.width,img.width * scale)
            // Set Canvas Height And Width According to Image Size And Scale
            canvas.setAttribute('width', width)
            canvas.setAttribute('height', height);
            canvas.setAttribute('id', 'canvas');
            ctx.drawImage(img, 0, 0, width, height);
            // Quality Of Image
            // let quality = this.props.quality ? (75 / 100) : 1
            let quality = (75 / 100);
            // If all files have been proceed
            let base64 = canvas.toDataURL('image/jpeg', quality)
            console.log(canvas, '---------base64')
            let fileName = result.file.name
            let lastDot = fileName.lastIndexOf(".")
            fileName = fileName.substr(0, lastDot) + '.jpeg';

            let objToPass = {
                canvas: canvas,
                original: result,
                compressed: {
                    blob: _toBlob(base64),
                    base64: base64,
                    name: fileName,
                    file: _buildFile(base64, fileName)
                },
            };
            objToPass.compressed.size = Math.round(objToPass.compressed.file.size / 1000) + ' kB'
            objToPass.compressed.type = "image/jpeg";
            console.log('objToPass---------->', objToPass)
            // this.props.onDone(objToPass)
            // return objToPass
            resolve(objToPass)
            }
           
        } catch (err) {
            console.log('error------------>', err)
            reject(err)

        } finally {
            console.log('----------')
        }
    })
}