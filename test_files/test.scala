import math.{Pi, pow, sqrt}

val sqrtPi = sqrt(Pi)
val someString = "testing"

// Compute the area of a circle with a function
def calculateArea(radius: Double): Double =
    Pi * pow(radius, 2)

/** Takes a list of radii and computes the areas of their respective circles. */
def calculateAreas(radii: List[Double]): List[Double] =
    radii.map(calculateArea)

// Compute the area and circumference via a class
class Circle(val radius: Double, val color: Option[String] = None) {
    require(radius >= 0, "Radius must be a positive number.")

    def print(): String = 
        s"Circle with radius $radius. Area: ${area()}, Circumference: ${circumference()}"

    /** For Calculating the area of the circle. */
    @deprecated("Circle.area is no longer supported. Use calculateArea.", "2.0")
    def area(): Double =
        Pi * pow(radius, 2)

    def circumference(): Double =
        2 * Pi * radius
}


@main
def example(): Unit =
    val rad = 5.0
    val circle = Circle(rad)
    println(circle.print())

    var index = 0.0
    while index < 10.0 do
        if (index % 2.0 == 0.0) then
            println(s"Area of circle with radius $index: ${calculateArea(index)}")
        index += 1.0

    for i <- (0 until 5) do
        println(s"Area of circle with radius $i: ${calculateArea(i.toDouble)}")
