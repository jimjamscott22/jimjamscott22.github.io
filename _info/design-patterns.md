---
layout: default
title: Software Design Patterns
date: 2026-02-15
category: programming
tags: [design-patterns, oop, software-engineering]
permalink: /info/design-patterns/
---

# Software Design Patterns

**Category:** Programming | **Updated:** 2026-02-15

Design patterns are reusable solutions to common problems in software design. They represent best practices refined over time by experienced developers. This reference covers the classic Gang of Four (GoF) patterns organized by type: Creational, Structural, and Behavioral.

<!--more-->

---

## Quick Reference Table

| Pattern | Type | Purpose | Use When |
|---------|------|---------|----------|
| **Singleton** | Creational | One instance only | Global access to single object |
| **Factory Method** | Creational | Defer instantiation to subclasses | Unknown object types at compile time |
| **Abstract Factory** | Creational | Families of related objects | Need consistent interface families |
| **Builder** | Creational | Construct complex objects step-by-step | Many constructor parameters |
| **Prototype** | Creational | Clone existing objects | Expensive object creation |
| **Adapter** | Structural | Make incompatible interfaces work | Need to use existing class with incompatible interface |
| **Bridge** | Structural | Separate abstraction from implementation | Avoid permanent binding |
| **Composite** | Structural | Tree structure of objects | Part-whole hierarchies |
| **Decorator** | Structural | Add behavior dynamically | Need to add responsibilities to individual objects |
| **Facade** | Structural | Simplified interface to complex system | Simplify complex subsystem |
| **Proxy** | Structural | Surrogate for another object | Control access to object |
| **Observer** | Behavioral | Notify dependents of state changes | One-to-many dependencies |
| **Strategy** | Behavioral | Encapsulate algorithms | Multiple interchangeable algorithms |
| **Command** | Behavioral | Encapsulate requests as objects | Parameterize objects with operations |
| **Iterator** | Behavioral | Sequential access to elements | Traverse collection without exposing representation |
| **State** | Behavioral | Change behavior based on state | Behavior depends on state |
| **Template Method** | Behavioral | Define algorithm skeleton | Common algorithm with varying steps |
| **Chain of Responsibility** | Behavioral | Pass request along chain | Multiple objects might handle request |

---

# Creational Patterns

Patterns for object creation mechanisms, increasing flexibility and reuse.

---

## Singleton

**Intent**: Ensure a class has only one instance and provide global access to it.

### Use Cases

- Database connections
- Configuration managers
- Logging services
- Thread pools
- Caches

### Implementation (Python)

```python
class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

class DatabaseConnection(Singleton):
    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.connection = "Database Connection"
            self.initialized = True
    
    def query(self, sql):
        return f"Executing: {sql}"

# Usage
db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(db1 is db2)  # True - same instance
```

### Implementation (Java)

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {
        // Private constructor
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Thread-safe version
public class ThreadSafeSingleton {
    private static volatile ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {}
    
    public static ThreadSafeSingleton getInstance() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}
```

### Pros & Cons

✅ Controlled access to sole instance  
✅ Reduced namespace pollution  
✅ Permits refinement through subclassing  

❌ Difficult to test (global state)  
❌ Violates Single Responsibility Principle  
❌ Can hide bad design  

---

## Factory Method

**Intent**: Define an interface for creating objects, but let subclasses decide which class to instantiate.

### Use Cases

- Framework libraries
- When class can't anticipate object types to create
- Delegating responsibility to helper subclasses

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class AnimalFactory:
    def create_animal(self, animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else:
            raise ValueError(f"Unknown animal type: {animal_type}")

# Usage
factory = AnimalFactory()
dog = factory.create_animal("dog")
cat = factory.create_animal("cat")
print(dog.speak())  # Woof!
print(cat.speak())  # Meow!
```

### Implementation (Java)

```java
interface Animal {
    String speak();
}

class Dog implements Animal {
    public String speak() {
        return "Woof!";
    }
}

class Cat implements Animal {
    public String speak() {
        return "Meow!";
    }
}

abstract class AnimalFactory {
    abstract Animal createAnimal();
    
    public void makeSound() {
        Animal animal = createAnimal();
        System.out.println(animal.speak());
    }
}

class DogFactory extends AnimalFactory {
    Animal createAnimal() {
        return new Dog();
    }
}

class CatFactory extends AnimalFactory {
    Animal createAnimal() {
        return new Cat();
    }
}
```

---

## Abstract Factory

**Intent**: Provide an interface for creating families of related or dependent objects without specifying concrete classes.

### Use Cases

- UI toolkits (Windows, Mac, Linux)
- Database drivers (MySQL, PostgreSQL)
- Cross-platform applications

### Implementation (Python)

```python
from abc import ABC, abstractmethod

# Abstract products
class Button(ABC):
    @abstractmethod
    def render(self):
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self):
        pass

# Concrete products - Windows
class WindowsButton(Button):
    def render(self):
        return "Rendering Windows button"

class WindowsCheckbox(Checkbox):
    def render(self):
        return "Rendering Windows checkbox"

# Concrete products - Mac
class MacButton(Button):
    def render(self):
        return "Rendering Mac button"

class MacCheckbox(Checkbox):
    def render(self):
        return "Rendering Mac checkbox"

# Abstract factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self):
        pass
    
    @abstractmethod
    def create_checkbox(self):
        pass

# Concrete factories
class WindowsFactory(GUIFactory):
    def create_button(self):
        return WindowsButton()
    
    def create_checkbox(self):
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self):
        return MacButton()
    
    def create_checkbox(self):
        return MacCheckbox()

# Usage
def create_ui(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    print(button.render())
    print(checkbox.render())

# Client code
import sys
if sys.platform == "win32":
    factory = WindowsFactory()
else:
    factory = MacFactory()

create_ui(factory)
```

---

## Builder

**Intent**: Separate construction of complex object from its representation, allowing same construction process to create different representations.

### Use Cases

- Complex object construction with many optional parameters
- Immutable objects
- Step-by-step construction

### Implementation (Python)

```python
class Pizza:
    def __init__(self):
        self.size = None
        self.cheese = False
        self.pepperoni = False
        self.mushrooms = False
        self.olives = False
    
    def __str__(self):
        toppings = []
        if self.cheese: toppings.append("cheese")
        if self.pepperoni: toppings.append("pepperoni")
        if self.mushrooms: toppings.append("mushrooms")
        if self.olives: toppings.append("olives")
        return f"{self.size} pizza with {', '.join(toppings)}"

class PizzaBuilder:
    def __init__(self):
        self.pizza = Pizza()
    
    def set_size(self, size):
        self.pizza.size = size
        return self
    
    def add_cheese(self):
        self.pizza.cheese = True
        return self
    
    def add_pepperoni(self):
        self.pizza.pepperoni = True
        return self
    
    def add_mushrooms(self):
        self.pizza.mushrooms = True
        return self
    
    def add_olives(self):
        self.pizza.olives = True
        return self
    
    def build(self):
        return self.pizza

# Usage
pizza = (PizzaBuilder()
         .set_size("large")
         .add_cheese()
         .add_pepperoni()
         .add_mushrooms()
         .build())
print(pizza)  # large pizza with cheese, pepperoni, mushrooms
```

### Implementation (Java)

```java
public class User {
    private final String firstName;
    private final String lastName;
    private final int age;
    private final String phone;
    private final String address;
    
    private User(UserBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.phone = builder.phone;
        this.address = builder.address;
    }
    
    public static class UserBuilder {
        private final String firstName;  // Required
        private final String lastName;   // Required
        private int age = 0;             // Optional
        private String phone = "";       // Optional
        private String address = "";     // Optional
        
        public UserBuilder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        
        public UserBuilder age(int age) {
            this.age = age;
            return this;
        }
        
        public UserBuilder phone(String phone) {
            this.phone = phone;
            return this;
        }
        
        public UserBuilder address(String address) {
            this.address = address;
            return this;
        }
        
        public User build() {
            return new User(this);
        }
    }
}

// Usage
User user = new User.UserBuilder("John", "Doe")
    .age(30)
    .phone("555-1234")
    .build();
```

---

## Prototype

**Intent**: Specify kinds of objects to create using prototypical instance, and create new objects by copying this prototype.

### Use Cases

- Object creation is expensive
- Avoid subclasses of object creator
- Keep number of classes minimal

### Implementation (Python)

```python
import copy

class Prototype:
    def clone(self):
        return copy.deepcopy(self)

class Shape(Prototype):
    def __init__(self, x, y, color):
        self.x = x
        self.y = y
        self.color = color
    
    def __str__(self):
        return f"{self.__class__.__name__} at ({self.x}, {self.y}) - {self.color}"

class Circle(Shape):
    def __init__(self, x, y, color, radius):
        super().__init__(x, y, color)
        self.radius = radius
    
    def __str__(self):
        return f"Circle at ({self.x}, {self.y}) - {self.color}, radius: {self.radius}"

# Usage
original = Circle(0, 0, "red", 5)
clone = original.clone()
clone.x = 10
clone.color = "blue"

print(original)  # Circle at (0, 0) - red, radius: 5
print(clone)     # Circle at (10, 0) - blue, radius: 5
```

---

# Structural Patterns

Patterns for assembling objects and classes into larger structures.

---

## Adapter

**Intent**: Convert interface of a class into another interface clients expect. Allows classes with incompatible interfaces to work together.

### Use Cases

- Legacy code integration
- Third-party library adaptation
- Interface standardization

### Implementation (Python)

```python
# Existing interface (Adaptee)
class EuropeanSocket:
    def voltage(self):
        return 230
    
    def live(self):
        return 1
    
    def neutral(self):
        return -1

# Target interface
class USASocket:
    def voltage(self):
        return 120
    
    def live(self):
        return 1
    
    def neutral(self):
        return -1

# Adapter
class SocketAdapter(USASocket):
    def __init__(self, socket):
        self.socket = socket
    
    def voltage(self):
        return 120  # Convert 230V to 120V
    
    def live(self):
        return self.socket.live()
    
    def neutral(self):
        return self.socket.neutral()

# Usage
euro_socket = EuropeanSocket()
adapter = SocketAdapter(euro_socket)
print(f"Voltage: {adapter.voltage()}V")  # 120V
```

---

## Decorator

**Intent**: Attach additional responsibilities to object dynamically. Provides flexible alternative to subclassing for extending functionality.

### Use Cases

- Add responsibilities to individual objects
- Withdraw responsibilities
- Avoid explosion of subclasses

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Coffee(ABC):
    @abstractmethod
    def cost(self):
        pass
    
    @abstractmethod
    def description(self):
        pass

class SimpleCoffee(Coffee):
    def cost(self):
        return 2.0
    
    def description(self):
        return "Simple coffee"

class CoffeeDecorator(Coffee):
    def __init__(self, coffee):
        self._coffee = coffee
    
    def cost(self):
        return self._coffee.cost()
    
    def description(self):
        return self._coffee.description()

class MilkDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.5
    
    def description(self):
        return self._coffee.description() + ", milk"

class SugarDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.2
    
    def description(self):
        return self._coffee.description() + ", sugar"

# Usage
coffee = SimpleCoffee()
print(f"{coffee.description()}: ${coffee.cost()}")

coffee_with_milk = MilkDecorator(coffee)
print(f"{coffee_with_milk.description()}: ${coffee_with_milk.cost()}")

coffee_deluxe = SugarDecorator(MilkDecorator(SimpleCoffee()))
print(f"{coffee_deluxe.description()}: ${coffee_deluxe.cost()}")
```

---

## Facade

**Intent**: Provide unified interface to set of interfaces in subsystem. Defines higher-level interface that makes subsystem easier to use.

### Use Cases

- Simplify complex subsystems
- Layer system design
- Decouple subsystem from clients

### Implementation (Python)

```python
# Complex subsystem classes
class CPU:
    def freeze(self):
        print("CPU: Freezing")
    
    def jump(self, position):
        print(f"CPU: Jumping to {position}")
    
    def execute(self):
        print("CPU: Executing")

class Memory:
    def load(self, position, data):
        print(f"Memory: Loading data at {position}")

class HardDrive:
    def read(self, sector, size):
        return f"Data from sector {sector}"

# Facade
class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()
    
    def start(self):
        print("Computer starting...")
        self.cpu.freeze()
        self.memory.load(0, self.hard_drive.read(0, 1024))
        self.cpu.jump(0)
        self.cpu.execute()
        print("Computer started!")

# Usage - simple interface
computer = ComputerFacade()
computer.start()
```

---

## Proxy

**Intent**: Provide surrogate or placeholder for another object to control access to it.

### Types

- **Virtual Proxy**: Lazy initialization
- **Protection Proxy**: Access control
- **Remote Proxy**: Remote object representation
- **Smart Proxy**: Additional actions when accessing object

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Image(ABC):
    @abstractmethod
    def display(self):
        pass

class RealImage(Image):
    def __init__(self, filename):
        self.filename = filename
        self._load_from_disk()
    
    def _load_from_disk(self):
        print(f"Loading image: {self.filename}")
    
    def display(self):
        print(f"Displaying: {self.filename}")

class ImageProxy(Image):
    def __init__(self, filename):
        self.filename = filename
        self._real_image = None
    
    def display(self):
        if self._real_image is None:
            self._real_image = RealImage(self.filename)
        self._real_image.display()

# Usage
image = ImageProxy("large_photo.jpg")
# Image not loaded yet
print("Image proxy created")
# Image loaded on first access
image.display()
# Image already loaded, no reload
image.display()
```

---

# Behavioral Patterns

Patterns for algorithms and assignment of responsibilities between objects.

---

## Observer

**Intent**: Define one-to-many dependency so when one object changes state, all dependents are notified and updated automatically.

### Use Cases

- Event handling systems
- MVC frameworks
- Pub/sub systems

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass

class Subject:
    def __init__(self):
        self._observers = []
        self._state = None
    
    def attach(self, observer):
        self._observers.append(observer)
    
    def detach(self, observer):
        self._observers.remove(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self)
    
    @property
    def state(self):
        return self._state
    
    @state.setter
    def state(self, value):
        self._state = value
        self.notify()

class ConcreteObserver(Observer):
    def __init__(self, name):
        self.name = name
    
    def update(self, subject):
        print(f"{self.name} notified. New state: {subject.state}")

# Usage
subject = Subject()
observer1 = ConcreteObserver("Observer 1")
observer2 = ConcreteObserver("Observer 2")

subject.attach(observer1)
subject.attach(observer2)

subject.state = "State A"
# Output:
# Observer 1 notified. New state: State A
# Observer 2 notified. New state: State A
```

---

## Strategy

**Intent**: Define family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets algorithm vary independently from clients.

### Use Cases

- Multiple algorithms for same task
- Conditional statements with many branches
- Different behavior variants

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def pay(self, amount):
        print(f"Paid ${amount} with credit card {self.card_number}")

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email
    
    def pay(self, amount):
        print(f"Paid ${amount} with PayPal account {self.email}")

class BitcoinPayment(PaymentStrategy):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address
    
    def pay(self, amount):
        print(f"Paid ${amount} with Bitcoin wallet {self.wallet_address}")

class ShoppingCart:
    def __init__(self):
        self.items = []
        self.payment_strategy = None
    
    def add_item(self, item, price):
        self.items.append((item, price))
    
    def set_payment_strategy(self, strategy):
        self.payment_strategy = strategy
    
    def checkout(self):
        total = sum(price for _, price in self.items)
        self.payment_strategy.pay(total)

# Usage
cart = ShoppingCart()
cart.add_item("Laptop", 1000)
cart.add_item("Mouse", 25)

cart.set_payment_strategy(CreditCardPayment("1234-5678-9012-3456"))
cart.checkout()  # Paid $1025 with credit card

cart.set_payment_strategy(PayPalPayment("user@email.com"))
cart.checkout()  # Paid $1025 with PayPal
```

---

## Command

**Intent**: Encapsulate request as object, allowing parameterization of clients with different requests, queuing, logging, and undoable operations.

### Use Cases

- Undo/redo functionality
- Transaction systems
- Macro recording
- Job queues

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self):
        pass
    
    @abstractmethod
    def undo(self):
        pass

class Light:
    def on(self):
        print("Light is ON")
    
    def off(self):
        print("Light is OFF")

class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light
    
    def execute(self):
        self.light.on()
    
    def undo(self):
        self.light.off()

class LightOffCommand(Command):
    def __init__(self, light):
        self.light = light
    
    def execute(self):
        self.light.off()
    
    def undo(self):
        self.light.on()

class RemoteControl:
    def __init__(self):
        self.history = []
    
    def execute_command(self, command):
        command.execute()
        self.history.append(command)
    
    def undo_last(self):
        if self.history:
            command = self.history.pop()
            command.undo()

# Usage
light = Light()
light_on = LightOnCommand(light)
light_off = LightOffCommand(light)

remote = RemoteControl()
remote.execute_command(light_on)   # Light is ON
remote.execute_command(light_off)  # Light is OFF
remote.undo_last()                 # Light is ON (undo off)
```

---

## Iterator

**Intent**: Provide way to access elements of aggregate object sequentially without exposing underlying representation.

### Implementation (Python)

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

class BookCollection:
    def __init__(self):
        self.books = []
    
    def add_book(self, book):
        self.books.append(book)
    
    def __iter__(self):
        return BookIterator(self.books)

class BookIterator:
    def __init__(self, books):
        self._books = books
        self._index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self._index < len(self._books):
            book = self._books[self._index]
            self._index += 1
            return book
        raise StopIteration

# Usage
collection = BookCollection()
collection.add_book(Book("1984", "George Orwell"))
collection.add_book(Book("Brave New World", "Aldous Huxley"))

for book in collection:
    print(f"{book.title} by {book.author}")
```

---

## State

**Intent**: Allow object to alter behavior when internal state changes. Object will appear to change its class.

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class State(ABC):
    @abstractmethod
    def handle(self, context):
        pass

class LockedState(State):
    def handle(self, context):
        print("Phone is locked. Unlocking...")
        context.state = UnlockedState()

class UnlockedState(State):
    def handle(self, context):
        print("Phone is unlocked. Locking...")
        context.state = LockedState()

class Phone:
    def __init__(self):
        self.state = LockedState()
    
    def press_button(self):
        self.state.handle(self)

# Usage
phone = Phone()
phone.press_button()  # Phone is locked. Unlocking...
phone.press_button()  # Phone is unlocked. Locking...
phone.press_button()  # Phone is locked. Unlocking...
```

---

## Template Method

**Intent**: Define skeleton of algorithm in operation, deferring some steps to subclasses. Lets subclasses redefine certain steps without changing algorithm structure.

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class DataMiner(ABC):
    def mine(self, path):
        """Template method"""
        data = self.open_file(path)
        raw_data = self.extract_data(data)
        analysis = self.analyze(raw_data)
        self.send_report(analysis)
        self.close_file(data)
    
    @abstractmethod
    def open_file(self, path):
        pass
    
    @abstractmethod
    def extract_data(self, file):
        pass
    
    def analyze(self, data):
        """Default implementation"""
        return f"Analyzing: {data}"
    
    def send_report(self, analysis):
        """Default implementation"""
        print(f"Report: {analysis}")
    
    @abstractmethod
    def close_file(self, file):
        pass

class CSVDataMiner(DataMiner):
    def open_file(self, path):
        print(f"Opening CSV file: {path}")
        return f"CSV_FILE:{path}"
    
    def extract_data(self, file):
        print("Extracting CSV data")
        return "CSV_DATA"
    
    def close_file(self, file):
        print("Closing CSV file")

class JSONDataMiner(DataMiner):
    def open_file(self, path):
        print(f"Opening JSON file: {path}")
        return f"JSON_FILE:{path}"
    
    def extract_data(self, file):
        print("Extracting JSON data")
        return "JSON_DATA"
    
    def close_file(self, file):
        print("Closing JSON file")

# Usage
csv_miner = CSVDataMiner()
csv_miner.mine("data.csv")
```

---

## Chain of Responsibility

**Intent**: Avoid coupling sender of request to receiver by giving more than one object chance to handle request. Chain receiving objects and pass request along chain until object handles it.

### Implementation (Python)

```python
from abc import ABC, abstractmethod

class Handler(ABC):
    def __init__(self):
        self._next_handler = None
    
    def set_next(self, handler):
        self._next_handler = handler
        return handler
    
    @abstractmethod
    def handle(self, request):
        if self._next_handler:
            return self._next_handler.handle(request)
        return None

class AuthenticationHandler(Handler):
    def handle(self, request):
        if not request.get("authenticated"):
            print("Authentication failed")
            return False
        print("Authentication successful")
        return super().handle(request)

class AuthorizationHandler(Handler):
    def handle(self, request):
        if not request.get("authorized"):
            print("Authorization failed")
            return False
        print("Authorization successful")
        return super().handle(request)

class ValidationHandler(Handler):
    def handle(self, request):
        if not request.get("valid"):
            print("Validation failed")
            return False
        print("Validation successful")
        return super().handle(request)

# Usage
auth = AuthenticationHandler()
authz = AuthorizationHandler()
valid = ValidationHandler()

auth.set_next(authz).set_next(valid)

request1 = {"authenticated": True, "authorized": True, "valid": True}
auth.handle(request1)

request2 = {"authenticated": True, "authorized": False, "valid": True}
auth.handle(request2)  # Stops at authorization
```

---

## Pattern Relationships

### Patterns That Work Together

- **Adapter + Facade**: Adapter adapts interface, Facade simplifies
- **Strategy + Template Method**: Strategy uses composition, Template Method uses inheritance
- **Composite + Iterator**: Iterator traverses Composite structure
- **Observer + Mediator**: Both decouple objects, Mediator centralizes communication
- **Decorator + Composite**: Both use recursive composition
- **Command + Memento**: Command stores state for undo using Memento

### Pattern Selection Guide

**Creating Objects:**
- Many configurations → Builder
- Runtime type → Factory Method
- Families of objects → Abstract Factory
- Clone expensive objects → Prototype
- Single instance → Singleton

**Connecting Objects:**
- Incompatible interfaces → Adapter
- Simplified interface → Facade
- Control access → Proxy
- Add behavior → Decorator
- Tree structures → Composite

**Behavior:**
- Algorithm selection → Strategy
- State-dependent behavior → State
- Notify many → Observer
- Encapsulate request → Command
- Algorithm steps → Template Method
- Chain handlers → Chain of Responsibility

---

## Anti-Patterns to Avoid

1. **God Object**: Object knows/does too much
2. **Spaghetti Code**: Unstructured, tangled code
3. **Golden Hammer**: Using same solution for everything
4. **Premature Optimization**: Optimizing before needed
5. **Copy-Paste Programming**: Duplicating code instead of abstracting
6. **Not Invented Here**: Refusing external solutions
7. **Analysis Paralysis**: Over-analyzing, never implementing

---

## SOLID Principles

Design patterns support SOLID principles:

**S** - Single Responsibility Principle  
**O** - Open/Closed Principle  
**L** - Liskov Substitution Principle  
**I** - Interface Segregation Principle  
**D** - Dependency Inversion Principle

Most patterns help achieve one or more SOLID principles.

---

## When to Use Patterns

✅ **Use patterns when:**
- Problem clearly matches pattern
- Benefits outweigh complexity
- Team understands pattern
- Need proven solution

❌ **Avoid patterns when:**
- Simpler solution exists
- Over-engineering
- Pattern doesn't fit problem
- Just learned pattern (resist hammer syndrome)

**Remember**: Patterns are tools, not rules. Don't force them.
