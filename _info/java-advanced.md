---
layout: default
title: Java Advanced
date: 2026-05-22
category: programming
tags: [java, advanced, streams, concurrency, generics, records]
permalink: /info/java-advanced/
---

# Java Advanced

**Category:** Programming | **Updated:** 2026-05-22

Beyond the basics: streams, lambdas, records, sealed classes, pattern matching, concurrency, the memory model, and modern Java idioms (Java 17–21 LTS).

<!--more-->

---

## Lambdas and Functional Interfaces

A **functional interface** has exactly one abstract method. Lambdas are anonymous implementations of one.

```java
@FunctionalInterface
interface Transformer<T, R> {
    R apply(T input);
}

Transformer<String, Integer> length = s -> s.length();
length.apply("hello");        // 5
```

### Built-in Functional Interfaces (`java.util.function`)

| Interface           | Signature          | Use                    |
|---------------------|--------------------|------------------------|
| `Function<T, R>`    | `R apply(T)`       | Transform              |
| `Predicate<T>`      | `boolean test(T)`  | Filter                 |
| `Consumer<T>`       | `void accept(T)`   | Side effect            |
| `Supplier<T>`       | `T get()`          | Lazy producer          |
| `BiFunction<T,U,R>` | `R apply(T, U)`    | Two-arg transform      |
| `UnaryOperator<T>`  | `T apply(T)`       | Same-type transform    |

### Method References

```java
names.forEach(System.out::println);
list.stream().map(String::toUpperCase);
people.stream().map(Person::new);          // constructor reference
```

---

## Streams API

Declarative, lazy pipelines over collections.

```java
import java.util.stream.*;

List<String> names = List.of("Ada", "Grace", "Linus", "Anita");

List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .toList();                              // [ADA, ANITA]
```

### Intermediate Operations (lazy)

`filter`, `map`, `flatMap`, `distinct`, `sorted`, `limit`, `skip`, `peek`

### Terminal Operations (eager)

`forEach`, `toList`, `count`, `reduce`, `collect`, `findFirst`, `anyMatch`

### Collectors

```java
import static java.util.stream.Collectors.*;

Map<Department, List<Employee>> byDept = employees.stream()
    .collect(groupingBy(Employee::department));

Map<Department, Double> avgSalary = employees.stream()
    .collect(groupingBy(Employee::department,
                        averagingDouble(Employee::salary)));

String csv = names.stream().collect(joining(", "));
```

### Parallel Streams

```java
long count = items.parallelStream()
    .filter(this::expensive)
    .count();
```

Good for CPU-bound, large datasets, stateless operations. Avoid for I/O, small data, or stateful pipelines.

---

## Optional

Express absence without `null`.

```java
Optional<User> user = repo.findById(id);
user.ifPresent(u -> log.info(u.name()));
String name = user.map(User::name).orElse("unknown");
User found = user.orElseThrow(() -> new NotFoundException(id));
```

**Don't** use `Optional` for fields or method parameters — it's designed as a return type.

---

## Records (Java 16+)

Concise immutable data carriers.

```java
public record Point(double x, double y) {
    // automatic: constructor, accessors, equals, hashCode, toString

    // compact constructor for validation
    public Point {
        if (Double.isNaN(x) || Double.isNaN(y))
            throw new IllegalArgumentException();
    }

    // static factory
    public static Point origin() { return new Point(0, 0); }
}
```

---

## Sealed Classes (Java 17+)

Restrict which types can extend or implement.

```java
public sealed interface Shape permits Circle, Square, Triangle {}

public record Circle(double r) implements Shape {}
public record Square(double side) implements Shape {}
public record Triangle(double a, double b, double c) implements Shape {}
```

Pairs well with pattern matching for exhaustive checks.

---

## Pattern Matching (Java 21+)

```java
// instanceof pattern
if (obj instanceof String s && s.length() > 0) {
    System.out.println(s.toUpperCase());
}

// switch pattern with sealed types
double area = switch (shape) {
    case Circle c    -> Math.PI * c.r() * c.r();
    case Square s    -> s.side() * s.side();
    case Triangle t  -> heron(t);
};                                   // exhaustive — no default needed

// record deconstruction
if (point instanceof Point(double x, double y)) {
    System.out.println(x + ", " + y);
}
```

---

## Generics Deep Dive

### Bounded Wildcards (PECS)

> **P**roducer **E**xtends, **C**onsumer **S**uper

```java
// Read from (producer) — use ? extends
void printAll(List<? extends Number> nums) {
    for (Number n : nums) System.out.println(n);
}

// Write to (consumer) — use ? super
void addInts(List<? super Integer> dst) {
    dst.add(42);
}
```

### Type Erasure Consequences

```java
// Doesn't compile
public <T> T create() { return new T(); }   // can't instantiate T
if (xs instanceof List<String>) { ... }     // can't check parameterized

// Workaround: pass a Class<T>
public <T> T create(Class<T> cls) throws Exception {
    return cls.getDeclaredConstructor().newInstance();
}
```

---

## Concurrency

### Threads

```java
Thread t = new Thread(() -> doWork());
t.start();
t.join();
```

### Executors

```java
ExecutorService pool = Executors.newFixedThreadPool(8);
Future<Integer> future = pool.submit(() -> compute());
int result = future.get();
pool.shutdown();
```

### CompletableFuture

```java
CompletableFuture.supplyAsync(this::fetchA)
    .thenCombine(CompletableFuture.supplyAsync(this::fetchB),
                 (a, b) -> a + b)
    .thenAccept(System.out::println)
    .exceptionally(ex -> { log.error("fail", ex); return null; });
```

### Virtual Threads (Java 21+)

Lightweight threads, millions feasible. Ideal for blocking I/O.

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i ->
        executor.submit(() -> handle(i))
    );
}
```

### Synchronization Primitives

- `synchronized` — intrinsic lock
- `ReentrantLock` — explicit lock with `tryLock`, fairness
- `ReadWriteLock` — many readers, one writer
- `Semaphore` — permit-based
- `CountDownLatch` / `CyclicBarrier` — coordination
- `volatile` — visibility (not atomicity)
- `AtomicInteger`, `AtomicReference`, ... — lock-free CAS operations

---

## The Java Memory Model

- Without synchronization, writes from one thread aren't guaranteed visible to another
- `volatile` provides **visibility** but not atomicity (use `AtomicXxx` for compound ops)
- `synchronized` blocks provide both visibility and mutual exclusion
- `final` fields are safely published after the constructor returns

---

## Concurrent Collections (`java.util.concurrent`)

| Class                       | Use                                         |
|-----------------------------|---------------------------------------------|
| `ConcurrentHashMap`         | Default concurrent map                      |
| `CopyOnWriteArrayList`      | Many reads, rare writes                     |
| `BlockingQueue`             | Producer/consumer (LinkedBlockingQueue, ArrayBlockingQueue) |
| `ConcurrentLinkedQueue`     | Lock-free FIFO                              |

Avoid `Hashtable`, `Vector`, `Collections.synchronizedXxx` for high-contention work.

---

## NIO and Modern I/O

```java
Path path = Path.of("data.txt");
String text = Files.readString(path);
List<String> lines = Files.readAllLines(path);
Files.writeString(path, "hello");

try (Stream<String> lines = Files.lines(path)) {
    lines.filter(l -> !l.isBlank()).forEach(System.out::println);
}
```

### HTTP Client (Java 11+)

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest req = HttpRequest.newBuilder(URI.create("https://api.example.com"))
    .header("Accept", "application/json")
    .build();
HttpResponse<String> resp = client.send(req, BodyHandlers.ofString());
```

---

## Reflection and Annotations

```java
Class<?> cls = obj.getClass();
Method m = cls.getDeclaredMethod("doIt", String.class);
m.setAccessible(true);
m.invoke(obj, "arg");

// Custom annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Timed {}
```

Use sparingly — reflection is slow, breaks encapsulation, and fights the type system.

---

## Modules (JPMS, Java 9+)

`module-info.java`:

```java
module com.example.app {
    requires java.net.http;
    requires com.fasterxml.jackson.databind;

    exports com.example.app.api;
    opens com.example.app.model to jackson.databind;
}
```

---

## Build and Tooling

- **Maven** — `pom.xml`, declarative, mature
- **Gradle** — Groovy/Kotlin DSL, faster incremental builds
- **JUnit 5 + AssertJ** — testing
- **Mockito** — mocking
- **JaCoCo** — coverage
- **SpotBugs / ErrorProne** — static analysis
- **GraalVM native-image** — AOT compilation to native binaries

---

## See Also

- [Java Basics](/info/java-basics/)
- [Java Abstract Data Types](/info/java-adts/)
- [Design Patterns](/info/design-patterns/)
- [Big-O Notation](/info/big-o-notation/)
