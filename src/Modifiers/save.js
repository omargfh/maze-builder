import { saveAs } from 'file-saver';

const saveToFile = (string, filename) => {
    var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `${filename}.mz`)
}

const save = (maze, size, scale, filename) => {

    let file = JSON.stringify({filename: filename, scale: scale, size: size, maze: maze})
    saveToFile(file, filename)
    
}

export default save

