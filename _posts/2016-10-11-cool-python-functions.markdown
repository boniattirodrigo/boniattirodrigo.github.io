---
layout:            post
title:             "Cool Python functions"
short_description: "Normalize, textwrap, any and all can help you."
date_long:         "11 de Outubro de 2016"
tags:              python
date_short:        "2016-10-11T21:39"
body:              blog
---

**Hey, Joe!** Let's talk about Python and some nice functions.

![Bye](https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif)

**Normalize**

If you already work with Decimal in tables, lists or grids and show any times values like 1.0000, 10.0000, 2.0500, 15.0200, because your database column is a decimal and don't need show 0 in decimal values when the number is like this: 1.5000, normalize can help you:

```
value = Decimal('1.5000')
value = value.normalize()
print(value)
1.5
```

With normalize you remove excessive 0.

**Textwrap**

Textwrap help you with strings. Checkout.

```
import textwrap
foo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati atque porro architecto optio, nulla officiis, accusamus natus eos eius suscipit.'

print(textwrap.fill(foo, width=40))
Lorem ipsum dolor sit amet, consectetur
adipisicing elit. Obcaecati atque porro
architecto optio, nulla officiis,
accusamus natus eos eius suscipit.

bar = 'Hello world'
textwrap.shorten(bar, width=10, placeholder='...')
'Hello...'

```

<br>
**All and any**

Check if all values in your list are true:

```
all([True, True, True, False])
False
```

<br>
Now, check if any value is true:

```
any([True, True, True, False])
True
```

I'm going stop for here. I like to make short posts.
Ok, take care!