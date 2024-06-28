from math import pi
from typing import Optional

from deprecated import deprecated


# Compute the area and circumference via a class
class Circle:
    def __init__(self, radius: float, color: Optional[str] = None):
        assert radius >= 0, "Radius must be a positive number."

        self.radius = radius
        self.color = color

    def __str__(self) -> str:
        return f"Area: {self.area()}, Circumference: {self.circumference()}"

    @deprecated("Circle.area is deprecated.", version="2.0")
    def area(self) -> float:
        return pi * self.radius**2

    def circumference(self) -> float:
        """For calculating the circumference of the circle."""
        return 2 * pi * self.radius


def iterators() -> None:
    index = 0
    while index < 10:
        if index % 2 == 0:
            print(f"{index}: is even")
        index += 1

    for i in range(5):
        print(i)


def python_conditionals(color) -> None:
    if color is not None and not isinstance(color, str):
        raise ValueError(f"Color must be a string, not type {type(color)}.")


def example() -> None:
    rad = 5.0
    circle = Circle(rad)

    print(circle)


if __name__ == "__main__":
    example()
