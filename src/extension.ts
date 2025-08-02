import * as path from 'path'
import { ExtensionContext, workspace } from 'vscode'

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node'

let client: LanguageClient

export function activate(context: ExtensionContext) {
  console.log('Pseudo Language Extension is being activated!')

  // The server is implemented in node
  const serverModule = context.asAbsolutePath(path.join('out', 'language-server.js'))

  console.log('Server module path:', serverModule)

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
  }

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for pseudo documents
    documentSelector: [{ scheme: 'file', language: 'pseudo' }],
    synchronize: {
      // Notify the server about file changes to '.pseudo files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.pseudo'),
    },
  }

  // Create the language client and start the client.
  client = new LanguageClient('pseudoLanguageServer', 'Pseudo Language Server', serverOptions, clientOptions)

  // Start the client. This will also launch the server
  console.log('Starting Pseudo Language Server...')
  client.start()
  console.log('Pseudo Language Server started!')
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined
  }
  return client.stop()
}
