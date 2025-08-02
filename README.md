# Pseudo Language

A VS Code extension for the **Pseudo language** - a natural, human-readable language designed for humans and AI agents
to generate fullstack TypeScript/JavaScript applications.

## Quick Start

```pseudo
app "MyApp":
  language: typescript
  framework: react-router-7
  database: prisma

domain "User Management":
  model User:
    email: string required unique
    username: string required

  feature "User Registration":
    page "Sign Up":
      path: "/signup"
      show: registration form
      when user submits:
        create user account
        redirect: "/welcome"
```

## Features

- ✨ **Syntax Highlighting** - Full highlighting in `.pseudo` files and markdown code blocks
- 🚀 **IntelliSense** - Auto-completion for keywords, types, and patterns
- 📝 **Code Snippets** - Rapid development with pre-built templates
- 🔧 **Smart Formatting** - Automatic indentation and code folding

## Documentation

- **[📖 Language Specification](SPEC.md)** - Complete syntax guide and examples
- **[🤖 AI Generation Guide](llms.txt)** - How AI agents should interpret and generate code
- **[🏗️ Examples](examples/)** - Sample applications showcasing language features

## Core Concepts

The Pseudo language organizes applications around **domains** and **features**:

- **Domains** - Business capabilities (User Management, Content, Analytics)
- **Features** - Complete user workflows (Registration, Publishing, Reporting)
- **Declarations** - `model`, `page`, `component`, `route`, `service`, `auth`, etc.
- **Actions** - `create`, `update`, `show`, `redirect`, `validate`, etc.

## Installation

1. Install from VS Code marketplace
2. Open any `.pseudo` file
3. Use `Ctrl+Space` for IntelliSense
4. Add pseudo code blocks to markdown with ````pseudo`

Perfect for product owners, designers, and AI-powered development workflows!
