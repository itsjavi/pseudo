# Testing Pseudo Syntax Highlighting in Markdown

Here's a pseudo code block that should be highlighted:

```pseudo
app "TestApp":
  language: typescript
  framework: react-router-7
  database: prisma

domain "User Management":
  description: "Handle user accounts and authentication"

  model User:
    id: uuid required unique
    email: string required unique
    username: string required
    password: string required min(8)
    created_at: date default(now)

  feature "User Registration":
    description: "Allow new users to create accounts"

    page "Sign Up":
      path: "/signup"

      show:
        form registration_form
        "Create Account" button

      when user submits form:
        validate: email format is valid
        validate: password length >= 8
        if email not in users:
          create user account
          send verification email
          redirect: "/welcome"
        else:
          show: "Email already exists"
```

And here's another example:

```pseudolang
auth UserAuth:
  login: email, password
  register: email, username, password
  oauth: google, github
  session: jwt

guard RequireAuth:
  redirect: "/login" if not authenticated

route POST /api/users:
  request: CreateUserRequest
  response: UserResponse
  validate: input_rules
  action:
    if email contains "@company.com":
      create user with admin role
    else:
      create regular user
    return: user_data
```

Both `pseudo` and `pseudolang` should work as language identifiers.
