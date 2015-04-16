---
layout: post
title: Scientific Python NOW!
tags: Python Numpy Matplotlib SciPy
permalink: scientific-python-now
comments: True
---

This is a small guide which should get you quickly up and running with analysing and visualising your data using Python. I'm gonna cover everything from setting up your Python environment to analysing your to fitting and visualizing some crazy function to your data. I try to explain everything in a way that no real prior programming skills are needed to follow along. After reading you gonna be able to discover the amazing world of Scientific Python all on your own.

First a brief word about what Python is and why it is a adequate tool to analyse scientific data.

Python is a very powerful dynamic [object oriented](http://en.wikipedia.org/wiki/Object-oriented_programming) programming language. It is the engine which drives some of your favourite tools; for example Sublime Text, Blender, and even parts of Google and Youtube.
Modularity allows Python to be used in Web Programming, GUI Development, Software Development, System Administration and of course Scientific and Numerical Computation. The specific Python modules we are interested in today are called Numpy, SciPy, Matplotlib, and Pandas. They transform Python from being just a great programming language to being a data-analysis powerhouse comparable to Matlab.

### Setting everything up

Before we talk about what all these cool packages/modules can do for us, we should get you set up, so you can try out everything I show yourself.
Head over to the [Continuum website](https://store.continuum.io/cshop/anaconda/) and download **Anaconda**, a completely free Python distribution which includes all the packages you ever gonna need. Download the Python 3.x version (If you choose the Python 2.7 version, some of my examples might not work).
If you finished downloading and installing, launch **Spyder**, the Python IDE (Place where you type and run your code in) which ships with Anaconda. If Spyder is not listed under your applications, head over to the *Scripts* folder of your Anaconda installation (On Windows: C:\Users\your_user_name\Anaconda3\Scripts by default) and launch Spyder from there.
The Spyder Window is by default divided in three sub-windows. On the left your code editor, on the top right your object/variable inspector, and on the bottom right your console. Take a closer look at the console window. It is separated in three tabs. Make sure you are in the "Ipython console"-tab. If no console is displayed in this tab, start one by right clicking the empty space.
Next thing, we have to make the modules we need available to us. They were installed alongside with Anaconda, but in a freshly opened Python console only the core modules of your Python installation are accessible. To use other modules, you have to type:

{% highlight Python %}
import module_name
{% endhighlight %}

Now you can access functions and variables provided by this module by typing ```module_name.function_name``` (note the period between the module and the function name). If you don't want to type out the module name all the time, you can use the "as" argument of the ```import``` statement to shorten it up. Let's use it to import the modules we need:

{% highlight Python %}
import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import pandas as pd
{% endhighlight %}

The shortcuts behind the *as* can now be used instead of the module name (for example: np.array). The shortcuts I chose are kind of a guideline for these modules, hence I would suggest you to use the same.
Now you are set up with a running Python installation and a Ipython console, where you can type in all the examples I show below. Just keep in mind, you have to type in these import statements whenever you start a new console or script.
If you have any problems setting everything up, feel free to comment down below or to contact me any other way.

Let's talk about what the before mentioned modules offer us!

### Numpy array

The Numpy package is the basically the main module you will use when doing math or more specific matrix based computation in Python. By the way "matrix" in this context includes any kind of numerical data which can be expressed in a grid, like a set of spectra or stock data.

The tool we gonna use the most is called a numpy array. It is a special kind of list, which acts like a matrix in the mathematical sense, but is not limited to two dimensions.
Head down to your Ipython console and try the following (Don't forget to run ```import numpy as np``` before):

{% highlight Python %}
mylist = [[1,2,3],[4,5,6],[7,8,9]]
print(mylist)
{% endhighlight %}

What we have done, is defining a variable *mylist* and setting its value to a list with three elements (1: [1,2,3]; 2:[4,5,6]; 3: [7,8,9]), which each consist of three elements on their own.
If we use the ```print()``` function to write the value of our variable on to the screen, the output looks exactly the same like our input.

In the next step we convert our ordinary list into a numpy array:

{% highlight Python %}
array = np.array(mylist)
print(array)
{% endhighlight %}

The output of this print statement is now formatted like a matrix and we can do "matrix-stuff" with our array variable.

{% highlight Python %}
array.T # Transpose
array * 3 # Multiplication with a scalar
array + array # Matrix addition
{% endhighlight %}

Be aware, that ```array * array``` is not a matrix multiplication in the mathematical sense. By using " * " the matrices get multiplied element wise. To make mathematical matrix multiplication use the *dot*-product. Go ahead and try out both to understand the difference!

{% highlight Python %}
np.dot(array, array) # Matrix multiplication
{% endhighlight %}

*A short word about comments in Python: Whenever you want to write a command inside one of your scripts you use a "#". Everything after this symbol in the same line gets ignored by Python. Usually a comment is used to provide additional information about what a certain part of your script does.*

We can also do stuff, which is no real math, but interesting from a programming stand point:

{% highlight Python %}
array.shape # Get number of lines and rows
array.argmax() # Get the maximal value
array.sum() # Add up all elements of the array
array.flatten() # reduce the array to one dimension
{% endhighlight %}

Note the parentheses at the end of the last three examples. These are necessary, because *sum* or *flatten* are no attributes of the array, like its *size*, but rather functions you can apply to the array. Inside these parentheses you can pass additional arguments to the function if needed. But even if you don't pass any arguments the empty parentheses must be there!

Try out these examples on your own and than call ```print(array)``` again. You will see, that the value of *array* has not changed, despite we have performed all these actions on it. To save the output of one of these functions you have to assign it to a new variable or override your old array.

{% highlight Python %}
flattend_array = array.flatten() # assigning to a new variable
array = array.flatten() # overriding the old variable
{% endhighlight %}

A powerful feature of numpy arrays is the option to use advanced indexing. This means to easily select certain parts of an array.
The most basic thing to do is selecting a line:

{% highlight Python %}
sub_array = array[2]
{% endhighlight %}

This will assign the third line of array to the new sub_array variable. Yeah, your red right! The third line and not, as you may expected, the second. This is a import thing to keep in mind: Counting in Python always start with 0. So the first element of anything countable has always the index 0 (array[0]); and the last element has the index -1.

{% highlight Python %}
sub_array = array[-2] # select the second last element of the array
{% endhighlight %}

Selecting multiple lines is as easy:

{% highlight Python %}
sub_array = array[2:5] # select the elements 3, 4, and 5
sub_array = array[:-2] # select all elements up to the second last
{% endhighlight %}

Or some specific lines (note the second pair of parentheses):

{% highlight Python %}
sub_array = array[[2, 4, -2]] # select the second, the fourth, and the second last element of the array
{% endhighlight %}

Let's take it to the next dimension (two to begin with). Selecting a single element in a 2D matrix can be done by specifying the line and the row index separated by a comma.

{% highlight Python %}
element = array_2D[3, 4] # select the element in the 4th row of the 5th column
{% endhighlight %}

But this is not to selecting a single element. You can easily select multiple elements of your multi-dimensional array using the syntax learned from the first examples.

{% highlight Python %}
sub_array = array[2,3-9] # select the 4-9 element in the third line
sub_array = array[2,:-1] # select all elements in the third line except the last
sub_array = array[:4, :4] # select a 4x4 array in the top left corner of the array
sub_array = array[:, 4] # select row number 5
{% endhighlight %}

These selection can be expanded to any dimension and can get far more complex than these examples.
Here is a short summary of the syntax:

- use a colon to select everything between the number for and after the colon *[3:5]*
- if no index is specified before or after a colon, it means "from the beginning" or "till the end" of the array (just a colon without any indices translates to "selecting everything"). *[:3], [2:], or [:, 4]*
- you can use negative index values to select elements starting from the end of the array. *[-3]*
- use square parentheses ( [] ) with comma-separated indices to select specific elements. *[[2, 7]]*
- use a comma (,) to separate multiple dimensions. *[2, 6]*

Really try to understand how array slicing works! It can greatly boost your productivity when working with complex data.

Another handy thing to know is, how to generate some generic numpy arrays:

{% highlight Python %}
array = np.empty((5, 5)) # Generate an empty numpy array with the shape 5x5
array = np.random.rand(5, 5) # Generate a numpy array with the shape 5x5 filled with random numbers
array = np.arange(0, 1, 0.1) # Generate 1D array containing all numbers between 0 and 1 with a step size of 0.1 ([ 0., 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9])
array = np.linspace(5, 10, 11) # Generate a numpy array containing 11 equally spaced numbers between 5 and 10 (5., 5.5, 6., 6.5, 7., 7.5, 8., 8.5, 9. , 9.5, 10.)
{% endhighlight %}

The additional parentheses in the first example are no typos. For this specific function the shape of the array must be passed as a tuple-object (inside additional parentheses). However, in the second example we could pass the different dimensions one by one. These small differences in the syntax can be very frustrating at first. Therefore, when ever a function does not behave like you would expect, check its documentation page. Regarding numpy an explanation for every single function can be found on [http://docs.scipy.org/doc/numpy/](http://docs.scipy.org/doc/numpy/).
A nice Spyder specific trick is to use the build-in object inspector (top right panel). Press "Ctrl + i" over a function name or go to *Tools/Preferences/Object inspector* and activate "Automatic connection" for the script editor and the Ipython console to display the documentation of a function while you are typing.


*Enough with this example nonsense! I want to have my own data and analyse it! - Ok, Ok... here we go:*

### How to get your own data

Of course if you want to analyse something you need a way to import your data. This is what we ganna talk about in this section.
Assuming you don't have time to type in all your data by hand, the best way to import it is by using the csv data format. *Csv* means "Comma separated value" and is basically a textfile containing all your data points separated by commas and line-breaks. If your specific dataset is not using a comma as separator, don't worry! You can configure the csv importer to work with any separative character you desire.
So how to actually do it. Numpy provides a very simple to use function called *loadtxt*, which can load any raw-text datafile and outputs it as a numpy array. To specify your separator use *delimiter* parameter.

{% highlight Python %}
array = np.loadtxt("path/to/my/data/data.txt", delimiter=",") # load a comma separated file
{% endhighlight %}

The file extension actually doesn't matter. As long as the file is encoded in a raw-text format (The file can be correctly displayed using Notepad), numpy is able to read it. Another nice thing, you don't has to use the absolute path to your datafile. You can specify the relative path (relative to your script or the working directory of your console) instead. If the file is in the same directory as your script you can simple use: "./myfile.txt"

*Before you ask: You can get the current working directory of your Ipython console by using ```import os; print(os.getcwd())``` and change your working directory by selecting a folder in Spyder`s file explorer (third tab of the top right panel) and afterwards pressing the funny colourful button in the very top right of the Spyder window with the small red arrow pointing at a python symbol.*

If your datafile use to have a header (one or more lines at the beginning which don't contain any data), you can use the *skiprow* parameter to get rid of them:

{% highlight Python %}
array = np.loadtxt("path/to/my/data/data.txt", skiprow=1) # skip the first line
{% endhighlight %}

The *unpack* parameter comes in handy quit often, too. Setting *unpack* to ```True``` the file is loaded column-wise instead of line-wise. This allows to use Pythons powerful unpacking feature:

{% highlight Python %}
column_1, column_2, column_3 = np.loadtxt("path/to/my/data/data.txt", unpack=True) # load a file column-wise into separated variables.
{% endhighlight %}

*As you may noticed I recently wrote a [blogpost]({% post_url 06-04-2015-STOP-USING-loadtxt %}), explicitly telling you to stop using numpy loadtxt. I still believe that numpy loadtxt is a bad choice, when trying to do time-efficient computing with large sets of data; but to get you started in the fantastic world of scientific Python it's absolute appropriate to use it.*
