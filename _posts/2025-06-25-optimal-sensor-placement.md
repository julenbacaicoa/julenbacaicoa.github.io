---
layout: single
title: "Less is More: Estimating the 6‑component Wrench with 6–8 Optimized Strain Gauges"
date: 2025-08-09 16:00:00 +0200
categories: [papers, sensors]
tags: [strain-gauges, optimal-placement, sensor-design, experimentation]
author_profile: true
excerpt: "How to get a full 6‑component load estimate from a tiny, optimised set of strain gauges — theory, optimisation, and practical calibration."
image: /assets/images/blog/gauge_acotation.png
published: false
---

## Summary

What if I told you that you don't need dozens of strain gauges and a forest of Wheatstone bridges to recover the full 6‑component wrench acting on a circular shaft? By measuring **individual quarter‑bridge gauges**, arranging them in carefully optimised locations and orientations, and solving a compact linear inverse problem, you can estimate the full wrench using **only 6 gauges** (or **8 gauges** if you also want in‑built temperature compensation). This post walks the math, the optimisation criterion, practical placements, calibration recipes and the lab validation from the paper. 

---

## Why should you care?

Do you build rotating shafts, drivetrains, dynamometers or force sensors? Then you know measurement cost, wiring complexity and thermal drift are real pains. The classical approach places dedicated bridges for each load component (many gauges). The approach described in the paper flips that idea: measure **individual gauge strains** and treat the wrench as a joint estimation problem — the geometry of the gauges encodes how each gauge “sees” all six load components. The outcome: fewer sensors, simpler wiring, and (with clever design) temperature compensation built into the geometry. 

---

## Intuition — what's happening under the hood?

Think of each strain gauge as a linear sensor that returns a number — the local axial strain in the direction of the gauge. That scalar is a linear combination of the six load components (three forces and three moments) acting on the cross‑section. So with $$n$$ gauges we write a linear system

$$
\boldsymbol{\varepsilon} = \mathbf{W}(\vartheta)\,\mathbf{t},
$$

where:
* $$\boldsymbol{\varepsilon} \in \mathbb{R}^n$$ is the vector of gauge strains (true mechanical strain),
* $$\mathbf{t} = (F_1,F_2,F_3,M_1,M_2,M_3)^\top$$ is the wrench ($$p = 6$$),
* $$W(\vartheta)$$ is the $$n\times p$$ observation matrix built from the positions/orientations parameter vector $$\vartheta$$ (angles $$\varphi_i,\delta_i$$). 

If $$\mathbf{W}$$ has full rank ($$p = 6$$), we can invert (or pseudo‑invert) to get an estimator of the wrench from the measured strains — but the quality of that estimate depends *crucially* on the choice of gauge geometry (i.e., $$\mathbf{W}$$). So — where do we place the gauges to make $$\mathbf{W}$$ maximally informative? 

---

<div style="text-align:center;margin:1.5rem 0">
  <img src="/assets/images/blog/gauge_acotation.png" alt="Fig.5 — Gauge geometry and angle definitions" width="600">
  <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5rem;">
    Figure 1 — Gauge geometry and angle definitions
  </p>
</div>

> Figure 1 is your road‑map: $$\varphi$$ locates the gauge around the circumference and $$\delta$$ defines the gauge axis relative to the local circumferential direction. Use that figure to follow the geometry below. 

---

## The math (kept compact — but faithful)

### The local gauge model

The strain measured by a gauge bonded at azimuth $$\varphi$$ with orientation $$\delta$$ is linear in the wrench:

$$
\varepsilon \;=\; \frac{\partial\varepsilon}{\partial \mathbf{t}}\,\mathbf{t} \;=\; \mathbf{w}(\varphi,\delta)\,\mathbf{t}
$$

which is equation (21) in the article; the complete explicit row vector $$\mathbf{w}(\varphi,\delta)$$ appears as Eq. (22) in the paper and encodes the contributions of axial force, shear, torsion and bending to the axial strain at the gauge location. 

### Multi‑gauge observation model

Stacking the $$n$$ gauge measurements:

$$
\boldsymbol{\varepsilon} \;=\; \mathbf{W}(\vartheta)\,\mathbf{t}
$$

with $$\mathbf{W}$$ built by stacking the row vectors $$w_i = w(\varphi_i,\delta_i)$$. If we measure with noise (always!), the statistical model becomes

$$
\boldsymbol{\varepsilon}_m = \mathbf{W}\mathbf{t} + \mathbf{e}
$$

where $$\mathbf{e}$$ is the measurement error (noise + bias contributions). 

### The estimator (Weighted Least Squares-WLS / Maximum Likelihood-ML)

Assuming zero‑mean errors and known covariance $$\boldsymbol{\Sigma} = E[\mathbf{e}\mathbf{e}^\top]$$, the minimum‑variance linear estimator is the weighted least‑squares (equivalently ML under Gaussian noise):

$$
\hat{\mathbf{t}} = (\mathbf{W}^\top \boldsymbol{\Sigma}^{-1} {\mathbf{W}})^{-1}{\mathbf{W}}^\top\boldsymbol{\Sigma}^{-1}\,\boldsymbol{\varepsilon}_m
$$

If all gauges have identical, independent variance $$\boldsymbol{\Sigma} = \sigma^2 \mathbf{I}$$, this simplifies to ordinary least squares:

$$
\hat{\mathbf{t}} = ({\mathbf{W}}^\top \mathbf{W})^{-1}\mathbf{W}^\top\boldsymbol{\varepsilon}_m
$$

and the covariance of the estimate is

$$
\operatorname{var}(\hat{\mathbf{t}}) = \operatorname{var}(\varepsilon_m)\,(\mathbf{W}^\top \mathbf{W})^{-1}
$$

These are the operational formulas: compute $$\mathbf{W}$$ from the design, then compute the inverse once offline; real‑time estimation is a single matrix–vector product. 

---

## How to *choose* the positions and orientations? — D‑optimality

We want a configuration $$\vartheta$$ that makes the estimate as precise as possible. The paper adopts the D‑optimality criterion: maximise information (minimise volume of the estimate covariance ellipsoid) by minimising

$$
\mathcal{F}(\mathbf{W}) = -\log\det(\mathbf{W}^\top \mathbf{W})
$$

D‑optimality is scale‑invariant (so forces and moments with different units don't skew the result) and well suited to sensor placement problems. The optimisation problem is

$$
\boldsymbol{\vartheta}_{\text{opt}} = \arg\min_{\boldsymbol{\vartheta}} \mathcal{F}(\mathbf{W}(\boldsymbol{\vartheta})), \quad \text{subject to} \quad \mathbf{c}(\boldsymbol{\vartheta})=\mathbf{0}
$$

This is the core design step: pick $$n\ge p$$ gauges, define their $$\varphi_i,\delta_i$$ parametrically, and run a search / gradient optimisation to minimise $$\mathcal{F}$$. 

---

<div style="text-align:center;margin:1rem 0">
![Fig.7 — D-optimality vs α (shows α_opt ≈ 26.8° for ν=1/3)](/assets/images/papers/fig7_opt_vs_alpha.png){: width="560px" }
</div>

> The optimisation landscape is surprisingly clean for the family of symmetric 6‑gauge solutions described below — that’s why closed‑form insights are possible. 

---

## Attractive analytic family: the six‑gauge symmetric solution

Running the optimiser for many geometries and materials, the solutions show a simple, symmetric structure. One family that emerges (and that is very convenient to build) is:

$$
\begin{aligned}
\varphi_{\text{opt}} &= (0^\circ,0^\circ,120^\circ,120^\circ,240^\circ,240^\circ) + (\varphi_a,\varphi_b,\varphi_a,\varphi_b,\varphi_a,\varphi_b)\\[4pt]
\delta_{\text{opt}} &= (\alpha,-\alpha,\alpha,-\alpha,\alpha,-\alpha)
\end{aligned}
$$

So: three pairs of gauges separated by $$120^\circ$$ around the shaft; in each pair the gauges are mirrored with angles $$\pm\alpha$$. The optimisation reveals that the optimal $$\alpha$$ depends essentially on Poisson's ratio $$\nu$$ only. For typical metals ($$\nu$$ around 0.25–0.40) the global optimum lies near

$$
\alpha_{\mathrm{opt}} \approx 26.8^\circ \quad(\text{example for }\nu = 1/3)
$$

This compact family is both practically convenient and near‑optimal. 

---

## What about temperature effects?

Thermal (apparent) strain is ever‑present. The paper models an additive homogeneous apparent strain $$\varepsilon_T$$ (same for all gauges), and extends the linear system as:

$$
\boldsymbol{\varepsilon}_m = \big[\,W\ \ \mathbf{1}\,\big]
\begin{pmatrix}\mathbf{t}\\[4pt]\varepsilon_T\end{pmatrix} + \mathbf{e}
$$

so temperature can be treated as an extra parameter ($$p \Rightarrow p+1$$). With this viewpoint you can either:
* design $$\vartheta$$ so the extra column is (approximately) orthogonal to the span of the mechanical columns (so $$\varepsilon_T$$ is identifiable), or
* choose symmetric configurations that *intrinsically cancel* the temperature term for the torque/bending components (the paper shows the 6‑gauge family cancels temperature for all components except axial force). 

With 8 gauges (two rosettes of 4 gauges), the paper gives symmetric configurations that fully compensate the apparent thermal strain for all mechanical components (i.e., $$p = 7$$ system with temperature included). Two practical solutions for 8 gauges are provided (Eqs. 53 and 54 in the article) — one corresponds to a $$60^\circ$$ rosette variant, the other to a $$90^\circ$$ rosette—both are symmetric and friendly for manufacturing. 

---

<div style="text-align:center;margin:1rem 0">
![Fig.11 — 8‑gauge (60° and 90° rosette) optimal layouts](/assets/images/papers/fig11_8g_rosettes.png){: width="620px" }
</div>

---

## How well does it *really* perform? — variances and trade‑offs

The paper derives closed‑form expressions (for the symmetric family) for the normalized variances of the estimated wrench components (Eq. (44) in the paper). Denoting the variance of a single gauge by $$\operatorname{var}(\varepsilon)$$, the diagonal elements have the structure:

$$
\begin{aligned}
\frac{\operatorname{var}(F_1)}{\operatorname{var}(\varepsilon)} &= \frac{A^2 E^2}{6\,[\cos^2\alpha - \nu\sin^2\alpha]^2},\\[6pt]
\frac{\operatorname{var}(F_2)}{\operatorname{var}(\varepsilon)}=
\frac{\operatorname{var}(F_3)}{\operatorname{var}(\varepsilon)} &= 
\frac{A^2E^2 k^2}{3\,\sin^2(2\alpha)\,(1+\nu)^2},\\[6pt]
\frac{\operatorname{var}(M_1)}{\operatorname{var}(\varepsilon)} &= 
\frac{E^2 I_p^2}{6 R^2 \sin^2(2\alpha)\,(1+\nu)^2},\\[6pt]
\frac{\operatorname{var}(M_2)}{\operatorname{var}(\varepsilon)}
=\frac{\operatorname{var}(M_3)}{\operatorname{var}(\varepsilon)} &= 
\frac{E^2 w^2}{3\,[\cos^2\alpha - \nu\sin^2\alpha]^2}.
\end{aligned}
$$

(This is Eq. (44) in the paper.) These expressions expose the trade‑off: a single $$\alpha$$ cannot simultaneously minimise variance for axial force, bending and torsion — hence the algebraic compromise that leads to $$\alpha_{\mathrm{opt}}\approx 26.8^\circ$$. 

---

## Practical calibration recipe (from the lab section)

The experimental section describes a careful calibration procedure for an 8‑gauge configuration. The paper recommends the following steps (condensed):

1. For each gauge $$i=1,\dots,8$$, fit a sinusoidal model of the measured quarter‑bridge output over rotation:

$$
\varepsilon_i^m = A_i^m \cos\theta + B_i^m\sin\theta + C_i^m,
$$

and compute amplitude $$X_i^m=\sqrt{(A_i^m)^2+(B_i^m)^2}$$ and phase $$\eta_i^m$$. (Eq. (58–60)). 

2. Compute theoretical strains from a reference wrench $$\mathbf{t}(\theta)$$ via $$\varepsilon^t(\theta)=W \mathbf{t}(\theta)$$ and estimate the corresponding amplitudes/phases. Use the phase differences to calibrate the modelled $$\delta$$ angles (i.e., find $$\delta^*$$). 

3. Recompute the theoretical calibrated signals $$\varepsilon_{t,cal}(\theta)$$ using $$\delta^*$$, and finally scale/offset each measured signal to match the calibrated theoretical one (Eq. (61–62)). 

The full procedure in the paper is explicit and repeatable; follow it closely if you plan to reproduce the bench test. 

---

<div style="text-align:center;margin:1rem 0">
![Fig.12 — Photo of the test rig and gauge montage](/assets/images/papers/fig12_test_rig.png){: width="640px" }
</div>

> The lab validation proved the concept: the 8‑gauge scheme returned wrench estimates consistent with the classic full/half‑bridge references, though with higher scatter — which highlights that careful bonding, wiring and noise control are crucial in practice. 

---

## Implementation notes — code recipe (pseudo‑Python)

Here’s the minimal algorithmic skeleton to go from measured strains to wrench (assuming you provide the numeric \(W\) from the chosen geometry):

```python
# assume W: n x 6 matrix (numpy), eps_meas: n-vector of calibrated strains
# precompute offline:
WTW_inv = np.linalg.inv(W.T @ W)   # only if n >= 6 and W^T W invertible
K = WTW_inv @ W.T                  # p x n reconstruction matrix

# online:
t_hat = K @ eps_meas               # 6-vector: estimated wrench
cov_t_hat = var_eps * WTW_inv      # if var_eps known (scalar)
```

If you include temperature as an extra unknown, augment W with a column of ones and follow the same procedure ($$p \Rightarrow p+1$$). See Eqs. (30), (31), (37). 

---

## Design checklist — practical tips before you glue a gauge

* Bonding quality is everything: any misalignment or air bubble kills the model assumption of identical gauge response.   
* If you expect varying temperature, use the 8‑gauge designs from the paper (rosettes) — they are symmetric and give built‑in compensation.   
* Calibrate: follow the 7‑step calibration procedure in Section 6 of the paper. Simple calibration reduces scatter a lot.   
* If you must use rosettes for mechanical ease, choose configurations the paper identifies as near‑optimal (the rosette prescriptions are explicit). 

---

## Final thoughts — questions to the reader

* What would you trade off in your application: absolute accuracy in axial force vs overall economy and simplicity?  
* Would you rather manage 6 tiny channels with a small MCU or dozens of full Wheatstone bridges?  
* Want me to convert the calibration steps to a Python notebook that runs on your experimental data? (Hint: yes — I can do that next.)  

This work shows a neat principle: **smart geometry + simple math = fewer sensors**. But the devil is in the experimental details. If you want, I can: (a) paste the *full* Eq. (22) vector here verbatim from the paper, (b) produce a runnable notebook that builds $$\mathbf{W}$$ for any chosen geometry and tests the D‑optimality numerically, or (c) place the paper figures inside the post (if you upload the exported PNGs). Which one first? 

---

## Figures — suggested inline placements

(If you prefer a short list rather than the inline placeholders above, here it is — the images I used in the text are the ones I recommend:)

1. **Fig. 5** — *Gauge geometry and angle definitions* — insert immediately after "Intuition" (used above).   
2. **Fig. 7** — *Optimization criterion vs α (α_opt ≈ 26.8°)* — after the D‑optimality explanation.   
3. **Fig. 11** — *8‑gauge rosettes (60° and 90°)* — placed in the Temperature section.   
4. **Fig. 12** — *Test rig photo* — place in the calibration / validation section.   
5. **Fig. 8 / Fig.10** — *Variance vs α / 6‑gauge rosette options* — close to the trade‑offs discussion.   
6. **Table 1** — *Short numeric summary of optimal configurations* — as a small HTML table after "Attractive analytic family". 

---

## Credits & reference

This post faithfully summarises and visualises the results from:  
**X. Iriarte, J. Aginaga, G. Gainza, J. Ros, J. Bacaicoa, _Optimal strain-gauge placement for mechanical load estimation in circular cross-section shafts_, Measurement 174 (2021) 108938**.  
[📄 Read the published article in *Measurement*](https://doi.org/10.1016/j.measurement.2020.108938)

---

If you want it converted to a downloadable `.md` (images embedded as local files, math ready for Jekyll), I already saved it and can hand you the file. Also — which extra deliverable first: the exact Eq. (22) pasted in full, or a runnable calibration notebook?