export type MatchEvaluator = (match: any) => string;
export declare function create(pattern: string, options?: number): RegExp;
export declare function escape(str: string): string;
export declare function unescape(str: string): string;
export declare function isMatch(reg: RegExp, input: string, startAt?: number): boolean;
export declare function match(reg: RegExp, input: string, startAt?: number): RegExpExecArray | null;
export declare function matches(reg: RegExp, input: string, startAt?: number): RegExpExecArray[];
export declare function options(reg: RegExp): number;
export declare function replace(reg: string | RegExp, input: string, replacement: string | MatchEvaluator, limit?: number, offset?: number): string;
export declare function split(reg: string | RegExp, input: string, limit?: number, offset?: number): string[];