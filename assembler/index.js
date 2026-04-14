const fs = require('node:fs/promises');

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

// pad the value with zeros to make it 16 bits
const addFullBits = (value) => {
  const extraZeros = 16 - value.length;
  for (let i = 0; i < extraZeros; i++) {
    value = '0' + value;
  }
  return value;
}

async function parser() {
  try {
    // read file and remove comments and empty lines
    const data = await fs.readFile('./test-files/Add.asm', { encoding: 'utf8' });
    const lines = data.split('\n')
    .filter(line => line.trim() !== '')
    .filter(line => !line.startsWith('//'))
    .filter(line => !line.startsWith('/*'))
    .filter(line => !line.startsWith('*'))
    .map(line => {
      const [instruction, ...args] = line.split(' ');
      return instruction;
    });
    console.log("lines", lines);
    // handle A instructions
    const aInstructions = lines.map(line => {
      if (line.startsWith('@')) {
        const instructionValue = line.slice(1);
        if (!Number.isNaN(instructionValue)) {
          console.log("instructionValue toasty", instructionValue);
          return addFullBits(Number(instructionValue).toString(2));
        }
      } else {
        return line;
      }
    });
    console.log("aInstructions", aInstructions);
  } catch (err) {
    console.error(err);
  }
}
parser();