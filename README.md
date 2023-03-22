# zkevm-techdocs

## General info
This repository contains technical documents about the different aspects of the Polygon zk-EVM.

## Content
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

## Disclaimer
These documents are work in progress and new versions will be delivered.