import * as path from 'path';
import * as fs from 'fs';
import { parse, ParserOptions } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import * as glob from 'glob';
import * as config from '../../config';

class Checked {

  constructor() {
    this.redefinePath();
    this.redefineSuffixKey();
  }
  private path: string = '';
  private suffix_key: string = 'LOCALE_DEFAULT_SUFFIX';
  protected index = 0;

  private redefinePath() {
    /** 如果没有配置扫描路径默认设置为src(相对于执行脚本的相对路径) 如果设置根据设置的来 */ 
    this.path = path.resolve(process.cwd(), !!config?.path ? config.path : './src');
  }

  private redefineSuffixKey() {
    if (config?.suffix_locale_key) {
      this.suffix_key = config?.suffix_locale_key;
    }
  }

  protected createAstByCode(
    code: string,
    opt?: ParserOptions
  ): {
    ast: t.File,
    code: string
  } {
    return {
      ast: parse(code, opt),
      code: code
    };
  }

  protected readeFileReturnString (fileName: string): string {
    const code = fs.readFileSync(fileName);
    return code.toString();
  }

  protected detectChinese(text: string) {
    return /[\u4e00-\u9fa5]/.test(text);
  }

  public checked() {
    const exclude = config.exclude ?? [];
    exclude.push('locale');
    glob(`${this.path}/**/*.{js,jsx,ts,tsx,d.ts}`, {ignore: exclude.map(pattern=>`${path}/${pattern}`)}, (errors, files) => {
      if (errors) {
        throw errors;
      }
      const localTextMap = new Map();
      files.forEach((fileName) => {
        if (
          fileName.indexOf('.test') !== -1 ||
          fileName.indexOf('.stories') !== -1
        ) {
          return;
        }
        if (fileName.indexOf(`/locale/`) !== -1) {
          return;
        }
        const code = this.readeFileReturnString(fileName);
        if (this.detectChinese(code.toString())) {
          const localObjects: string[] = [];
          const ast = this.createAstByCode(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx', 'dynamicImport', 'optionalChaining', 'nullishCoalescingOperator', 'classProperties']
          }).ast;
          this.checkAst(ast, localObjects);
          if (localObjects.length > 0) {
            localTextMap.set(fileName, localObjects);
          }
        }
      });
      if (localTextMap.size > 0) {
          localTextMap.forEach((value, key) => {
              console.log(`${key}\n`);
              value.forEach((e) => {
                console.log(`${e}\n`);
              })
          })
      }
    });
  }

  

  

  protected checkAst(
    ast: t.File,
    localObjects: string[],
  ) {
    traverse(ast, {
      StringLiteral: (path) => {
        const ignoreText = config.ignoreText ?? [];
        if (this.detectChinese(path.node.value) && ignoreText.indexOf(path.node.value) === -1) {
            localObjects.push(`line ${path.node.loc.start.line} [${path.node.loc.start.column}-${path.node.loc.start.column}]  is chinese`);
        }
      },
      TemplateLiteral: (path) => {
        const ignoreText = config.ignoreText ?? [];
        const isZh = path.node.quasis.some(e => (this.detectChinese(e.value.raw) && ignoreText.indexOf(e.value.raw) === -1));
        if (isZh) {
            localObjects.push(`line ${path.node.loc.start.line} [${path.node.loc.start.column}-${path.node.loc.start.column}]  is chinese`);
        }
      },
      JSXText: (path) => {
        const ignoreText = config.ignoreText ?? [];
        if (this.detectChinese(path.node.value) && ignoreText.indexOf(path.node.value) === -1) {
            localObjects.push(`line ${path.node.loc.start.line} [${path.node.loc.start.column}-${path.node.loc.start.column}]  is chinese`);
        }
      }
    });
  }
  
}

export default new Checked();
