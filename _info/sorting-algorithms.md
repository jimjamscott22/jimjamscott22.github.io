---
layout: default
title: Sorting Algorithms
date: 2026-02-15
category: programming
tags: [algorithms, sorting, data-structures]
permalink: /info/sorting-algorithms/
---

# Sorting Algorithms

**Category:** Programming | **Updated:** 2026-02-15

Sorting algorithms arrange elements in a particular order (typically ascending or descending). Understanding their time/space complexity and stability characteristics is crucial for choosing the right algorithm for your use case.

<!--more-->

---

## Quick Comparison Table

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | Method |
|-----------|-----------|--------------|------------|-------|--------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Comparison |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No | Comparison |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Comparison |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Divide & Conquer |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Divide & Conquer |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Comparison |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes | Non-comparison |
| **Radix Sort** | O(d(n+k)) | O(d(n+k)) | O(d(n+k)) | O(n+k) | Yes | Non-comparison |

**Legend:**
- n = number of elements
- k = range of input values
- d = number of digits
- Stable = maintains relative order of equal elements

---

## Bubble Sort

Simple comparison-based algorithm. Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in wrong order.

### How It Works

1. Compare adjacent elements
2. Swap if they're in wrong order
3. Repeat until no swaps needed

### Complexity

- **Time**: O(n²) average and worst, O(n) best (optimized)
- **Space**: O(1)
- **Stable**: Yes

### Implementation

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Optimization: stop if already sorted
            break
    return arr
```

### When to Use

- Educational purposes
- Nearly sorted data (with optimization)
- Small datasets
- Simplicity is priority

**Note**: Generally not used in practice due to poor performance.

---

## Selection Sort

Divides the array into sorted and unsorted portions. Repeatedly finds minimum element from unsorted portion and places it at the end of sorted portion.

### How It Works

1. Find minimum element in unsorted portion
2. Swap with first unsorted element
3. Move boundary of sorted portion
4. Repeat

### Complexity

- **Time**: O(n²) all cases
- **Space**: O(1)
- **Stable**: No (can be made stable with modifications)

### Implementation

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

### When to Use

- Memory writes are expensive (minimum swaps)
- Small datasets
- Simplicity required

**Note**: Makes minimum number of swaps (n-1), useful when swapping is costly.

---

## Insertion Sort

Builds final sorted array one item at a time. Takes each element and inserts it into its correct position in already sorted portion.

### How It Works

1. Start with second element
2. Compare with elements before it
3. Shift larger elements to right
4. Insert element in correct position
5. Repeat

### Complexity

- **Time**: O(n²) average and worst, O(n) best
- **Space**: O(1)
- **Stable**: Yes

### Implementation

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

### When to Use

- Small datasets
- Nearly sorted data
- Online algorithm (can sort as data arrives)
- Used in hybrid algorithms (e.g., Timsort for small subarrays)

**Note**: Efficient for small datasets and performs well when array is nearly sorted.

---

## Merge Sort

Divide and conquer algorithm. Divides array into halves, recursively sorts them, then merges sorted halves.

### How It Works

1. Divide array into two halves
2. Recursively sort each half
3. Merge two sorted halves

### Complexity

- **Time**: O(n log n) all cases
- **Space**: O(n) (requires auxiliary array)
- **Stable**: Yes

### Implementation

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### When to Use

- Guaranteed O(n log n) performance
- Need stable sort
- Have extra space available
- Linked lists (no random access needed)
- External sorting (sorting data on disk)

**Note**: Preferred when stability and consistent performance are required.

---

## Quick Sort

Divide and conquer algorithm. Picks a pivot element and partitions array around it, then recursively sorts partitions.

### How It Works

1. Choose a pivot element
2. Partition: elements < pivot go left, > pivot go right
3. Recursively sort left and right partitions

### Complexity

- **Time**: O(n log n) average, O(n²) worst (rare with good pivot selection)
- **Space**: O(log n) for recursive call stack
- **Stable**: No (typically)

### Implementation

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

### Pivot Selection Strategies

```python
# Last element (simple but can cause O(n²) on sorted data)
pivot = arr[high]

# Random pivot (better average case)
import random
pivot_idx = random.randint(low, high)
arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
pivot = arr[high]

# Median-of-three (good balance)
mid = (low + high) // 2
if arr[low] > arr[mid]:
    arr[low], arr[mid] = arr[mid], arr[low]
if arr[low] > arr[high]:
    arr[low], arr[high] = arr[high], arr[low]
if arr[mid] > arr[high]:
    arr[mid], arr[high] = arr[high], arr[mid]
pivot = arr[high]
```

### When to Use

- General-purpose sorting
- In-place sorting needed
- Average case performance important
- Used in many standard libraries (Python's sorted() uses Timsort, which uses insertion sort for small arrays)

**Note**: Most practical choice for general sorting. Faster than merge sort in practice despite same Big-O.

---

## Heap Sort

Uses binary heap data structure. Builds a max heap, then repeatedly extracts maximum element.

### How It Works

1. Build max heap from array
2. Swap root (maximum) with last element
3. Reduce heap size by 1
4. Heapify root
5. Repeat steps 2-4

### Complexity

- **Time**: O(n log n) all cases
- **Space**: O(1)
- **Stable**: No

### Implementation

```python
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

### When to Use

- Guaranteed O(n log n) performance
- In-place sorting needed (unlike merge sort)
- Memory constrained
- Don't need stability

**Note**: Slower than quicksort in practice but has better worst-case complexity.

---

## Counting Sort

Non-comparison based algorithm. Counts occurrences of each value and uses arithmetic to determine positions.

### How It Works

1. Find range of input (min to max)
2. Count occurrences of each value
3. Calculate cumulative counts
4. Place elements in output array using counts

### Complexity

- **Time**: O(n + k) where k is range of input
- **Space**: O(k)
- **Stable**: Yes (when implemented correctly)

### Implementation

```python
def counting_sort(arr):
    if not arr:
        return arr
    
    # Find range
    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1
    
    # Count occurrences
    count = [0] * range_size
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    # Cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Build output array (stable)
    for num in reversed(arr):
        index = num - min_val
        output[count[index] - 1] = num
        count[index] -= 1
    
    return output
```

### When to Use

- Small range of integers
- k (range) is not much larger than n
- Need stable sort
- Linear time is required

**Note**: Very efficient when range is reasonable. Not comparison-based.

---

## Radix Sort

Non-comparison based algorithm. Sorts numbers digit by digit using a stable sub-sorting algorithm (typically counting sort).

### How It Works

1. Sort by least significant digit (LSD)
2. Move to next digit
3. Repeat until most significant digit

### Complexity

- **Time**: O(d × (n + k)) where d is number of digits
- **Space**: O(n + k)
- **Stable**: Yes (depends on sub-sort)

### Implementation

```python
def radix_sort(arr):
    if not arr:
        return arr
    
    # Find maximum to determine number of digits
    max_val = max(arr)
    
    # Do counting sort for each digit
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    # Count occurrences of digits
    for num in arr:
        index = (num // exp) % 10
        count[index] += 1
    
    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array (stable, process from end)
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    
    # Copy to original array
    for i in range(n):
        arr[i] = output[i]
```

### When to Use

- Integers or strings with fixed length
- Range is very large but number of digits is small
- Need linear time sorting
- Stable sort required

**Note**: Efficient for sorting integers or strings when d is small.

---

## Comparison: Comparison vs Non-Comparison Sorts

### Comparison-Based Sorts

- Compare elements to determine order
- **Lower bound**: O(n log n) for comparison-based algorithms
- Examples: Bubble, Selection, Insertion, Merge, Quick, Heap
- Work on any comparable data

### Non-Comparison-Based Sorts

- Use properties of data (integer values, digits)
- Can achieve linear time O(n)
- Examples: Counting, Radix, Bucket
- Limited to specific data types

---

## Stability

A sort is **stable** if it maintains the relative order of equal elements.

### Example

```
Input:  [(5, "a"), (3, "b"), (5, "c"), (3, "d")]
Sorted: [(3, "b"), (3, "d"), (5, "a"), (5, "c")]  # Stable
        [(3, "d"), (3, "b"), (5, "c"), (5, "a")]  # Unstable
```

**Stable sorts**: Bubble, Insertion, Merge, Counting, Radix

**Unstable sorts**: Selection, Quick (typically), Heap

### Why Stability Matters

```python
# Sorting students by grade, then by name
# Stable sort preserves name order within same grade
students.sort(key=lambda x: x.name)   # First by name
students.sort(key=lambda x: x.grade)  # Then by grade (stable preserves name order)
```

---

## Hybrid Algorithms

Modern sorting implementations often use hybrid approaches:

### Timsort (Python's sorted() and list.sort())

- Merge sort + Insertion sort
- Identifies runs (sorted subsequences)
- Uses insertion sort for small runs
- Merges runs efficiently
- O(n log n) worst case, O(n) best case
- Stable

### Introsort (C++'s std::sort)

- Quick sort + Heap sort + Insertion sort
- Starts with quicksort
- Switches to heapsort if recursion depth exceeds limit (prevents O(n²))
- Uses insertion sort for small partitions
- O(n log n) worst case
- Not stable

---

## Choosing the Right Algorithm

| Scenario | Algorithm | Why |
|----------|-----------|-----|
| **General purpose** | Quick Sort / Timsort | Fast average case, widely used |
| **Guaranteed O(n log n)** | Merge Sort / Heap Sort | No worst case degradation |
| **Need stability** | Merge Sort / Timsort | Maintains relative order |
| **Memory constrained** | Heap Sort / Quick Sort | In-place, O(1) or O(log n) space |
| **Nearly sorted data** | Insertion Sort | O(n) on nearly sorted |
| **Small dataset** | Insertion Sort | Simple, low overhead |
| **Integers, small range** | Counting Sort | Linear time O(n+k) |
| **Integers, large range, few digits** | Radix Sort | Linear time O(d(n+k)) |
| **Linked list** | Merge Sort | No random access needed |
| **External sorting** | Merge Sort | Good for disk-based sorting |

---

## Common Patterns

### Two-Way Partitioning (Quicksort-style)

```python
def partition_by_condition(arr, condition):
    left = 0
    right = len(arr) - 1
    while left <= right:
        if condition(arr[left]):
            left += 1
        else:
            arr[left], arr[right] = arr[right], arr[left]
            right -= 1
```

### Dutch National Flag (3-way partition)

```python
def three_way_partition(arr, pivot):
    low = 0
    mid = 0
    high = len(arr) - 1
    
    while mid <= high:
        if arr[mid] < pivot:
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == pivot:
            mid += 1
        else:
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
```

### Finding Kth Largest (Quickselect)

```python
def quickselect(arr, k):
    # Find kth smallest (0-indexed)
    if len(arr) == 1:
        return arr[0]
    
    pivot = arr[len(arr) // 2]
    lows = [x for x in arr if x < pivot]
    highs = [x for x in arr if x > pivot]
    pivots = [x for x in arr if x == pivot]
    
    if k < len(lows):
        return quickselect(lows, k)
    elif k < len(lows) + len(pivots):
        return pivots[0]
    else:
        return quickselect(highs, k - len(lows) - len(pivots))
```

---

## Performance Considerations

### Cache Efficiency

- Quicksort: Good cache locality (partitioning is sequential)
- Merge sort: Poor cache locality (merging jumps around)
- Heapsort: Poor cache locality (heap operations jump)

### Practical Performance

Despite same Big-O:
- Quicksort usually faster than merge sort
- Merge sort usually faster than heapsort

Reasons:
- Constant factors in Big-O notation
- Cache behavior
- Branch prediction
- Overhead of operations

### Python's Built-in Sort

```python
# Use Python's built-in sort (Timsort) for most cases
arr.sort()                  # In-place
sorted_arr = sorted(arr)    # Returns new list

# Custom key
arr.sort(key=lambda x: x[1])
sorted(arr, reverse=True)

# Multiple keys (stable sort allows this)
arr.sort(key=lambda x: x.name)
arr.sort(key=lambda x: x.grade)  # Preserves name order within grade
```

---

## Testing Your Implementation

```python
import random

def test_sort(sort_func):
    # Empty array
    assert sort_func([]) == []
    
    # Single element
    assert sort_func([1]) == [1]
    
    # Already sorted
    assert sort_func([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    
    # Reverse sorted
    assert sort_func([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
    
    # Duplicates
    assert sort_func([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]
    
    # Random large array
    arr = [random.randint(0, 1000) for _ in range(1000)]
    result = sort_func(arr.copy())
    assert result == sorted(arr)
    
    print("All tests passed!")
```
