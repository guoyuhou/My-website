---
title: Software Engineering at Google
date: 2024-11-14
category: 技术
tags: [技术]  
layout: null
---
# Software Engineering at Google

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

