package test;

import java.util.Optional;

public class Test {
    private final double radius;
    private final Optional<String> color;

    public Test(double radius, Optional<String> color) {
        if (radius < 0) {
            throw new IllegalArgumentException("Radius must be a positive number.");
        }
        this.radius = radius;
        this.color = null;
    }


    public String str() {
        return "Area: " + area() + ", Circumference: " + circumference();
    }

    @Deprecated
    public double area() {
        return Math.PI * Math.pow(radius, 2);
    }

    /** For calculating the circumference of the circle. */
    public double circumference() {
        return 2 * Math.PI * radius;
    }

    public static void iterators() {
        int index = 0;
        while (index < 10) {
            if (index % 2 == 0) {
                System.out.println(index + ": is even");
            }
            index++;
        }

        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
    }

    public static void main(String[] args) {
        double rad = 5.0;
        Optional<String> color = Optional.empty();
        Test circle = new Test(rad, color);

        System.out.println(circle.str());
    }
}
