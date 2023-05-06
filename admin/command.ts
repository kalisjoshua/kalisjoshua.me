const decoder = new TextDecoder("utf-8");

function command(bin: string, input = "") {
  console.log(`\n$ ${bin} ${input}\n`);

  const cmd = new Deno.Command(bin, { args: input.split(" ") });
  const { stderr, stdout } = cmd.outputSync();

  if (stderr.length) {
    throw new Error(decoder.decode(stderr));
  }

  return decoder.decode(stdout);
}

function deno(input: string) {
  return command(Deno.execPath(), input);
}

export { command, deno };
