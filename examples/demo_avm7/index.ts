import algosdk, { AtomicTransactionComposer } from 'algosdk'
import nacl from 'tweetnacl';
import * as bkr from "../../src";
import { DemoAVM7 } from "./demoavm7_client";

(async function () {
  const acct = (await bkr.sandbox.getAccounts()).pop();

  if(acct === undefined) return

  const appClient = new DemoAVM7({
    client: bkr.sandbox.getAlgodClient(),
    signer: acct.signer,
    sender: acct.addr,
  });

  const [appId, appAddr, txId] = await appClient.create();
  console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);

  // const json_ref_result = await appClient.json_ref({
  //   json_str: JSON.stringify({
  //     string_key: "In Xanadu did Kubla Khan",
  //     uint_key: 42,
  //     obj_key: { lol: "lmao" },
  //   }),
  // });
  // console.log(json_ref_result.value);

  // const sp = await appClient.client.getTransactionParams().do();
  // const block_result = await appClient.block({
  //   round: BigInt(sp.firstRound - 1),
  // });
  // console.log(block_result.value);

    function bytesigner(sk: Uint8Array, msg: string): Uint8Array {
      const sig =  nacl.sign.detached(Buffer.from(msg), sk);
      return new Uint8Array(sig.buffer)
    }

    const message = "Sign me please"
    const sig = bytesigner(new Uint8Array(acct.privateKey), message)

    const verifyMethod = algosdk.getMethodByName(appClient.methods, "ed25519verify_bare")
    const noopMethod = algosdk.getMethodByName(appClient.methods, "noop")

    let atc = new AtomicTransactionComposer()
    await appClient.addMethodCall(atc, verifyMethod, {msg: message, sig: sig})
    await appClient.addMethodCall(atc, noopMethod, undefined, {note:new Uint8Array(Buffer.from("noncey1"))})
    await appClient.addMethodCall(atc, noopMethod, undefined, {note:new Uint8Array(Buffer.from("noncey2"))})

    const result = await atc.execute(appClient.client, 4)
    console.log(result.methodResults)

})();
