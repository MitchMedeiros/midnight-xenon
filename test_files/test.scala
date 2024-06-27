import math.{Pi, pow}


// Compute the area and circumference via a class
class Circle(val radius: Double, val color: Option[String] = None) {
    require(radius >= 0, "Radius must be a positive number.")

    def str(): String = 
        s"Area: ${area()}, Circumference: ${circumference()}"

    @deprecated("Circle.area is deprecated.", "2.0")
    def area(): Double =
        Pi * pow(radius, 2)

    /** For calculating the circumference of the circle. */
    def circumference(): Double =
        2 * Pi * radius
}


def iterators(): Unit =
    var index = 0
    while index < 10 do
        if (index % 2 == 0) then
            println(s"$index: is even")
        index += 1

    for i <- (0 until 5) do
        println(i)


@main
def example(): Unit =
    val rad = 5.0
    val circle = Circle(rad)

    println(circle.str())
