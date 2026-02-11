import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal, Github } from 'lucide-react';

const C_CODE = `#include <stdio.h>
#include <stdlib.h>

// --- Struct Definitions ---

// Node definition (Order)
typedef struct node {
    struct node* next;
    int order_number;
    int q; // Quantity
} order;

// Queue definition
// Note: Changed typedef name from 'order' to 'Queue' to avoid naming conflict
typedef struct Queue {
    order *head;
    order *tail;
    int size;
} Queue;

// --- Function Prototypes ---

void initQueue(Queue *q);
void enqueue(Queue *q, int order_number, int quantity);
void dequeue(Queue *q);
void displayQueue(Queue *q);

// --- Main Function ---

int main() {
    Queue myQueue;
    initQueue(&myQueue);

    printf("--- Ramen Queue System (C Implementation) ---\\n\\n");

    // 1. Add orders
    enqueue(&myQueue, 101, 2); // Order #101, 2 items
    enqueue(&myQueue, 102, 1); // Order #102, 1 item
    enqueue(&myQueue, 103, 5); // Order #103, 5 items
    
    displayQueue(&myQueue);

    // 2. Process an order (Dequeue)
    dequeue(&myQueue);
    
    displayQueue(&myQueue);

    // 3. Add another order
    enqueue(&myQueue, 104, 3);
    
    displayQueue(&myQueue);

    return 0;
}

// --- Function Implementations ---

void initQueue(Queue *q) {
    q->head = NULL;
    q->tail = NULL;
    q->size = 0;
}

void enqueue(Queue *q, int order_number, int quantity) {
    // 1. Allocate memory for new node
    order *newNode = (order*)malloc(sizeof(order));
    if (newNode == NULL) {
        printf("Memory allocation failed\\n");
        return;
    }
    
    // 2. Set data
    newNode->order_number = order_number;
    newNode->q = quantity;
    newNode->next = NULL;

    // 3. Update links
    if (q->head == NULL) {
        // Queue is empty
        q->head = newNode;
        q->tail = newNode;
    } else {
        // Add to the end
        q->tail->next = newNode;
        q->tail = newNode;
    }
    
    q->size++;
    printf("[Enqueue] Order #%d (Qty: %d) added.\\n", order_number, quantity);
}

void dequeue(Queue *q) {
    if (q->head == NULL) {
        printf("[Error] Queue is empty, cannot dequeue.\\n");
        return;
    }

    // 1. Save pointer to head
    order *temp = q->head;
    
    printf("[Dequeue] Processing Order #%d (Qty: %d)...\\n", temp->order_number, temp->q);

    // 2. Move head to next
    q->head = q->head->next;

    // 3. If queue becomes empty, update tail
    if (q->head == NULL) {
        q->tail = NULL;
    }

    // 4. Free memory and update size
    free(temp);
    q->size--;
}

void displayQueue(Queue *q) {
    order *current = q->head;
    printf("\\nCurrent Queue (Size: %d):\\nHEAD -> ", q->size);
    
    while (current != NULL) {
        printf("[#%d|Q:%d] -> ", current->order_number, current->q);
        current = current->next;
    }
    printf("NULL\\n\\n");
}
`;

export default function App() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(C_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-6">
          <div className="bg-blue-600 p-3 rounded-lg">
            <FileCode className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Ramen Queue System</h1>
            <p className="text-gray-400 text-sm">C Implementation (Linked List)</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700 text-sm flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Terminal className="text-green-400 mt-1 shrink-0" size={18} />
            <div>
              <p className="text-gray-300">
                The following code implements the queue structure.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 border-t border-gray-700 pt-3">
            <Github className="text-white mt-1 shrink-0" size={18} />
            <div>
              <p className="text-gray-300 font-semibold mb-1">Running on GitHub</p>
              <p className="text-gray-400">
                This repository includes a <code>.github/workflows</code> configuration. 
                <br/>
                When you push this code to GitHub, go to the <strong>Actions</strong> tab to see the C code compile and run automatically!
              </p>
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div className="relative group rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-gray-700">
          
          {/* Toolbar */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-xs font-mono text-gray-400">main.c</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-700 transition-colors text-xs font-medium text-gray-300 border border-gray-600 hover:border-gray-500"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighter Simulation (Simple Pre) */}
          <div className="overflow-x-auto p-4">
            <pre className="font-mono text-sm leading-relaxed text-gray-300">
              {C_CODE.split('\n').map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell text-right pr-4 text-gray-600 select-none w-8">{i + 1}</span>
                  <span className="table-cell whitespace-pre">{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}