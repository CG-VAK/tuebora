declare module '*.json' {
    const value: any;
    export default value;
  }
  
  declare interface RequireContext {
    (path: string, recursive?: boolean, regExp?: RegExp): NodeRequire;
    keys(): string[];
  }
  
  declare const requireContext: RequireContext;