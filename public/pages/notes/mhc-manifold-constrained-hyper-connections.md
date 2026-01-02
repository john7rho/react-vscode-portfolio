# mHC: Manifold-Constrained Hyper-Connections

**Paper:** [mHC: Manifold-Constrained Hyper-Connections](https://arxiv.org/abs/2512.24880)  
**Authors:** Zhenda Xie, Yixuan Wei, Huanqi Cao, Chenggang Zhao, Chengqi Deng, Jiashi Li, Damai Dai, Huazuo Gao, Jiang Chang, Liang Zhao, Shangyan Zhou, Zhean Xu, Zhengyan Zhang, Wangding Zeng, Shengding Hu, Yuqing Wang, Jingyang Yuan, Lean Wang, Wenfeng Liang  
**Affiliation:** DeepSeek-AI  
**Notes Date:** Jan 2, 2026

## What this paper is about
Manifold-Constrained Hyper-Connections (mHC) is a refinement of Hyper-Connections (HC). HC widens the residual stream into multiple parallel streams and learns how to mix them across layers. This often improves loss and downstream quality, but it can become numerically unstable at large scale because the learned residual mixing matrices compound across depth.

mHC keeps the HC structure, but constrains the residual mixing matrices to live on a well-behaved manifold. Concretely, it projects the residual matrices onto the Birkhoff polytope (the set of doubly stochastic matrices) using the Sinkhorn-Knopp algorithm. The goal is to keep the benefits of cross-stream mixing while restoring an identity-mapping style conservation property across many layers.

## Notation
- $C$: per-layer hidden size
- $n$: residual stream expansion rate (paper uses $n = 4$ in experiments)
- $\mathbf{x}_l$: hidden state at layer $l$
- $\mathcal{F}(\cdot, \mathcal{W}_l)$: layer function (for Transformers, this is an Attention or FFN sub-layer)

Shapes:
- Baseline residual: $\mathbf{x}_l \in \mathbb{R}^{1 \times C}$
- HC/mHC residual stream: $\mathbf{x}_l \in \mathbb{R}^{n \times C}$

## Baseline residual connection
Single-layer residual connection:

$$
\mathbf{x}_{l+1} = \mathbf{x}_l + \mathcal{F}(\mathbf{x}_l, \mathcal{W}_l).
$$

Unrolled across depth:

$$
\mathbf{x}_L = \mathbf{x}_l + \sum_{i=l}^{L-1} \mathcal{F}(\mathbf{x}_i, \mathcal{W}_i).
$$

The direct term $\mathbf{x}_l$ is the identity mapping component. It gives a stable path for signals and gradients across many layers.

## Hyper-Connections (HC)
HC expands $\mathbf{x}_l$ from $C$ to $nC$ by maintaining $n$ parallel residual streams and learning three mappings:
- $\mathcal{H}^{\mathrm{res}}_l \in \mathbb{R}^{n \times n}$: mixes information within the residual stream
- $\mathcal{H}^{\mathrm{pre}}_l \in \mathbb{R}^{1 \times n}$: reads from the $n$-stream residual into a $C$-dim layer input
- $\mathcal{H}^{\mathrm{post}}_l \in \mathbb{R}^{1 \times n}$: writes the layer output back into the residual stream

Single-layer propagation:

$$
\mathbf{x}_{l+1} = \mathcal{H}_{l}^{\mathrm{res}}\mathbf{x}_l
\;+\;
\mathcal{H}_{l}^{\mathrm{post}\,\top}\mathcal{F}(\mathcal{H}_{l}^{\mathrm{pre}}\mathbf{x}_l, \mathcal{W}_l).
$$

The stability issue shows up when you unroll this across depth. The skip path is no longer $\mathbf{x}_l$. Instead it becomes a product of residual mixing matrices:

$$
\mathbf{x}_{L}
=
\left(\prod_{i=1}^{L-l}\mathcal{H}_{L-i}^{\mathrm{res}}\right)\mathbf{x}_l
\;+\;
\sum_{i=l}^{L-1}\left(\prod_{j=1}^{L-1-i}\mathcal{H}_{L-j}^{\mathrm{res}}\right)\mathcal{H}_{i}^{\mathrm{post}\,\top}\mathcal{F}(\mathcal{H}_{i}^{\mathrm{pre}}\mathbf{x}_i, \mathcal{W}_i).
$$

If $\mathcal{H}^{\mathrm{res}}_l$ is unconstrained, the composite map $\prod \mathcal{H}^{\mathrm{res}}$ can amplify or attenuate signals rapidly, which leads to exploding or vanishing activations and gradients at scale.

The paper quantifies this with an "Amax Gain Magnitude" metric:
- Forward gain: maximum absolute row sum of the composite map
- Backward gain: maximum absolute column sum of the composite map

In their 27B training run, HC shows extreme composite gain spikes (on the order of $3000$).

## mHC: constrain the residual map to the Birkhoff polytope
mHC restricts $\mathcal{H}^{\mathrm{res}}_l$ to be (approximately) doubly stochastic. Let $\mathbf{1}_n$ be the $n$-dimensional all-ones vector. Define the manifold:

$$
\mathcal{M}^{\mathrm{res}}
\coloneq
\left\{
\mathbf{H} \in \mathbb{R}^{n \times n}
\mid
\mathbf{H}\mathbf{1}_n = \mathbf{1}_n,\;
\mathbf{1}_n^\top \mathbf{H} = \mathbf{1}_n^\top,\;
\mathbf{H} \ge 0
\right\}.
$$

This is the Birkhoff polytope (the convex hull of permutation matrices). The paper highlights three useful consequences:
- **Non-expansive mapping**: the spectral norm is bounded, $\|\mathbf{H}\|_2 \le 1$, so the residual map does not blow up signal norms.
- **Closure under multiplication**: products of doubly stochastic matrices are doubly stochastic, so $\prod \mathcal{H}^{\mathrm{res}}$ stays in the same stable set across depth.
- **Geometric interpretation**: $\mathcal{H}^{\mathrm{res}}$ acts like a convex combination of permutations, which mixes streams while conserving the feature mean.

mHC also constrains $\mathcal{H}^{\mathrm{pre}}_l$ and $\mathcal{H}^{\mathrm{post}}_l$ to be non-negative to avoid cancellation effects from mixing positive and negative coefficients.

## Parameterization and projection used in mHC
Given the residual stream $\mathbf{x}_l \in \mathbb{R}^{n \times C}$, mHC flattens it to preserve full context:

$$
\vec{\mathbf{x}}_l = \mathrm{vec}(\mathbf{x}_l) \in \mathbb{R}^{1 \times nC}.
$$

Normalize:

$$
\vec{\mathbf{x}}'_l = \mathrm{RMSNorm}(\vec{\mathbf{x}}_l).
$$

Compute unconstrained coefficients:

$$
\begin{aligned}
\tilde{\mathcal{H}}^{\mathrm{pre}}_l &=
\alpha_l^{\mathrm{pre}} (\vec{\mathbf{x}}'_l \phi^{\mathrm{pre}}_l) + \mathbf{b}^{\mathrm{pre}}_l, \\
\tilde{\mathcal{H}}^{\mathrm{post}}_l &=
\alpha_l^{\mathrm{post}} (\vec{\mathbf{x}}'_l \phi^{\mathrm{post}}_l) + \mathbf{b}^{\mathrm{post}}_l, \\
\tilde{\mathcal{H}}^{\mathrm{res}}_l &=
\alpha_l^{\mathrm{res}} \mathrm{mat}(\vec{\mathbf{x}}'_l \phi^{\mathrm{res}}_l) + \mathbf{b}^{\mathrm{res}}_l,
\end{aligned}
$$

where:
- $\phi^{\mathrm{pre}}_l, \phi^{\mathrm{post}}_l \in \mathbb{R}^{nC \times n}$
- $\phi^{\mathrm{res}}_l \in \mathbb{R}^{nC \times n^2}$
- $\mathrm{mat}(\cdot)$ reshapes $\mathbb{R}^{1 \times n^2} \to \mathbb{R}^{n \times n}$

Apply constraints:

$$
\begin{aligned}
\mathcal{H}^{\mathrm{pre}}_l &= \sigma(\tilde{\mathcal{H}}^{\mathrm{pre}}_l), \\
\mathcal{H}^{\mathrm{post}}_l &= 2\sigma(\tilde{\mathcal{H}}^{\mathrm{post}}_l), \\
\mathcal{H}^{\mathrm{res}}_l &= \mathrm{SinkhornKnopp}(\tilde{\mathcal{H}}^{\mathrm{res}}_l).
\end{aligned}
$$

Sinkhorn-Knopp projection (as described in the paper):
- Start from a positive matrix $\mathbf{M}^{(0)} = \exp(\tilde{\mathcal{H}}^{\mathrm{res}}_l)$ (elementwise)
- Alternate column and row normalization so sums become $1$:

$$
\mathbf{M}^{(t)} = \mathcal{T}_r(\mathcal{T}_c(\mathbf{M}^{(t-1)})).
$$

As $t_{\max} \to \infty$, this converges to a doubly stochastic matrix. In practice they use $t_{\max} = 20$ iterations.

## Efficiency and scaling notes (why they spend time on kernels)
The residual stream is $n$ times wider, so the main cost is memory movement, not FLOPs. The paper reports that mHC reaches large-scale training with a small overhead (about $6.7\%$ extra time for $n = 4$) by combining:
- Kernel fusion, mixed precision kernels, and a single-kernel Sinkhorn-Knopp forward with a custom backward that recomputes intermediates on chip.
- Activation recomputation: discard intermediate activations inside mHC kernels and recompute them during backprop.

They choose a recomputation block size $L_r$ by minimizing a simple memory model:

$$
nC \left\lceil \frac{L}{L_r} \right\rceil + (n+2)C L_r,
$$

which yields an approximate optimum:

$$
L_r^* \approx \sqrt{\frac{nL}{n+2}}.
$$

## Takeaway
If you want the macro-architecture benefits of HC (cross-stream mixing in a widened residual stream) but need stable large-scale training, mHC is a clean fix. The central idea is to constrain the residual mixing matrices to be (approximately) doubly stochastic using Sinkhorn-Knopp, which keeps the multi-layer skip path from drifting into an unstable product of arbitrary matrices.
