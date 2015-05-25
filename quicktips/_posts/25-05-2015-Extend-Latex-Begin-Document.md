---
layout: post
title: Extend the Latex begin-document function
tags: Latex
permalink: extend-latex-begin-document
comments: True
---

Sometimes it is necessary to run some lines of Latex code right at beginning of your document - for example, a fancy Heading or a letterhead. Of course, you could you could just put these lines at the beginning of the document... duh. However, especially in the case of custom document classes it can be useful to have the code executed by the ```\begin{document}``` command itself. To do so, you have to overwrite, or rather, extend the command.

When ever the line ```\begin{document}``` is executed by Latex, the ```\document``` command is called in the background. Therefore, we could just use ```\renewcommand{\document}``` to overwrite it. Though, this would completely erase the old functionality! As there is now build in way to "extend" a command we have to take a small detour.

Before we redefine the ```\document``` command we have to "copy" it and then call it this copied function inside the newcommand. The first step can be done utilizing Latex's ```\let``` command.

{% highlight latex %}
\let\ori@document=\document
{% endhighlight %}

Now we have created the command ```\ori@document``` which does the same as ```\document```. Not it is save to overwrite the old function.

{% highlight latex %}
\renewcommand{\document}{
  \ori@document  % Begin document
  % cool new stuff here%


  %%%%%%%
  }
{% endhighlight %}

By calling ```\ori@document``` inside the new command declaration we are able to conserve the old functionality.

This method is not limited to ```\document```. You can extend every native Latex command in this manner, for example to add something at the beginning of each section or chapter.
