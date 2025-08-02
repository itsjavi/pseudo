import {
  CompletionItem,
  CompletionItemKind,
  createConnection,
  Diagnostic,
  DiagnosticSeverity,
  DidChangeConfigurationNotification,
  InitializeParams,
  InitializeResult,
  ProposedFeatures,
  TextDocumentPositionParams,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { TextDocument } from 'vscode-languageserver-textdocument'

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all)

// Create a simple text document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument)

let hasConfigurationCapability = false
let hasWorkspaceFolderCapability = false
let hasDiagnosticRelatedInformationCapability = false

// Pseudo language keywords and their types
const KEYWORDS = {
  declarations: [
    'app',
    'domain',
    'feature',
    'model',
    'component',
    'page',
    'request',
    'response',
    'route',
    'auth',
    'guard',
    'form',
    'service',
    'repository',
    'config',
    'event',
    'state',
  ],
  types: ['string', 'number', 'boolean', 'date', 'email', 'url', 'uuid', 'array', 'object'],
  modifiers: ['required', 'optional', 'unique', 'indexed', 'default'],
  actions: [
    'create',
    'update',
    'delete',
    'query',
    'list',
    'show',
    'hide',
    'toggle',
    'validate',
    'redirect',
    'authenticate',
    'authorize',
    'transform',
    'filter',
    'sort',
    'paginate',
  ],
  control: ['if', 'else', 'when', 'for each', 'try', 'catch', 'return'],
  properties: [
    'path',
    'guard',
    'description',
    'language',
    'framework',
    'database',
    'styling',
    'components',
    'authentication',
  ],
}

connection.onInitialize((params: InitializeParams) => {
  const capabilities = params.capabilities

  hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration)
  hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders)
  hasDiagnosticRelatedInformationCapability = !!(
    capabilities.textDocument &&
    capabilities.textDocument.publishDiagnostics &&
    capabilities.textDocument.publishDiagnostics.relatedInformation
  )

  const result: InitializeResult = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: true,
        triggerCharacters: [' ', ':', '"'],
      },
    },
  }

  if (hasWorkspaceFolderCapability) {
    result.capabilities.workspace = {
      workspaceFolders: {
        supported: true,
      },
    }
  }
  return result
})

connection.onInitialized(() => {
  connection.console.log('Pseudo Language Server initialized successfully!')

  if (hasConfigurationCapability) {
    connection.client.register(DidChangeConfigurationNotification.type, undefined)
  }
  if (hasWorkspaceFolderCapability) {
    connection.workspace.onDidChangeWorkspaceFolders((_event) => {
      connection.console.log('Workspace folder change event received.')
    })
  }
})

// Completion provider
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
  connection.console.log('Completion requested at position: ' + JSON.stringify(_textDocumentPosition.position))

  const document = documents.get(_textDocumentPosition.textDocument.uri)
  if (!document) {
    connection.console.log('No document found for completion')
    return []
  }

  const text = document.getText()
  const position = _textDocumentPosition.position
  const lineText = text.split('\n')[position.line]
  const beforeCursor = lineText.substring(0, position.character)

  // Context-aware completions
  const completions: CompletionItem[] = []

  connection.console.log('Line text: "' + lineText + '"')
  connection.console.log('Before cursor: "' + beforeCursor + '"')

  // If we're at the start of a line, suggest declarations
  if (/^\s*$/.test(beforeCursor)) {
    connection.console.log('Suggesting declarations')
    KEYWORDS.declarations.forEach((keyword) => {
      completions.push({
        label: keyword,
        kind: CompletionItemKind.Keyword,
        detail: `${keyword} declaration`,
        insertText: keyword === 'app' ? `${keyword} "\${1:ProjectName}":` : `${keyword} "\${1:Name}":`,
        insertTextFormat: 2, // Snippet format
      })
    })
  }

  // If we're after a colon, suggest properties or actions
  if (/:\s*$/.test(beforeCursor)) {
    KEYWORDS.properties.forEach((prop) => {
      completions.push({
        label: prop,
        kind: CompletionItemKind.Property,
        detail: `${prop} property`,
      })
    })

    KEYWORDS.actions.forEach((action) => {
      completions.push({
        label: action,
        kind: CompletionItemKind.Method,
        detail: `${action} action`,
      })
    })
  }

  // If we're typing a type, suggest types
  if (/:\s*\w*$/.test(beforeCursor)) {
    KEYWORDS.types.forEach((type) => {
      completions.push({
        label: type,
        kind: CompletionItemKind.TypeParameter,
        detail: `${type} type`,
      })
    })
  }

  // Always include modifiers
  KEYWORDS.modifiers.forEach((modifier) => {
    completions.push({
      label: modifier,
      kind: CompletionItemKind.Keyword,
      detail: `${modifier} modifier`,
    })
  })

  connection.console.log('Returning ' + completions.length + ' completions')
  return completions
})

// Completion resolve provider
connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
  connection.console.log('Completion resolve requested for: ' + item.label)

  // Add more detailed information to the completion item
  if (item.kind === CompletionItemKind.Keyword) {
    item.documentation = `${item.label} - A pseudolang keyword`
  }

  return item
})

// Validation
async function validateTextDocument(textDocument: TextDocument): Promise<void> {
  const text = textDocument.getText()
  const pattern = /\b[A-Z]{2,}\b/g
  let m: RegExpExecArray | null

  const problems = 0
  const diagnostics: Diagnostic[] = []

  // Basic validation - check for proper declaration syntax
  const lines = text.split('\n')
  lines.forEach((line, lineNumber) => {
    // Check for invalid declaration syntax
    const declarationMatch = line.match(
      /^\s*(app|domain|feature|model|component|page|request|response|route|auth|guard|form|service|repository|config|event|state)\s+([^:]+):\s*$/,
    )
    if (declarationMatch) {
      const [, keyword, name] = declarationMatch

      // Check if multi-word names are quoted
      if (name.includes(' ') && !name.startsWith('"')) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: {
            start: { line: lineNumber, character: line.indexOf(name) },
            end: {
              line: lineNumber,
              character: line.indexOf(name) + name.length,
            },
          },
          message: `Multi-word ${keyword} names should be quoted: "${name}"`,
          source: 'pseudo-lang',
        })
      }
    }
  })

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
}

documents.onDidChangeContent((change) => {
  validateTextDocument(change.document)
})

// Make the text document manager listen on the connection
documents.listen(connection)

// Listen on the connection
connection.listen()
