import algosdk from 'algosdk';
import * as bkr from '../../src';
import { MembershipClub } from './membershipclub_client';

const affirmations: string[] = [
  'I am successful.',
  'I am confident.',
  'I am powerful.',
  'I am strong.',
  'I am getting better and better every day.',
  'All I need is within me right now.',
  'I wake up motivated.',
  'I am an unstoppable force of nature.',
  'I am a living, breathing example of motivation.',
  'All I need is GM.',
];

const affirmationBoxName = new Uint8Array(Buffer.from('affirmations'));
const boxes: algosdk.BoxReference[] = [
  { appIndex: 0, name: affirmationBoxName },
];

function printBox(raw: Uint8Array) {
  const thing = Buffer.from(raw).toString('ascii');
  console.log(thing);
}
// membership_record = record_codec.decode(contents)
// print(f"\t{encode_address(box_name)} => {membership_record} ")

(async function () {
  const accts = await bkr.sandbox.getAccounts();
  const acct = accts.pop();
  if (acct === undefined) return;

  const memberAcct = accts.pop();
  if (memberAcct === undefined) return;

  const appClient = new MembershipClub({
    client: bkr.clients.sandboxAlgod(),
    signer: acct.signer,
    sender: acct.addr,
  });

  const { appId, appAddress, txId } = await appClient.create();
  console.log(`Created app ${appId} with address ${appAddress} in tx ${txId}`);

  //
  // Bootstrap Club app
  //
  console.log('Bootstrapping app');
  const sp = await appClient.getSuggestedParams();
  sp.flatFee = true;
  sp.fee = 2000;

  const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: acct.addr,
    to: appAddress,
    suggestedParams: sp,
    amount: 5_000_000,
  });

  const bootstrapResult = await appClient.bootstrap(
    {
      seed: ptxn,
      token_name: 'affirm club token',
    },
    { boxes: boxes },
  );
  const memberTokenId = bootstrapResult.returnValue;
  console.log(`Membership token id: ${memberTokenId}`);

  const memberAppClient = new MembershipClub({
    appId: appId,
    client: bkr.clients.sandboxAlgod(),
    signer: memberAcct.signer,
    sender: memberAcct.addr,
  });

  // Make the member opt in to the membership token
  const optIn = algosdk
    .makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: memberAcct.addr,
      suggestedParams: sp,
      to: memberAcct.addr,
      amount: 0,
      assetIndex: Number(memberTokenId),
    })
    .signTxn(memberAcct.privateKey);

  const { txID } = await memberAppClient.client.sendRawTransaction(optIn).do();
  // await algosdk.waitForConfirmation(memberAppClient.client, txID, 4);

  // The box name is just the address of the member
  const memberBoxName = algosdk.decodeAddress(memberAcct.addr).publicKey;
  // Add the member acct
  await appClient.add_member(
    {
      new_member: memberAcct.addr,
    },
    {
      suggestedParams: sp,
      boxes: [
        {
          appIndex: appId,
          name: memberBoxName,
        },
      ],
    },
  );

  const memberBox = await appClient.getApplicationBox(memberBoxName);
  console.log('Member Box contents: ', memberBox);

  for (const idx in affirmations) {
    const aff = affirmations[idx];
    await memberAppClient.set_affirmation(
      {
        idx: BigInt(idx),
        affirmation: new Uint8Array(Buffer.from(aff.padStart(64, ' '))),
      },
      { boxes: boxes },
    );
  }

  const affirmationBox = await appClient.getApplicationBox(affirmationBoxName);
  // We know our affirmation box is byte[64][10]
  // so we can create a codec from the sdk to parse it for us
  const affirmationCodec = algosdk.ABIType.from('byte[64][10]');
  // Decode using the codec
  const decodedAffirmations = affirmationCodec.decode(
    affirmationBox,
  ) as Uint8Array[];
  for (const x of decodedAffirmations) {
    console.log(Buffer.from(x).toString('utf-8'));
  }

  const aff = await memberAppClient.get_affirmation({}, { boxes: boxes });

  if (aff.value !== undefined)
    console.log('Got affirmation: ', Buffer.from(aff.value).toString('utf-8'));
})();
