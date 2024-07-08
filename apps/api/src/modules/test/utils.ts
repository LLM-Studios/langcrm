const colors = {
    reset: "\x1b[0m",
    dim: "\x1b[2m",
    bg: {
        darkGreen: "\x1b[42m",
        darkRed: "\x1b[31m",
        darkGray: "\x1b[32m",
    },
  };
  
  
  function colorize(text: string, color: string): string {
    return `${color}${text}${colors.reset}`;
  }
  
  export function printResults(result: any): void {
    const { provider, vars, response, latencyMs, cost, gradingResult } = result;
    
    const extractedData = {
      provider,
      vars,
      response: { output: response?.output },
      latencyMs,
      cost,
      gradingResult: {
        pass: gradingResult?.pass,
        reason: gradingResult?.reason
      }
    };
  
    const stringified = JSON.stringify(extractedData, null, 2);
    
    // Determine background color based on gradingResult.pass
    const bgColor = gradingResult?.pass ? colors.bg.darkGreen : colors.bg.darkRed;
    
    // Print the result with appropriate background color
    console.log(colorize(stringified, bgColor + colors.dim));
  }