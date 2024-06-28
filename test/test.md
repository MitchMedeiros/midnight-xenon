## Text Formatting

Normal paragraph line

_italic text._ 

**bold text.**

**_bold italic text_**

~~strikethrough text~~

~~**strikethrough bold**~~

~~_strikethrough italic_~~


## Links

Autolink: <http://example.com>

Link: [Example](http://example.com)

Reference style [link][1].

[1]: http://example.com "Example"

## Image

Image: ![My image](http://www.foo.bar/image.png)

## Headers

# First level title

## Second level title

### Third level title

#### Fourth level title

##### Fifth level title

###### Sixth level title

### Title with [link](http://localhost)

### Title with ![image](http://localhost)

## Code

```
This
  is
    code
      fence
```

Inline `code span in a` paragraph.

Code block:

    /**
     * Sorts the specified array into ascending numerical order.
     *
     * <p>Implementation note: The sorting algorithm is a Dual-Pivot Quicksort
     * by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. This algorithm
     * offers O(n log(n)) performance on many data sets that cause other
     * quicksorts to degrade to quadratic performance, and is typically
     * faster than traditional (one-pivot) Quicksort implementations.
     *
     * @param a the array to be sorted
     */

    public static void sort(byte[] a) {
        DualPivotQuicksort.sort(a);
    }

## Quotes

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

> A list within a blockquote:
>
> - asterisk 1
> - asterisk 2
> - asterisk 3

> Formatting within a blockquote:
>
> ### header
>
> Link: [Example](http://example.com)

## Horizontal rules

---

---

---

## Lists

Unordered list:

- asterisk 1
- asterisk 2
- asterisk 3

Ordered list:

1. First
2. Second
3. Third

Mixed:

1. First
2. Second:
   - Fee
   - Fie
   - Foe
3. Third

## Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Data 1   | Data 2   |

<table>
  <tr>
    <th>Column 1</th>
    <th>Column 2</th>
  </tr>
  <tr>
    <td>Row 1 Cell 1</td>
    <td>Row 1 Cell 2</td>
  </tr>
  <tr>
    <td>Row 2 Cell 1</td>
    <td>Row 2 Cell 2</td>
  </tr>
</table>
