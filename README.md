# Polygon zkEVM Technical Documentation Repository

## General info
This repository contains documentation material about the different aspects of the Polygon zkEVM.
In particular, this repository contains three types of materials: (A) system description slides, (B) system description documents (that we also name as our knowledge layer) and finally, (C) technical specification documents.

## Disclaimer
Materials in this repo are being continously reviewed and updated.

## A. System Description Slides

- **Concepts:** [Here](./slides/zkevm-concepts.pdf) you can find slides about some concepts that are recommended to understand the zkEVM. 
- **Proving System Principles:** [Here](./slides/zkevm-architecture-part1-proving-system-principles.pdf) you can find the first part of the zkEVM architecture slides that present the basic principles of the proving system used by the zkEVM.
- **Sequencing and Proving:** [Here](./slides/zkevm-architecture-part2-sequencing-and-proving.pdf) you can find the 
second part fo the zkEVM architecture slides that presents the two main processes in the zkEVM: the sequencing and the proving.
- **Layer Communications:** [Here](./slides/zkevm-architecture-part3-layer-communication.pdf) you can find the 
third part fo the zkEVM architecture slides that shows how the different layers exchange information in the zkEVM architecture.
- **Exchanging Assets and Messages:** [Here](./slides/zkevm-architecture-part4-exchanging-assets-and-messages.pdf) you can find the 
fourth part fo the zkEVM architecture slides that shows how we use the layer exchange to transfer assets and messages between layers.


## B. System Description Documents (Knowledge Layer)

- Concepts:
  - [Road to Scalability](./knowledge-layer/concepts/PDFs/road-to-scalability.pdf)

- Architecture:
  - [Pre-requisities](./knowledge-layer/architecture/PDFs/pre-requisites.pdf)

## C. Technical Specification Documents

Currently there are the following documents (the order is valid for linear reading):
- trustless-l2-state-management: 
  This document describes the layer one infrastructure designed to ensure the security and reliability of the layer two state transitions of the Polygon zkEVM.
- bridge: 
  This document describes the solution to bring native interoperable properties to the Polygon zkEVM layer two network. The bridge is an infrastructure component that allows migration of assets and communication between layer one and layer two.
- zkevm-architecture:
  This document describes the architecture of the zkEVM and the assembly language created by Polygon, designed specifically with Ethereum Virtual Machine (EVM) features to represent blockchain transactional-based computations that could be executed with probable computational integrity.
- mulmod-opcode:
  This document describes the implementation of the mulmod opcode.    
- estark:
  This paper describes eAIR, a set of constraints and its proving system.
- pil:
  This document describes the Polynomial Identity Language (PIL), which is a novel domain-specific language useful for defining eAIR constraints.
- proof-recursion:
  This document specifies how the polygon zkEVM is proven using recursion, agregation and composition. The constraints of the zkEVM are specified as polynomial identities using the PIL language. Then, an execution trace can be proven using the PIL specification for building a STARK that is proved with the FRI protocol. The problem is that STARKs generate big proofs. This document describes how to use recursion together with composition to shorten the prove size. 