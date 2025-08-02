import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    extension: 'src/extension.ts',
    'language-server': 'src/language-server.ts',
  },
  outDir: 'out',
  format: 'cjs',
  target: 'node16',
  external: ['vscode'],
  noExternal: ['vscode-languageclient', 'vscode-languageserver', 'vscode-languageserver-textdocument'],
  bundle: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
})
