# Miles Per Year

🚗💨 Make used-car searching easier by adding a "miles per year" field to listings

## Works with

- AutoTrader.com
- Cars.com

## Details

### Age
The age of a car is determined by finding the difference between the model year of the vehicle and the approximate current model year: the current year plus one (_e.g._ `currentModelYear = 2019 + 1`). This isn't bulletproof, but I think it's the [Occam's Razor](https://en.wikipedia.org/wiki/Occam%27s_razor) solution.

### Rating
In the United State, cars are driven on average 13,500 miles per year ([US DOT FHWA, Mar. 2018](https://www.fhwa.dot.gov/ohim/onh00/bar8.htm)). Based on that figure, listings are given one of three possible ratings:

Rating | Color | Calculation
---|---|---
Low | Green | `< average - 2000`
Average | Orange | `average +- 2000`
High | Red | `> average + 2000`

---

Forked from: [How-to: Make your own text-replacing Chrome extension](https://9to5google.com/2015/06/14/how-to-make-a-chrome-extensions/) by [Tom Maxwell](https://twitter.com/tomaxwell)