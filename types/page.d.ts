declare module 'next' {
  export type PageProps<P = {}, S = {}> = {
    params: P;
    searchParams: S;
  };
}
