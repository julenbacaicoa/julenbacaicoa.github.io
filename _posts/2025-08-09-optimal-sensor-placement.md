---
layout: single
title: "Less is More: Estimating the 6 Load Components with 6–8 Optimized Strain Gauges"
date: 2025-08-09 16:00:00 +0200
categories: [papers, sensors]
tags: [strain-gauges, optimal-placement, sensor-design, experimentation]
author_profile: true
excerpt: "How to get a full 6 load components estimate from a tiny, optimised set of strain gauges — theory, optimisation, and practical calibration."
image: /assets/images/blog/gauge_acotation.png
published: true
---

## Overview

> What if I told you that you don't need dozens of strain gauges and a forest of Wheatstone bridges to recover the full 6 load components, known technically as wrench, acting on a circular shaft? By measuring **individual quarter‑bridge gauges**, arranging them in carefully optimised locations and orientations, and solving a compact linear inverse problem, you can estimate the full wrench using **only 6 gauges** (or **8 gauges** if you also want in‑built temperature compensation). This post walks the math, the optimisation criterion, practical placements, calibration recipes and the lab validation. 

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
* $$\mathbf{W}(\boldsymbol{\vartheta})$$ is the $$n\times p$$ observation matrix built from the positions/orientations parameter vector $$\boldsymbol{\vartheta}$$ (angles $$\varphi_i,\delta_i$$). 

If $$\mathbf{W}$$ has full rank ($$p = 6$$), we can invert (or pseudo‑invert) to get an estimator of the wrench from the measured strains — but the quality of that estimate depends *crucially* on the choice of gauge geometry (i.e., $$\mathbf{W}$$). So — where do we place the gauges to make $$\mathbf{W}$$ maximally informative? 

---

<!-- Figura 1 -->
<div style="text-align:center;margin:1.5rem 0">
  <img src="/assets/images/blog/gauge_acotation.png" alt="Figure 1 — Gauge geometry and angle definitions" style="width:70%; height:auto;">
  <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5rem;">
    Figure 1 — Gauge geometry and angle definitions
  </p>
</div>

Figure 1 is your road‑map: $$\varphi$$ locates the gauge around the circumference and $$\delta$$ defines the gauge axis relative to the local circumferential direction. Use that figure to follow the geometry below. 

---

## The math (kept compact — but faithful)

### The local gauge model

The strain measured by a gauge bonded at azimuth $$\varphi$$ with orientation $$\delta$$ is linear in the wrench:

$$
\varepsilon \;=\; \frac{\partial\varepsilon}{\partial \mathbf{t}}\,\mathbf{t} \;=\; \mathbf{w}(\varphi,\delta)\,\mathbf{t}
$$

the complete explicit row vector $$\mathbf{w}(\varphi,\delta)$$ encodes the contributions of axial force, shear, torsion and bending to the axial strain at the gauge location. 

### Multi‑gauge observation model

Stacking the $$n$$ gauge measurements:

$$
\boldsymbol{\varepsilon} \;=\; \mathbf{W}(\boldsymbol{\vartheta})\,\mathbf{t}
$$

with $$\mathbf{W}$$ built by stacking the row vectors $$\mathbf{w}_{i} = \mathbf{w}(\varphi_i,\delta_i)$$. If we measure with noise (always!), the statistical model becomes

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

We want a configuration $$\boldsymbol{\vartheta}$$ that makes the estimate as precise as possible. The paper adopts the D‑optimality criterion: maximise information (minimise volume of the estimate covariance ellipsoid) by minimising

$$
\mathcal{F}(\mathbf{W}) = -\log\det(\mathbf{W}^\top \mathbf{W})
$$

D‑optimality is scale‑invariant (so forces and moments with different units don't skew the result) and well suited to sensor placement problems. The optimisation problem is

$$
\boldsymbol{\vartheta}_{\text{opt}} = \arg\min_{\boldsymbol{\vartheta}} \mathcal{F}(\mathbf{W}(\boldsymbol{\vartheta})), \quad \text{subject to} \quad \mathbf{c}(\boldsymbol{\vartheta})=\mathbf{0}
$$

This is the core design step: pick $$n\ge p$$ gauges, define their $$\varphi_i,\delta_i$$ parametrically, and run a search / gradient optimisation to minimise $$\mathcal{F}$$. 

---

## Attractive analytic family: the six‑gauge symmetric solution

Running the optimization the solutions show a simple, symmetric structure. One family that emerges (and that is very convenient to build) is:

$$
\begin{aligned}
\boldsymbol{\varphi}^{\text{opt}} &= (0^\circ,0^\circ,120^\circ,120^\circ,240^\circ,240^\circ) + (\varphi_a,\varphi_b,\varphi_a,\varphi_b,\varphi_a,\varphi_b)\\[4pt]
\boldsymbol{\delta}^{\text{opt}} &= (\alpha,-\alpha,\alpha,-\alpha,\alpha,-\alpha)
\end{aligned}
$$

So: three pairs of gauges separated by $$120^\circ$$ around the shaft; in each pair the gauges are mirrored with angles $$\pm\alpha$$. The optimisation reveals that the optimal $$\alpha$$ depends essentially on Poisson's ratio $$\nu$$ only. For typical metals ($$\nu$$ around 0.25–0.40) the global optimum lies near

$$
\alpha_{\mathrm{opt}} \approx 26.8^\circ \quad(\text{example for }\nu = 1/3)
$$

This compact family is both practically convenient and near‑optimal. 

---

## What about temperature effects?

Thermal (apparent) strain is ever‑present. The work models an additive homogeneous apparent strain $$\varepsilon_T$$ (same for all gauges), and extends the linear system as:

$$
\boldsymbol{\varepsilon}_m = \big[\,\mathbf{W}\ \ \mathbf{1}\,\big]
\begin{pmatrix}\mathbf{t}\\[4pt]\varepsilon_T\end{pmatrix} + \mathbf{e}
$$

so temperature can be treated as an extra parameter ($$p \Rightarrow p+1$$). With this viewpoint you can either:
* design $$\boldsymbol{\vartheta}$$ so the extra column is (approximately) orthogonal to the span of the mechanical columns (so $$\varepsilon_T$$ is identifiable), or
* choose symmetric configurations that *intrinsically cancel* the temperature term for the torque/bending components (the paper shows the 6‑gauge family cancels temperature for all components except axial force). 

With 8 gauges (two rosettes of 4 gauges), the paper gives symmetric configurations that fully compensate the apparent thermal strain for all mechanical components (i.e., $$p = 7$$ system with temperature included). Two practical solutions for 8 gauges are provided below — one corresponds to a $$60^\circ$$ rosette variant, the other to a $$90^\circ$$ rosette—both are symmetric and friendly for manufacturing.

$$\begin{aligned} {60}^{\circ} \text{ rosette}\\ \small{(\text{for } \nu=1/3)} \end{aligned} \quad \left| \quad
\begin{aligned}
\boldsymbol{\varphi}^{\text{opt}} &= (0^\circ,0^\circ,90^\circ,90^\circ,180^\circ,180^\circ,270^\circ,270^\circ)\\[4pt]
\boldsymbol{\delta}^{\text{opt}} &= (-9.9^\circ,50.1^\circ,9.9^\circ,-50.1^\circ,-9.9^\circ,50.1^\circ,9.9^\circ,-50.1^\circ)
\end{aligned}
\right.
$$

$$\begin{aligned} {90}^{\circ} \text{ rosette}\\ \small{(\text{for any } \nu)} \end{aligned} \quad \left| \quad
\begin{aligned}
\boldsymbol{\varphi}^{\text{opt}} &= (0^\circ,0^\circ,90^\circ,90^\circ,180^\circ,180^\circ,270^\circ,270^\circ)\\[4pt]
\boldsymbol{\delta}^{\text{opt}} &= (60^\circ,-30^\circ,30^\circ,-60^\circ,60^\circ,-30^\circ,30^\circ,-60^\circ)\phantom{----.}
\end{aligned}
\right.
$$

---

<div style="display:flex; justify-content:center; gap:2rem; margin:1.5rem 0; flex-wrap:wrap;">
  <!-- Figura 2 -->
  <div style="flex: 1; text-align:center; max-width:50%;">
    <img src="/assets/images/blog/config_8g_60grad.png" alt="Figure 2 – 8 strain gauge \( \mathit{60}^{\circ} \) rosette variant" style="width:90%; height:auto;">
    <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5rem;">
      Figure 2 – 8 strain gauge \( \mathit{60}^{\circ} \) rosette variant
    </p>
  </div>

  <!-- Figura 3 -->
  <div style="flex: 1; text-align:center; max-width:50%;">
    <img src="/assets/images/blog/config_8g_90grad_sensitivity.png" alt="Figure 3 – 8 strain gauge \( \mathit{90}^{\circ} \) rosette variant" style="width:90%; height:auto;">
    <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5rem;">
      Figure 3 – 8 strain gauge \( \mathit{90}^{\circ} \) rosette variant
    </p>
  </div>
</div>

---

## 📊 Optimal Configurations at a glance

The optimisation process in the paper converged on a small set of geometries that achieve full wrench estimation with minimal strain gauges — and, in some cases, built-in temperature compensation.  
The table below summarises the most relevant configurations, including the optimal gauge positions ($$\varphi$$) and orientations ($$\delta$$) for each design.   These are given in degrees and $$\nu$$ is Poisson’s ratio of the shaft material.

<div markdown="1" style="overflow-x:auto; max-width:100%;">

| Configuration | $$\boldsymbol{\vartheta}^{\text{opt}} = (\boldsymbol{\varphi}^{\text{opt}},\ \boldsymbol{\delta}^{\text{opt}})\,\,[\text{deg}]$$ | Temp. Comp. | Notes |
|---|---|---|---|
| **6-gauge symmetric** | $$\boldsymbol{\varphi}^{\text{opt}} = (0,0,120,120,240,240)$$ <br> $$\boldsymbol{\delta}^{\text{opt}} = (+\alpha,-\alpha,+\alpha,-\alpha,+\alpha,-\alpha)$$ | No | Optimal $$\alpha$$ depends on $$\nu$$; for $$\nu \approx \frac13$$, $$\alpha \approx 26.8^\circ$$. |
| **6-gauge, $$60^\circ\ \text{rosette}$$** | $$\boldsymbol{\varphi}^{\text{opt}} = (0,0,120,120,240,240)$$ <br> $$\boldsymbol{\delta}^{\text{opt}} = (+30,-30,+30,-30,+30,-30)$$ | No | Easier bonding; near-optimal performance; well suited for general-purpose shafts. |
| **6-gauge, $$90^\circ\ \text{rosette}$$** | $$\boldsymbol{\varphi}^{\text{opt}} = (0,0,120,120,240,240)$$ <br> $$\boldsymbol{\delta}^{\text{opt}} = (+45,-45,+45,-45,+45,-45)$$ | No | Alternate rosette layout; slightly less optimal but may simplify strain-gauge alignment in certain builds. |
| **8-gauge, $$60^\circ\ \text{rosette}$$** | $$\boldsymbol{\varphi}^{\text{opt}} = (0,0,90,90,180,180,270,270)$$ <br> $$\boldsymbol{\delta}^{\text{opt}} = (-9.9,50.1,9.9,-50.1,-9.9,50.1,9.9,-50.1)$$ | Yes | Fully compensates apparent thermal strain; $$\nu=\frac13$$ example. |
| **8-gauge, $$90^\circ\ \text{rosette}$$** | $$\boldsymbol{\varphi}^{\text{opt}} = (0,0,90,90,180,180,270,270)$$ <br> $$\boldsymbol{\delta}^{\text{opt}} = (60,-30,30,-60,60,-30,30,-60)$$ | Yes | Symmetric, $$\nu$$-independent, manufacturing-friendly. |

</div>

These configurations represent the sweet spot between **observability** and **practicality**: the 6-gauge layouts minimise sensor count, while the 8-gauge rosettes remove thermal strain from the equation without adding extra hardware.

---

## How well does it *really* perform? — variances and trade-offs

For the symmetric family, closed-form expressions are derived for the normalized variances of the estimated wrench components in the **6-gauge configuration** used to estimate the complete wrench. Denoting the variance of a single gauge by $$\operatorname{var}(\varepsilon)$$, the diagonal elements have the structure:

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

These expressions expose the trade-off: a single $$\alpha$$ cannot simultaneously minimise variance for axial force, bending and torsion — hence the algebraic compromise that leads to $${\alpha}^{\mathrm{opt}}\approx 26.8^\circ$$.

---

## Practical calibration recipe (from the lab section)

The experimental section describes a careful calibration procedure for an 8‑gauge configuration. The paper recommends the following steps (condensed):

**1️⃣ Fit a sinusoid to each measured gauge signal**  
For each gauge $$i=1,\dots,n$$ fit the linear model over a full rotation:

$$
\boldsymbol{\varepsilon}^{i}_{m}(\theta) = A^{i}_{m}\cos\boldsymbol{\theta} + B^{i}_{m}\sin\boldsymbol{\theta} + C^{i}_{m}\,\mathbf{1}
$$

**2️⃣ Compute amplitude and phase from the fitted coefficients**  
From $$(A^{i}_{m},B^{i}_{m})$$ obtain:

$$
X^{i}_{m} = \sqrt{\left(A^{i}_{m}\right)^{2}+\left(B^{i}_{m}\right)^{2}}
$$

$$
\eta^{i}_{m} = \tan^{-1}\left(\frac{B^{i}_{m}}{A^{i}_{m}}\right)
$$

so the measured signal can be rewritten as:

$$
\boldsymbol{\varepsilon}^{i}_{m} = X^{i}_{m}\cos\big(\boldsymbol{\theta}-\eta^{i}_{m}\big) + C^{i}_{m}\,\mathbf{1}
$$

**3️⃣ Generate theoretical strains with the nominal geometry**  
Using the nominal $$(\boldsymbol{\varphi},\boldsymbol{\delta})$$ and the known reference wrench $$\mathbf{t}(\theta)$$, theoretical strains $$(\boldsymbol{\varepsilon}_{t}(\theta))$$ can be computed as:

$$
\boldsymbol{\varepsilon}_{t}(\theta) = \mathbf{W}(\boldsymbol{\varphi},\boldsymbol{\delta})\,\mathbf{t}(\theta)
$$

and fit the same sinusoidal model to each theoretical signal to get $$X^{i}_{t}$$, $$\eta^{i}_{t}$$ and $$C^{i}_{t}$$.

**4️⃣ Calibrate the gauge orientations by phase matching**  
Update the model orientations to minimise the phase differences

$$
\Delta\eta^{i} = \eta^{i}_{m} - \eta^{i}_{t}
$$

$$
\delta^{\text{new}}_{i} = \delta^{\text{old}}_{i} + \Delta\eta^{i}
$$

and iterate (if needed) until the residual phase is within tolerance. Denote the calibrated vector by $$\boldsymbol{\delta}^{*}$$.

**5️⃣ Recompute theoretical strains with the calibrated orientations**  
With $$\boldsymbol{\delta}^{*}$$, calibrated strains can be computed as:

$$
\boldsymbol{\varepsilon}_{t,\mathrm{cal}}(\theta) = \mathbf{W}(\boldsymbol{\varphi},\boldsymbol{\delta}^{*})\,\mathbf{t}(\theta)
$$

**6️⃣ Re-fit amplitude and offset on the calibrated theoretical signals**  
Repeat the sinusoidal fit on $$\boldsymbol{\varepsilon}_{t,\mathrm{cal}}$$ to obtain $$X^{i}_{t,\mathrm{cal}}$$ and $$C^{i}_{t,\mathrm{cal}}$$.

**7️⃣ Compute calibrated measurement signals**  
For each gauge:

$$
\varepsilon^{i}_{m,\mathrm{cal}}
=
\frac{X^{i}_{t,\mathrm{cal}}}{X^{i}_{m}}
\left(\varepsilon^{i}_{m} - C^{i}_{m}\,\mathbf{1}\right)
+
C^{i}_{t,\mathrm{cal}}\,\mathbf{1}.
$$

The full procedure is repeatable; follow it closely if you plan a precise calibration. Next, you can find an example of the calibration procedure code on $$\mathtt{Python}$$:

{: .code-title}
Strain gauges calibration — Python
```python
# ------------------------------------------------------------
# Implements the full 7-step calibration procedure described in the paper:
# 1) Fit A cos θ + B sin θ + C to each measured gauge.
# 2) Compute amplitude (X_m) and phase (η_m).
# 3) Generate theoretical strains with nominal geometry, fit X_t and η_t.
# 4) Phase differences -> δ corrections (δ*).
# 5) Recompute theoretical strains with δ*.
# 6) Fit X_t_cal and C_t_cal on the calibrated theoretical signals.
# 7) Scale/offset each measured signal to match the calibrated theory.
# ------------------------------------------------------------
from __future__ import annotations
import numpy as np
from typing import Callable, Dict, Tuple

def fit_cos_sin(theta: np.ndarray, y: np.ndarray) -> Dict[str, float]:
    """
    Fits y ≈ A cos θ + B sin θ + C by linear least squares.
    Returns dict with A, B, C, amplitude (X), phase (η), and RMS residual.
    theta: radians
    """
    X = np.column_stack([np.cos(theta), np.sin(theta), np.ones_like(theta)])
    beta, *_ = np.linalg.lstsq(X, y, rcond=None)
    A, B, C = beta
    amp = np.hypot(A, B)
    eta = np.arctan2(B, A)  # radians
    resid = y - (X @ beta)
    rms = np.sqrt(np.mean(resid**2))
    return {"A": float(A), "B": float(B), "C": float(C),
            "amp": float(amp), "eta": float(eta), "rms": float(rms)}

def wrap_to_pi(angle: np.ndarray | float) -> np.ndarray | float:
    """Wrap angle(s) to [-π, π]."""
    return (angle + np.pi) % (2.0 * np.pi) - np.pi

def per_gauge_scale_offset(y_meas: np.ndarray, y_theo: np.ndarray) -> Tuple[float, float]:
    """
    Fits y_meas ≈ s * y_theo + o (per gauge).
    Returns (s, o).
    """
    X = np.column_stack([y_theo, np.ones_like(y_theo)])
    beta, *_ = np.linalg.lstsq(X, y_meas, rcond=None)
    s, o = beta
    return float(s), float(o)

# -------- Calibration driver --------

def calibrate_deltas_and_scale(
    theta: np.ndarray,                                # (T,) angles in radians
    eps_meas: np.ndarray,                             # (T, n_gauges) measured strains
    eps_theoretical_func: Callable[[np.ndarray, np.ndarray, np.ndarray], np.ndarray],
    varphi: np.ndarray,                               # (n,) azimuths (deg or rad, consistent with model)
    delta_init: np.ndarray,                           # (n,) initial orientations
    angle_unit: str = "deg",                          # "deg" or "rad" for δ
) -> Dict[str, np.ndarray]:
    """
    Full 7-step calibration as described in the paper.
    """
    T, n = eps_meas.shape

    # Step 1 & 2: Fit measured signals, extract amplitudes and phases
    fit_meas = [fit_cos_sin(theta, eps_meas[:, i]) for i in range(n)]
    X_m   = np.array([f["amp"] for f in fit_meas])
    eta_m = np.array([f["eta"] for f in fit_meas])
    C_m   = np.array([f["C"] for f in fit_meas])

    # Step 3: Generate theoretical strains with nominal geometry
    eps_theo = eps_theoretical_func(theta, varphi, delta_init)
    fit_theo = [fit_cos_sin(theta, eps_theo[:, i]) for i in range(n)]
    X_t   = np.array([f["amp"] for f in fit_theo])
    eta_t = np.array([f["eta"] for f in fit_theo])
    C_t   = np.array([f["C"] for f in fit_theo])

    # Step 4: Phase differences -> δ correction
    d_eta = wrap_to_pi(eta_m - eta_t)  # radians
    if angle_unit == "deg":
        d_delta = np.degrees(d_eta)
    else:
        d_delta = d_eta
    delta_star = delta_init + d_delta

    # Step 5 & 6: Recompute theoretical strains with δ*, fit again
    eps_theo_cal = eps_theoretical_func(theta, varphi, delta_star)
    fit_theo_cal = [fit_cos_sin(theta, eps_theo_cal[:, i]) for i in range(n)]
    X_t_cal = np.array([f["amp"] for f in fit_theo_cal])
    C_t_cal = np.array([f["C"] for f in fit_theo_cal])

    # Step 7: Scale/offset measured signals to match calibrated theory
    scales = np.zeros(n)
    offsets = np.zeros(n)
    for i in range(n):
        s, o = per_gauge_scale_offset(eps_meas[:, i] - C_m[i], eps_theo_cal[:, i] - C_t_cal[i])
        scales[i]  = s
        offsets[i] = o + C_t_cal[i]

    return {
        "delta_star": delta_star,
        "X_m": X_m, "eta_m": eta_m, "C_m": C_m,
        "X_t": X_t, "eta_t": eta_t, "C_t": C_t,
        "phase_diff": d_eta,
        "X_t_cal": X_t_cal, "C_t_cal": C_t_cal,
        "scales": scales, "offsets": offsets,
        "eps_theo_cal": eps_theo_cal,
    }
```

**How to use it?** This is the recommended workflow to apply the calibration procedure in practice.

{: .code-title}
Strain gauges calibration: How to use it — Python
```python
# You must implement eps_theoretical_func with YOUR model, using the equations from the paper.

def eps_theoretical_func(theta, varphi, delta):
    """
    Build W(varphi, delta) using the paper's equations.
    Define a reference wrench t(θ) (e.g., a rotating load).
    Return ε_theo(θ) = W(varphi, delta) @ t(θ) for each θ.
    Must return shape (T, n_gauges).
    """
    # Example pseudocode:
    # W = build_W_from_geometry(varphi, delta, material, geometry)
    # t_theta = build_reference_wrench_over_theta(theta)  # (T, p)
    # return W @ t_theta.T   # or t_theta @ W.T depending on your convention
    raise NotImplementedError

# Example usage:
calib = calibrate_deltas_and_scale(
    theta=theta,                      # (T,)
    eps_meas=eps_meas,                 # (T, n)
    eps_theoretical_func=eps_theoretical_func,
    varphi=varphi,                     # (n,)
    delta_init=delta_init,             # (n,)
    angle_unit="deg",                  # or "rad"
)

delta_star = calib["delta_star"]
scales     = calib["scales"]
offsets    = calib["offsets"]

# With δ* and scales/offsets, rebuild W and proceed to wrench estimation.
```

---

<!-- Figura 4 -->
<div style="text-align:center;margin:1.5rem 0">
  <img src="/assets/images/blog/experimental_rig.jpg" alt="Figure 4 — Experimental test rig" style="width:80%; height:auto;">
  <p style="font-style: italic; font-size: 0.9em; margin-top: 0.5rem;">
    Figure 4 — Experimental test rig
  </p>
</div>

The lab validation proved the concept: the 8‑gauge scheme returned wrench estimates consistent with the classic full/half‑bridge references, though with higher scatter — which highlights that careful bonding, wiring and noise control are crucial in practice. 

---

## Implementation notes — code recipe

Here’s the minimal algorithmic skeleton to go from measured strains to wrench (assuming you provide the numeric $$\mathbf{W}$$ from the chosen geometry):

{: .code-title}
Wrench estimation — Python
```python
# ------------------------------------------------------------
# Robust utilities to estimate the 6-component wrench from gauge strains.
# - Handles OLS, WLS, Tikhonov regularization, and optional temperature term.
# - Clean API: precompute reconstructor K offline, then apply online.
# ------------------------------------------------------------
from __future__ import annotations
import numpy as np
from dataclasses import dataclass
from typing import Optional, Tuple

@dataclass
class Reconstructor:
    K: np.ndarray                 # (p x n) reconstructor matrix
    cov_t: Optional[np.ndarray]   # (p x p) covariance up to var(eps) scale, if available
    p: int                        # number of estimated parameters (6 or 7 with temperature)
    cond: float                   # cond number of normal matrix
    used_wls: bool
    lam: float

def _check_full_column_rank(W: np.ndarray) -> None:
    u, s, vh = np.linalg.svd(W, full_matrices=False)
    rank = np.sum(s > (np.finfo(float).eps * max(W.shape) * s.max()))
    if rank < W.shape[1]:
        raise np.linalg.LinAlgError(
            f"W appears rank-deficient (rank={rank} < p={W.shape[1]}). "
            f"Revisit gauge placement or add regularization (lam>0)."
        )

def precompute_reconstructor(
    W: np.ndarray,
    Sigma: Optional[np.ndarray] = None,   # measurement covariance (n x n) or None -> sigma^2 I
    lam: float = 0.0,                     # Tikhonov regularization (λ>=0). Try small, e.g. 1e-6
) -> Reconstructor:
    """
    Build reconstructor K for hat{t} = K @ eps_meas.
    If Sigma is provided -> WLS; otherwise OLS. Optionally add Tikhonov (lam*I).
    Returns covariance up to var(eps) scaling when Sigma is scalar * I (unknown).
    """
    n, p = W.shape
    used_wls = Sigma is not None

    if used_wls:
        # Whitening: solve with Sigma^{-1/2} W and Sigma^{-1/2} eps
        try:
            # Cholesky is ideal if Sigma SPD; else fall back to SVD-based whitening
            L = np.linalg.cholesky(Sigma)
            Linv = np.linalg.inv(L)
            Ww = Linv @ W
        except np.linalg.LinAlgError:
            # Symmetric sqrt via SVD
            U, s, VT = np.linalg.svd(Sigma)
            Sinvhalf = (U * (1.0/np.sqrt(s))) @ U.T
            Ww = Sinvhalf @ W
        N = Ww.T @ Ww  # equivalent to W^T Sigma^{-1} W
    else:
        N = W.T @ W

    # Tikhonov (ridge) regularization to stabilize inversion if needed
    if lam > 0.0:
        N = N + lam * np.eye(p)

    # Condition number for diagnostics
    cond = np.linalg.cond(N)

    # Invert normal matrix robustly
    try:
        Ninv = np.linalg.inv(N)
    except np.linalg.LinAlgError:
        # Pseudo-inverse fallback
        Ninv = np.linalg.pinv(N)
    K = Ninv @ W.T
    if used_wls:
        # For WLS: K_full = (W^T Σ^{-1} W)^{-1} W^T Σ^{-1}
        # Since we built N with whitened W, we still need Σ^{-1} on the right when applying.
        # We'll handle that in estimate_wrench().
        pass

    # Covariance up to scale:
    cov_t = Ninv  # var(t_hat) = var(eps) * N^{-1} when Sigma = sigma^2 I

    return Reconstructor(K=K, cov_t=cov_t, p=p, cond=cond, used_wls=used_wls, lam=lam)

def estimate_wrench(
    eps_meas: np.ndarray,
    W: np.ndarray,
    recon: Reconstructor,
    Sigma: Optional[np.ndarray] = None,
    var_eps: Optional[float] = None,
) -> Tuple[np.ndarray, Optional[np.ndarray]]:
    """
    Apply reconstructor to measured strains.
    - If Sigma given and recon.used_wls=True, applies Σ^{-1} on the right.
    - Returns (t_hat, cov_t_hat) where cov_t_hat = var_eps * recon.cov_t if var_eps known.
    """
    if recon.used_wls:
        if Sigma is None:
            raise ValueError("Sigma must be provided at apply-time for WLS.")
        # Compute Σ^{-1} ε
        try:
            LinvT = np.linalg.inv(np.linalg.cholesky(Sigma)).T  # solve Σ x = y via Cholesky
            rhs = LinvT @ (LinvT @ eps_meas)  # ≈ Σ^{-1} ε
        except np.linalg.LinAlgError:
            U, s, VT = np.linalg.svd(Sigma)
            rhs = (U * (1.0/s)) @ (U.T @ eps_meas)  # Σ^{-1} ε
        t_hat = recon.K @ rhs
    else:
        t_hat = recon.K @ eps_meas

    cov_t_hat = None
    if (recon.cov_t is not None) and (var_eps is not None):
        cov_t_hat = var_eps * recon.cov_t
    return t_hat, cov_t_hat

def augment_temperature(W: np.ndarray) -> np.ndarray:
    """
    Add a column of ones to W to estimate uniform apparent strain ε_T as an extra parameter.
    New p = 7 with last component = ε_T.
    """
    ones = np.ones((W.shape[0], 1))
    return np.hstack([W, ones])
```

If you include temperature as an extra unknown, augment $$\mathbf{W}$$ with a column of ones and follow the same procedure ($$p \Rightarrow p+1$$).

**How to use it?** This is the recommended workflow to apply the wrench estimation procedure in practice.

{: .code-title}
Wrench estimation: How to use it — Python
```python
# 1) Build the W matrix from your strain-gauge configuration.
#    Use your azimuths (φ), orientations (δ), and the shaft geometry and material properties,
#    following the analytical expressions in the paper. 
W = build_W_from_geometry(phi, delta, material, geometry)  # <- you implement this

# 2) (Optional) Include a uniform temperature term.
#    If you want to estimate a uniform apparent strain ε_T to compensate for temperature effects,
#    augment W with a column of ones.
W = augment_temperature(W)

# 3) Precompute the reconstructor (offline).
#    This step only needs to be done once, as long as W does not change.
recon = precompute_reconstructor(W, Sigma=None, lam=1e-8)  # OLS + small regularization

# 4) Estimate the wrench from new measurements (online).
#    With each new calibrated strain vector eps_meas, estimate the wrench t_hat
#    and its covariance.
WTW_inv = np.linalg.inv(W.T @ W)
K = WTW_inv @ W.T
t_hat = K @ eps_meas
```

---

## Design checklist — practical tips before you glue a gauge

* Bonding quality is everything: any misalignment will lead to erroneous estimations. We’ll talk more about this in future posts. 
* If you expect varying temperature, use the 8‑gauge designs from the paper (rosettes) — they are symmetric and give built‑in compensation.   
* Calibrate: follow the 7‑step calibration procedure above. Simple calibration reduces scatter a lot.   
* If you must use rosettes for mechanical ease, choose configurations the paper identifies as near‑optimal. 

---

## Closing thoughts

This approach is a reminder that **measurement design is not just about adding more sensors — it’s about placing the right ones in the right place**. The elegance here lies in reducing complexity without losing observability.  

Could you adapt the same philosophy to other domains — fewer accelerometers for vibration analysis, or fewer thermocouples for thermal mapping?  

And remember, <strong style="color:#30e3ca;">"Sometimes less truly is more".</strong>

---

## Credits & reference

This post faithfully summarises and visualises the results from:  
<div style="border-left: 4px solid #30e3ca; padding: 0.8em 1em; background: #f9f9f9; font-size: 0.95em;">
  📚 <strong>X. Iriarte, J. Aginaga, G. Gainza, J. Ros, <u>J. Bacaicoa</u></strong>, 
  <em>Optimal strain-gauge placement for mechanical load estimation in circular cross-section shafts</em>, 
  <strong><em>Measurement</em></strong>, 174 (2021) 108938.  
  <a href="https://doi.org/10.1016/j.measurement.2020.108938">🔗 Read on <em>Measurement</em> journal</a>
</div>

---

## 💌 Let’s Connect

* Got an idea or suggestion? [Open an issue](https://github.com/julenbacaicoa/julenbacaicoa.github.io/issues) — I’m always open to improvements.  
* Curious to collaborate? Drop me a line → <a href="mailto:julen.bacaicoa@unavarra.es">julen.bacaicoa@unavarra.es</a>.  
* Prefer socials? You’ll find the links in the footer below.