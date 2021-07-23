declare module '*.md' {
  const content: React.ComponentType<unknown>;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
