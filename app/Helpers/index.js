'use strict'

const crypto  = use('crypto')
const Helpers = use('Helpers')



/**
 * Generate random string
 *
 * @param { int } length - 0 tamanho da string que você quer gerar
 * @return { string } uma string randomica do tamanho do length
*/

const str_random = async (length = 40) => {
    let string = ''
    let len = string.length

    if (len < length) {
        let size = length - len
        let bytes = await crypto.randomBytes(size)
        let buffer = Buffer.from(bytes)

        string += buffer
            .toString('base64')
            .replace(/[^a-zA-Z0-9]/g, '')
            .substr(0, size)
    }
    return string
}

/**
 * Move a given file for the spcified path, if none is specified, move file to 'public/uploads' path.
 * @param {FileJar} file
 * @param {string} path
 */
 const manage_single_upload = async (file, path = null) => {
    path = path ? path : Helpers.publicPath('uploads')
    // gera um nome aleatório
    const random_name = await str_random(30)
    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

    // renomeia o arquivo e move para a pasta public/uploads
    await file.move(path, {
        name: filename
    })

    return file
}

/**
 * Move a given file list for the spcified path, if none is specified, move files to 'public/uploads' path.
 * @param {Filejar} fileJar
 * @param {string} path
 * @return { object }
 */
 const manage_multiple_uploads = async (fileJar, path = null) => {
    path = path ? path : Helpers.publicPath('uploads')
    let successes = []
    let errors = []

    await Promise.all(
        fileJar.files.map(async file => {
            let random_name = await str_random(30)
            let filename = `${new Date().getTime()}-${random_name}.${
                file.subtype
            }`
            await file.move(path, {
                name: filename
            })

            if (file.moved()) {
                successes.push(file)
            } else {
                errors.push(file.error())
            }
        })
    )
    return { successes, errors }
}



module.exports = {
    str_random,
    manage_single_upload,
    manage_multiple_uploads
}