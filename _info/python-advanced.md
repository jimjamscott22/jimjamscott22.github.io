---
layout: default
title: Python Advanced
date: 2026-05-22
category: programming
tags: [python, advanced, decorators, async, generators]
permalink: /info/python-advanced/
---

# Python Advanced

**Category:** Programming | **Updated:** 2026-05-22

Beyond the basics: decorators, generators, context managers, async, typing, descriptors, and the language internals that make Python powerful (and occasionally surprising).

<!--more-->

---

## First-Class Functions and Closures

Functions are objects — they can be assigned, passed, returned, and stored.

```python
def make_multiplier(n):
    def multiply(x):
        return x * n         # closes over `n`
    return multiply

double = make_multiplier(2)
double(5)                    # 10
```

A **closure** captures variables from the enclosing scope. Use `nonlocal` to modify them:

```python
def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment
```

---

## Decorators

A decorator is a function that wraps another function.

```python
import functools

def timed(func):
    @functools.wraps(func)       # preserves name, docstring, signature
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timed
def slow_function():
    time.sleep(1)
```

### Parameterized Decorators

```python
def retry(times=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    if attempt == times - 1:
                        raise
        return wrapper
    return decorator

@retry(times=5)
def flaky(): ...
```

### Class Decorators

```python
@dataclass
class Point:
    x: float
    y: float
```

---

## Generators

Generators produce values lazily using `yield`.

```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

g = fib()
[next(g) for _ in range(10)]   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### Generator Expressions

```python
total = sum(x * x for x in range(10**6))   # no intermediate list
```

### `yield from`

Delegate to another iterable:

```python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item
```

---

## Context Managers

`with` statements use the context manager protocol (`__enter__`/`__exit__`):

```python
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    def __exit__(self, exc_type, exc_val, tb):
        print(f"Elapsed: {time.perf_counter() - self.start:.3f}s")

with Timer():
    expensive_work()
```

### `contextlib.contextmanager`

```python
from contextlib import contextmanager

@contextmanager
def tempdir():
    path = tempfile.mkdtemp()
    try:
        yield path
    finally:
        shutil.rmtree(path)
```

---

## Iterators and the Iterator Protocol

```python
class Countdown:
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1
```

---

## Dunder (Magic) Methods

Override behavior by implementing special methods:

| Method            | Purpose                          |
|-------------------|----------------------------------|
| `__init__`        | Constructor                      |
| `__repr__`        | Unambiguous string (for devs)    |
| `__str__`         | Readable string (for users)      |
| `__eq__`, `__lt__`| Comparison                       |
| `__hash__`        | Hashable (required for set/dict) |
| `__len__`         | `len(obj)`                       |
| `__getitem__`     | `obj[key]`                       |
| `__call__`        | `obj()`                          |
| `__enter__`/`__exit__` | Context manager             |
| `__iter__`/`__next__`  | Iterator                    |

---

## Dataclasses

```python
from dataclasses import dataclass, field

@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float
    tags: list[str] = field(default_factory=list)
```

- `frozen=True` makes instances immutable and hashable
- `slots=True` (3.10+) reduces memory by skipping `__dict__`

---

## Type Hints (Modern)

```python
from typing import Optional, Callable, Protocol, TypeVar, Generic

# 3.9+ built-in generics
nums: list[int] = [1, 2, 3]
lookup: dict[str, int] = {}

# 3.10+ union syntax
def find(name: str) -> User | None: ...

# Generics
T = TypeVar("T")
def first(xs: list[T]) -> T:
    return xs[0]

# Structural typing (duck typing with checks)
class Drawable(Protocol):
    def draw(self) -> None: ...

def render(item: Drawable) -> None:
    item.draw()
```

Run `mypy` or `pyright` to enforce statically.

---

## Async / Await

```python
import asyncio

async def fetch(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

async def main():
    results = await asyncio.gather(
        fetch("https://a.com"),
        fetch("https://b.com"),
    )

asyncio.run(main())
```

**Key concepts**:
- `async def` defines a coroutine
- `await` suspends until the awaitable completes
- `asyncio.gather` runs awaitables concurrently
- The event loop is **single-threaded** — `await` is a cooperative yield, not a thread switch

---

## Descriptors

A descriptor is any object implementing `__get__`, `__set__`, or `__delete__`. They power `property`, `classmethod`, `staticmethod`, and ORM fields.

```python
class Positive:
    def __set_name__(self, owner, name):
        self.name = name
    def __get__(self, obj, objtype=None):
        return obj.__dict__[self.name]
    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.name} must be positive")
        obj.__dict__[self.name] = value

class Account:
    balance = Positive()
```

---

## Metaclasses

The class of a class. Use sparingly — usually a class decorator or `__init_subclass__` is enough.

```python
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Config(metaclass=Singleton):
    pass
```

### `__init_subclass__` (often simpler)

```python
class Plugin:
    registry = []
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry.append(cls)
```

---

## The GIL

The **Global Interpreter Lock** allows only one thread to execute Python bytecode at a time in CPython.

- **CPU-bound work**: use `multiprocessing` or `concurrent.futures.ProcessPoolExecutor`
- **I/O-bound work**: threads or `asyncio` are fine — the GIL releases during I/O syscalls
- **Python 3.13+** has an experimental no-GIL build (PEP 703)

---

## Memory and Performance

- **`__slots__`**: skip `__dict__`, lower memory for many small instances
- **`functools.lru_cache`**: memoize pure functions
- **`array.array`** / **`numpy`**: dense numeric storage instead of `list`
- Profile with `cProfile`, line-by-line with `line_profiler`
- Use `timeit` for micro-benchmarks

---

## Packaging

Modern packaging uses `pyproject.toml`:

```toml
[project]
name = "mypackage"
version = "0.1.0"
dependencies = ["httpx>=0.27"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

Tools: `uv`, `pip`, `hatch`, `poetry`, `pip-tools`.

---

## See Also

- [Python Basics](/info/python-basics/)
- [Python Data Structures](/info/python-data-structures/)
- [Design Patterns](/info/design-patterns/)
