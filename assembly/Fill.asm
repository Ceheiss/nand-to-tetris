@8192
D=A
@n
M=D

@i
M=0

(LOOP)
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
  M=-1

  // i++
  @i
  M=M+1

  @LOOP
  0;JMP


// infinite loop when finished
(END)
  @END
  0;JMP
