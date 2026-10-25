<?php

declare(strict_types=1);

// Line comment
# Hash comment
/* Block comment */
/**
 * Doc comment.
 * @param float $radius The radius of the circle.
 * @return float The computed area.
 */

namespace Xenon\Shapes;

use InvalidArgumentException;
use Xenon\Contracts\{Describable, Shape as ShapeContract};
use function strlen;
use const PHP_EOL;

const PI = 3.14159;
define('LIMIT', 10);

$counter = 0;
$hex = 0xff;
$binary = 0b1010;
$octal = 0755;
$big = 1_000_000;
$float = 1.5e-3;
$flag = true;
$nothing = null;
$name = "xenon";
$single = 'single $name';
$escaped = "tab\t newline\n unicode \u{00e9} hex \x41";
$interpolated = "Value: {$counter} and $name and {$name}s";
$heredoc = <<<EOT
Heredoc with $name
and {$counter}
EOT;
$nowdoc = <<<'EOT'
Nowdoc without $interpolation
EOT;
$names = ['a', 'b', 'c'];
$lookup = ['one' => 1, 'two' => 2];
[$first, , $third] = $names;
['one' => $one] = $lookup;

enum Direction: string
{
    case Up = 'up';
    case Down = 'down';

    public function opposite(): self
    {
        return match ($this) {
            self::Up => self::Down,
            self::Down => self::Up,
        };
    }
}

interface Shape
{
    public const SIDES = 0;

    public function area(): float;
}

trait Loggable
{
    protected array $logs = [];

    public function log(string $message): void
    {
        $this->logs[] = $message;
    }
}

#[Attribute(Attribute::TARGET_CLASS)]
final class Tracked
{
    public function __construct(public readonly string $label = 'default') {}
}

abstract class Base implements Shape
{
    use Loggable;

    protected static int $count = 0;
    private ?string $name = null;

    public function __construct(protected string $title = 'shape')
    {
        static::$count++;
    }

    abstract public function area(): float;

    public static function count(): int
    {
        return self::$count;
    }

    public function __toString(): string
    {
        return sprintf('%s (%.2f)', $this->title, $this->area());
    }
}

#[Tracked('circle')]
class Circle extends Base implements Describable
{
    public const SIDES = 1;

    public function __construct(private float $radius)
    {
        parent::__construct('circle');
    }

    public function area(): float
    {
        return PI * $this->radius ** 2;
    }

    public function describe(): string
    {
        return "Circle with area {$this->area()}";
    }
}

function add(int|float $a, int|float $b = 0, string ...$rest): int|float
{
    return $a + $b;
}

function generator(int $start, int $end): Generator
{
    for ($i = $start; $i < $end; $i++) {
        yield $i => $i * 2;
    }
}

$double = fn(int $x): int => $x * 2;
$closure = function (int $x) use ($counter): int {
    return $x + $counter;
};

$circle = new Circle(3.0);
echo $circle->describe() . PHP_EOL;
echo Circle::count(), Direction::Up->value, PHP_EOL;

foreach ($names as $index => $value) {
    if ($index === 1 && !$flag || $value == 'c') {
        continue;
    } elseif ($index > 5) {
        break;
    } else {
        print $value;
    }
}

while ($counter < 3) {
    $counter++;
}

do {
    $counter--;
} while ($counter > 0);

switch ($counter) {
    case 0:
        echo 'zero';
        break;
    default:
        echo 'other';
}

try {
    throw new InvalidArgumentException('error');
} catch (InvalidArgumentException | TypeError $e) {
    echo $e->getMessage();
} finally {
    echo 'done';
}

$result = $nothing ?? 'default';
$safe = $circle?->describe();
$instance = $circle instanceof Shape;
$spread = add(...[1, 2]);
$named = add(a: 1, b: 2);
$bits = (1 << 4) | (0xff & 0x0f) ^ 3;
$cast = (int) '42' + (float) '1.5';
global $counter;
unset($names[0]);
isset($lookup['one']) and print 'set';

?>
<div class="<?= htmlspecialchars($name) ?>">
    <?php foreach ($names as $item): ?>
        <span><?= $item ?></span>
    <?php endforeach; ?>
</div>
