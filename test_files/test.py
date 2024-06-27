from math import pi
from typing import Optional

from deprecated import deprecated


# Compute the area of a circle with a function
def calculate_area(radius: float) -> float:
    return pi * (radius**2)


def calculate_areas(radii: list[float]) -> list[float]:
    """Takes a list of radii and computes the areas of their respective circles."""
    return [calculate_area(r) for r in radii]


# Compute the area and circumference via a class
class Circle:
    def __init__(self, radius: float, color: Optional[str] = None):
        assert radius >= 0, "Radius must be a positive number."

        if color is not None and not isinstance(color, str):
            raise ValueError(f"Color must be a string, not type {type(color)}.")

        self.radius = radius
        self.color = color

    def __str__(self) -> str:
        return f"Circle with radius {self.radius}. Area: {self.area()}, Circumference: {self.circumference()}"

    @deprecated("Circle.area is no longer supported. Use calculateArea.", version="2.0")
    def area(self) -> float:
        """Calculate the area of the circle."""
        return pi * self.radius**2

    def circumference(self) -> float:
        """Calculate the circumference of the circle."""
        return 2 * pi * self.radius


def example() -> None:
    rad = 5
    circle = Circle(rad)

    print(circle)


if __name__ == "__main__":
    example()
