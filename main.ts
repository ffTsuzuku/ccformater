import {
    readFileSync,
    writeFileSync
} from 'fs'

import minimist from 'minimist'

async function main() {
    const punctuations = ['.', '!', '?']

    const args = minimist(process.argv.slice(2))
    const {
        file: fileName = generateRandomName(),
        output: outputName = fileName
    } = args
    
    console.log(`Reading sub file from: ./subs/${fileName}`)
    const sentencesPerPara = 5
    const file = readFileSync(`./subs/${fileName}`)
    let formatedFile = file.toString().replace(/\n/g, ' ')
    let copy = formatedFile
    
    let charShift = 0
    let sentenceCount = 0;
    const paragraphDelimiter = '\n\n'
    for (let i = 0; i < copy.length; i++) {
        const char = copy.charAt(i)
        const nextChar = copy.charAt(i + 1)

        if (punctuations.includes(char) && nextChar == ' ' ) sentenceCount++

        if (sentenceCount === 5) {
            formatedFile = formatedFile.slice(0, i + charShift + 1) + 
                paragraphDelimiter +
                formatedFile.slice(i + 1 + charShift)
            
            charShift += 2
            sentenceCount = 0
        }
    }
    console.log(`Formated File Saved to: ./output/${fileName}`)
    writeFileSync(`./output/${outputName}`, formatedFile)
}

function generateRandomName(length = 12): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}
main()