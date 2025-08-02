# Pseudo Language Specification

A natural language for defining fullstack TypeScript/JavaScript applications that AI agents can understand and generate
production-ready code from.

## Table of Contents

- [Overview](#overview)
- [Basic Syntax](#basic-syntax)
- [Core Declarations](#core-declarations)
- [Domain-Driven Structure](#domain-driven-structure)
- [Data Types](#data-types)
- [Actions & Operations](#actions--operations)
- [Control Flow](#control-flow)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

Pseudolang is designed to bridge the gap between human-readable requirements and AI-generated code. It follows natural
language patterns while maintaining enough structure for precise code generation.

### Key Principles

- **Human-readable**: Product owners and designers can contribute
- **AI-friendly**: Clear context for code generation
- **Domain-driven**: Organized around business capabilities
- **Feature-focused**: Emphasizes user value over technical implementation

## Basic Syntax

### File Structure

```pseudo
# Comments start with #
// Or use double-slash comments
app "ProjectName":
  description: "Brief description of what this application does"
  rules: "Development guidelines and constraints for this project"
  language: typescript
  framework: react-router-7
  database: prisma

domain "Domain Name":
  description: "What this domain handles"

  # Nested declarations
```

### Naming Conventions

- **Multi-word names**: Use quotes `"User Management"`
- **Single words**: Quotes optional `Administration`
- **Properties**: Lowercase with underscores `created_at`
- **Variables**: camelCase `userName`

### Indentation

- Use **2 spaces** for indentation
- Declarations increase indent level
- Properties and content are indented under declarations

## Core Declarations

### App Configuration

Defines the application configuration including technology stack and project settings.

```pseudo
app "ProjectName":
  description: "Brief description of what this application does"
  rules: "Development guidelines and constraints for this project"
  language: typescript | javascript
  framework: react-router | nextjs | vue | svelte | astro
  fullstack: true | false
  database: prisma | drizzle | supabase | mongodb
  styling: tailwind | css | styled-components
  components: shadcn-ui | daisyui | chakra
  authentication: [oauth, email] | [email] | [oauth]
  payment: stripe | paypal (optional)
```

### Domain Declaration

Groups related functionality into business domains.

```pseudo
domain "Domain Name":
  description: "Business capability this domain provides"

  # Contains: models, features, services, etc.
```

### Feature Declaration

Describes user-facing capabilities within a domain.

```pseudo
feature "Feature Name":
  description: "What users can accomplish with this feature"

  # Contains: pages, components, workflows
```

### Model Declaration

Defines data structures and their relationships.

```pseudo
model ModelName:
  id: uuid required unique
  field_name: type modifiers
  relationship: RelatedModel
  created_at: date
  updated_at: date
```

### Page Declaration

Defines application pages with routing and behavior.

```pseudo
page "Page Name":
  path: "/url/path/:param?"
  guard: authentication_rule
  state: local_state = initial_value

  loads:
    # initialization logic

  show:
    # page content and UI elements
```

### Component Declaration

Reusable UI components with props and behavior.

```pseudo
component ComponentName:
  props: PropType
  state: component_state = initial_value

  show:
    # component UI

  when user_interaction:
    # event handling
```

## Domain-Driven Structure

### Organizing Domains

Group related models, features, and services:

```pseudo
domain "User Management":
  # User-related models, authentication, profiles

domain "Content Management":
  # Posts, comments, publishing workflow

domain "Analytics":
  # Reporting, insights, metrics
```

### Feature Organization

Features should represent complete user workflows:

```pseudo
feature "User Registration":
  # Complete signup process

feature "Content Publishing":
  # Full workflow from draft to published post
```

## Constants

### Built-in Constants

- `null` - No value
- `true`/`false` - Boolean values
- `empty` - Empty collection/string
- `undefined` - Undefined value
- `now` - Current timestamp
- `today` - Current date

## Data Types

### Primitive Types

- `string` - Text values
- `number` - Numeric values
- `boolean` - True/false values
- `date` - Date/time values
- `uuid` - Unique identifiers

### Specialized Types

- `url` - Web URLs
- `array[Type]` - Lists of items
- `object` - Key-value structures

### Type Modifiers

- `required` - Field must have a value
- `optional` - Field can be empty
- `unique` - No duplicate values allowed
- `indexed` - Optimized for queries
- `default(value)` - Default value if not provided
- `min(n)` - Minimum value or length
- `max(n)` - Maximum value or length

### Examples

```pseudo
model User:
  email: string required unique
  age: number optional min(0) max(120)
  tags: array[string] optional
  settings: object default({})
```

## Actions & Operations

### CRUD Operations

- `create` - Add new records
- `update` - Modify existing records
- `delete` - Remove records
- `query` - Search and filter
- `list` - Display collections

### UI Actions

- `show` - Display elements
- `hide` - Remove from view
- `toggle` - Switch state
- `redirect` - Navigate to different page

### Data Operations

- `add` - Add items to collections
- `remove` - Remove items from collections
- `validate` - Check data integrity
- `transform` - Convert data formats
- `filter` - Subset data
- `sort` - Order data
- `paginate` - Divide into pages

### System Actions

- `authenticate` - Verify user identity
- `authorize` - Check permissions
- `send` - Dispatch messages/emails
- `schedule` - Queue for later execution
- `await` - Wait for async operations

### Logical Operations

- `and` - Logical AND operator
- `or` - Logical OR operator
- `not` - Logical NOT operator
- `lt` - Less than comparison
- `gt` - Greater than comparison
- `lte` - Less than or equal
- `gte` - Greater than or equal
- `eq` - Equal comparison
- `neq` - Not equal comparison
- `between` - Range comparison
- `is` - Identity/type check
- `in` - Membership test

### Built-in Functions

- `contains` - Check if string/array contains value
- `includes` - Alias for contains
- `startsWith` - Check string prefix
- `endsWith` - Check string suffix
- `matches` - Pattern matching

### Flow Control

- `return` - Return from function/block
- `throw` - Throw an exception
- `default` - Default value/case

## Control Flow

### Conditionals

```pseudo
if condition:
  # actions when true
else:
  # actions when false
```

### Loops

```pseudo
for each item in collection:
  # process each item
```

### Event Handling

```pseudo
when user clicks button:
  # response to user action

loads:
  # initialization logic (for pages)

when form submits:
  # form processing
```

### Error Handling

```pseudo
try:
  # risky operation
catch ErrorType:
  # error recovery
```

## Authentication & Authorization

### Authentication Configuration

```pseudo
auth UserAuth:
  login: email, password
  register: email, username, password
  oauth: google, github
  session: jwt | cookie
```

### Guards

```pseudo
guard RequireAuth:
  redirect: "/login" if not authenticated

guard RequireAdmin:
  require: user.role == "admin"
  show: "Access denied" if not authorized
```

### Usage in Pages

```pseudo
page "Admin Panel":
  path: "/admin"
  guard: RequireAdmin
```

## API & Backend

### Route Definitions

```pseudo
route GET /api/endpoint:
  guard: RequireAuth
  response: ResponseType
  action:
    query data
    return: formatted_data

route POST /api/endpoint:
  request: RequestType
  response: ResponseType
  validate: input_rules
  action:
    process request
    return: result
```

### Request/Response Types

```pseudo
request CreateUserRequest:
  email: string required
  username: string required
  password: string required

response UserResponse:
  id: uuid
  email: string
  username: string
  created_at: date
```

### Services

```pseudo
service UserService:
  createUser: (data) -> User
  updateUser: (id, data) -> User
  deleteUser: (id) -> boolean
```

### Repository Declaration

Defines data access layer with CRUD operations.

```pseudo
repository UserRepository:
  find: (id) -> User
  findByEmail: (email) -> User
  create: (data) -> User
  update: (id, data) -> User
  delete: (id) -> boolean
```

## Forms & Validation

### Form Definitions

```pseudo
form UserRegistrationForm:
  fields:
    email: string required
    password: string required min(8)
    confirm_password: string required

  validate:
    email format is valid
    password length >= 8
    confirm_password matches password

  submit:
    create user account
    send verification email
    redirect: "/welcome"
```

## State Management

### Application State

```pseudo
state current_user: User | null = null
state posts: array[Post] = []
state loading: boolean = false
```

### Page State

```pseudo
page "Post Editor":
  state: draft_content = ""
  state: is_saving = false
```

## Events & Side Effects

### Event Declarations

```pseudo
event UserRegistered:
  trigger: send welcome email
  trigger: create user profile
  trigger: track analytics event

event PostPublished:
  trigger: notify subscribers
  trigger: update search index
  trigger: social media post
```

### Scheduled Events

```pseudo
event schedule:
  every: "0 0 * * *" # daily at midnight
  action: cleanup expired sessions
```

## Best Practices

### Naming

- Use descriptive, business-focused names
- Quote multi-word names consistently
- Be specific about user actions and outcomes

### Organization

- Group related functionality in domains
- Features should represent complete user workflows
- Keep models focused and cohesive

### Documentation

- Include descriptions for domains and features
- Explain business value, not technical implementation
- Use natural language that stakeholders understand

### Validation

- Specify required fields clearly
- Include business rules and constraints
- Consider edge cases and error scenarios

## Examples

### Simple Blog Application

```pseudo
app "BlogApp":
  description: "A simple blog where authors can create and publish posts"
  rules: "Follow content moderation guidelines and SEO best practices"
  language: typescript
  framework: react-router-7
  database: prisma

domain "Content Management":
  description: "Authors can create and manage blog posts"

  model Post:
    id: uuid required unique
    title: string required
    content: string required
    author: User required
    published: boolean default(false)
    created_at: date

  feature "Post Creation":
    description: "Authors can write and publish new posts"

    page "Post Editor":
      path: "/editor"
      guard: RequireAuth

      show:
        title input field
        content rich text editor
        "Publish" button

      when user clicks publish:
        validate: title and content not empty
        create post with current user as author
        redirect: "/posts/{post.id}"
```

### E-commerce Product Catalog

```pseudo
domain "Product Catalog":
  description: "Customers can browse and search products"

  model Product:
    id: uuid required unique
    name: string required
    price: number required
    description: string required
    category: Category required
    in_stock: boolean default(true)

  feature "Product Browse":
    description: "Customers can find products they want to buy"

    page "Product List":
      path: "/products"

      show:
        search input
        category filters
        product grid

      for each product in filtered_products:
        show: product card with name, price, image
        show: "Add to Cart" button if in_stock
```

This specification provides a complete foundation for writing pseudolang files that can be understood by both humans and
AI systems for generating production-ready applications.
