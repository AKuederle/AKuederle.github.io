---
layout: post
title: Make Linux even more awesome with Dmenu
tags: Workflow Linux Bash
---

If you are using any modern Linux Distro, it has probably some kind of application launcher already included. GNOME Do, Synapse or xfce4-appfinder, to name a few, all work the same way. You press a button, the launcher appears and you can quickly select a application to launch by typing its initial letters. In its default configuration Dmenu works no different. The real power of Dmenu is, that it can be used to make a quick selection from any given list and not just the default list of applications. Therefore it can be used as a custom launcher for nearly everything and even as a way to get a user input for any kind of bash script.

After installing Dmenu from the official [website](http://tools.suckless.org/dmenu/) or via your favourite package manager, you can start using it, by running `dmenu_run`  from the commandline or by configuring a hotkey for it. A more or less ugly bar, which displays a list of your applications, should appear on the upper edge of your screen. If you start typing, the selection gets narrowed down and when you found the application you were looking for, you can select it using the arrow keys and launch by pressing return on your keyboard.
So far so good... Nothing special here... So let's talk about the `dmenu` command. In contrary to `dmenu_run` this command requires a list as argument.

Try out the following in your commandline:

{% highlight bash %}
list=("1\n2\n3\n4\n5")
echo -e "$list" | dmenu
{% endhighlight %}

This example should show the dmenu bar containing the items 1 to 5. If you select an item, its value gets printed out to the commandline. Let's take this value and do some further processing with it.

{% highlight bash %}
list=("1\n2\n3\n4\n5")
choice=$(echo -e "$list" | dmenu)
echo $(($choice**2))
{% endhighlight %}

If you put these 3 lines in a bash script and execute it, the program asks you to select a number and returns the square root of your selection. Not very useful, I know. But let's take this general idea from generating a list, parsing it to dmenu and doing something based on the selection and create a more useful example.

In the following we are going to create a little script, which allows us, to "jump" to any git repository on your machine.

What we need to do:

1. create a list of all git repos
2. parse the list to dmenu
3. open a console in the selected directory

Number 1 can easily be achieved using the `find` command and looking for all ".git" folders on the harddrive. But on a second look you need more than a simple list of all git repos. To display only the name of the repo with dmenu, but doing something based on the path to the repo, you need a associative array linking these two parameters.


