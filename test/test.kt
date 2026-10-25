// Line comment
/* Block comment */
/**
 * Doc comment.
 * @param radius The radius of the circle.
 * @return The computed area.
 */

package com.example.xenon

import java.util.UUID
import kotlin.math.PI
import kotlinx.coroutines.*
import kotlin.collections.List as KList

const val LIMIT: Int = 10
val pi: Double = 3.14159
var counter = 0
val hex = 0xff
val binary = 0b1010
val big = 1_000_000L
val float = 1.5f
val exp = 1.5e-3
val flag = true
val nothing: String? = null
val letter = 'x'
val text = "tab\t newline\n unicode é"
val interpolated = "Value: ${counter + 1} and $text"
val multiline = """
    Multi-line
    string
""".trimIndent()
val names: List<String> = listOf("a", "b")
val lookup: Map<String, Int> = mapOf("one" to 1, "two" to 2)

typealias Handler = (Int) -> Unit

enum class Direction(val label: String) {
    UP("up"),
    DOWN("down");

    fun opposite(): Direction = if (this == UP) DOWN else UP
}

sealed class Result {
    data class Success(val value: Int) : Result()
    data class Failure(val error: Throwable) : Result()
    object Loading : Result()
}

interface Shape {
    val area: Double
    fun describe(): String = "Shape with area $area"
}

annotation class Tracked

data class Point(val x: Double, val y: Double) {
    companion object {
        val ORIGIN = Point(0.0, 0.0)
    }

    operator fun plus(other: Point) = Point(x + other.x, y + other.y)
}

@Tracked
open class Circle(private val radius: Double) : Shape {
    override val area: Double
        get() = PI * radius * radius

    var label: String = "circle"
        private set

    lateinit var cache: String
    val lazyValue: Int by lazy { 42 }

    init {
        println("created $label")
    }

    constructor() : this(1.0)

    fun scaled(factor: Double): Circle = Circle(radius * factor)

    override fun describe(): String {
        return super.describe() + "!"
    }
}

class Stack<T : Comparable<T>> {
    private val items = mutableListOf<T>()

    fun push(item: T) = items.add(item)

    fun pop(): T? = items.removeLastOrNull()
}

object Registry {
    private val entries = mutableMapOf<String, Int>()

    fun register(key: String, value: Int) {
        entries[key] = value
    }
}

fun String.shout(): String = this.uppercase() + "!"

inline fun <reified T> typeName(): String = T::class.simpleName ?: "unknown"

suspend fun fetch(url: String): String {
    delay(100)
    return url
}

fun divide(a: Int, b: Int): Int {
    require(b != 0) { "zero" }
    return a / b
}

fun apply(values: List<Int>, transform: (Int) -> Int = { it * 2 }): List<Int> {
    return values.map(transform)
}

fun main(args: Array<String>) {
    val circle = Circle(3.0)
    var point = Point(1.0, 2.0)
    point = point + Point(1.0, 1.0)
    val (x, y) = point

    for (i in 0 until 3) {
        if (i == 1 && !flag || i > 5) {
            continue
        } else if (i == 2) {
            break
        }
    }

    for ((index, name) in names.withIndex()) {
        println("$index $name")
    }

    while (counter < 3) {
        counter++
    }

    do {
        counter--
    } while (counter > 0)

    when (counter) {
        0 -> println("zero")
        in 1..5 -> println("small")
        is Int -> println("int")
        else -> println("other")
    }

    nothing?.let { println(it) }
    val length = nothing?.length ?: 0
    val forced = nothing!!
    val casted = circle as? Shape

    try {
        divide(4, 0)
    } catch (e: IllegalArgumentException) {
        println(e.message)
    } finally {
        println("done")
    }

    val sorted = names.sortedByDescending { it.length }
    val doubled = listOf(1, 2, 3).map { it * 2 }.filter { it > 2 }

    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) continue@outer
        }
    }

    runBlocking {
        launch { println(fetch("url")) }
    }
}
