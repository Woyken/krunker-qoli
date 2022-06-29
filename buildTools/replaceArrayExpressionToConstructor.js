// Copied and modified from @rollup/plugin-inject
// https://github.com/rollup/plugins/tree/master/packages/inject
import { sep } from 'path';
import { walk } from 'estree-walker';
import MagicString from 'magic-string';

export default function replaceArrayExpressionToConstructor() {
    const firstpass = /(?:\[)/g;
    const sourceMap = true;

    return {
        name: 'replace-array-expression-to-constructor',

        transform(code, id) {
            if (code.search(firstpass) === -1) return null;

            if (sep !== '/') id = id.split(sep).join('/'); // eslint-disable-line no-param-reassign

            let ast = null;
            try {
                ast = this.parse(code);
            } catch (err) {
                this.warn({
                    code: 'PARSE_ERROR',
                    message: `rollup-plugin-inject: failed to parse ${id}. TODO add restricting the plugin to particular files via options.include`,
                });
            }
            if (!ast) {
                return null;
            }

            const magicString = new MagicString(code);

            let replacedArrayCounter = 0;
            function handleArray(node) {
                node.elements.forEach((el) => {
                    // eslint-disable-next-line no-use-before-define
                    searchForArray(el);
                });
                magicString.overwrite(node.start, node.start + 1, '(new Array(', {
                    storeName: true,
                });
                magicString.overwrite(node.end - 1, node.end, '))', {
                    storeName: true,
                });
                replacedArrayCounter += 1;
            }

            function searchForArray(node) {
                if (!node) return;

                if (node.type === 'ArrayExpression') handleArray(node);

                if (['LogicalExpression', 'BinaryExpression', 'AssignmentExpression'].includes(node.type)) {
                    [node.left, node.right].forEach(searchForArray);
                }
                if (['CallExpression'].includes(node.type)) {
                    node.arguments.forEach(searchForArray);
                }
                if (['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type)) {
                    [node.body, ...node.params].forEach(searchForArray);
                }
                if (['AssignmentPattern'].includes(node.type)) {
                    searchForArray(node.right);
                }
                if (['BlockStatement'].includes(node.type)) {
                    node.body.forEach(searchForArray);
                }
                if (['ExpressionStatement'].includes(node.type)) {
                    searchForArray(node.expression);
                }
                if (['ConditionalExpression'].includes(node.type)) {
                    [node.test, node.consequent, node.alternate].forEach(searchForArray);
                }
            }
            walk(ast, {
                enter(node, parent) {
                    if (sourceMap) {
                        magicString.addSourcemapLocation(node.start);
                        magicString.addSourcemapLocation(node.end);
                    }

                    if (node.type === 'ArrayExpression') {
                        handleArray(node);
                        this.skip();
                    }
                },
            });

            if (replacedArrayCounter === 0) {
                return {
                    code,
                    ast,
                    map: sourceMap ? magicString.generateMap({ hires: true }) : null,
                };
            }

            return {
                code: magicString.toString(),
                map: sourceMap ? magicString.generateMap({ hires: true }) : null,
            };
        },
    };
}
