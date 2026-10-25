# frozen_string_literal: true

# Line comment
=begin
Block comment
=end

require 'json'
require_relative 'helpers'
include Comparable

module Xenon
  PI = 3.14159
  LIMIT = 10

  module Describable
    def describe
      "#{self.class.name} with area #{area}"
    end
  end

  class Shape
    include Describable
    extend Forwardable

    attr_reader :name
    attr_accessor :label

    @@count = 0
    SIDES = 0

    def self.count
      @@count
    end

    def initialize(name = 'shape', *rest, **options, &block)
      @name = name
      @label = options.fetch(:label, nil)
      @@count += 1
    end

    def area
      raise NotImplementedError, 'Not implemented'
    end

    def <=>(other)
      area <=> other.area
    end

    def to_s
      "#{@name} (#{format('%.2f', area)})"
    end

    protected

    def secret
      42
    end

    private

    def hidden?
      true
    end
  end

  class Circle < Shape
    def initialize(radius)
      super('circle')
      @radius = radius
    end

    def area
      PI * @radius**2
    end

    class << self
      def unit
        new(1)
      end
    end
  end

  Point = Struct.new(:x, :y) do
    def distance
      Math.sqrt(x**2 + y**2)
    end
  end
end

counter = 0
hex = 0xff
binary = 0b1010
octal = 0o755
big = 1_000_000
float = 1.5e-3
rational = 3r
flag = true
nothing = nil
name = 'xenon'
escaped = "tab\t newline\n unicode é hex \x41"
interpolated = "Value: #{counter + 1} and #{name}"
symbol = :xenon
quoted_symbol = :"with space"
heredoc = <<~TEXT
  Heredoc with #{name}
  and #{counter}
TEXT
pattern = /^(?<user>[a-z]+)@(\w+)\.com$/i
words = %w[a b c]
symbols = %i[a b c]
lookup = { 'one' => 1, two: 2, "three": 3 }
range = (1..10)
exclusive = (1...10)
first, *rest = words
a, b = b, a

circle = Xenon::Circle.new(3)
puts circle.describe
puts Xenon::Shape.count
puts circle.respond_to?(:area) && !circle.nil?

[1, 2, 3].each do |n|
  next if n == 1
  puts n
end

doubled = [1, 2, 3].map { |n| n * 2 }.select(&:even?)
squared = ->(x) { x * x }
adder = lambda do |a, b|
  a + b
end
squared.call(2)
squared.(2)

for i in 0..2
  counter += i
end

while counter < 3
  counter += 1
end

until counter.zero?
  counter -= 1
end

loop do
  break
end

if counter.positive? and !flag
  puts 'positive'
elsif counter.zero? or flag
  puts 'zero'
else
  puts 'negative'
end

puts 'unless' unless flag
status = flag ? 'yes' : 'no'

case counter
when 0 then puts 'zero'
when 1..5 then puts 'small'
else puts 'other'
end

result = case circle
         in { radius: Integer => r } then r
         in Xenon::Circle then 1
         end

begin
  raise ArgumentError, 'error'
rescue ArgumentError, TypeError => e
  puts e.message
  retry if false
rescue StandardError
  puts 'other'
else
  puts 'ok'
ensure
  puts 'done'
end

def greet(name:, greeting: 'Hello')
  yield if block_given?
  "#{greeting}, #{name}!"
end

def method_missing(name, *args)
  super
end

puts greet(name: 'xenon') { puts 'block' }
puts defined?(counter), __method__.inspect
alias_method :old_greet, :greet if respond_to?(:alias_method)
BEGIN { puts 'start' }
END { puts 'end' }
