#include <stdio.h>
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

    int choice, order_number, quantity;
    int nextOrderId = 101;

    printf("\n");
    printf("╔════════════════════════════════════════╗\n");
    printf("║   🍜 Ramen Queue System 🍜             ║\n");
    printf("║   (C Implementation)                   ║\n");
    printf("╚════════════════════════════════════════╝\n\n");

    while (1) {
        printf("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        printf("What would you like to do?\n");
        printf("1. Add Order (Enqueue)\n");
        printf("2. Process Order (Dequeue)\n");
        printf("3. View Queue\n");
        printf("4. Exit\n");
        printf("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        printf("Enter your choice (1-4): ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                // Enqueue
                printf("\nEnter quantity for order #%d: ", nextOrderId);
                scanf("%d", &quantity);
                
                if (quantity > 0) {
                    enqueue(&myQueue, nextOrderId, quantity);
                    nextOrderId++;
                } else {
                    printf("[Error] Quantity must be positive!\n");
                }
                break;

            case 2:
                // Dequeue
                dequeue(&myQueue);
                break;

            case 3:
                // Display
                displayQueue(&myQueue);
                break;

            case 4:
                // Exit
                printf("\nThank you for using Ramen Queue System!\n");
                printf("╚════════════════════════════════════════╝\n\n");
                return 0;

            default:
                printf("[Error] Invalid choice! Please enter 1-4.\n");
        }
    }

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
        printf("Memory allocation failed\n");
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
    printf("[Enqueue] Order #%d (Qty: %d) added.\n", order_number, quantity);
}

void dequeue(Queue *q) {
    if (q->head == NULL) {
        printf("[Error] Queue is empty, cannot dequeue.\n");
        return;
    }

    // 1. Save pointer to head
    order *temp = q->head;
    
    printf("[Dequeue] Processing Order #%d (Qty: %d)...\n", temp->order_number, temp->q);

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
    printf("\nCurrent Queue (Size: %d):\nHEAD -> ", q->size);
    
    while (current != NULL) {
        printf("[#%d|Q:%d] -> ", current->order_number, current->q);
        current = current->next;
    }
    printf("NULL\n\n");
}