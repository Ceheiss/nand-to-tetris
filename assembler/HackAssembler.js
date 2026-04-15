const fs = require('node:fs/promises');

const fileName = process.argv[2];

const symbolTable = {
  'R0': 0,
  'R1': 1,
  'R2': 2,
  'R3': 3,
  'R4': 4,
  'R5': 5,
  'R6': 6,
  'R7': 7,
  'R8': 8,
  'R9': 9,
  'R10': 10,
  'R11': 11,
  'R12': 12,
  'R13': 13,
  'R14': 14,
  'R15': 15,
  'SCREEN': 16384,
  'KBD': 24576,
  'SP': 0,
  'LCL': 1,
  'ARG': 2,
  'THIS': 3,
  'THAT': 4,
};

const compTable = {
  '0': '0101010',
  '1': '0111111',
  '-1': '0111010',
  'D': '0001100',
  'A': '0110000',
  '!D': '0001101',
  '!A': '0110001',
  '-D': '0001111',
  '-A': '0110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'D+A': '0000010',
  'D-A': '0010011',
  'A-D': '0000111',
  'D&A': '0000000',
  'D|A': '0010101',
  'M': '1110000',
  '!M': '1110001',
  '-M': '1110011',
  'M+1': '1110111',
  'M-1': '1110010',
  'D+M': '1000010',
  'D-M': '1010011',
  'M-D': '1000111',
  'D&M': '1000000',
  'D|M': '1010101',
}

const destTable = {
  '': '000',
  'M': '001',
  'D': '010',
  'MD': '011',
  'A': '100',
  'AM': '101',
  'AD': '110',
  'AMD': '111',
}

const jumpTable = {
  '': '000',
  'JGT': '001',
  'JEQ': '010',
  'JGE': '011',
  'JLT': '100',
  'JNE': '101',
  'JLE': '110',
  'JMP': '111',
}

// pad the value with zeros to make it 16 bits
const addFullBits = (value) => {
  const extraZeros = 16 - value.length;
  for (let i = 0; i < extraZeros; i++) {
    value = '0' + value;
  }
  return value;
}

const cleanLines = (data) => {
  return data.split('\n')
    .map(line => line.trim())
    .filter(line => line.trim() !== '')
    .filter(line => !line.startsWith('//'))
    .filter(line => !line.startsWith('/*'))
    .filter(line => !line.startsWith('*'))
    .map(line => {
      const [instruction, ...args] = line.split(' ');
      return instruction;
    });
}

const extractLabels = (lines) => {
  // need to keep track of the instruction counter to add to the symbol table
  let instructionCounter = 0;
  return lines.map(line => {
    if (line.startsWith('(')) {
      const symbol = line.split('(')[1].split(')')[0];
      symbolTable[symbol] = instructionCounter;
    } else {
      instructionCounter++;
      return line;
    }
  })
  .filter(line => line !== undefined);
}

const translateAInstructions = (labeledLines) => {
  // need to keep track of the memory counter to add to the symbol table
  let memoryCounter = 16;
  return labeledLines.map((line) => {
    if (line.startsWith('@')) {
      const instructionValue = line.slice(1);
      // run if value is a number
      if (!isNaN(Number(instructionValue))) {
        return addFullBits(Number(instructionValue).toString(2));
      } else {
        // if not a number, its a symbol
        // check if symbol is in symbol table
        if (symbolTable.hasOwnProperty(instructionValue)) {
          // if it is, return the value
          return addFullBits(symbolTable[instructionValue].toString(2));
        } else {
          // if not, add it to symbol table
          symbolTable[instructionValue] = memoryCounter;
          memoryCounter++;
          return addFullBits(symbolTable[instructionValue].toString(2));
        }
      }
    } else {
      return line;
    }
  });
}

const translateCInstructions = (aInstructions) => {
  return aInstructions.map((line) => {
    // regex to check if line is a c instruction
    if (/^.+=.+$/.test(line)) {
      // get destination and computation values
      const [dest, comp] = line.split('=');
      // get comp and jump values
      let [compValue, jumpValue] = comp.split(';');
      // if jump value is not present, set it to empty string
      jumpValue = jumpValue ? jumpValue : '';
      // return the c instruction
      return `111${compTable[compValue]}${destTable[dest]}${jumpTable[jumpValue]}`;
      // if instruction is just a jump
      } else if (/^.+;.+$/.test(line)) {
      // get comp and jump values
      let [compValue, jumpValue] = line.split(';');
      // if jump value is not present, set it to empty string
      jumpValue = jumpValue ? jumpValue : '';
      // return the c instruction
      return `111${compTable[compValue]}${destTable['']}${jumpTable[jumpValue]}`;
    } else {
      return line;
    }
  });
}


async function parser() {
  try {
    // read file and remove comments and empty lines
    const data = await fs.readFile(`./test-files/${fileName}.asm`, { encoding: 'utf8' });
    const lines = cleanLines(data);
    const labeledLines = extractLabels(lines);
    const aInstructions = translateAInstructions(labeledLines);
    const translatedInstructions = translateCInstructions(aInstructions);
    // write the instructions to a file
    await fs.writeFile(`./test-files/${fileName}.hack`, translatedInstructions.join('\n'));
  } catch (err) {
    console.error(err);
  }
}
parser();