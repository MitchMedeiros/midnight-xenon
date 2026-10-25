// Line comment
/* Block comment */
/// Doc comment.
/// - Parameter radius: The radius of the circle.
/// - Returns: The computed area.

import Foundation
import SwiftUI
@testable import Xenon

let pi: Double = 3.14159
var counter = 0
let hex = 0xff, binary = 0b1010, octal = 0o755, big = 1_000_000
let exp = 1.5e-3
let flag = true
let nothing: String? = nil
let text = "tab\t newline\n unicode \u{00e9}"
let interpolated = "Value: \(counter + 1) and \(text)"
let multiline = """
    Multi-line
    string
    """
let raw = #"raw "string" \n"#
let pattern = /[a-z]+@\w+/
let names: [String] = ["a", "b"]
let lookup: [String: Int] = ["one": 1, "two": 2]
let tuple: (id: Int, name: String) = (1, "xenon")

typealias Handler = (Int) -> Void

enum Direction: String, CaseIterable {
    case up = "UP"
    case down
    case left, right

    var opposite: Direction {
        switch self {
        case .up: return .down
        case .down: return .up
        default: return self
        }
    }
}

enum NetworkError: Error {
    case timeout(seconds: Int)
    case invalid(String)
}

protocol Shape {
    var area: Double { get }
    func describe() -> String
}

extension Shape {
    func describe() -> String {
        return "Shape with area \(area)"
    }
}

struct Point: Equatable, Hashable {
    var x: Double
    var y: Double

    static let origin = Point(x: 0, y: 0)

    mutating func move(dx: Double, dy: Double) {
        x += dx
        y += dy
    }
}

class Circle: Shape {
    private let radius: Double
    private(set) var label: String = "circle"
    lazy var cached: Double = { self.radius * 2 }()

    var area: Double {
        return pi * radius * radius
    }

    init(radius: Double) {
        self.radius = radius
    }

    deinit {
        print("deinit")
    }

    convenience init() {
        self.init(radius: 1)
    }

    func scaled(by factor: Double) -> Circle {
        return Circle(radius: radius * factor)
    }

    static func unit() -> Circle {
        Circle(radius: 1)
    }
}

final class Stack<Element: Equatable> {
    private var items: [Element] = []

    func push(_ item: Element) {
        items.append(item)
    }

    func pop() -> Element? {
        items.popLast()
    }
}

struct ContentView: View {
    @State private var count = 0
    @Binding var name: String

    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Add") { count += 1 }
        }
    }
}

actor Counter {
    private var value = 0

    func increment() -> Int {
        value += 1
        return value
    }
}

func fetch(from url: URL) async throws -> Data {
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}

func divide(_ a: Int, by b: Int) throws -> Int {
    guard b != 0 else {
        throw NetworkError.invalid("zero")
    }
    return a / b
}

func apply(_ values: [Int], transform: (Int) -> Int = { $0 * 2 }) -> [Int] {
    return values.map(transform)
}

func generic<T: Comparable>(_ a: T, _ b: T) -> T where T: Hashable {
    return a > b ? a : b
}

let circle = Circle(radius: 3)
var point = Point(x: 1, y: 2)
point.move(dx: 1, dy: 1)

for i in 0..<3 {
    if i == 1 && !flag || i > 5 {
        continue
    } else if i == 2 {
        break
    }
}

for (index, name) in names.enumerated() {
    print(index, name)
}

while counter < 3 {
    counter += 1
}

repeat {
    counter -= 1
} while counter > 0

switch counter {
case 0:
    print("zero")
case 1...5 where flag:
    print("small")
default:
    print("other")
}

if let value = nothing, !value.isEmpty {
    print(value)
}

do {
    let result = try divide(4, by: 2)
    print(result)
} catch NetworkError.timeout(let seconds) {
    print(seconds)
} catch {
    print(error)
}

let sorted = names.sorted { $0 > $1 }
let doubled = [1, 2, 3].map { $0 * 2 }.filter { $0 > 2 }
let optionalChain = circle.label.count
let forced = nothing!
let coalesced = nothing ?? "default"
let casted = circle as? Shape

#if DEBUG
print("debug")
#endif

defer { print("done") }
