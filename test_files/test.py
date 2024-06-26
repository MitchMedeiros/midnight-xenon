from math import pi, sqrt
from typing import Optional

sqrt_pi = sqrt(pi)


# Compute the area of a circle with a function
def calculate_area(radius: float) -> float:
    return pi * (radius**2)


def calculate_areas(radius: list[float]) -> list[float]:
    """Takes a list of radii and computes the areas of their respective circles."""
    return [calculate_area(r) for r in radius]


# Compute the area and circumference via a class
class Circle:
    def __init__(self, radius: float, color: Optional[str] = None):
        assert radius >= 0, "Radius must be a positive number."

        if color and not isinstance(color, str):
            raise ValueError("Color must be a string.")

        self.radius = radius
        self.color = color

    def __str__(self) -> str:
        return f"Circle with radius {self.radius}. Area: {self.area()}, Circumference: {self.circumference()}"

    def area(self) -> float:
        """Calculate the area of the circle."""
        return pi * self.radius**2

    def circumference(self) -> float:
        """Calculate the circumference of the circle."""
        return 2 * pi * self.radius


def main() -> None:
    rad = 5

    circle = Circle(rad)
    print(circle)


if __name__ == "__main__":
    main()
