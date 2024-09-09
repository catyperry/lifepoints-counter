export const Button = ({
  children,
  negative,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { negative?: boolean }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border bg-indigo-950 text-xl font-bold leading-none text-white ${negative ? 'border-rose-900' : 'border-indigo-800'} min-w-24 px-3 py-2`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export const IconButton = ({
  children,
  negative,
  auto,
  large,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { negative?: boolean; large?: boolean; auto?: boolean }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border bg-indigo-950 text-xl leading-none text-white ${negative ? 'border-rose-900' : 'border-indigo-800'} ${auto ? 'min-h-10 min-w-10 px-3 py-2' : large ? 'h-12 w-12' : 'h-10 w-10'}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};
