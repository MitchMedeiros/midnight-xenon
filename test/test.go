// Line comment
/* Block comment */

// Package shapes provides shape helpers.
package main

import (
	"errors"
	"fmt"
	str "strings"
	_ "embed"
	. "math"

	"github.com/example/xenon/pkg/util"
)

import "os"

const Pi float64 = 3.14159
const (
	Up = iota
	Down
	Left
)

var counter int = 0
var (
	hex     = 0xff
	binary  = 0b1010
	octal   = 0o755
	exp     = 1.5e-3
	imag    = 2i
	big     = 1_000_000
	nothing = nil
	enabled = true
	off     = false
)

var names = []string{"a", "b", `raw "string"`}
var escaped = "tab\t newline\n unicode é hex \x41"
var letter = 'x'
var lookup = map[string]int{"one": 1, "two": 2}

type ID = string

type Shape interface {
	Area() float64
	fmt.Stringer
}

type Point struct {
	X, Y  float64
	Label string `json:"label,omitempty"`
}

type Circle struct {
	Point
	Radius float64
}

type Number interface {
	~int | ~int64 | ~float64
}

type Stack[T any] struct {
	items []T
}

func (c Circle) Area() float64 {
	return Pi * c.Radius * c.Radius
}

func (s *Stack[T]) Push(item T) {
	s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, error) {
	var zero T
	if len(s.items) == 0 {
		return zero, errors.New("empty stack")
	}
	item := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return item, nil
}

func Sum[T Number](values ...T) T {
	var total T
	for _, v := range values {
		total += v
	}
	return total
}

func divide(a, b int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()
	return a / b, nil
}

func worker(id int, jobs <-chan int, results chan<- int) {
	for job := range jobs {
		results <- job * 2
	}
}

func main() {
	circle := Circle{Point: Point{X: 1, Y: 2}, Radius: 3}
	fmt.Println(circle.Area(), str.ToUpper("xenon"), util.Version, Sqrt(2), os.Args)

	jobs := make(chan int, 10)
	results := make(chan int, 10)
	go worker(1, jobs, results)

	for i := 0; i < 3; i++ {
		jobs <- i
	}
	close(jobs)

	select {
	case r := <-results:
		fmt.Println(r)
	default:
		fmt.Println("none")
	}

	switch x := counter; {
	case x > 0:
		fmt.Println("positive")
		fallthrough
	default:
		fmt.Println("zero")
	}

	var iface interface{} = circle
	if s, ok := iface.(Shape); ok && s != nil {
		fmt.Println(s.Area())
	}

	ptr := &circle
	ptr.Radius++
	*ptr = Circle{}

	for {
		break
	}

outer:
	for i := range 3 {
		if i == 1 {
			continue outer
		}
		goto done
	}
done:
	fmt.Printf("%d %s %v\n", counter, "done", 1.5)
}
