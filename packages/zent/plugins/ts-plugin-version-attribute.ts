import * as ts from 'typescript';
import * as pkg from '../package.json';

// keep it short, it bloats code
const VERSION_ATTRIBUTE_NAME = 'data-zv';

export default function htmlElementTransformer(_program: ts.Program) {
  function createVisitor(ctx: ts.TransformationContext) {
    const visitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const { tagName } = node;
        if (ts.isIdentifier(tagName) && isNativeHtmlTag(tagName.text)) {
          const attributes = ts.factory.createJsxAttributes(
            ([] as ts.JsxAttributeLike[]).concat(
              node.attributes.properties,
              ts.factory.createJsxAttribute(
                ts.factory.createIdentifier(VERSION_ATTRIBUTE_NAME),
                ts.factory.createStringLiteral(pkg.version)
              )
            )
          );

          if (ts.isJsxOpeningElement(node)) {
            return ts.factory.updateJsxOpeningElement(
              node,
              node.tagName,
              node.typeArguments,
              attributes
            );
          } else if (ts.isJsxSelfClosingElement(node)) {
            return ts.factory.updateJsxSelfClosingElement(
              node,
              node.tagName,
              node.typeArguments,
              attributes
            );
          }
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
