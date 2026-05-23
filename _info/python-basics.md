---
layout: default
title: Python Basics
date: 2026-05-22
category: programming
tags: [python, basics, syntax, reference]
permalink: /info/python-basics/
---

# Python Basics

**Category:** Programming | **Updated:** 2026-05-22

A reference for Python fundamentals: syntax, types, control flow, functions, and the standard idioms you'll use in nearly every Python program.

<!--more-->

---

## Variables and Types

Python is **dynamically typed** — variables don't need explicit type declarations. Types are inferred at runtime.

```python
name = "Ada"          # str
age = 36              # int
height = 1.72         # float
is_active = True      # bool
nothing = None        # NoneType
```

### Built-in Primitive Types

| Type    | Example          | Notes                              |
|---------|------------------|------------------------------------|
| `int`   | `42`, `-7`       | Unlimited precision                |
| `float` | `3.14`, `1e-5`   | Double precision (64-bit)          |
| `bool`  | `True`, `False`  | Subclass of `int`                  |
| `str`   | `"hello"`        | Immutable, Unicode by default      |
| `bytes` | `b"hello"`       | Immutable sequence of bytes        |
| `None`  | `None`           | Singleton, "absence of value"      |

### Type Conversion

```python
int("42")       # 42
float("3.14")   # 3.14
str(42)         # "42"
bool(0)         # False  (0, "", [], None are falsy)
list("abc")     # ['a', 'b', 'c']
```

---

## Operators

```python
# Arithmetic
2 + 3       # 5
7 / 2       # 3.5   (true division)
7 // 2      # 3     (floor division)
7 % 2       # 1     (modulo)
2 ** 10     # 1024  (exponent)

# Comparison
a == b      # equal
a != b      # not equal
a is b      # identity (same object)
a in xs     # membership

# Logical
a and b     # short-circuit AND
a or b      # short-circuit OR
not a       # negation
```

---

## Strings

```python
s = "hello"
s.upper()           # "HELLO"
s[0]                # "h"
s[1:4]              # "ell"   (slice)
s[::-1]             # "olleh" (reverse)
len(s)              # 5
"e" in s            # True
"-".join(["a", "b", "c"])  # "a-b-c"
"a,b,c".split(",")         # ['a', 'b', 'c']

# f-strings (preferred since 3.6)
name = "Ada"
f"Hello, {name}!"          # "Hello, Ada!"
f"{3.14159:.2f}"           # "3.14"
```

---

## Collections

### List (mutable, ordered)

```python
xs = [1, 2, 3]
xs.append(4)         # [1, 2, 3, 4]
xs.pop()             # 4, list is now [1, 2, 3]
xs[0] = 99           # [99, 2, 3]
sorted(xs)           # new sorted list
xs.sort()            # in-place sort
```

### Tuple (immutable, ordered)

```python
point = (3, 4)
x, y = point         # unpacking
single = (1,)        # trailing comma required for single-element
```

### Dict (mutable, key-value)

```python
user = {"name": "Ada", "age": 36}
user["email"] = "ada@example.com"
user.get("phone", "N/A")     # default if missing
for key, value in user.items(): ...
```

### Set (mutable, unordered, unique)

```python
tags = {"python", "code"}
tags.add("docs")
tags & other        # intersection
tags | other        # union
tags - other        # difference
```

---

## Control Flow

```python
# if/elif/else
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"

# for loop (iterates over any iterable)
for item in [1, 2, 3]:
    print(item)

for i, item in enumerate(items):
    print(i, item)

for key, value in d.items():
    print(key, value)

# while loop
while condition:
    do_something()

# break / continue / else
for x in xs:
    if x < 0:
        break
else:
    print("no negatives found")  # runs if loop completes without break
```

---

## Functions

```python
def greet(name, greeting="Hello"):
    """Return a greeting string."""
    return f"{greeting}, {name}!"

greet("Ada")                       # "Hello, Ada!"
greet("Ada", greeting="Hi")        # "Hi, Ada!"

# *args and **kwargs
def log(*args, **kwargs):
    print(args, kwargs)

# Lambda (anonymous function)
square = lambda x: x * x

# Type hints (optional but recommended)
def add(a: int, b: int) -> int:
    return a + b
```

---

## Comprehensions

```python
# List comprehension
squares = [x * x for x in range(10)]
evens = [x for x in xs if x % 2 == 0]

# Dict comprehension
lookup = {name: len(name) for name in names}

# Set comprehension
unique_lengths = {len(name) for name in names}

# Generator expression (lazy)
total = sum(x * x for x in range(1000000))
```

---

## Files and I/O

```python
# Read entire file
with open("data.txt") as f:
    contents = f.read()

# Read line by line
with open("data.txt") as f:
    for line in f:
        process(line.strip())

# Write
with open("out.txt", "w") as f:
    f.write("hello\n")
```

The `with` statement ensures the file is closed even if an exception occurs.

---

## Error Handling

```python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Bad value: {e}")
except (KeyError, IndexError):
    print("Lookup failed")
else:
    print("No exception")        # only if try succeeded
finally:
    cleanup()                    # always runs
```

---

## Modules and Imports

```python
import math
math.sqrt(16)

from math import sqrt, pi
sqrt(16)

from collections import defaultdict as dd

# Run as script
if __name__ == "__main__":
    main()
```

---

## Truthiness

These values are **falsy**: `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `()`, `set()`. Everything else is truthy.

```python
if items:               # idiomatic — checks non-empty
    process(items)
```

---

## Common Gotchas

- **Mutable default arguments**: `def f(xs=[])` shares the same list across calls. Use `xs=None` and assign inside.
- **`is` vs `==`**: `is` checks identity (same object), `==` checks equality. Use `==` for values, `is` only for `None`/`True`/`False`.
- **Integer caching**: small ints (-5 to 256) are cached, so `a is b` may be `True` for them by accident.
- **Late binding in closures**: lambdas in a loop capture the variable, not its value at definition time.

---

## See Also

- [Python Data Structures](/info/python-data-structures/) — performance characteristics of built-in types
- [Python Advanced](/info/python-advanced/) — decorators, generators, async, metaclasses
- [Big-O Notation](/info/big-o-notation/)
