// Line comment
/* Block comment */
/**
 * Doc comment.
 * @param radius The radius of the circle.
 * @return The computed area.
 */

#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include "shapes.hpp"

#define SQUARE(x) ((x) * (x))

using namespace std;
using std::string;
using Id = unsigned long;

namespace xenon::shapes {

constexpr double PI = 3.14159;
static const int LIMIT = 10;

enum class Direction : int {
    Up = 1,
    Down,
    Left = 4,
    Right,
};

struct Point {
    double x;
    double y;
};

class Shape {
public:
    explicit Shape(std::string name) : name_(std::move(name)) {
        ++count_;
    }
    virtual ~Shape() = default;

    virtual double area() const = 0;
    virtual std::string describe() const {
        return name_ + " with area " + std::to_string(area());
    }

    static int count() { return count_; }

protected:
    std::string name_;

private:
    static inline int count_ = 0;
};

class Circle final : public Shape {
public:
    explicit Circle(double radius) : Shape("circle"), radius_(radius) {}

    double area() const override {
        return PI * this->radius_ * this->radius_;
    }

    Circle operator+(const Circle &other) const {
        return Circle(radius_ + other.radius_);
    }

private:
    double radius_;
};

template <typename T, std::size_t N = 4>
class Stack {
public:
    void push(const T &item) { items_.push_back(item); }

    T pop() {
        T item = items_.back();
        items_.pop_back();
        return item;
    }

private:
    std::vector<T> items_;
};

template <typename T>
concept Numeric = std::is_arithmetic_v<T>;

template <Numeric T>
T add(T a, T b) {
    return a + b;
}

}  // namespace xenon::shapes

int main(int argc, char *argv[]) {
    int hex = 0xff, octal = 0755, binary = 0b1010, big = 1'000'000;
    long l = 10L;
    float f = 1.5f;
    double d = 1.5e-3;
    char letter = 'x';
    std::string text = "tab\t newline\n unicode é";
    std::string raw = R"(raw "string")";
    bool flag = true;
    void *nothing = nullptr;
    auto numbers = std::vector<int>{1, 2, 3};
    auto [first, second] = std::pair{1, 2};

    auto circle = std::make_unique<xenon::shapes::Circle>(3.0);
    std::cout << circle->describe() << std::endl;

    auto square = [](int x) -> int { return x * x; };
    auto capture = [&, hex](int y) mutable { return y + hex; };

    for (const auto &n : numbers) {
        if (n > 1 && !flag || n == 3) {
            continue;
        } else if (n > 5) {
            break;
        }
    }

    for (int i = 0; i < 3; ++i) {
        hex += i;
    }

    while (hex > 0) {
        hex--;
    }

    switch (argc) {
        case 1:
            std::cout << "one\n";
            break;
        default:
            std::cout << "many\n";
    }

    try {
        throw std::runtime_error("error");
    } catch (const std::exception &e) {
        std::cerr << e.what() << std::endl;
    }

    int *raw_ptr = new int(5);
    delete raw_ptr;

    auto *derived = dynamic_cast<xenon::shapes::Circle *>(circle.get());
    int casted = static_cast<int>(3.5) + sizeof(int);
    return flag ? 0 : 1;
}
