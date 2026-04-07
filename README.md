# nand-to-tetris

This repository contains solutions to various projects in the [Nand to Tetris](https://www.nand2tetris.org/) course, which guides learners through building a computer system from first principles, starting from NAND gates all the way to a working computer.

## Project Structure

- **HalfAdder.hdl**: Hardware definition for a half adder, which computes the sum of two bits.
- **FullAdder.hdl**: Hardware definition for a full adder, which computes the sum of three bits.
- **Inc16.hdl**: 16-bit incrementer hardware definition, which adds 1 to a 16-bit value.
- **Mult.asm**: Hack assembly code to multiply two numbers found in `R0` and `R1`, with the result stored in `R2`.
- **Mult.tst / Mult.cmp**: Test and comparison files for testing the multiplication program.

## Running the Code

To test HDL chips:
1. Open the respective `.hdl` file in the [Hardware Simulator](https://www.nand2tetris.org/software) provided by the course.
2. Load and run the corresponding `.tst` script to verify correctness.

To run the assembly program:
1. Open `Mult.asm` in the [CPU Emulator](https://www.nand2tetris.org/software).
2. Load and run `Mult.tst` to execute the test script and compare outputs using `Mult.cmp`.

## Progress

This repository includes:
- Basic combinational logic elements (HalfAdder, FullAdder).
- Simple ALU-adjacent components (Inc16).
- An iterative multiplication routine written in Hack Assembly.

## Credits

This is a personal project following the [Nand to Tetris](https://www.nand2tetris.org/) curriculum.
