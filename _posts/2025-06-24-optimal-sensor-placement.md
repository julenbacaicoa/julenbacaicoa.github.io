---
title: "LESS IS MORE - How to Estimate All Shaft Loads with Fewer Strain Gauges"
date: 2025-06-24
layout: single
mathjax: true
categories: [blog]
tags: [strain gauges, mechanical loads, optimization]
excerpt_image: /assets/images/blog/gauge_acotation.png
---

Have you ever wondered how to **estimate loads** acting on a circular shaft... using just a few strain measurements? Can we **reduce sensor count** and still estimate all loads with precision?  
This is exactly what our research set out to explore.

### 🧪 The Problem

Imagine a **circular shaft** subject to unknown mechanical loads — axial and shear forces, torques and bending moments...  
You want to estimate all of them accurately, but installing dozens of strain gauges isn't ideal (or cheap).  

> **What if we could determine the _optimal_ locations for just a handful of gauges?**

---

### 🧠 The Idea

<img src="/assets/images/blog/gauge_acotation.png" alt="Strain Gauge Acotation" style="max-width: 500px; display: block; margin: 0 auto;" />

We model a solid shaft under six types of load $$\mathbf{t}^{'}={\left({F}_{1}^{'},{F}_{2}^{'},{F}_{3}^{'},{M}_{1}^{'},{M}_{2}^{'},{M}_{3}^{'},\right)}^{\top}$$:

- Axial force $$F_1$$
- Shear forces $$F_2, F_3$$
- Torque $$M_1$$
- Bending moments $$M_2, M_3$$

At point $$P$$ of the shaft surface, the stress oriented in $$1'2'3'$$ basis is:

$$
[\bar{\boldsymbol{\sigma}}(t')]_{1'2'3'} =
\begin{bmatrix}
\dfrac{F_1'}{A} + \dfrac{M_3'}{w} & 0 & \dfrac{M_1' R}{I_P} - \dfrac{F_3'}{kA} \\
0 & 0 & 0 \\
0 & 0 & 0
\end{bmatrix}_{1'2'3'}
=
\begin{bmatrix}
\sigma_{11}' & \tau_{12}' & \tau_{13}' \\
\sigma_{22}' & \tau_{23}' \\
\sigma_{33}'
\end{bmatrix}_{1'2'3'}
$$

These stresses can be translated into **strain** via Hooke’s law.

But here’s the challenge: _Where on the shaft should we place the strain gauges to best reconstruct the loads?_

---

### 🔍 The Method

We simulate thousands of **random load cases** on a virtual shaft using a Monte Carlo approach.  
Then, we evaluate the performance of different **sensor arrangements** by computing the estimation error of the loads.

The optimization goal?  
> Minimize the condition number of the **sensitivity matrix**  
> → better load reconstruction, less sensitivity to noise.

---

### 🔧 Results

After analyzing many configurations, the study finds that **3 to 5 strategically placed strain gauges** can reconstruct loads with high accuracy — provided they are not too close or too aligned.

**Best configurations** often involve gauges placed at 45° and 135° around the shaft, or spread across two sections.

---

### 💡 Takeaway

The next time you're designing a sensorized shaft:  
You might not need more gauges — you just need _smarter_ ones.

---

📚 **Paper**: *Optimal strain-gauges location for mechanical load estimation in circular cross-section shafts*  
✍️ **Authors**: Xabier Iriarte, Jokin Aginaga, Gorka Gainza, Javier Ros and Julen Bacaioca.  
🧪 Want to discuss sensor placement strategies? [Let’s talk](mailto:julen.bacaicoa@unavarra.es).
