---
layout: post
title: The proper way to create a numpy array using a for-loop
tags: Python
permalink: create-numpy-array-with-for-loop
comments: True
---

A typical task you come around when analysing data with Python is to run a computation line or column wise on a numpy array and store the results in a new one.
Ok - sounds not too bad:

1. Initialize an empty array to store the results in
2. Create a *for*-loop looping over the lines/columns of the data array
Inside the loop:
3. Do the computation
4. Append the result array

Inside a script it would look something like this:

{% highlight python %}
result_array = np.array([])

for line in data_array:
    result = do_stuff(line)
    result_array = np.append(result_array, result)
{% endhighlight %}

Maybe you have already spotted the problem. Running this snippet as it is, the result_array will only be appended in one dimension. This means, that a (20, 100) data array will result in a (, 4000) result array (if the computation you are doing preserve the number of datapoints). So that not what we wanted.

Adding the axis parameter to the ```append``` function, doesn't help either.

{% highlight python %}
result_array = np.append(result_array, result, axis=1)
{% endhighlight %}

The next idea you may come around is nesting the result array:

{% highlight python %}
result_array = np.append(result_array, [result], axis=0)
{% endhighlight %}

But this will result in the following error message:

{% highlight python %}
Traceback (most recent call last):

  File "<ipython-input-23-9e649ee3e8f4>", line 3, in <module>
    result_array = np.append(result_array, [result], axis=0)

  File "C:\Users\arne__000\Anaconda3\lib\site-packages\numpy\lib\function_base.py", line 3872, in append
    return concatenate((arr, values), axis=axis)

ValueError: all the input arrays must have same number of dimensions
{% endhighlight %}

If you observe this issue a little bit closer you will find out that your empty array has the shape (,0) while [result] has a shape of (1, 100). So obviously the arrays have a different number of dimension and therefore, can not be merged together.

Ok... Enough... Let's look at a proper way to accomplish what we want...

As we learned from our last try, the shape of our empty array seems to be the problem. So how do we change the shape of an **empty** array?
Fortunately, numpy already has the tools we need! Instead of creating a empty list and converting it into a numpy array - as we did before - we gonna use the numpy.empty() function to create an empty array with a specified shape:

{% highlight python %}
result_array = np.empty((0, 100))
{% endhighlight %}

So we have to chose the size of the empty array to be 0 in the dimension we want to append the array and to match the size of our data array in all other dimensions.

Our final working example looks like this:

{% highlight python %}
result_array = np.empty((0, 100))

for line in data_array:
    result = do_stuff(line)
    result_array = np.append(result_array, [result], axis=0)
{% endhighlight %}

The key things to keep in mind are:
1. Nest in the result array (result --> [result])
2. Initial your empty array with specified size (np.array([ ]) --> np.empty((0, 100)))