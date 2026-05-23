---
layout: default
title: Java Basics
date: 2026-05-22
category: programming
tags: [java, basics, syntax, oop, reference]
permalink: /info/java-basics/
---

# Java Basics

**Category:** Programming | **Updated:** 2026-05-22

A reference for the core Java language: types, syntax, classes, control flow, and the conventions you'll use in every program.

<!--more-->

---

## Hello, World

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

- **One public class per file**, matching the filename (`Hello.java`)
- `main` is the JVM entry point
- Compile with `javac Hello.java`, run with `java Hello`
- Java 11+ supports `java Hello.java` directly (single-file mode)

---

## Primitive Types

| Type      | Size    | Range / Notes                                   |
|-----------|---------|-------------------------------------------------|
| `byte`    | 8-bit   | -128 to 127                                     |
| `short`   | 16-bit  | -32,768 to 32,767                               |
| `int`     | 32-bit  | ~±2.1 billion (default integer type)            |
| `long`    | 64-bit  | suffix `L` literal: `100L`                      |
| `float`   | 32-bit  | suffix `f`: `3.14f`                             |
| `double`  | 64-bit  | default floating point                          |
| `char`    | 16-bit  | single Unicode character: `'A'`                 |
| `boolean` | 1 bit\* | `true` / `false`                                |

Primitives are **value types** (not objects). Each has a boxed wrapper (`Integer`, `Long`, `Boolean`, ...).

```java
int a = 42;
Integer boxed = a;        // autoboxing
int back = boxed;         // unboxing
```

---

## Variables

```java
int count = 0;
final double PI = 3.14159;       // constant
var name = "Ada";                 // type inferred (Java 10+, local only)
```

`final` makes a variable assignable exactly once — a value can't be reassigned, but its referenced object can still be mutated.

---

## Strings

Strings are immutable objects.

```java
String s = "hello";
s.length();              // 5
s.charAt(0);             // 'h'
s.substring(1, 4);       // "ell"
s.toUpperCase();         // "HELLO"
s.equals("HELLO");       // false  (use .equals, NOT ==)
"a,b,c".split(",");      // ["a", "b", "c"]
String.join("-", "a", "b", "c");  // "a-b-c"

// Concatenation in a loop: use StringBuilder
StringBuilder sb = new StringBuilder();
for (String part : parts) sb.append(part);
String result = sb.toString();

// Text blocks (Java 15+)
String json = """
    {
      "name": "Ada"
    }
    """;
```

**Always use `.equals()` for string comparison** — `==` checks reference identity.

---

## Operators

```java
// Arithmetic
7 / 2          // 3   (integer division)
7 % 2          // 1
7.0 / 2        // 3.5

// Comparison
a == b         // identity for objects, value for primitives
a.equals(b)    // value equality for objects

// Logical
&&  ||  !      // short-circuit
&   |   ^      // bitwise (also non-short-circuit boolean)

// Increment
i++   ++i      // post / pre
```

---

## Control Flow

```java
// if / else if / else
if (score >= 90) grade = 'A';
else if (score >= 80) grade = 'B';
else grade = 'C';

// switch (classic)
switch (day) {
    case MONDAY: case TUESDAY:
        work(); break;
    case SATURDAY:
        relax(); break;
    default:
        sleep();
}

// switch expression (Java 14+)
String label = switch (day) {
    case SATURDAY, SUNDAY -> "weekend";
    case MONDAY -> "ugh";
    default -> "weekday";
};

// for
for (int i = 0; i < 10; i++) { ... }

// enhanced for (for-each)
for (String name : names) { ... }

// while / do-while
while (cond) { ... }
do { ... } while (cond);
```

---

## Arrays

Fixed-size, zero-indexed.

```java
int[] nums = new int[5];          // {0, 0, 0, 0, 0}
int[] xs = {1, 2, 3, 4};
xs.length;                         // 4
xs[0] = 99;

// 2D array
int[][] grid = new int[3][3];

// Helpful utilities
import java.util.Arrays;
Arrays.sort(xs);
Arrays.toString(xs);              // "[1, 2, 3, 4]"
```

For dynamic-size sequences, use `ArrayList`. See [Java ADTs](/info/java-adts/).

---

## Classes and Objects

```java
public class Person {
    private final String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

Person p = new Person("Ada", 36);
```

### Access Modifiers

| Modifier    | Class | Package | Subclass | World |
|-------------|-------|---------|----------|-------|
| `public`    | Yes   | Yes     | Yes      | Yes   |
| `protected` | Yes   | Yes     | Yes      | No    |
| (default)   | Yes   | Yes     | No       | No    |
| `private`   | Yes   | No      | No       | No    |

### `static`

Belongs to the class, not an instance:

```java
public class MathUtils {
    public static final double TAU = 6.283;
    public static int square(int x) { return x * x; }
}

MathUtils.square(5);
```

---

## Inheritance

```java
public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void speak() { System.out.println("..."); }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public void speak() { System.out.println("Woof!"); }
}
```

- Single inheritance only (one `extends`)
- All classes implicitly extend `Object`
- Use `@Override` to catch typos at compile time

---

## Interfaces

```java
public interface Shape {
    double area();                    // implicitly public abstract

    default String describe() {       // default method (Java 8+)
        return "Area = " + area();
    }
}

public class Circle implements Shape {
    private final double r;
    public Circle(double r) { this.r = r; }
    @Override
    public double area() { return Math.PI * r * r; }
}
```

A class can `implements` multiple interfaces (multiple inheritance of type).

---

## Enums

```java
public enum Direction {
    NORTH, SOUTH, EAST, WEST;

    public Direction opposite() {
        return switch (this) {
            case NORTH -> SOUTH;
            case SOUTH -> NORTH;
            case EAST  -> WEST;
            case WEST  -> EAST;
        };
    }
}
```

---

## Exception Handling

```java
try {
    risky();
} catch (IOException e) {
    log.error("IO failed", e);
} catch (RuntimeException e) {
    log.error("Runtime", e);
} finally {
    cleanup();
}

// try-with-resources (auto-close)
try (BufferedReader r = Files.newBufferedReader(path)) {
    return r.readLine();
}
```

- **Checked** exceptions (subclass `Exception`): must be declared with `throws` or caught
- **Unchecked** exceptions (subclass `RuntimeException`): no declaration required

---

## Generics

```java
List<String> names = new ArrayList<>();   // diamond <> infers
Map<String, Integer> ages = new HashMap<>();

public class Box<T> {
    private T value;
    public T get() { return value; }
    public void set(T value) { this.value = value; }
}

// Bounded
public <T extends Comparable<T>> T max(List<T> xs) { ... }
```

Generics are **erased** at runtime — you can't do `new T()` or `instanceof T`.

---

## Packages and Imports

```java
package com.example.app;

import java.util.List;
import java.util.ArrayList;
import static java.lang.Math.PI;     // static import
```

Directory layout must match the package: `com/example/app/Foo.java`.

---

## Common Conventions

- **Classes**: `PascalCase`
- **Methods / variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Packages**: `lowercase.dotted`
- Indent with 4 spaces (Sun/Oracle convention)
- Brace style: opening brace on the same line

---

## See Also

- [Java Abstract Data Types](/info/java-adts/) — Collections framework
- [Java Advanced](/info/java-advanced/) — streams, generics deep-dive, concurrency, records
- [Design Patterns](/info/design-patterns/)
