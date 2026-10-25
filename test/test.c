// Line comment
/* Block comment */
/**
 * Doc comment.
 * @param radius The radius of the circle.
 * @return The computed area.
 */

#include <stdio.h>
#include <stdlib.h>
#include "shapes.h"

#define PI 3.14159
#define SQUARE(x) ((x) * (x))
#define DEBUG

#ifdef DEBUG
#define LOG(msg) printf("%s\n", msg)
#else
#define LOG(msg)
#endif

#ifndef MAX_SIZE
#define MAX_SIZE 100
#endif

typedef unsigned int uint;
typedef struct Point Point;

enum Direction {
    UP = 1,
    DOWN,
    LEFT = 4,
    RIGHT,
};

struct Point {
    double x;
    double y;
    const char *label;
};

typedef struct {
    Point center;
    double radius;
    unsigned int flags : 4;
} Circle;

union Value {
    int i;
    float f;
    char bytes[4];
};

typedef int (*Operation)(int, int);

static const int LIMIT = 10;
extern int shared_counter;
volatile int ticks = 0;

static int add(int a, int b) {
    return a + b;
}

double area(const Circle *circle) {
    return PI * circle->radius * circle->radius;
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(int argc, char *argv[]) {
    int hex = 0xff, octal = 0755, binary = 0b1010;
    long big = 123456789L;
    unsigned long ubig = 42UL;
    float f = 1.5f;
    double d = 1.5e-3;
    char letter = 'x';
    char newline = '\n';
    const char *text = "tab\t newline\n hex \x41 octal \101";
    char buffer[MAX_SIZE] = {0};
    int numbers[] = {1, 2, 3};
    void *nothing = NULL;
    _Bool flag = 1;

    Circle circle = {.center = {0.0, 0.0}, .radius = 3.0};
    Circle *ptr = &circle;
    ptr->radius += 1;

    Operation op = add;
    printf("%d %s %.2f\n", op(1, 2), text, area(ptr));
    LOG("started");

    for (int i = 0; i < 3; i++) {
        if (i == 1 && !flag || i > 5) {
            continue;
        } else if (i == 2) {
            break;
        }
    }

    while (hex > 0) {
        hex--;
    }

    do {
        hex++;
    } while (hex < 3);

    switch (argc) {
        case 1:
            puts("one");
            break;
        default:
            puts("many");
    }

    int *data = malloc(sizeof(int) * 10);
    if (data == NULL) {
        goto cleanup;
    }
    data[0] = hex << 2 | octal & 0x0f;

cleanup:
    free(data);
    return flag ? EXIT_SUCCESS : EXIT_FAILURE;
}
