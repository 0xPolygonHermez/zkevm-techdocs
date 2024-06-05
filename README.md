# Polygon zkEVM Technical Documentation Repository

## General Info
This repository contains documentation material about the different aspects of the Polygon zkEVM.
In particular, this repository contains three types of materials: 
(A) system description slides, (B) system description documents (that we also name as our knowledge layer) and finally, (C) technical specification documents.

## Disclaimer
Materials in this repo are being continuously reviewed and updated.

## A. System Description Slides

- **Concepts:** [Here](./slides/zkevm-concepts.pdf) you can find slides about some concepts that are recommended to understand the zkEVM. 
- **Proving System Principles:** [Here](./slides/zkevm-architecture-part1-proving-system-principles.pdf) you can find the first part of the zkEVM architecture slides that present the basic principles of the proving system used by the zkEVM.
- **Sequencing and Proving:** [Here](./slides/zkevm-architecture-part2-sequencing-and-proving.pdf) you can find the 
second part of the zkEVM architecture slides that presents the two main processes in the zkEVM: the sequencing and the proving.
- **Layer Communications:** [Here](./slides/zkevm-architecture-part3-layer-communication.pdf) you can find the 
third part of the zkEVM architecture slides that shows how the different layers exchange information in the zkEVM architecture.
- **Exchanging Assets and Messages:** [Here](./slides/zkevm-architecture-part4-exchanging-assets-and-messages.pdf) you can find the 
fourth part of the zkEVM architecture slides that shows how we use the layer exchange to transfer assets and messages between layers.
- **uLXLY:** [Here](./slides/zkevm-architecture-part5-ulxly.pdf) you can find the fifth part of the zkEVM architecture slides 
that explains the unified LXLY. 
- **Economics:** [Here](./slides/zkevm-architecture-part6-economics.pdf) you can find the 
sixth part of the zkEVM architecture slides that explains the economic aspects of the zkEVM.

## B. System Description Documents (Knowledge Layer)

- Concepts:
  - [Ethereum State](./knowledge-layer/concepts/ethereum-state.pdf)
  - [Road to Scalability](./knowledge-layer/concepts/road-to-scalability.pdf)
  - [L2 Scaling Strategies](./knowledge-layer/concepts/l2-scaling-strategies.pdf)

- Architecture:
  - [Pre-requisities](./knowledge-layer/architecture/pre-requisites.pdf)
  - [Introduction to the Proving System](./knowledge-layer/architecture/intro-proving-system.pdf)
  - [L2 State Tree Concept](./knowledge-layer/architecture/l2-state-tree-concept.pdf)
  - [Proving System Inputs](./knowledge-layer/architecture/proof-inputs.pdf)
  - [Order Then Prove](./knowledge-layer/architecture/order-then-prove.pdf)
  - [Sequencing Batches](./knowledge-layer/architecture/sequencing-batches.pdf)
  - [Aggregator](./knowledge-layer/architecture/aggregator.pdf)
  - [JSON-RPC](./knowledge-layer/architecture/zkevm-network.pdf)
  - [L2StateTree: Keys and Values](./knowledge-layer/architecture/L2StateTree.pdf)
  - [Users Fees](./knowledge-layer/architecture/users-fees.pdf)
  - [Unified LXLY](./knowledge-layer/architecture/ulxly.pdf)

- Specs:
  - [pil-stark](./knowledge-layer/specs/PDFs/estark.pdf)

## C. Technical Specification Documents

Currently there are the following documents (the order is valid for linear reading):
- [MulMod Opcode](./docs/opcode-mulmod.pdf):
  This document describes the implementation of the mulmod opcode.    
- [eSTARK](./docs/estark.pdf):
  This paper describes eAIR, a set of constraints and its proving system.
- [PIL](./docs/pil.pdf):
  This document describes the Polynomial Identity Language (PIL), which is a novel domain-specific language useful for defining eAIR constraints.
- [Proof Recurssion](./docs/proof-recursion.pdf):
  This document specifies how the polygon zkEVM is proven using recursion, agregation and composition. The constraints of the zkEVM are specified as polynomial identities using the PIL language. Then, an execution trace can be proven using the PIL specification for building a STARK that is proved with the FRI protocol. The problem is that STARKs generate big proofs. This document describes how to use recursion together with composition to shorten the proof size. 
