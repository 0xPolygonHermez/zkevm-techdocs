const { FGL } = require("pil-stark");
const { newConstantPolsArray, newCommitPolsArray, compile, verifyPil } = require("pilcom");
const path = require("path");

async function execute() {
    const pil = await compile(FGL, path.join(__dirname, "main.pil"));

    const constPols =  newConstantPolsArray(pil);
    const cmPols = newCommitPolsArray(pil);

    const N = constPols.Global.BITS4.length;
        
    await buildConstantPolynomials(constPols, N);
    await buildcommittedPolynomials(cmPols, N);
    
    const res =  await verifyPil(FGL, pil, cmPols , constPols);
    if (res.length != 0) {
        console.log("The execution trace do not satisfy PIL restrictions. Aborting...");
        for (let i=0; i<res.length; i++) {
            console.log(res[i]);
            return;
        }
    }
}

execute();

async function buildConstantPolynomials(constPols, polDeg) {
    
    for (let i=0; i < polDeg; i++) {
        constPols.Global.BITS4[i] = BigInt(i & 0b1111);
        constPols.Negation.RESET[i] = (i % 4) == 3 ? 1n : 0n;
        constPols.Negation.FACTOR[i] = BigInt(1 << (i % 4));
    }
}

async function buildcommittedPolynomials(cmPols, polDeg) {
    
    cmPols.Negation.a[-1] = 0n;
    cmPols.Negation.neg_a[-1] = 1n;
    
    for (let i=0; i < polDeg; i++) {
        
        let fourBitsInt = i % 16;
        
        cmPols.Main.a[i] = BigInt(fourBitsInt);
        cmPols.Main.neg_a[i] = BigInt(fourBitsInt ^ 0b1111);
        cmPols.Main.op[i] = FGL.mul(cmPols.Main.a[i], cmPols.Main.neg_a[i]);
        
        cmPols.Multiplier.freeIn1[i] = cmPols.Main.a[i];
        cmPols.Multiplier.freeIn2[i] = cmPols.Main.neg_a[i];
        cmPols.Multiplier.out[i] = cmPols.Main.op[i];
        
        let associatedInt = Math.floor(i/4);
        let bit = (associatedInt >> (i%4) & 1) % 16;
        cmPols.Negation.bits[i] = BigInt(bit);
        cmPols.Negation.nbits[i] = BigInt(bit ^ 1);
        
        
        let factor = BigInt(1 << (i % 4));
        let reset = (i % 4) == 0 ? 1n : 0n;
        cmPols.Negation.a[i] = factor*cmPols.Negation.bits[i] 
        + (1n-reset)*cmPols.Negation.a[i-1];
        cmPols.Negation.neg_a[i] = factor*cmPols.Negation.nbits[i] 
        + (1n-reset)*cmPols.Negation.neg_a[i-1];
    }
}