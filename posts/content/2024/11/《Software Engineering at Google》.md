---
title: 《Software Engineering at Google》
date: 2024-11-15
category: 技术
tags: [技术]  
layout: null
---
# Software Engineering at Google

0. Google作为老牌科技公司，走到今天，其必有我们学习之处。在很久很久的一段时间内，我们都是跟跑者，所以要努力思考，Software Engineering at Google这本书的很多地方，都值得我们学习。

虽然我从未走进Google的大门，但是从这本书中，好像我已经透过Google的窗户，看到了Google的内部。站在作者的角度，看到他眼中Google的软件哲学和方法论。

1. 软件工程和编程不同，简单的编程周期短，软件工程周期长，需要寻求更长久的发展方式。因此是工程化。编程作为工程的技术核心，单并不全是编程，还

2. Google组织的是一个复杂的工程化的系统，首要任务是要保持整体的稳定性和可持续性。这也是工程问题的核心。对于工程问题相较于编程问题，

*Human costs are not the only finite resource that needs to scale. Just as software itself needs to scale well with traditional resources such as compute, memory, storage, and bandwidth, the development of that software also needs to scale, both in terms of human time involvement and the compute resources that power your development workflow. If the compute cost for your test cluster grows superlinearly, consuming more compute resources per person each quarter, you’re on an unsustainable path and need to make changes soon.*

3. 权衡和成本
- 记号笔的例子：
*In many organizations, whiteboard markers are treated as precious goods. They are tightly controlled and always in short supply. Invariably, half of the markers at any given whiteboard are dry and unusable. How often have you been in a meeting that was disrupted by lack of a working marker? How often have you had your train of thought derailed by a marker running out? How often have all the markers just gone missing, presumably because some other team ran out of markers and had to abscond with yours? All for a product that costs less than a dollar.*

*Google tends to have unlocked closets full of office supplies, including whiteboard markers, in most work areas. With a moment’s notice it is easy to grab dozens of markers in a variety of colors. Somewhere along the line we made an explicit trade- off: it is far more important to optimize for obstacle-free brainstorming than to protect against someone wandering off with a bunch of markers.*
 
**In the end, decisions in an engineering group should come down to very few things:**

**We are doing this because we must (legal requirements, customer requirements).**

**We are doing this because it is the best option (as determined by some appropriate decider) we can see at the time, based on current evidence.**

我们的目标是对我们所做的每件事都有同样程度的关注和明确的成本/收益权衡，从办公用品和员工津贴到开发者的日常体验，再到如何提供和运行全球规模的服务。我们经常说，“谷歌是一家数据驱动的公司。”事实上，这很简单：即使没有数据，也会有证据、先例和论据。做出好的工程决策就是权衡所有可用的输入，并就权衡做出明智的决策。有时，这些决策是基于本能或公认的最佳实践，但仅是一种假设之后，我们用尽了各种方法来衡量或估计真正的潜在成本。

**二. 如何融入团队**
1. 团队产生的能量，要比一个人闭门造车要好的多，要确保自己的idea，不被其他人窃取，也就是说，要有自己核心的团队。这样既能避免闭门造车，又可以确保真正团队合作，避免其他的问题。

2. 工程师们的环境，最好是4-8个人一个封闭环境，这样既能保证团队合作，又可以尽量避免闭门造车。

**软件工程是一个团队的努力**
'''
It’s All About the Team 一切都是为了团队
So, let’s back up now and put all of these ideas together.

那么，让我们现在回顾一下，把所有这些想法放在一起。

The point we’ve been hammering away at is that, in the realm of programming, lone craftspeople are extremely rare—and even when they do exist, they don’t perform superhuman achievements in a vacuum; their world-changing accomplishment is almost always the result of a spark of inspiration followed by a heroic team effort.

我们反复强调的一点是，在编程领域，孤独的工匠极其罕见，即使他们确实存在，他们也不会在真空中完成超人的成就；他们改变世界的成就几乎总是灵感迸发、团队英勇努力的结果。

A great team makes brilliant use of its superstars, but the whole is always greater than the sum of its parts. But creating a superstar team is fiendishly difficult.

一个伟大的团队能够出色地利用它的超级明星，但整体总是大于各部分的总和。但打造一支集合多个超级明星球队是极其困难的。

Let’s put this idea into simpler words: software engineering is a team endeavor.

让我们把这个想法用更简单的话来说：软件工程是一个团队的努力。

This concept directly contradicts the inner Genius Programmer fantasy so many of us hold, but it’s not enough to be brilliant when you’re alone in your hacker’s lair. You’re not going to change the world or delight millions of computer users by hiding and preparing your secret invention. You need to work with other people. Share your vision. Divide the labor. Learn from others. Create a brilliant team.

这个概念直接与我们许多人幻想的天才程序员幻想相矛盾，但当你独自一人在黑客的巢穴中时，这也是不够聪明。你不能通过隐藏和准备你的秘密发明来改变世界或取悦数百万计的用户。你需要和其他人一起工作。分享你的愿景，分工，向别人学习，创建一个出色的团队。

Consider this: how many pieces of widely used, successful software can you name that were truly written by a single person? (Some people might say “LaTeX,” but it’s hardly “widely used,” unless you consider the number of people writing scientific papers to be a statistically significant portion of all computer users!)

想一想：有多少种被广泛使用并成功的软件，你能说出真正由一个人写的吗？（有些人可能会说“LaTeX”，但它几乎不被广泛使用，除非你认为撰写科学论文的人数在所有计算机用户中占一大部分！）

High-functioning teams are gold and the true key to success. You should be aiming for this experience however you can.

高效的团队是黄金，是成功的真正关键。你应该尽可能地追求这种体验。

'''
*So, what “hiding” boils down to is this: working alone is inherently riskier than working with others. Even though you might be afraid of someone stealing your idea or thinking you’re not intelligent, you should be much more concerned about wasting huge swaths of your time toiling away on the wrong thing.*

*Don’t become another statistic.*

3. 对于一个团队来讲，要时刻注重批评和人身攻击的区别，批评是针对事情，人身攻击是针对人。一个好的团队，要时刻注重这点问题。从这点来看，Google的团队文化建立的不错。

三. 知识共享
这部分更像是一个工具书，或者是如何构建一个企业内部的知识共享、打破信息孤岛的一套系统。从最开始对学习的注重出发，到后来的群聊、邮件、社区、导师制、代码可读性审查文化，是一套几乎完整的、可操作性的企业内部学习系统。

这部分中间有讲到**如果你从这一章只带走一件事，那就是：永远学习；保持好奇**

Google能够数十年屹立不倒，并且不断发展，这部分企业文化构建出来的人才系统，是最关键的部分。企业文化是突然，可以培养出一批又一批优秀卓越的工程师。这一点非常值得我们学习。

打破信息孤岛，让整个组织向上走，知识共享文化的注重，及其采取的各种措施，是Google对**永远学习，保持好奇**企业文化的塑造方法。而基于知识共享的方法，则是从制度上的建立策略，这是企业文化构建的基石。口号是表面，制度是基石，而制度的实行以及赏罚，则是企业文化塑造的过程。

我们都没有在大型科技公司或者互联网公司的经验，但是通过这些书，管中窥豹，也能看到一些影子。可以很好学习他们的管理办法和方法论，可以让我们走很多弯路。

四. 公平工程

这部分在宣扬Google的关于公平的理念，想要尽力让Google的产品，尽量符合所有人。因为Google的企业理念是**Build for everyone**，而这一章提出了一个失败的案例。第一，美国对于肤色、人种问题较为敏感，基于美国传统的多种族文化，所以这个问题更为突出。

这个问题之所以非常重要，其中另一个原因，我觉得可以和《今日简史》中，关于恐怖主义的问题相结合，恐怖主义本身相较战争，造成的损失几乎不可计量，但是却可以引其整个社会的恐惧。而肤色、人种问题，对于美国生长的Google，如果处理不当，无异于对于企业的一次恐怖袭击。所以Google对于这个问题十分看重。但是对于我来讲，好像感觉并不是很重，这点也是突出了一些中西方文化差异。

五. 如何领导团队

0. 如果你在本章记住了一件事，那就是：**传统的经理担心的是如何把事情做好，而优秀的经理担心的是把什么事情做好。**

这一部分，讲解了每个工程师团队的领导组成：工程经理、技术负责人、技术主管经理三部分，同时讲解了这三个人，职责是什么，如何工作的，平时又该注意哪些问题。

这部分有一个有意思的问题。传统的统治者，总是更要求忠诚的下属，也就是能力低于自己的人，而优秀的领导，则更注重能力高于自己的人。这个问题，直到现在也没有完全解决。诸如最近的Trump在选定国防部长时，几乎绝对要求是忠诚问题。而中国传统文化自古以来，也是注重忠诚重于能力。这个问题值得思考一番。

又或者来讲，管理者的艺术，就是如何在保证有能力的人做事的同时，又保证忠诚问题？

同样这份经验，对于我们来讲也是非常重要的。所有团队的领导班子，这里面的问题都应该自省。
