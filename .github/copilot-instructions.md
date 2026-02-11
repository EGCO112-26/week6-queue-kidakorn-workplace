# Copilot Instructions for Queue Implementation

## Project Overview
This is a C-based Queue (FIFO) data structure implementation assignment. The project implements a linked-list-backed queue with two parallel approaches:
1. **Pointer-based**: Direct head/tail pointer manipulation in `Node.h`
2. **Struct-based**: Encapsulated queue with metadata in `Queue.h`

## Architecture

### Core Components

**Node.h** - Node structure and pointer-based queue operations:
- `struct node`: Contains `int data` and `struct node *nextPtr`
- `enqueue(NodePtr *head, NodePtr *tail, int x)`: Adds element to queue tail
  - Allocates new node, updates tail pointer
  - Empty queue: sets both head and tail to new node
- `dequeue(NodePtr *head, NodePtr *tail)`: Removes and returns element from head
  - **INCOMPLETE**: Missing head pointer update and tail reset for empty queue

**Queue.h** - Struct-encapsulated queue:
- `struct Queue`: Wraps `headPtr`, `tailPtr`, and `int size` (tracks count)
- `enqueue_struct()` and `dequeue_struct()`: Parallel implementations using Queue struct
- **INCOMPLETE**: Both functions have `/*Finish enqueue*/` and `/*Finish dequeue*/` comments marking missing logic

**main.c** - CLI test harness:
- Accepts command-line arguments: numbers enqueue, "x" dequeues
- Example: `./Q 1 2 3 x 4 x` enqueues 1,2,3, dequeues, enqueues 4, dequeues
- Currently calls `enqueue_struct()` but passes raw pointers (bug)

### Data Flow
```
Command-line args → main() → enqueue/dequeue operations → Output to stdout
```

## Developer Workflows

### Building
```bash
make argument  # Compiles main.c → Q executable
make run       # Executes compiled Q program
```

### Testing
Manually invoke with arguments:
```bash
./Q 10 20 x 30 x x
# Enqueues 10, 20 → dequeues 10 → enqueues 30 → dequeues 20 → dequeues 30
```

### Common Implementation Patterns Found

**Memory Management**:
- All nodes allocated with `malloc(sizeof(Node))`
- Check `if(new_node)` before using allocated memory
- No explicit free() calls (potential memory leak in full implementation)

**Head/Tail Pointer Convention**:
- Empty queue: `head == NULL && tail == NULL`
- Single element: `head == tail` points to that node
- Multiple elements: `head` points to first, `tail` to last

**Dequeue Edge Cases**:
- Empty queue: Print "Empty queue" and return 0
- Last element: Must reset both head and tail to NULL

## Critical Implementation Gaps

### Node.h - dequeue()
Lines 34-48 show incomplete pattern. Must add after `int value = t->data`:
```c
*head = t->nextPtr;      // Advance head pointer
if(*head == NULL)        // If queue now empty
    *tail = NULL;        // Reset tail too
free(t);                 // Deallocate removed node
```

### Queue.h - enqueue_struct()
Missing node allocation and Queue state update:
```c
new_node->data = x;
new_node->nextPtr = NULL;
if(q->tailPtr) {
    q->tailPtr->nextPtr = new_node;
    q->tailPtr = new_node;
} else {
    q->headPtr = new_node;
    q->tailPtr = new_node;
}
q->size++;
```

### Queue.h - dequeue_struct()
Mirror dequeue() pattern but also update:
```c
*head = t->nextPtr;
if(*head == NULL) *tail = NULL;
q->size--;
free(t);
```

### main.c Bug
Line ~23: `enqueue_struct(&headPtr, &tailPtr, ...)` receives raw pointers but Queue struct expected. Should either:
1. Create Queue struct and pass `&q`, or
2. Revert to `enqueue(&headPtr, &tailPtr, ...)`

## Build Command Reference
- `gcc` is available on PATH
- Output goes to `Q` executable (hardcoded in makefile)
- No optimization flags or warnings enabled

## Key Decisions & Why
- **Linked-list over array**: Unlimited capacity, no resizing needed
- **Head + Tail pointers**: O(1) dequeue (head) and enqueue (tail)
- **Size field in struct**: Optional but useful for analytics
- **Incomplete code pattern**: Educational scaffolding for students to implement

## Testing Checklist When Completing Implementation
- ✓ Enqueue followed by dequeue returns correct value
- ✓ Multiple enqueue-dequeue sequences maintain FIFO order
- ✓ Empty queue operations print "Empty queue" and don't crash
- ✓ Single element queue handled correctly
- ✓ Memory released via free() (check with valgrind if available)
