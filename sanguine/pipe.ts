const pipe = (args) => args.reduce((acc, fn) => fn(acc));

export { pipe };
