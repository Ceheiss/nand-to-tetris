// initiate accumulator value
@R2
M=0

// early exit if any of the numbers is zero
@R0
D=M
@END
D;JEQ

@R1
D=M
@END
D;JEQ

// initialize counter variable with value from R1
@counter
M=D

(LOOP)
  // load first number
  @R0
  D=M
  // update accumulated value (its value plus the one from R0)
  @R2
  M=D+M
  // load counter value to D
  @counter
  D=M
  // subtract one from counter
  @1
  D=D-A
  // set counter to updated value
  @counter
  M=D
  // if counter > 0, continue the loop
  @LOOP
  D;JGT

// infinite loop when finished
(END)
  @END
  0;JMP
