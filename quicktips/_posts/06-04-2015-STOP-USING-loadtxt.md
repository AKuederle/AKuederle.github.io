---
title: STOP USING numpy.loadtxt()
layout: post
tags: Python
---

If you are using Python for data analysis you are using numpy is some way and you are probably using the numpy "loadtxt" function, too.

STOP DOINIG IT!!!

Seriously, stop using the numpy.loadtxt() function (unless you have a lot of spare time...). Why you might ask? - Because it is SLOW! - How slow you might ask? - Very slow! Numpy loads a 250 mb csv-file containing 6215000 x 4 datapoints from my SSD in approx. 35 s! - But hey, this is a pretty large file you might say! - No Excuse!
Comparing the speed of numpy's loadtxt function with pandas's read_csv, I couldn't believe the results at first:

Testfile: 250 mb (6215000 x 4 tab-separated datapoints)
Testsystem: Laptop with internal SSD using the ipython `%timeit` function for timing

### Numpy:
{% highlight python %}
import numpy as np

%timeit data = np.loadtxt("./data")
{% endhighlight %}
**Result:** 1 loops, best of 3: 36.6 s per loop

### Pandas:
{% highlight python %}
import pandas as pd

%timeit data = pd.read_csv("./data", delimiter = "\t", names=["col1", "col2", "col3", "col4"])
{% endhighlight %}
**Result:** 1 loops, best of 3: 2.36 s per loop

A speed increase of a whopping factor of 15!!
So just stop using np.loadtxt and start using pd.read_csv instead. It is much faster and pandas might be package you want to use anyway when dealing with large datasets.