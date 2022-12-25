# ascii-separated-values
ASCII (\x1f, \x1e)-separated values file streaming parser/writer.

Since almost any CSV parser/writer implementation is different (just look at jqnatividad/qsv: there are different supported syntaxes per command, no consistency at all!), I think there's time for brand new standard. 

![xkcd about standards](https://imgs.xkcd.com/comics/standards.png)

Just kidding, it isn't even something new, there's always been a [Delimiter-Separated Values](https://en.wikipedia.org/wiki/Delimiter-separated_values) format, so ASV files should work with any DSV/CSV parser that allows custom field/row delimiters. There are special reserved symbols 'RECORD SEPARATOR' aka \x1e  and 'FIELD SEPARATOR' aka \x1f in almost any text encoding, but for some unknown reason everyone just proposes their new standards with complex escaping rules, or even without escaping assuming that there will never be text with their uncommon separator like '|'.  Also there are people who also faced such escaping problem, but again offer crutch solutions like using \00 as field separator.

## Format
In terms of common CSV/DSV settings:
```json
{
    "quote":      "never",
    "escape":     "never",
    "delimiter":  "\x1f",
    "terminator": "\x1e"
}
```




