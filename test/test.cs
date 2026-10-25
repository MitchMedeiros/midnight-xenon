// Line comment
/* Block comment */
/// <summary>
/// XML doc comment.
/// </summary>
/// <param name="radius">The radius.</param>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Math;
using Alias = System.Text.StringBuilder;

#nullable enable
#region Helpers
#endregion

namespace Xenon.Shapes;

public interface IShape
{
    double Area { get; }
    string Describe();
}

public enum Direction
{
    Up = 1,
    Down,
    Left = 4,
    Right,
}

public record Point(double X, double Y);

public struct Vector
{
    public double X;
    public double Y;
}

[Serializable]
public abstract class Shape : IShape
{
    public const double Pi = 3.14159;
    private static int count = 0;
    private readonly string _name;
    protected int sides;

    public string Name { get; set; } = "shape";
    public int? Optional { get; init; }

    public Shape(string name)
    {
        _name = name;
        count++;
    }

    public abstract double Area { get; }

    public virtual string Describe() => $"{_name} with area {Area:F2}";

    public static int Count => count;
}

public sealed class Circle : Shape
{
    private readonly double radius;

    public Circle(double radius) : base("circle")
    {
        this.radius = radius;
    }

    public override double Area => Pi * Math.Pow(radius, 2);

    public override string Describe()
    {
        return base.Describe() + "!";
    }
}

public class Stack<T> where T : class
{
    private readonly List<T> items = new();

    public void Push(T item) => items.Add(item);

    public T? Pop()
    {
        if (items.Count == 0) return null;
        var item = items[^1];
        items.RemoveAt(items.Count - 1);
        return item;
    }
}

public static class Program
{
    public delegate int Operation(int a, int b);
    public event EventHandler? Changed;

    public static async Task<int> LoadAsync(string url, CancellationToken token = default)
    {
        await Task.Delay(100, token);
        return url.Length;
    }

    public static IEnumerable<int> Range(int start, int end)
    {
        for (int i = start; i < end; i++)
        {
            yield return i;
        }
    }

    public static void Main(string[] args)
    {
        int hex = 0xff, binary = 0b1010, big = 1_000_000;
        long l = 10L;
        float f = 1.5f;
        double d = 1.5e-3;
        decimal m = 10.5m;
        bool flag = true;
        char letter = 'x';
        string text = "tab\t newline\n unicode \u00e9";
        string verbatim = @"C:\path\file";
        string raw = """raw "string" """;
        string interpolated = $"Value: {hex + 1}, {text,10}";
        object? nothing = null;
        var list = new List<int> { 1, 2, 3 };
        var dict = new Dictionary<string, int> { ["one"] = 1, ["two"] = 2 };
        int[] array = { 1, 2, 3 };
        (int x, int y) tuple = (1, 2);

        Operation add = (a, b) => a + b;
        Func<int, int> square = x => x * x;

        var evens = from n in list
                    where n % 2 == 0
                    orderby n descending
                    select n * 2;
        var sum = list.Where(n => n > 1).Select(n => n * 2).Sum();

        foreach (var item in list)
        {
            if (item > 1 && !flag || item is 3)
            {
                continue;
            }
            else if (item is int number and > 5)
            {
                break;
            }
        }

        switch (hex)
        {
            case 0:
                Console.WriteLine("zero");
                break;
            case > 10 and < 20:
                break;
            default:
                Console.WriteLine("other");
                break;
        }

        string label = hex switch
        {
            1 => "one",
            _ => "many",
        };

        try
        {
            var shape = new Circle(3) as IShape;
            Console.WriteLine(shape?.Describe() ?? "none");
            throw new InvalidOperationException("error");
        }
        catch (Exception ex) when (ex is not null)
        {
            Console.WriteLine(ex.Message);
        }
        finally
        {
            Console.WriteLine(nameof(Main));
        }

        using var builder = new Alias();
        lock (builder) { }
        unsafe { }
        Console.WriteLine(typeof(int).Name + default(int));
    }
}
