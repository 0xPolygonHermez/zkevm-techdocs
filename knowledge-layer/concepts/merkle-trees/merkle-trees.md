Merkle Tree Concept {#sec:merkle-trees}
===================

The concept of data integrity can be approached using several
mechanisms. The more trivial one can be done using a cryptographic hash
function $H$. The idea is to hash the data $L$ and, to check if some
$L'$ is equal to $L$, that is reduced to check whether $H(L)$ is or not
equal to $H(L')$. A **Merkle tree** (named after Ralph Merkle), also
known as a hash tree, is a data structure used in computer science and
cryptography to efficiently verify the integrity of data within a larger
dataset. Using the naive hashing approach, we would need
$\mathcal{O}(n)$ checks in order to verify data integrity for a set of
$n$ blocks of data. With Merkle trees we can reduce this to
$\mathcal{O}(\log_2 n)$ by using the properties of the data structure.

The construction of a Merkle tree from a given dataset follows a
straightforward process: each **leaf** node is assigned the
cryptographic hash of a data block, while non-leaf nodes, often referred
to as **branches**, are assigned the cryptographic hash of their
respective child nodes.

![Depiction of a Merkle
Tree.](../../../figures/concepts/ethereum-state/merkle-tree.drawio.png){#fig:merkle-tree
width="0.6\\columnwidth"}

The **root** represents the overall integrity of all the data in the
tree. It is a single hash value that summarizes the entire dataset. If
any piece of the original data changes, even a single bit, the **root**
will change significantly.

The **proving process** for the statement that a leaf node is a part of
a given dataset requires computing a number of hashes proportional to
the logarithm of the number of leaf nodes in the tree, that is, the
number of levels of the tree. More specifically, the proof (often called
**Merkle proof**) consists on the siblings of the path descending to the
leaf we want to prove inclusion for. The **verification process**
entails recalculating the hashes within the tree while employing the
provided siblings until reaching the root. At this stage, the integrity
of the data can be ascertained by comparing the recalculated root hash
to the initially provided one.

#### Verification Example {#verification-example .unnumbered}

Let's provide an easy example. In the following figure, let's understand
how to check if an item exists in a Merkle Tree. Suppose we want to
confirm if an element, say, $L_{2}$, is in the tree. To do this, we need
two specific hash values $H(L_1)$ and $H_{34}(H_3 \mid H_4)$ to compute
the root of the tree $H_{1234}$. If the final root hash matches the one
provided to us, it means the element is indeed in the tree. However, if
the root hash we calculate doesn't match the expected value, then the
element is not in the tree. This simple process helps us verify the
presence of items in a Merkle Tree. Observe that we must be given as
many hashes as there are levels in the tree, which is
$\mathcal{O}(\log_2(n))$.

![The yellow nodes represent the given nodes in the Merkle proof for the
leaf node
$L_2$.](../../../figures/concepts/ethereum-state/merkle-proof.drawio.png){#fig:merkle-proof
width="0.6\\columnwidth"}

If an attacher wants to forge a proof, he needs to find a collision of
the hash function, i.e. a different leaf or intermediate node that has
the same hash as the one in our tree to have the same root, which is not
possible due to the properties of cryptographic hash functions.

Second Pre-image Attack
=======================

In the previous section, we have presented the concept of a Merkle tree
as a secure and efficient procedure to check inclusions. However, a
vulnerability known as **second-preimage attack** emerges if the Merkle
hash root is not linked with the tree depth. This scenario allows an
adversary to construct an alternative version of the tree, distinct from
the one containing the original elements, while yielding an identical
Merkle hash root. In Figure
[3](#fig:second-preimage-attack-example){reference-type="ref"
reference="fig:second-preimage-attack-example"}, the attacker pretends
that elements the elements $h_{01}$, $h_{23}$, $h_{45}$, and $h_{67}$
are the leafs of the tree.

![Illustrative Example of a Second-Preimage
Attack.](../../../figures/concepts/ethereum-state/second-preimage-attack.drawio.png){#fig:second-preimage-attack-example
width="0.6\\columnwidth"}

An important note is that this attack can occur even if the underlying
hash function has no known security weaknesses: it is inherently a
problem in how Merkle Tree's are constructed.

In order protect Merkle Trees from second-preimage attacks we can use
several techniques:

-   **Use two different hash functions:**

    We can leverage the use of two distinct hash functions, each serving
    a specific purpose. One of these hash functions is used to calculate
    hashes for leaf nodes, while the other for branch node hashes. For
    example, we can prefix a $\texttt{0x00}$ byte to the data before
    hashing for hashing the leaf nodes, and a $\texttt{0x01}$ byte for
    hashing branch nodes. This approach allows us to generate two unique
    hash functions derived from the same underlying design, correctly
    addressing the issue. In the case of Poseidon (See Section
    [5](#sec:merkle-tree-zero-knowledge){reference-type="ref"
    reference="sec:merkle-tree-zero-knowledge"}), it's possible to
    employ distinct capacity elements to instantiate different hash
    functions within the same framework. We will denote by
    $\texttt{H}_0$ and $\texttt{H}_1$ each of the hash functions used in
    leaf and branch nodes respectively.

-   **Codify the length of the tree:**

    Another approach is to incorporate the length of the tree itself as
    part of the data being hashed within the leaf nodes. By including
    the tree length in the hash computation, any alteration with the
    tree's size (like the one exposed before) becomes immediately
    evident during verification.

Merkle Tree Classification
==========================

In this section, we will delve into the classification of Merkle Trees
by several parameters. To better understand and utilize Merkle Trees,
it's essential to classify them based on different criteria. We will
explore different ways to group them, considering how they organize
data, include data, their shapes, and whether they can be updated or
not. Through this classification, we aim to provide a comprehensive
perspective on the different types of Merkle Trees and their specific
use cases.

#### Tree shape {#tree-shape .unnumbered}

When classifying Merkle Trees, the shape of the tree is another aspect
to consider. The tree shape dictates how nodes and branches are
structured within the tree, which can have a significant impact on its
efficiency and behavior. Here, we'll explore the two primary dimensions
of tree shape:

-   **Tree's arity:** The concept of the tree's **arity** refers to the
    specific number of child nodes that each branch node within the tree
    can have. Common examples include binary trees, ternary trees, 2-3
    trees, hexadecimal trees, and others. Notably, as we will see in
    Section [4](#sec:ethereum-patricia-trie){reference-type="ref"
    reference="sec:ethereum-patricia-trie"}, Ethereum's Patricia Merkle
    Trie employs a hexadecimal tree structure. The arity of the tree
    significantly impacts the shape of the tree: higher arity produces
    wider trees meanwhile lower ones produce deeper trees. This also
    affects the efficiency in several applications.

    ![Binary (left) vs Ternary (right) Merkle
    Trees.](../../../figures/concepts/ethereum-state/merkle-tree-arity.drawio.png){#fig:merkle-tree-arity
    width="0.80\\columnwidth"}

-   **Balanced or unbalanced**: The balance of a tree refers to how its
    nodes are distributed among its levels. We say that a tree is
    **balanced** if the height of the tree is $\mathcal{O}(\log_k n)$,
    where $n$ is the number of nodes and $k$ is the tree's arity.
    Balanced trees are often preferred in applications where quick data
    access and efficient traversal are essential, as they ensure that
    the worst-case search or verification times are minimized.

    ![Balanced (left) vs Unbalanced (right) Merkle
    Trees.](../../../figures/concepts/ethereum-state/merkle-tree-balancing.drawio.png){#fig:merkle-tree-balancing
    width="0.80\\columnwidth"}

#### Data organization {#data-organization .unnumbered}

One of the aspects of classifying Merkle Trees involves considering how
the data they store is organized. This organization method will directly
impact the tree's applicability. We can distinct two primary categories:

-   **Unordered:** In this category, there are no specific requirements
    regarding the arrangement of the data within the tree. Each leaf
    node represents a data block, but the order of these leafs is
    completely arbitrary. This lack of order is specially used when the
    data wanted to be hashed doesn't naturally fit into a specific
    sequence.

-   **Key-value:** On the other hand, key-value organized datasets
    provide a structured approach to data organization. Data within
    these trees is accessed and indexed using a key. The key determines
    the position of the leaf node representing the data within the tree.
    This method is particularly useful when you need to quickly locate
    specific pieces of data within a larger dataset.

![Unordered (left) vs Key-Value (right) Merkle
Trees.](../../../figures/concepts/ethereum-state/merkle-tree-structuring.drawio.png){#fig:merkle-tree-key-value
width="0.8\\columnwidth"}

#### Data inclusion {#data-inclusion .unnumbered}

The way Merkle Trees handle data inclusion is another factor in their
classification. It determines not only how data is added to the tree but
also how the absence of certain data is verified. We can distinct two
primary categories:

-   **Data-inclusion-only:** In this type of Merkle Tree, the only
    efficient check that we can prove is whether specific data is
    included in the tree or not. Non-inclusion proofs are still possible
    but not efficient, breaking Merkle Tree's intention.

-   **Complete:** In contrast, complete trees also allows non-inclusion
    proofs, i.e., being able to prove that there is no value associated
    with a given key. The name complete comes from the fact that these
    trees store all posible key-value bindings. In this context appears
    the concept of **Sparse Merkle Tree (SMT)** which is a complete tree
    with a hug key space, so it is sparsely populated. The naïve
    representation of a SMT can have an intractable space (for example,
    $\mathcal{O}(2^{256}$)) and techniques (such as **path compression**
    explained in Section
    [4](#sec:ethereum-patricia-trie){reference-type="ref"
    reference="sec:ethereum-patricia-trie"}) to compress the required
    space are applied to efficiently store the tree. In addition, in
    SMTs, there is typically a default value (most of the times $0$)
    that is used when the given key has no value associated.

#### Updatability {#updatability .unnumbered}

The category of Merkle tree updatability defines how flexible the tree
is in terms of altering its data after its initial construction. This
characteristic can significantly impact the tree's functionality and its
suitability for different applications. Let's explore the three main
categories of Merkle tree updatability:

-   **Read-only (Non-updatable):** This refers to a tree data structure
    in which the data or set of elements it represents cannot be altered
    or updated once the tree is constructed. Essentially, the Merkle
    tree remains static and immutable.

-   **Append-only:** In this tree structure, data can only be appended
    to the existing dataset, it cannot be modified or removed.
    Therefore, any data added to the tree becomes an immutable part of
    the tree's historical record. Such limitations provides several
    optimizations, particularly when it comes to proving insertions
    within the tree.

-   **Read-write:** Read-write Merkle trees provide a higher level of
    flexibility. These trees not only facilitate verification of data
    integrity but also allows modifications or updates of the underlying
    data while preserving the tree's structure and retaining its
    integrity verification capabilities.

Storing Ethereum State: Patricia Tree {#sec:ethereum-patricia-trie}
=====================================

The **Ethereum Merkle Patricia Trie** is a variation of a Merkle Tree
and is a fundamental data structure used in the Ethereum blockchain to
store and manage the World Ethereum State explained before. In our
exploration of Ethereum Merkle Patricia Trie, we will delve into two
fundamental concepts: *tries* and *radix tries*. These concepts are
crucial in understanding the underlying data structures and mechanisms
that power Ethereums World State.

#### Tries {#tries .unnumbered}

A **trie** (See Figure [7](#fig:trie-example){reference-type="ref"
reference="fig:trie-example"}), also referred to as **prefix tree**, is
a specialized tree structure used for locating specific keys within a
set. Typically these keys are strings, with links between nodes defined
not by the entire key, but by individual characters. To access a key,
the traversal of the trie occurs in a depth-first manner. This traversal
involves following the links between nodes, with each node representing
a character within the key.

![We observe how the key of each node is constructed according to its
path.](../../../figures/concepts/ethereum-state/trie-example.drawio.png){#fig:trie-example
width="0.75\\columnwidth"}

#### Radix Tries {#radix-tries .unnumbered}

A **radix trie** (See Figure
[8](#fig:radix-trie-example){reference-type="ref"
reference="fig:radix-trie-example"}), also referred to as **compact
radix tree**, is a space-efficient data structure that represents a
modified form of a trie. Patricia trees were invented by Donald R.
Morrisson and named by Donald Knuth, calling them *Patricia's trees*
afther the acronym in the title of Morrison's paper: *PATRICIA -
Practical Algorithm to Retrieve Information Coded in Alphanumeric*.

In this structure, the **path compression** technique is used, that is,
nodes with a single child are merged with their parent nodes, optimizing
space usage. Henceforth, and unlike regular trees, edges can be labelled
with sequences of elements as well as single elements. This makes radix
trees much more efficient for small sets (especially if the strings are
long, which is the case of Ethereum) and for sets of strings that share
long prefixes.

![The purple boxes represent the nodes whose path could be compressed
because their chain was redundant.
](../../../figures/concepts/ethereum-state/radix-trie-example.drawio.png){#fig:radix-trie-example
width="0.75\\columnwidth"}

#### The Ethereum Merkle Patricia Trie {#the-ethereum-merkle-patricia-trie .unnumbered}

Ethereum's Patricia Trie uses a 16-ary radix trie structure and it is
sometimes called a hexadecimal trie. The trie is used to store the state
of Ethereum accounts. As explained before, this includes their
`balance`, `nonce` together with `codeHash` and `storageRoot` in the
case of Contract accounts. The root of each of them is stored in the
blockchain's block header, making it possible to verify the state of the
system at any given block.

The tree is built by linking nodes using deterministically-generated
cryptographic hash digests. More specifically, the key of an specific
`ethereumAddress` is always computed as its `keccak256` hash:
$$\texttt{keccak256(ethereumAddress)},$$
meanwhile the value (whose hash
will be included in the tree as a leaf) is always obtained applying the
Recursive-length prefix serialization (a.k.a `rlp`) of the $4$ item
consisting on the $4$ stored elements specified before:
$$\texttt{rlp([nonce, balance, storageRoot, codeHash])}.$$ 
Observe that,
`storageRoot` is also the root of another Patricia trie which: the
**storage trie**. Storage trie is where all contract data lives. Unlike
the previous one, there is a separate storage trie for each account.

To look up a value in the Patricia Tree, you start at the root and
traverse the tree by following the appropriate child node at each level
based on the hexadecimal digits of the key. This process continues until
you reach the leaf node that contains the desired data.

As we have seen, this particular Merkle Tree is a critical component of
the Ethereum blockchain's data structure, enabling efficient and secure
storage and retrieval of the system's state. Nevertheless, the hash
function employed by Ethereum's Patricia Tree is not ideally suited for
zero-knowledge settings, like a zk-Rollup. In this scenario, we opt for
the Poseidon hash function, as we explain in the next section. Moreover,
in the context of zero-knowledge, it's more efficient to adopt a binary
tree structure. This approach sidesteps the need for additional
constraints and significantly reduces costs. The Patricia Tree involves
a costly 16-node hash to level up, while the binary tree employs a more
economical two-node hash.

Merkle Trees for Zero Knowledge Proofs {#sec:merkle-tree-zero-knowledge}
======================================

When building Merkle trees for enabling Zero-Knowledge proofs about data
being included or not in the tree, there are some additional aspects
that need to be considered:

-   **Algebraic Natura of Zero-Knowledge Hash Functions:**

    Unlike classical hash functions, which tend to be bit-oriented,
    those employed in Zero-Knowledge protocols possess a distinctive
    algebraic nature. This algebraic structure facilitates a seamless
    arithmetization process.

-   **Data and Field Size Discrepancies:**

    One of the challenges arises from the disparities between the size
    of the data intended for storage in the tree and the size of the
    underlying field used by the Zero-Knowledge system. To solve that,
    we can adopt a *limbs-like strategy*, strategically partitioning and
    processing data into field sized *limbs*, ensuring compatibility
    between data and the underlying cryptographic field.

-   **Determinism in Zero-Knowledge:**

    Determinism is fundamental in Zero-Knowledge protocols and, hence,
    all the operations and parameters within the tree must be
    deterministic, meaning they yield predictable results for a given
    set of inputs.

-   **Constraints on Operations:**

    The operations and parameters governing the tree must be
    meticulously constrained at the time of constructing the proofs.
    Carefully defining and limiting the operations prevent potential
    vulnerabilities and attacks, making the arithmetization sound.

#### Suitable Hash Function for Zero-Knowledge {#suitable-hash-function-for-zero-knowledge .unnumbered}

`Poseidon` is a cryptographic hash function that has garnered attention
for its unique properties and suitability in the context of
Zero-Knowledge proofs. It was originally designed to address some of the
limitations and challenges faced by traditional hash functions in this
specific application domain. From now on, we will consider an
instantiation of `Poseidon` over a Goldilocks field (that is, $F_p$
where $p = 2^{64} - 2^{32} + 1$), that takes as entry $8$ field elements
divided into two groups: four of them are know as **capacity elements**,
and the other $4$ are the elements to be hashed, known as **input
elements** and outputs $4$ field elements known as **output elements**.
We will denote a Poseidon hash as follows:

$$\texttt{Poseidon}(\texttt{capacity};\texttt{values})$$

Here, $\texttt{capacity}$ is an array of $4$ field elements representing
the capacity elements, and $\texttt{values}$ is an array of $4$ field
elements representing the inputs of the hash. Observe that we can also
see `values` as an array of $8$ (almost) $32$-bits elements. In our
context, two instances of Poseidon hash function are employed for
protecting the tree against second-preimage attacks:
$\texttt{Poseidon}(0; \cdot)$ for branch nodes and
$\texttt{Poseidon}(1; \cdot)$ for leaf nodes.

A zk-Friendly Sparse Merkle Trie for the zkEVM State
====================================================

The Merkle tree we are using to store the zkEVM State is a Sparse Merkle
Binary Trie fully updatable (that is, allowing both read and write
operations) used to represent key-value data. We will also make it radix
in order to optimize storage space. Due to its construction, it will be
unbalanced by nature (since keys, which are used to completely locate
leaves within the tree, will be hashes of some data).

#### A Glimpse Through Toy Example {#a-glimpse-through-toy-example .unnumbered}

Let's visualize the tree using an example. Lets suppose we have some set
of data associated with four keys: `000110`, `001011`, `001100`, and
`101101`. Prefixes are used to position the leaves containing data. We
have four distinct prefixes: `000`, `0010`, `0011`, and `1`. Recall that
zero nodes are used to signify the absence of keys under a given prefix.
With this design, similar keys share a common path in the tree, saving
space.

![Illustrative Example of a Sparse Merkle
Trie.](../../../figures/concepts/ethereum-state/smt-trie.drawio.png){width=".8\\columnwidth"}

#### The Four Node Types {#the-four-node-types .unnumbered}

In the proposed example we can see the $4$ different types of nodes
appearing in our tree design:

-   **Root node**: The root node is the top node of the tree, the only
    one node at level zero, connecting all branches and leaves. It is
    the starting point for traversing the tree structure. It serves as a
    cryptographic summary of all the tree, the final hash of the entire
    dataset.

-   **Leaf node**: Leaf nodes encapsulate the actual data associated
    with a key. Its stored value can be obtained by hashing unique
    information of each key-value binding of the dataset.

-   **Branch node**: Branch nodes serve as intermediaries within the
    tree structure, positioned at various levels between the root node
    and the leaf nodes. These nodes actively guide the traversal path
    within the trie. The primary responsibility of a branch node is to
    store the hash derived from concatenating the hashes of its two
    child nodes. This hash encapsulates the segment of the cryptographic
    summary representing the data contained in the subtree rooted at
    that branch node.

-   **Zero node**: Zero nodes **do not** represents a zero value for a
    specific key. Instead, they denote the absence of a subtree beneath
    a branch node. In our example, we can see that all keys starting
    with $01$ share the default value of $0$. Consequently, there is no
    need for these keys to be individually present as nodes in the tree,
    and this is where zero nodes come into play. However, the tree
    actually stores several keys starting with $00$. These keys require
    the presence of a branch node at level $2$ to obtain the parent's
    node hash. The optimization lies in the decision not to hash the
    subtree below with hashes of zero but rather to represent it with an
    explicit zero value. In practical terms, this means that the branch
    node at level $1$ assumes a specific value:
    $$\texttt{H}_0(\texttt{leftChildNode}, 0).$$

    This optimization is called **partial tree construction**.
