import * as ts from 'typescript';
const pkg: { version: string } = require('../package.json');

// keep it short, it bloats code
const VERSION_ATTRIBUTE_NAME = 'data-zv';

export interface IHtmlElementTransformerOptions {}

export default function htmlElementTransformer(
  _program: ts.Program,
  _opts?: IHtmlElementTransformerOptions
) {
  function createVisitor(ctx: ts.TransformationContext) {
    const visitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const { tagName } = node;
        if (ts.isIdentifier(tagName) && isNativeHtmlTag(tagName.text)) {
          const clone = ts.getMutableClone(node);
          clone.attributes = ts.createJsxAttributes(
            [].concat(
              node.attributes.properties,
              ts.createJsxAttribute(
                ts.createIdentifier(VERSION_ATTRIBUTE_NAME),
                ts.createStringLiteral(pkg.version)
              )
            )
          );
          return clone;
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

function isNativeHtmlTag(tagName: string): boolean {
  return tagName.toLowerCase() === tagName;
}
