#ifndef Node_h
#define Node_h

#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    struct node* next;
    int order_number;
    int q;
} order;

void enqueue(order** head, order** tail, int order_number, int q) {
    order* new_node = (order*)malloc(sizeof(order));
    if (new_node) {
        new_node->order_number = order_number;
        new_node->q = q;
        new_node->next = NULL;
        if (*tail) {
            (*tail)->next = new_node;
            *tail = new_node;
        } else {
            *head = new_node;
            *tail = new_node;
        }
    }
}

int dequeue(order** head, order** tail) {
    order* t = *head;
    if (t) {
        int value = t->order_number;
        *head = t->next;
        if (*head == NULL)
            *tail = NULL;
        free(t);
        return value;
    }
    printf("Empty queue\n");
    return 0;
}

#endif