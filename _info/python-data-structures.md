---
layout: default
title: Python Data Structures
date: 2026-02-15
category: programming
tags: [python, data-structures]
permalink: /info/python-data-structures/
---

# Python Data Structures

**Category:** Programming | **Updated:** 2026-02-15

Python provides a rich set of built-in data structures that are fundamental to writing efficient code. Understanding their characteristics, performance, and use cases is essential for every Python developer.

<!--more-->

---

## Quick Reference

| Data Structure | Ordered | Mutable | Duplicates | Indexed | Syntax |
|----------------|---------|---------|------------|---------|--------|
| **List** | Yes | Yes | Yes | Yes | `[1, 2, 3]` |
| **Tuple** | Yes | No | Yes | Yes | `(1, 2, 3)` |
| **Set** | No | Yes | No | No | `{1, 2, 3}` |
| **Frozenset** | No | No | No | No | `frozenset([1, 2, 3])` |
| **Dict** | Yes (3.7+) | Yes | Keys: No | Keys | `{'a': 1, 'b': 2}` |
| **Deque** | Yes | Yes | Yes | Yes | `deque([1, 2, 3])` |
| **NamedTuple** | Yes | No | Yes | Yes | `Point(x=1, y=2)` |
| **Dataclass** | — | Yes | — | — | `@dataclass` |

---

## List

The most versatile data structure in Python. A dynamic, ordered, mutable sequence.

### Characteristics

- **Ordered**: Elements maintain insertion order
- **Mutable**: Can modify elements after creation
- **Allows duplicates**: Same value can appear multiple times
- **Indexed**: Access by position with `list[i]`
- **Dynamic**: Grows/shrinks automatically

### Operations & Complexity

| Operation | Example | Time Complexity |
|-----------|---------|----------------|
| Access by index | `lst[i]` | O(1) |
| Append to end | `lst.append(x)` | O(1) amortized |
| Insert at position | `lst.insert(i, x)` | O(n) |
| Delete by index | `del lst[i]` | O(n) |
| Pop from end | `lst.pop()` | O(1) |
| Pop from start | `lst.pop(0)` | O(n) |
| Search (in) | `x in lst` | O(n) |
| Slice | `lst[1:3]` | O(k) |
| Sort in-place | `lst.sort()` | O(n log n) |
| Reverse | `lst.reverse()` | O(n) |
| Extend | `lst.extend(other)` | O(k) |
| Copy | `lst.copy()` | O(n) |

### Common Usage

```python
# Creation
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# Access
first = numbers[0]          # 1
last = numbers[-1]          # 5
sublist = numbers[1:4]      # [2, 3, 4]

# Modification
numbers[0] = 10             # [10, 2, 3, 4, 5]
numbers.append(6)           # [10, 2, 3, 4, 5, 6]
numbers.insert(0, 0)        # [0, 10, 2, 3, 4, 5, 6]
numbers.remove(10)          # [0, 2, 3, 4, 5, 6]
numbers.pop()               # [0, 2, 3, 4, 5]
del numbers[0]              # [2, 3, 4, 5]

# Common operations
numbers.sort()              # In-place sort
sorted_nums = sorted(numbers)  # Returns new sorted list
numbers.reverse()           # In-place reverse
reversed_nums = list(reversed(numbers))  # Returns iterator

# List comprehension
squares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, ...]
evens = [x for x in numbers if x % 2 == 0]

# Check membership
if 3 in numbers:
    print("Found!")

# Concatenation
combined = [1, 2] + [3, 4]  # [1, 2, 3, 4]
numbers.extend([6, 7, 8])   # More efficient than +=

# Get length
length = len(numbers)

# Clear all elements
numbers.clear()
```

### When to Use

- General-purpose sequential data
- Need random access by index
- Frequent appends to the end
- Order matters
- Need mutable collection

---

## Tuple

An immutable, ordered sequence. Once created, cannot be modified.

### Characteristics

- **Immutable**: Cannot change after creation
- **Ordered**: Maintains insertion order
- **Allows duplicates**: Same values allowed
- **Indexed**: Access by position
- **Hashable**: Can be dict keys or set elements (if all elements are hashable)
- **Memory efficient**: Uses less memory than lists

### Operations & Complexity

| Operation | Example | Time Complexity |
|-----------|---------|----------------|
| Access by index | `tpl[i]` | O(1) |
| Search | `x in tpl` | O(n) |
| Count occurrences | `tpl.count(x)` | O(n) |
| Find index | `tpl.index(x)` | O(n) |
| Slice | `tpl[1:3]` | O(k) |

### Common Usage

```python
# Creation
point = (3, 5)
single = (42,)              # Note the comma for single element
empty = ()
colors = ("red", "green", "blue")

# Unpacking
x, y = point                # x=3, y=5
first, *rest = colors       # first="red", rest=["green", "blue"]

# Access
first = colors[0]           # "red"
last = colors[-1]           # "blue"

# Cannot modify
# colors[0] = "yellow"      # TypeError!

# Concatenation (creates new tuple)
combined = (1, 2) + (3, 4)  # (1, 2, 3, 4)
repeated = (1, 2) * 3       # (1, 2, 1, 2, 1, 2)

# Methods
count = colors.count("red")      # 1
index = colors.index("green")    # 1

# Convert to list and back
as_list = list(colors)
as_tuple = tuple(as_list)

# Nested tuples
matrix = ((1, 2), (3, 4), (5, 6))
```

### When to Use

- Data should not change (immutable)
- Return multiple values from function
- Use as dictionary keys
- Slightly faster and more memory-efficient than lists
- Protect data from accidental modification
- Represent fixed structures (coordinates, RGB values, etc.)

---

## Set

An unordered collection of unique elements. Provides fast membership testing and set operations.

### Characteristics

- **Unordered**: No guaranteed order (implementation-dependent)
- **No duplicates**: Automatically removes duplicates
- **Mutable**: Can add/remove elements
- **Elements must be hashable**: Cannot contain lists or dicts
- **Fast membership testing**: O(1) average case

### Operations & Complexity

| Operation | Example | Time Complexity |
|-----------|---------|----------------|
| Add element | `s.add(x)` | O(1) average |
| Remove element | `s.remove(x)` | O(1) average |
| Discard element | `s.discard(x)` | O(1) average |
| Membership test | `x in s` | O(1) average |
| Union | `s1 \| s2` | O(len(s1) + len(s2)) |
| Intersection | `s1 & s2` | O(min(len(s1), len(s2))) |
| Difference | `s1 - s2` | O(len(s1)) |
| Symmetric difference | `s1 ^ s2` | O(len(s1) + len(s2)) |
| Subset test | `s1 <= s2` | O(len(s1)) |

### Common Usage

```python
# Creation
numbers = {1, 2, 3, 4, 5}
empty = set()               # Note: {} creates dict, not set
from_list = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}

# Add/remove
numbers.add(6)              # {1, 2, 3, 4, 5, 6}
numbers.remove(3)           # {1, 2, 4, 5, 6} - raises KeyError if not found
numbers.discard(10)         # No error if not found
popped = numbers.pop()      # Remove and return arbitrary element

# Membership testing (fast!)
if 5 in numbers:
    print("Found!")

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

union = a | b               # {1, 2, 3, 4, 5, 6}
intersection = a & b        # {3, 4}
difference = a - b          # {1, 2}
symmetric_diff = a ^ b      # {1, 2, 5, 6}

# Method alternatives
union = a.union(b)
intersection = a.intersection(b)
difference = a.difference(b)
sym_diff = a.symmetric_difference(b)

# Subset/superset
is_subset = a <= b          # False
is_superset = a >= b        # False
is_disjoint = a.isdisjoint({7, 8, 9})  # True

# Update operations (in-place)
a.update(b)                 # a |= b
a.intersection_update(b)    # a &= b
a.difference_update(b)      # a -= b

# Remove duplicates from list
unique = list(set([1, 2, 2, 3, 3, 3]))  # [1, 2, 3]

# Set comprehension
squares = {x**2 for x in range(10)}
```

### When to Use

- Need to enforce uniqueness
- Fast membership testing required
- Mathematical set operations needed
- Remove duplicates from sequence
- No need for ordering

---

## Dictionary (dict)

A mutable mapping of keys to values. Hash table implementation provides fast lookups.

### Characteristics

- **Key-value pairs**: Maps keys to values
- **Keys must be hashable**: Immutable types (str, int, tuple, etc.)
- **No duplicate keys**: Each key appears once
- **Ordered** (Python 3.7+): Maintains insertion order
- **Fast lookups**: O(1) average case

### Operations & Complexity

| Operation | Example | Time Complexity |
|-----------|---------|----------------|
| Access by key | `d[key]` | O(1) average |
| Set value | `d[key] = value` | O(1) average |
| Delete key | `del d[key]` | O(1) average |
| Membership test | `key in d` | O(1) average |
| Get with default | `d.get(key, default)` | O(1) average |
| Keys/values/items | `d.keys()`, `d.values()`, `d.items()` | O(1) to return view |
| Iterate | `for k in d:` | O(n) |
| Copy | `d.copy()` | O(n) |

### Common Usage

```python
# Creation
person = {"name": "Alice", "age": 30, "city": "NYC"}
empty = {}
from_pairs = dict([("a", 1), ("b", 2)])
from_kwargs = dict(name="Bob", age=25)

# Access
name = person["name"]       # "Alice"
age = person.get("age")     # 30
height = person.get("height", 0)  # 0 (default)

# Modification
person["age"] = 31          # Update
person["country"] = "USA"   # Add new key
del person["city"]          # Remove key
person.pop("country")       # Remove and return value

# Membership
if "name" in person:        # Check if key exists
    print("Name found")

# Iteration
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")

for value in person.values():
    print(value)

# Dictionary comprehension
squares = {x: x**2 for x in range(10)}
filtered = {k: v for k, v in person.items() if v != None}

# Merging (Python 3.9+)
merged = {**person, **{"job": "Engineer"}}
person |= {"salary": 100000}  # Update operator

# Common patterns
word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

# Or using defaultdict
from collections import defaultdict
word_count = defaultdict(int)
for word in words:
    word_count[word] += 1

# Get all keys/values as lists
keys = list(person.keys())
values = list(person.values())

# Clear all items
person.clear()

# Set default if key missing
person.setdefault("score", 0)  # Returns 0, adds if not exists
```

### When to Use

- Need to look up values by key
- Key-value associations
- Counting/frequency tables
- Caching/memoization
- Configuration data
- JSON-like data structures

---

## Deque (Double-Ended Queue)

A list-like container optimized for fast appends and pops from both ends.

### Import

```python
from collections import deque
```

### Characteristics

- **Double-ended**: Efficient operations at both ends
- **Thread-safe**: Atomic append and pop operations
- **Bounded**: Can set maximum length
- **Not indexed**: Slower than list for random access

### Operations & Complexity

| Operation | Example | Time Complexity |
|-----------|---------|----------------|
| Append right | `dq.append(x)` | O(1) |
| Append left | `dq.appendleft(x)` | O(1) |
| Pop right | `dq.pop()` | O(1) |
| Pop left | `dq.popleft()` | O(1) |
| Extend right | `dq.extend(iter)` | O(k) |
| Extend left | `dq.extendleft(iter)` | O(k) |
| Rotate | `dq.rotate(n)` | O(k) |
| Access by index | `dq[i]` | O(n) |
| Remove | `dq.remove(x)` | O(n) |

### Common Usage

```python
from collections import deque

# Creation
dq = deque([1, 2, 3])
bounded = deque(maxlen=5)   # Max 5 elements
empty = deque()

# Add/remove from both ends
dq.append(4)                # Right: [1, 2, 3, 4]
dq.appendleft(0)            # Left: [0, 1, 2, 3, 4]
dq.pop()                    # Right: [0, 1, 2, 3]
dq.popleft()                # Left: [1, 2, 3]

# Extend
dq.extend([4, 5])           # [1, 2, 3, 4, 5]
dq.extendleft([0, -1])      # [-1, 0, 1, 2, 3, 4, 5]

# Rotate
dq.rotate(2)                # Rotate right 2: [4, 5, -1, 0, 1, 2, 3]
dq.rotate(-2)               # Rotate left 2: [-1, 0, 1, 2, 3, 4, 5]

# Bounded deque (LRU-like)
recent = deque(maxlen=3)
recent.append(1)            # [1]
recent.append(2)            # [1, 2]
recent.append(3)            # [1, 2, 3]
recent.append(4)            # [2, 3, 4] - oldest popped automatically

# Convert to/from list
as_list = list(dq)
from_list = deque([1, 2, 3])
```

### When to Use

- Queue implementation (BFS, task scheduling)
- Stack implementation (when you also need queue features)
- Sliding window algorithms
- Recent history tracking (with maxlen)
- Palindrome checking
- Undo/redo functionality

---

## Named Tuple

Tuple subclass with named fields. Provides attribute-style access to tuple elements.

### Import

```python
from collections import namedtuple
```

### Characteristics

- **Immutable**: Like regular tuples
- **Named fields**: Access by name or index
- **Memory efficient**: More efficient than classes
- **Self-documenting**: Field names make code clearer

### Common Usage

```python
from collections import namedtuple

# Define a named tuple type
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', 'name age city')  # Space-separated

# Create instances
p = Point(3, 5)
person = Person("Alice", 30, "NYC")

# Access by name
print(p.x, p.y)             # 3 5
print(person.name)          # Alice

# Access by index (still works)
print(p[0], p[1])           # 3 5

# Unpack
x, y = p
name, age, city = person

# Convert to dict
person_dict = person._asdict()  # OrderedDict

# Replace (creates new tuple)
older = person._replace(age=31)

# Field names
print(Point._fields)        # ('x', 'y')

# Create from iterable
values = [10, 20]
point = Point(*values)

# Default values (Python 3.7+)
from collections import namedtuple
Node = namedtuple('Node', ['value', 'left', 'right'], defaults=[None, None])
leaf = Node(5)              # left and right default to None
```

### When to Use

- Simple data classes (before Python 3.7 dataclasses)
- Return multiple values from functions (more readable than tuple)
- Replace dictionaries when field names are known
- CSV or database row representation
- Lightweight alternative to classes

---

## Dataclass

A decorator that automatically generates boilerplate for classes (Python 3.7+).

### Import

```python
from dataclasses import dataclass
```

### Characteristics

- **Mutable** (by default, can be frozen)
- **Type hints**: Enforces type annotations
- **Less boilerplate**: Auto-generates `__init__`, `__repr__`, etc.
- **More features than namedtuple**: Default values, inheritance, post-init

### Common Usage

```python
from dataclasses import dataclass, field
from typing import List

# Basic dataclass
@dataclass
class Point:
    x: float
    y: float

p = Point(3.0, 5.0)
print(p)                    # Point(x=3.0, y=5.0)
p.x = 10                    # Mutable

# With defaults
@dataclass
class Person:
    name: str
    age: int = 0
    city: str = "Unknown"

person = Person("Alice")    # age=0, city="Unknown"

# Frozen (immutable)
@dataclass(frozen=True)
class ImmutablePoint:
    x: float
    y: float

ip = ImmutablePoint(1, 2)
# ip.x = 5                  # Error: frozen

# Field with default factory
@dataclass
class Team:
    name: str
    members: List[str] = field(default_factory=list)

t1 = Team("A")
t2 = Team("B")
t1.members.append("Alice")  # Only affects t1

# Custom initialization
@dataclass
class Rectangle:
    width: float
    height: float
    area: float = field(init=False)

    def __post_init__(self):
        self.area = self.width * self.height

# Comparison
@dataclass(order=True)
class Student:
    score: int
    name: str

s1 = Student(85, "Alice")
s2 = Student(90, "Bob")
print(s1 < s2)              # True (compares by score first)
```

### When to Use

- Data-holding classes with minimal logic
- Need mutability (unlike namedtuple)
- Want type hints and IDE support
- Classes with many fields (less boilerplate)
- Python 3.7+

---

## Frozenset

An immutable version of set. Cannot be modified after creation.

### Common Usage

```python
# Creation
fs = frozenset([1, 2, 3, 4])
empty = frozenset()

# Can be used as dict key or set element
cache = {frozenset([1, 2]): "result"}
set_of_sets = {frozenset([1, 2]), frozenset([3, 4])}

# All set operations work
a = frozenset([1, 2, 3])
b = frozenset([3, 4, 5])
union = a | b               # frozenset({1, 2, 3, 4, 5})

# Cannot modify
# fs.add(5)                 # Error!
```

### When to Use

- Need set operations but data should be immutable
- Use sets as dictionary keys
- Use sets as elements of other sets

---

## Comparison Table: Time Complexity

| Operation | List | Tuple | Set | Dict | Deque |
|-----------|------|-------|-----|------|-------|
| **Access by index** | O(1) | O(1) | — | — | O(n) |
| **Search** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Insert/Delete start** | O(n) | — | — | — | O(1) |
| **Insert/Delete end** | O(1) | — | O(1) | O(1) | O(1) |
| **Insert/Delete middle** | O(n) | — | — | — | O(n) |

---

## Choosing the Right Data Structure

| Need | Use |
|------|-----|
| Ordered sequence, frequent index access | **List** |
| Immutable sequence | **Tuple** |
| Unique elements, fast membership test | **Set** |
| Key-value lookup | **Dict** |
| Fast operations at both ends | **Deque** |
| Named fields, immutable | **NamedTuple** |
| Data class with type hints | **Dataclass** |
| Immutable set for dict keys | **Frozenset** |

---

## Common Patterns

### Remove duplicates preserving order

```python
# Using dict (Python 3.7+)
unique = list(dict.fromkeys(items))

# Using set (loses order)
unique = list(set(items))
```

### Count occurrences

```python
from collections import Counter
counts = Counter(['a', 'b', 'a', 'c', 'b', 'a'])
# Counter({'a': 3, 'b': 2, 'c': 1})
```

### Group by key

```python
from collections import defaultdict
groups = defaultdict(list)
for item in items:
    groups[item.category].append(item)
```

### LRU Cache

```python
from collections import OrderedDict
cache = OrderedDict()
MAX_SIZE = 100

def get(key):
    if key in cache:
        cache.move_to_end(key)
        return cache[key]
    return None

def put(key, value):
    cache[key] = value
    cache.move_to_end(key)
    if len(cache) > MAX_SIZE:
        cache.popitem(last=False)
```
