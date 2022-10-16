import { readFileSync, writeFileSync } from 'fs';
import minimist from 'minimist';
async function main() {
    const args = minimist(process.argv.slice(2));
    const { file: fileName, output: outputName } = args;
    const sentencesPerPara = 5;
    const file = readFileSync(`./subs/${fileName}`);
    let formatedFile = file.toString().replace(/\n/g, ' ');
    let copy = formatedFile;
    let charShift = 0;
    let sentenceCount = 0;
    const paragraphDelimiter = '\n\n';
    for (let i = 0; i < copy.length; i++) {
        const char = copy.charAt(i);
        const nextChar = copy.charAt(i + 1);
        if (char === '.' && nextChar == ' ')
            sentenceCount++;
        if (sentenceCount === 5) {
            formatedFile = formatedFile.slice(0, i + charShift + 1) +
                paragraphDelimiter +
                formatedFile.slice(i + 1 + charShift);
            charShift += 2;
            sentenceCount = 0;
        }
    }
    writeFileSync(`./output/${outputName}`, formatedFile);
}
main();
