---
layout: default
title: Java Abstract Data Types
date: 2026-02-15
category: programming
tags: [java, data-structures, adt]
permalink: /info/java-adts/
---

# Java Abstract Data Types

**Category:** Programming | **Updated:** 2026-02-15

An Abstract Data Type (ADT) defines a data structure by its behaviour (operations) rather than its implementation. Java's Collections Framework provides interfaces (the ADTs) and concrete classes (the implementations).

<!--more-->

---

## Quick Reference

```
Interface        Common Implementations         Ordered?   Duplicates?
─────────        ──────────────────────         ────────   ───────────
List             ArrayList, LinkedList          Yes        Yes
Set              HashSet, TreeSet, LinkedHashSet  Varies   No
Map              HashMap, TreeMap, LinkedHashMap  Varies   Keys: No
Queue            LinkedList, PriorityQueue      FIFO/Priority  Yes
Deque            ArrayDeque, LinkedList          Both ends  Yes
Stack            Stack (legacy), ArrayDeque     LIFO       Yes
```

---

## Collection Hierarchy

```
                    Iterable
                       │
                   Collection
                  ╱    │     ╲
               List   Set    Queue
                       │       │
                  SortedSet  Deque
```

`Map` is separate — it does not extend `Collection`.

---

## List

An ordered collection (sequence) that allows duplicate elements. Elements are accessed by index.

### Interface: `java.util.List<E>`

**Core operations:**

```java
void    add(int index, E element)
E       get(int index)
E       set(int index, E element)
E       remove(int index)
int     indexOf(Object o)
int     size()
List<E> subList(int from, int to)
```

### ArrayList

- Backed by a resizable array
- Fast random access: `O(1)` for `get`/`set`
- Slow inserts/removes in the middle: `O(n)`
- Best for: read-heavy workloads, random access

```java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
String first = names.get(0); // "Alice"
```

### LinkedList

- Backed by a doubly-linked list
- Fast inserts/removes at head/tail: `O(1)`
- Slow random access: `O(n)`
- Also implements `Deque`
- Best for: frequent insertions/deletions, queue/deque usage

```java
List<String> names = new LinkedList<>();
names.add("Alice");
names.addFirst("Bob"); // LinkedList-specific
```

### Complexity Comparison

| Operation | ArrayList | LinkedList |
|-----------|-----------|------------|
| `get(i)` | O(1) | O(n) |
| `add(E)` (end) | O(1) amortised | O(1) |
| `add(i, E)` (middle) | O(n) | O(1)* |
| `remove(i)` | O(n) | O(1)* |
| `contains(E)` | O(n) | O(n) |

*\*O(1) once the position is found; traversal to position is O(n)*

---

## Set

A collection that contains no duplicate elements. Models the mathematical set abstraction.

### Interface: `java.util.Set<E>`

**Core operations:**

```java
boolean add(E e)        // returns false if already present
boolean remove(Object o)
boolean contains(Object o)
int     size()
```

### HashSet

- Backed by a `HashMap`
- No ordering guarantees
- `O(1)` for add, remove, contains (average)
- Best for: fast lookups, uniqueness enforcement

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("java"); // ignored — duplicate
tags.contains("java"); // true
```

### TreeSet

- Backed by a red-black tree (`TreeMap`)
- Elements stored in **sorted order** (natural ordering or `Comparator`)
- `O(log n)` for add, remove, contains
- Implements `SortedSet` and `NavigableSet`
- Best for: sorted iteration, range queries

```java
Set<Integer> sorted = new TreeSet<>();
sorted.add(30);
sorted.add(10);
sorted.add(20);
// Iteration order: 10, 20, 30
```

### LinkedHashSet

- Maintains **insertion order**
- Slightly slower than `HashSet` due to linked list overhead
- Best for: unique elements with predictable iteration order

---

## Map

A mapping from keys to values. Each key maps to at most one value. Not part of the `Collection` interface.

### Interface: `java.util.Map<K, V>`

**Core operations:**

```java
V       put(K key, V value)
V       get(Object key)
V       remove(Object key)
boolean containsKey(Object key)
boolean containsValue(Object value)
int     size()
Set<K>  keySet()
Collection<V> values()
Set<Map.Entry<K,V>> entrySet()
```

### HashMap

- Hash table implementation
- No ordering guarantees
- `O(1)` average for get/put
- Allows one `null` key and multiple `null` values
- Best for: general-purpose key-value storage

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);
int aliceScore = scores.get("Alice"); // 95
```

### TreeMap

- Red-black tree implementation
- Keys stored in **sorted order**
- `O(log n)` for get/put
- Implements `SortedMap` and `NavigableMap`
- Best for: sorted key iteration, range queries

```java
Map<String, Integer> sorted = new TreeMap<>();
sorted.put("Charlie", 72);
sorted.put("Alice", 95);
// Key order: Alice, Charlie
```

### LinkedHashMap

- Maintains **insertion order** (or optionally access order)
- Useful for building LRU caches (access-order mode)

---

## Queue

A collection designed for holding elements prior to processing. Typically FIFO (first-in, first-out).

### Interface: `java.util.Queue<E>`

**Core operations:**

| Operation | Throws exception | Returns special value |
|-----------|-----------------|----------------------|
| Insert | `add(e)` | `offer(e)` |
| Remove | `remove()` | `poll()` |
| Examine | `element()` | `peek()` |

### LinkedList (as Queue)

```java
Queue<String> queue = new LinkedList<>();
queue.offer("first");
queue.offer("second");
String head = queue.poll(); // "first"
```

### PriorityQueue

- Elements ordered by natural ordering or `Comparator`
- **Not FIFO** — highest-priority element is dequeued first
- Backed by a binary heap
- `O(log n)` for offer/poll, `O(1)` for peek
- Best for: task scheduling, Dijkstra's algorithm

```java
Queue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);
pq.poll(); // 10 (smallest first)
```

---

## Deque

A double-ended queue — supports insertion and removal at both ends. Can be used as both a queue (FIFO) and a stack (LIFO).

### Interface: `java.util.Deque<E>`

**Core operations:**

```java
void    addFirst(E e)    /  boolean offerFirst(E e)
void    addLast(E e)     /  boolean offerLast(E e)
E       removeFirst()    /  E pollFirst()
E       removeLast()     /  E pollLast()
E       getFirst()       /  E peekFirst()
E       getLast()        /  E peekLast()

// Stack operations
void    push(E e)        // equivalent to addFirst
E       pop()            // equivalent to removeFirst
```

### ArrayDeque

- Backed by a resizable array
- Faster than `LinkedList` for both stack and queue operations
- No capacity restrictions (grows as needed)
- **Preferred over `Stack`** for LIFO and over `LinkedList` for FIFO
- Best for: stacks, queues, BFS algorithms

```java
Deque<String> stack = new ArrayDeque<>();
stack.push("bottom");
stack.push("top");
String top = stack.pop(); // "top"

Deque<String> queue = new ArrayDeque<>();
queue.offerLast("first");
queue.offerLast("second");
String head = queue.pollFirst(); // "first"
```

---

## Stack (Legacy)

The `java.util.Stack` class extends `Vector` and is considered **legacy**. Use `ArrayDeque` instead.

```java
// Legacy — avoid in new code
Stack<String> stack = new Stack<>();
stack.push("item");
String top = stack.pop();

// Preferred alternative
Deque<String> stack = new ArrayDeque<>();
stack.push("item");
String top = stack.pop();
```

---

## Choosing the Right ADT

| Need | Use |
|------|-----|
| Ordered elements, access by index | `ArrayList` |
| Frequent insert/remove at ends | `LinkedList` or `ArrayDeque` |
| No duplicates, fast lookup | `HashSet` |
| No duplicates, sorted | `TreeSet` |
| Key-value pairs, fast lookup | `HashMap` |
| Key-value pairs, sorted keys | `TreeMap` |
| FIFO processing | `ArrayDeque` (as Queue) |
| LIFO processing | `ArrayDeque` (as Stack) |
| Priority-based processing | `PriorityQueue` |

---

## Thread-Safe Alternatives

For concurrent code, use wrappers or concurrent collections:

```java
// Wrapper approach
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
Map<String, Integer> syncMap = Collections.synchronizedMap(new HashMap<>());

// Concurrent collections (preferred)
ConcurrentHashMap<String, Integer> concMap = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> cowList = new CopyOnWriteArrayList<>();
ConcurrentLinkedQueue<String> concQueue = new ConcurrentLinkedQueue<>();
BlockingQueue<String> blockingQueue = new LinkedBlockingQueue<>();
```

---

## Common Patterns

### Iterating

```java
// For-each (all collections)
for (String item : list) { ... }

// Iterator
Iterator<String> it = set.iterator();
while (it.hasNext()) {
    String item = it.next();
    it.remove(); // safe removal during iteration
}

// Map entry iteration
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
}

// Stream API (Java 8+)
list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .forEach(System.out::println);
```

### Converting Between Collections

```java
// List → Set (remove duplicates)
Set<String> set = new HashSet<>(list);

// Set → List
List<String> list = new ArrayList<>(set);

// Array → List
List<String> list = Arrays.asList(arr);       // fixed-size
List<String> list = new ArrayList<>(Arrays.asList(arr)); // mutable

// List → Array
String[] arr = list.toArray(new String[0]);
```
