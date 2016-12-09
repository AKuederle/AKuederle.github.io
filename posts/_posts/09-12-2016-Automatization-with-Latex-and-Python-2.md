---
layout: post
title: Automate your Paperwork with Latex and Python (Part 2 - Jinja)
tags: Latex Python Workflow Productivity
permalink: Automatization-with-Latex-and-Python-2
comments: True
date: 9.12.2016
---

It has been a while since the part of this post. The main reason beeing, that I kind of gave up on the Proof of Concept I detailed in the [there]({% post_url 27-05-2015-Automatization-with-Latex-and-Python-1 %}), because I discovered a seriously better way to do it. The magic is called **template engines**!


## Using Jinja2

A templating engine is a tool, that can parse a textfile and replace certain patterns with variables provided. Sounds like what we need!
A very popular templating engine for Python is [Jinja2](http://jinja.pocoo.org/docs/dev/), which is for example used by the well known [Flask](http://flask.pocoo.org/) web-framework. I will not do a full jinja tutorial here, but there are many resources out there to learn its full power!

In the following we will replace the second part of our previous [parse script](https://github.com/AKuederle/Py-Tex-automation-example/blob/POC/parser.py) with the magic of jinja2 (install jinja with ```pip install Jinja2```). First we need to addapted the jinja parsing for LaTex. By default it is looking for "\{\% \%\}" and "\{\{ \}\}" tags in the document. As it might happen that we type these charcters in our LaTex document without wanting them to replace, we tell jinja to look for something else. The most elegant solution, in my oppinion, is two use "Latex-like" commands, as detailed in this [blogpost from Brad Erickson](http://eosrei.net/articles/2015/11/latex-templates-python-and-jinja2-generate-pdfs). The follwoing lines are shamelessly copied from there:

{% highlight python %}

# modified from http://eosrei.net/articles/2015/11/latex-templates-python-and-jinja2-generate-pdfs
import jinja2
import os
from jinja2 import Template
latex_jinja_env = jinja2.Environment(
	block_start_string = '\BLOCK{',
	block_end_string = '}',
	variable_start_string = '\VAR{',
	variable_end_string = '}',
	comment_start_string = '\#{',
	comment_end_string = '}',
	line_statement_prefix = '%%',
	line_comment_prefix = '%#',
	trim_blocks = True,
	autoescape = False,
	loader = jinja2.FileSystemLoader(os.path.abspath('/'))
)

{% endhighlight %}

Putting that into our parse.py-file will configure jinja2 to look for "\\VAR{ }" to find variables for replacing and "\\BLOCK{ }" to find find code for execution. Have a look at the linked blogpost for more details.

So, instead of awrkwardly writing LaTex-syntax to a file using Python (as we did before), we can now create a LaTex file containing some keywords and replace them on runtime with our variables. We gonna ignore the ```.cls``` file we created last time and make a new file called ```template.tex```:

{% highlight latex %}

\documentclass[12pt,a4paper]{article} % din a4, 11 pt schrift, einseitig,

\begin{document}
\VAR{Name}
\VAR{Address}
\VAR{Notes}
\VAR{Contact}
\end{document}

{% endhighlight %}

This is a very simple document with basically no cofiguration. The only intersting thing are the "\\VAR" tags. These are replaced in the next step using jinja. The words in the curly braces are the variables names we want to use for replacing them.

To do so, we have to tell jinja where the file is and let it convert it into valid LaTex:

{% highlight python %}

template = latex_jinja_env.get_template(os.path.realpath(template_file))

options = dict(zip(keys, values))
renderer_template = template.render(**options)

if not os.path.exists(build_d):  # create the build directory if not exisiting
    os.makedirs(build_d)

with open(out_file+".tex", "w") as f:  # saves tex_code to outpout file
    f.write(renderer_template)

{% endhighlight %}

In the first line we pass jinja the path to our template file (we will gnerate the template_file variable later). Then we create a dictionary from our variables, we parsed from our input file (see [first part]({% post_url 27-05-2015-Automatization-with-Latex-and-Python-1 %}) of the blogpost for details). These options dictionary is passed to the ```template.render``` function, which makes all dictionary keys avaible as variables in the template (\*\*-syntax is called [dictionary unpacking](http://python-reference.readthedocs.io/en/latest/docs/operators/dict_unpack.html)). Jinja will replace all occurences of these variables with their respective value and return a renderend string. We save this string into an output tex-file. This file is valid LaTex and can then be comiled as before:

{% highlight python %}
os.system('pdflatex -output-directory {} {}'.format(os.path.realpath(build_d), os.path.realpath(out_file + '.tex')))

shutil.copy2(out_file+".pdf", os.path.dirname(os.path.realpath(in_file)))

{% endhighlight %}

Now we are back at the point, where the last blogpost ended. However, we made use of templating engine, which made our code cleaner and easier to work with on the Latex side. To make this script useful in everyday work, we will now improve its usability.


### Adding Comandline Arguments

If you planning to use a similiar script to generate e.g. invoices for each of your projects, you don't want to edit the python file everytime to modify the file paths. Therfore, we gonna add some commandline arguments.

Simple commandline arguments can be easily handled by Python using the [```argparse``` module](https://docs.python.org/3/library/argparse.html). We gonna add two flags, one for the inputfile and one for the template:

{% highlight python %}
parser = argparse.ArgumentParser(description='Render a LaTex Template with variables.')

parser.add_argument('-i','--in', help='Input File', required=False, default='./example.txt' )
parser.add_argument('-t','--template', help='Template File', required=False, default='./template.tex')
args = vars(parser.parse_args())
{% endhighlight %}

The defaults there are just for this test setup and can easily be changed to you liking. You could also ommit them and set the ```required=True``` parameter for each flags. This will force the user to specify both, and will return an error otherwise. If you planning to share your script with others, you should also improve the help texts!

If we call our script now like this:

{% highlight bash %}

python parser.py -i example.txt -t template.tex

{% endhighlight %}

... we can get the path to the input and the template file from the args dictionary:

{% highlight python %}
in_file = args['in']
template_file = args['template']
{% endhighlight %}

And we are done!! We created a universal LaTex templating script, we can now easily feed with our custom templates using the modified jinja tags. The script can live somwhere in our ```PATH``` and we can call it whenever we need it in one of our projects. The next step would be to allow different input-file formats. For example an excel file, where you have stored your customer information in. If you have specific requirements on how to parse the input files, let me know in the comments and I will try to help you!

Thanks for reding and let me know, if you found that short tutorial helpfull!
