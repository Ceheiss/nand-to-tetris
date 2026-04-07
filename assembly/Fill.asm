// this covers the whole screen
@8192
D=A
@n
M=D

// set counter to 0
@i
M=0

// this is like while loop
(LOOPB)
  // if (i == n) go to END
  // D is loaded with the current i value
  @i
  D=M
  // check if i == n by checking if D == 0
  @n
  D=D-M
  @END
  D;JEQ

  // set D to the address of SCREEN
  @SCREEN
  D=A
  // set A to SCREEN base address plus counter (i)
  @i
  A=D+M
  // paint the word (16 bit) black
  M=-1

  // i++
  @i
  M=M+1

  @LOOPB
  0;JMP

// loop white
(LOOPW)
  // if (i == n) go to END
  @i
  D=M
  @n
  D=D-M
  @END
  D;JEQ

  @SCREEN
  D=A
  @i
  A=D+M
  // this sets the word to zero, so it's painted white
  M=0

  // i++
  @i
  M=M+1

  @LOOPW
  0;JMP

// after a full paint the infinite loop is reached
// this loop listens for keyboard events
(END)
  @END
    // we get keyboard value and assign it to D
    @KBD
    D=M
    // reset counter
    @i
    M=0
    // if keyboard value is zero paint white
    @LOOPW
    D;JEQ
    // else paint black
    @LOOPB
  0;JMP


