const pipe = (head: unknown, ...args: Array<CallableFunction>) =>
  args.reduce((acc, fn) => fn(acc), head);

export { pipe };
