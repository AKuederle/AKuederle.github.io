---
layout: post
title: Fix battery drain while powered off in Arch/Manjaro
tags: Linux
permalink: fix-battery-drain
comments: True
date: 12.10.2015
---

I recently noticed, that my Laptop battery was always drained when I wanted to use it. However, after a little bit of testing I found out that the battery was just fine, but the something draining the battery while the device was turned off. A quick Google search revealed that the "wake by LAN" option of many laptops can cause this. Yet, the option was turned off in my case. At least I thought so based on the Bios.
Because of the sudden appearance of the issue, I supposed it was introduced by some sofware update. Looking through the Arch wiki and forum (I am using Manjaro Linux on my Lenovo T450s), I found this [post](https://bbs.archlinux.org/viewtopic.php?id=122760). It states that the software keeps the "Wake
on LAN" function somewaht active. Fortunally, the offered copy-and-paste solution works perfectly:

{% highlight bash %}
echo "ethtool -s eth0 wol d" >> /etc/rc.local.shutdown
{% endhighlight %}

(Bew aware, that you might have to run the command in a ```su``` enviroment. Just running it with ```sudo``` didn't work for me)
