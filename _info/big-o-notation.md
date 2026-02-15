---
layout: default
title: Big-O Notation & Algorithm Complexity
date: 2026-02-15
category: programming
tags: [algorithms, complexity, big-o]
permalink: /info/big-o-notation/
---

# Big-O Notation & Algorithm Complexity

**Category:** Programming | **Updated:** 2026-02-15

Big-O notation describes the upper bound of an algorithm's time or space complexity, expressing how runtime or memory grows relative to input size. Understanding complexity analysis is essential for writing efficient code and choosing the right algorithms.

<!--more-->

---

## Quick Reference

| Complexity | Name | Example Operations |
|------------|------|-------------------|
| **O(1)** | Constant | Array access, hash table lookup |
| **O(log n)** | Logarithmic | Binary search, balanced tree operations |
| **O(n)** | Linear | Linear search, array iteration |
| **O(n log n)** | Linearithmic | Efficient sorting (merge sort, quick sort) |
| **O(n²)** | Quadratic | Nested loops, simple sorting (bubble, selection) |
| **O(n³)** | Cubic | Triple nested loops, naive matrix multiplication |
| **O(2ⁿ)** | Exponential | Recursive Fibonacci, power set generation |
| **O(n!)** | Factorial | Generating all permutations, traveling salesman (brute force) |

---

## Growth Rate Comparison

For n = 100:

```
O(1)        = 1
O(log n)    = ~7
O(n)        = 100
O(n log n)  = ~700
O(n²)       = 10,000
O(n³)       = 1,000,000
O(2ⁿ)       = 1,267,650,600,228,229,401,496,703,205,376
O(n!)       = ~10^157
```

### Visual Growth

```
n=10    n=100    n=1000
━━━━━━━━━━━━━━━━━━━━━━━━
O(1)       │        │         │
O(log n)   ││       │││       ││││
O(n)       ││││││││││ │        │
O(n log n) ││││││││││││││     │││
O(n²)      (chart breaks)
O(2ⁿ)      (universe breaks)
```

**Practical meaning:**
- O(1) to O(n log n): Generally acceptable
- O(n²): Acceptable for small inputs (n < 1000)
- O(2ⁿ), O(n!): Only feasible for very small inputs (n < 20)

---

## O(1) — Constant Time

Runtime doesn't depend on input size. Same number of operations regardless of n.

### Characteristics

- Fixed number of operations
- Most efficient complexity
- No loops that scale with input

### Examples

```python
# Array/list access by index
def get_first(arr):
    return arr[0]           # O(1)

# Hash table operations (average case)
def lookup(hash_map, key):
    return hash_map[key]    # O(1)

# Stack operations
def push_pop(stack):
    stack.append(x)         # O(1)
    return stack.pop()      # O(1)

# Arithmetic operations
def calculate(a, b):
    return (a + b) * 2      # O(1)

# Fixed-size operation
def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]  # O(1)
```

### Common Operations

- Array access: `arr[i]`
- Hash table get/set (average)
- Stack push/pop
- Queue enqueue/dequeue (with proper implementation)
- Basic arithmetic
- Comparing two values

---

## O(log n) — Logarithmic Time

Runtime grows logarithmically with input size. Each step eliminates a constant fraction of remaining elements.

### Characteristics

- Very efficient for large inputs
- Typically involves dividing problem in half repeatedly
- Common in divide-and-conquer algorithms

### Examples

```python
# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Finding power of 2
def is_power_of_two(n):
    count = 0
    while n > 1:
        n //= 2         # Divide by 2 each iteration
        count += 1
    return count        # O(log n) iterations

# Balanced tree operations (BST, AVL, Red-Black)
def tree_search(root, value):
    # Each comparison eliminates half the tree
    current = root
    while current:
        if current.value == value:
            return current
        elif value < current.value:
            current = current.left
        else:
            current = current.right
    return None
```

### Why log n?

Binary search with n=16:
```
Step 1: Check middle → 8 elements remain
Step 2: Check middle → 4 elements remain
Step 3: Check middle → 2 elements remain
Step 4: Check middle → 1 element remains
```

4 steps for 16 elements → log₂(16) = 4

### Common Operations

- Binary search on sorted array
- Balanced tree operations (BST, AVL, Red-Black)
- Heap insert/delete
- Finding largest power of 2 less than n

---

## O(n) — Linear Time

Runtime grows linearly with input size. Process each element once.

### Characteristics

- Single loop through data
- Most common complexity for basic operations
- Direct relationship between input size and runtime

### Examples

```python
# Linear search
def find_element(arr, target):
    for i, elem in enumerate(arr):
        if elem == target:
            return i
    return -1

# Sum array
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total

# Find maximum
def find_max(arr):
    max_val = arr[0]
    for num in arr:
        if num > max_val:
            max_val = num
    return max_val

# Count occurrences
def count_occurrences(arr, target):
    count = 0
    for elem in arr:
        if elem == target:
            count += 1
    return count

# Copy array
def copy_array(arr):
    new_arr = []
    for elem in arr:
        new_arr.append(elem)
    return new_arr
```

### Common Operations

- Linear search
- Finding min/max
- Counting/summing elements
- Copying arrays
- Single pass through data
- Printing all elements

---

## O(n log n) — Linearithmic Time

Common complexity for efficient sorting algorithms. Combines linear and logarithmic growth.

### Characteristics

- Optimal for comparison-based sorting
- Appears in divide-and-conquer algorithms
- Much better than O(n²) for large inputs

### Examples

```python
# Merge sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # T(n/2)
    right = merge_sort(arr[mid:])  # T(n/2)
    return merge(left, right)      # O(n)
    # T(n) = 2T(n/2) + O(n) = O(n log n)

# Quick sort (average case)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Heap sort
def heap_sort(arr):
    # Build heap: O(n)
    # Extract max n times: O(n log n)
    # Total: O(n log n)
    pass

# Sort then iterate
def find_closest_pair(arr):
    arr.sort()              # O(n log n)
    min_diff = float('inf')
    for i in range(len(arr) - 1):  # O(n)
        diff = arr[i+1] - arr[i]
        min_diff = min(min_diff, diff)
    return min_diff
    # Total: O(n log n) + O(n) = O(n log n)
```

### Why n log n?

- Merge sort divides array log n times
- At each level, merging requires O(n) work
- Total: n × log n

### Common Operations

- Efficient sorting (merge sort, heap sort, quick sort average)
- Building certain data structures (heap from array)
- Some divide-and-conquer algorithms

---

## O(n²) — Quadratic Time

Runtime grows quadratically with input size. Typically involves nested loops.

### Characteristics

- Each element compared with every other element
- Common in simple/naive algorithms
- Acceptable for small inputs, problematic for large ones

### Examples

```python
# Nested loops - classic O(n²)
def has_duplicates(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# Bubble sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):          # O(n)
        for j in range(n - i - 1):  # O(n)
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Selection sort
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Find all pairs with given sum
def find_pairs(arr, target):
    pairs = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                pairs.append((arr[i], arr[j]))
    return pairs
```

### When Acceptable

- n < 1000: Usually acceptable
- n < 10,000: Depends on constants and requirements
- n > 10,000: Usually too slow

### Common Operations

- Simple sorting algorithms (bubble, selection, insertion)
- Checking all pairs
- Naive duplicate detection
- Matrix operations on square matrices

---

## O(n³) — Cubic Time

Three nested loops. Rare but appears in some algorithms.

### Examples

```python
# Triple nested loops
def three_sum_zero(arr):
    triplets = []
    n = len(arr)
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if arr[i] + arr[j] + arr[k] == 0:
                    triplets.append((arr[i], arr[j], arr[k]))
    return triplets

# Naive matrix multiplication
def matrix_multiply(A, B):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C
```

### Common Operations

- Naive matrix multiplication
- Checking all triplets
- Some dynamic programming solutions

---

## O(2ⁿ) — Exponential Time

Runtime doubles with each addition to input. Extremely slow, only feasible for small inputs.

### Characteristics

- Usually involves recursive calls that branch
- Quickly becomes infeasible
- Often can be optimized with memoization to O(n)

### Examples

```python
# Naive recursive Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)  # Two recursive calls
    # Creates binary tree of calls
    # O(2ⁿ)

# Generate all subsets (power set)
def generate_subsets(arr):
    if not arr:
        return [[]]
    subsets = generate_subsets(arr[1:])
    return subsets + [subset + [arr[0]] for subset in subsets]
    # O(2ⁿ) subsets to generate

# Brute force password cracking (k^n)
def crack_password(n, alphabet_size):
    # Try all possible passwords of length n
    # O(k^n) where k is alphabet size
    pass

# Tower of Hanoi
def hanoi(n, source, target, auxiliary):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    hanoi(n - 1, source, auxiliary, target)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n - 1, auxiliary, target, source)
    # T(n) = 2T(n-1) + O(1) = O(2ⁿ)
```

### Optimization: Memoization

```python
# Optimized Fibonacci with memoization: O(n)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]
```

### Common Operations

- Naive recursive Fibonacci
- Generating power set
- Solving Tower of Hanoi
- Brute force solutions to NP-complete problems

---

## O(n!) — Factorial Time

Worst practical complexity. Each element increases operations by a factor of n.

### Examples

```python
# Generate all permutations
def permutations(arr):
    if len(arr) <= 1:
        return [arr]
    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for perm in permutations(rest):
            result.append([arr[i]] + perm)
    return result
    # n! permutations

# Traveling salesman (brute force)
def tsp_brute_force(cities):
    # Try all possible routes
    # O(n!)
    pass

# Solve N-Queens (worst case)
def solve_n_queens(n):
    # Place queens on n×n board
    # O(n!) worst case
    pass
```

### Practical Limits

```
n=5:  120 operations
n=10: 3,628,800 operations
n=15: 1,307,674,368,000 operations
n=20: Forget about it
```

### Common Operations

- Generating all permutations
- Brute force traveling salesman
- Some backtracking problems

---

## Identifying Complexity in Code

### Simple Rules

1. **No loops**: O(1)
2. **One loop**: O(n)
3. **Nested loops**: O(n²), O(n³), etc.
4. **Divide in half repeatedly**: O(log n)
5. **Divide and conquer**: Often O(n log n)
6. **Two branches per call**: Often O(2ⁿ)

### Loop Analysis

```python
# O(n) - single loop
for i in range(n):
    print(i)

# O(n²) - nested loops, both depend on n
for i in range(n):
    for j in range(n):
        print(i, j)

# O(n²) - nested loops, inner depends on outer
for i in range(n):
    for j in range(i, n):  # Still O(n) on average
        print(i, j)

# O(n log n) - outer O(n), inner O(log n)
for i in range(n):
    j = n
    while j > 1:
        j //= 2

# O(log n) - dividing by 2
i = n
while i > 1:
    i //= 2

# O(n) - linear increase despite looking logarithmic
i = 1
while i < n:
    i += 1  # Linear, not i*=2

# O(n) - even though inner loop is O(sqrt(n))
for i in range(n):
    j = 0
    while j * j < n:
        j += 1
```

### Recursive Analysis

Use recurrence relations:

```python
# T(n) = T(n-1) + O(1) → O(n)
def countdown(n):
    if n == 0:
        return
    countdown(n - 1)

# T(n) = T(n/2) + O(1) → O(log n)
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# T(n) = 2T(n/2) + O(n) → O(n log n)
def merge_sort(arr):
    # Splits into two halves (2T(n/2))
    # Merges in O(n)
    pass

# T(n) = 2T(n-1) + O(1) → O(2ⁿ)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

---

## Space Complexity

Big-O also describes memory usage.

### Examples

```python
# O(1) space - constant extra space
def sum_array(arr):
    total = 0  # Only one variable
    for num in arr:
        total += num
    return total

# O(n) space - array copy
def copy_array(arr):
    return arr[:]  # New array of size n

# O(n) space - recursive call stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n calls on stack

# O(log n) space - binary search recursion
def binary_search(arr, target, left, right):
    # log n recursive calls
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, right)
    else:
        return binary_search(arr, target, left, mid - 1)

# O(n) space - merge sort auxiliary array
def merge_sort(arr):
    # Creates O(n) temporary arrays for merging
    pass

# O(n²) space - 2D array
def create_matrix(n):
    return [[0] * n for _ in range(n)]
```

### Space-Time Tradeoff

Often can trade space for time:

```python
# Fibonacci: O(2ⁿ) time, O(n) space (call stack)
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Fibonacci: O(n) time, O(n) space (memoization)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Fibonacci: O(n) time, O(1) space (iterative)
def fib_iterative(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
```

---

## Best, Average, and Worst Case

Algorithms can have different complexities depending on input.

### Example: Quick Sort

- **Best case**: O(n log n) - pivot always divides evenly
- **Average case**: O(n log n) - pivot reasonably balanced
- **Worst case**: O(n²) - pivot always smallest/largest (sorted array)

### Example: Binary Search

- **Best case**: O(1) - target is at middle
- **Average case**: O(log n)
- **Worst case**: O(log n) - target at end or not found

### Big-O vs Big-Ω vs Big-Θ

- **Big-O (O)**: Upper bound (worst case)
- **Big-Ω (Ω)**: Lower bound (best case)
- **Big-Θ (Θ)**: Tight bound (both upper and lower)

Typically use Big-O for worst-case analysis.

---

## Amortized Complexity

Average cost per operation over sequence of operations.

### Example: Dynamic Array (ArrayList)

```python
# append() operation
arr = []
for i in range(n):
    arr.append(i)  # Most appends O(1), occasional O(n) for resize
```

- Most appends: O(1)
- Occasional resize: O(n) (when capacity exceeded)
- **Amortized**: O(1) - resize happens rarely enough

### Resizing Pattern

```
Size:     1 → 2 → 4 → 8 → 16 ...
Cost:     1 + 2 + 4 + 8 + 16 = 31
Total operations: 16
Average: 31/16 ≈ 2 per operation → O(1) amortized
```

---

## Common Data Structure Complexities

| Data Structure | Access | Search | Insert | Delete | Space |
|----------------|--------|--------|--------|--------|-------|
| **Array** | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Dynamic Array** | O(1) | O(n) | O(1)* | O(n) | O(n) |
| **Linked List** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Stack** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Queue** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Hash Table** | — | O(1)* | O(1)* | O(1)* | O(n) |
| **Binary Search Tree** | O(log n)* | O(log n)* | O(log n)* | O(log n)* | O(n) |
| **Heap** | — | O(n) | O(log n) | O(log n) | O(n) |
| **Trie** | O(k) | O(k) | O(k) | O(k) | O(n×k) |

\* = average case; worst case can be worse

---

## Tips for Writing Efficient Code

1. **Avoid nested loops when possible**
   - Can often optimize O(n²) to O(n) with hash tables

2. **Use appropriate data structures**
   - Need fast lookups? Use hash table O(1) not list O(n)

3. **Sort if it helps**
   - Sometimes O(n log n) sort enables O(n) solution
   - Better than O(n²) without sorting

4. **Use binary search on sorted data**
   - O(log n) vs O(n) linear search

5. **Consider space-time tradeoffs**
   - Memoization: use more space to save time
   - Recomputation: use less space but more time

6. **Watch for hidden complexity**
   ```python
   # This is O(n²), not O(n)!
   for i in range(n):
       s = s + str(i)  # String concatenation is O(n)
   
   # Better: O(n)
   parts = []
   for i in range(n):
       parts.append(str(i))
   s = ''.join(parts)
   ```

7. **Optimize bottlenecks first**
   - Identify slowest part with profiling
   - No point optimizing O(n) if O(n²) dominates

---

## Practice Problems

1. What's the complexity?
```python
def mystery(arr):
    n = len(arr)
    for i in range(n):
        for j in range(i, n, 2):
            print(arr[j])
```
Answer: O(n²)

2. What's the complexity?
```python
def mystery2(n):
    i = n
    while i > 0:
        i //= 2
    for j in range(n):
        print(j)
```
Answer: O(n) - O(log n) + O(n) = O(n)

3. Optimize this O(n²) to O(n):
```python
def has_duplicate(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False
```

Answer:
```python
def has_duplicate(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False
```
