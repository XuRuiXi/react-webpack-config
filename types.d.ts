declare module '*.less' {
  const less: { readonly [key: string]: string };
  export default less;
}

declare module '*.css';
declare module '*.png';
declare module '*.jpg';

declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
