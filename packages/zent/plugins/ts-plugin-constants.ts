import * as ts from 'typescript';
import {
  CSS_ARROW_OFFSET_HORIZONTAL,
  CSS_ARROW_OFFSET_VERTICAL,
  CSS_ARROW_SIZE,
} from './css-compiler-constants';

type ConstantType = number | string | boolean;

/**
 * Define compiler constants here.
 *
 * Keys are variables names, these variables will be replaced by their value during compile.
 *
 * Value type must be correct, don't use a string for a number constant.
 */
const BuiltinConstants: Record<string, ConstantType> = {
  __ARROW_OFFSET_HORIZONTAL__: CSS_ARROW_OFFSET_HORIZONTAL + CSS_ARROW_SIZE / 2,
  __ARROW_OFFSET_VERTICAL__: CSS_ARROW_OFFSET_VERTICAL + CSS_ARROW_SIZE / 2,
};

export interface ITransformerOptions {}

export default function transformer(
  _program: ts.Program,
  _opts?: ITransformerOptions
) {
  function createVisitor(ctx: ts.TransformationContext) {
    const visitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isIdentifier(node)) {
        const { text: idName } = node;
        if (BuiltinConstants.hasOwnProperty(idName)) {
          const value = BuiltinConstants[idName];
          return ts.createLiteral(value);
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    };

    return visitor;
  }

  return (ctx: ts.TransformationContext) => {
    return (src: ts.SourceFile) => {
      return ts.visitNode(src, createVisitor(ctx));
    };
  };
}
