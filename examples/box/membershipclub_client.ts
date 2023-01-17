import algosdk from "algosdk";
import * as bkr from "../../src/";
export class MembershipRecord {
    role: bigint = BigInt(0);
    voted: boolean = false;
    static codec: algosdk.ABIType = algosdk.ABIType.from("(uint8,bool)");
    static fields: string[] = ["role", "voted"];
    static decodeResult(val: algosdk.ABIValue | undefined): MembershipRecord {
        return bkr.decodeNamedTuple(val, MembershipRecord.fields) as MembershipRecord;
    }
    static decodeBytes(val: Uint8Array): MembershipRecord {
        return bkr.decodeNamedTuple(MembershipRecord.codec.decode(val), MembershipRecord.fields) as MembershipRecord;
    }
}
export class MembershipClub extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { membership_token: { type: bkr.AVMType.uint64, key: "membership_token", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA2NApieXRlY2Jsb2NrIDB4NmQ2NTZkNjI2NTcyNzM2ODY5NzA1Zjc0NmY2YjY1NmUgMHgxNTFmN2M3NSAweDYxNjY2NjY5NzI2ZDYxNzQ2OTZmNmU3MyAweDAwCnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDU0ZDJkNjZkIC8vICJib290c3RyYXAocGF5LHN0cmluZyl1aW50NjQiCj09CmJueiBtYWluX2wxMwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDkyZWJmNmRlIC8vICJyZW1vdmVfbWVtYmVyKGFkZHJlc3Mpdm9pZCIKPT0KYm56IG1haW5fbDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZGNlMzUxMzggLy8gImFkZF9tZW1iZXIoYWNjb3VudCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHhjOGQwZDI0MyAvLyAiZ2V0X21lbWJlcnNoaXBfcmVjb3JkKGFkZHJlc3MpKHVpbnQ4LGJvb2wpIgo9PQpibnogbWFpbl9sMTAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgzNTEyOGE5OSAvLyAic2V0X2FmZmlybWF0aW9uKHVpbnQxNixieXRlWzY0XSxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGQxMWE1ZDRmIC8vICJnZXRfYWZmaXJtYXRpb24oYXNzZXQpYnl0ZVs2NF0iCj09CmJueiBtYWluX2w4CmVycgptYWluX2w4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKY2FsbHN1YiBnZXRhZmZpcm1hdGlvbl8xMQpzdG9yZSAxOQpieXRlY18xIC8vIDB4MTUxZjdjNzUKbG9hZCAxOQpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2w5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmV4dHJhY3RfdWludDE2CnN0b3JlIDE2CnR4bmEgQXBwbGljYXRpb25BcmdzIDIKc3RvcmUgMTcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE4CmxvYWQgMTYKbG9hZCAxNwpsb2FkIDE4CmNhbGxzdWIgc2V0YWZmaXJtYXRpb25fMTAKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEwOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmNhbGxzdWIgZ2V0bWVtYmVyc2hpcHJlY29yZF85CnN0b3JlIDEzCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpsb2FkIDEzCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDExOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDEyCmxvYWQgMTEKbG9hZCAxMgpjYWxsc3ViIGFkZG1lbWJlcl84CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpjYWxsc3ViIHJlbW92ZW1lbWJlcl83CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSA1CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgNApsb2FkIDQKZ3R4bnMgVHlwZUVudW0KaW50Y18xIC8vIHBheQo9PQphc3NlcnQKbG9hZCA0CmxvYWQgNQpjYWxsc3ViIGJvb3RzdHJhcF82CnN0b3JlIDYKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgNgppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDE0Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxNgplcnIKbWFpbl9sMTY6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIGF1dGhfb25seQphdXRob25seV8xOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzM6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGF1dGhfaG9sZHNfdG9rZW4KYXV0aGhvbGRzdG9rZW5fNDoKYnl0ZWNfMCAvLyAibWVtYmVyc2hpcF90b2tlbiIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDEKc3RvcmUgMApsb2FkIDEKbG9hZCAwCmludGNfMCAvLyAwCj4KJiYKcmV0c3ViCgovLyBhdXRoX2hvbGRzX3Rva2VuCmF1dGhob2xkc3Rva2VuXzU6CmJ5dGVjXzAgLy8gIm1lbWJlcnNoaXBfdG9rZW4iCmFwcF9nbG9iYWxfZ2V0CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSAzCnN0b3JlIDIKbG9hZCAzCmxvYWQgMgppbnRjXzAgLy8gMAo+CiYmCnJldHN1YgoKLy8gYm9vdHN0cmFwCmJvb3RzdHJhcF82OgpzdG9yZSA4CnN0b3JlIDcKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhvbmx5XzEKLy8gdW5hdXRob3JpemVkCmFzc2VydApsb2FkIDcKZ3R4bnMgUmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KLy8gcGF5bWVudCBtdXN0IGJlIHRvIGFwcCBhZGRyZXNzCmFzc2VydApsb2FkIDcKZ3R4bnMgQW1vdW50CnB1c2hpbnQgMzY1ODUwMCAvLyAzNjU4NTAwCj49Ci8vIHBheW1lbnQgbXVzdCBiZSBmb3IgPj0gMzY1ODUwMAphc3NlcnQKYnl0ZWNfMiAvLyAiYWZmaXJtYXRpb25zIgpwdXNoaW50IDY0MCAvLyA2NDAKYm94X2NyZWF0ZQpwb3AKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgOApleHRyYWN0IDIgMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0TmFtZQpwdXNoaW50IDEwMDAgLy8gMTAwMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VG90YWwKaW50Y18xIC8vIDEKaXR4bl9maWVsZCBDb25maWdBc3NldERlZmF1bHRGcm96ZW4KZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldE1hbmFnZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldENsYXdiYWNrCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRGcmVlemUKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldFJlc2VydmUKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAibWVtYmVyc2hpcF90b2tlbiIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgMTAKc3RvcmUgOQpsb2FkIDEwCiEKYXNzZXJ0CmJ5dGVjXzAgLy8gIm1lbWJlcnNoaXBfdG9rZW4iCml0eG4gQ3JlYXRlZEFzc2V0SUQKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMCAvLyAibWVtYmVyc2hpcF90b2tlbiIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyByZW1vdmVfbWVtYmVyCnJlbW92ZW1lbWJlcl83OgpzdG9yZSAyMgp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmxvYWQgMjIKYm94X2RlbApwb3AKcmV0c3ViCgovLyBhZGRfbWVtYmVyCmFkZG1lbWJlcl84OgpzdG9yZSAyNApzdG9yZSAyMwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMwovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmludGNfMCAvLyAwCnN0b3JlIDI1CmxvYWQgMjUKcHVzaGludCAyNTYgLy8gMjU2CjwKYXNzZXJ0CmludGNfMCAvLyAwCiEKIQpzdG9yZSAyNgpieXRlY18zIC8vIDB4MDAKaW50Y18wIC8vIDAKbG9hZCAyNQpzZXRieXRlCmJ5dGVjXzMgLy8gMHgwMAppbnRjXzAgLy8gMApsb2FkIDI2CnNldGJpdApjb25jYXQKc3RvcmUgMjcKbG9hZCAyMwp0eG5hcyBBY2NvdW50cwpib3hfZGVsCnBvcApsb2FkIDIzCnR4bmFzIEFjY291bnRzCmxvYWQgMjcKYm94X3B1dAppdHhuX2JlZ2luCnB1c2hpbnQgNCAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmJ5dGVjXzAgLy8gIm1lbWJlcnNoaXBfdG9rZW4iCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgWGZlckFzc2V0CmludGNfMSAvLyAxCml0eG5fZmllbGQgQXNzZXRBbW91bnQKbG9hZCAyMwp0eG5hcyBBY2NvdW50cwppdHhuX2ZpZWxkIEFzc2V0UmVjZWl2ZXIKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBBc3NldFNlbmRlcgppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIGdldF9tZW1iZXJzaGlwX3JlY29yZApnZXRtZW1iZXJzaGlwcmVjb3JkXzk6CmJveF9nZXQKc3RvcmUgMTUKc3RvcmUgMTQKbG9hZCAxNQphc3NlcnQKbG9hZCAxNApyZXRzdWIKCi8vIHNldF9hZmZpcm1hdGlvbgpzZXRhZmZpcm1hdGlvbl8xMDoKc3RvcmUgMzAKc3RvcmUgMjkKc3RvcmUgMjgKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhob2xkc3Rva2VuXzQKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18yIC8vICJhZmZpcm1hdGlvbnMiCmludGNfMiAvLyA2NApsb2FkIDI4CioKbG9hZCAyOQpib3hfcmVwbGFjZQpyZXRzdWIKCi8vIGdldF9hZmZpcm1hdGlvbgpnZXRhZmZpcm1hdGlvbl8xMToKc3RvcmUgMjAKdHhuIFNlbmRlcgpjYWxsc3ViIGF1dGhob2xkc3Rva2VuXzUKLy8gdW5hdXRob3JpemVkCmFzc2VydApieXRlY18yIC8vICJhZmZpcm1hdGlvbnMiCmludGNfMiAvLyA2NApnbG9iYWwgUm91bmQKcHVzaGludCAxMCAvLyAxMAolCioKaW50Y18yIC8vIDY0CmJveF9leHRyYWN0CnN0b3JlIDIxCmludGNfMiAvLyA2NApsb2FkIDIxCmxlbgo9PQphc3NlcnQKbG9hZCAyMQpyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "bootstrap", desc: "", args: [{ type: "pay", name: "seed", desc: "" }, { type: "string", name: "token_name", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "remove_member", desc: "", args: [{ type: "address", name: "member", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "add_member", desc: "", args: [{ type: "account", name: "new_member", desc: "" }, { type: "asset", name: "membership_token", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_membership_record", desc: "", args: [{ type: "address", name: "member", desc: "" }], returns: { type: "(uint8,bool)", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_affirmation", desc: "", args: [{ type: "uint16", name: "idx", desc: "" }, { type: "byte[64]", name: "affirmation", desc: "" }, { type: "asset", name: "membership_token", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_affirmation", desc: "", args: [{ type: "asset", name: "membership_token", desc: "" }], returns: { type: "byte[64]", desc: "" } })
    ];
    async bootstrap(args: {
        seed: algosdk.TransactionWithSigner | algosdk.Transaction;
        token_name: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.bootstrap({ seed: args.seed, token_name: args.token_name }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async remove_member(args: {
        member: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.remove_member({ member: args.member }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async add_member(args: {
        new_member: string;
        membership_token?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.add_member({ new_member: args.new_member, membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") as bigint : args.membership_token }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_membership_record(args: {
        member: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<MembershipRecord>> {
        const result = await this.execute(await this.compose.get_membership_record({ member: args.member }, txnParams));
        return new bkr.ABIResult<MembershipRecord>(result, MembershipRecord.decodeResult(result.returnValue));
    }
    async set_affirmation(args: {
        idx: bigint;
        affirmation: Uint8Array;
        membership_token?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.set_affirmation({ idx: args.idx, affirmation: args.affirmation, membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") as bigint : args.membership_token }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async get_affirmation(args: {
        membership_token?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<Uint8Array>> {
        const result = await this.execute(await this.compose.get_affirmation({ membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") as bigint : args.membership_token }, txnParams));
        return new bkr.ABIResult<Uint8Array>(result, result.returnValue as Uint8Array);
    }
    compose = {
        bootstrap: async (args: {
            seed: algosdk.TransactionWithSigner | algosdk.Transaction;
            token_name: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "bootstrap"), { seed: args.seed, token_name: args.token_name }, txnParams, atc);
        },
        remove_member: async (args: {
            member: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "remove_member"), { member: args.member }, txnParams, atc);
        },
        add_member: async (args: {
            new_member: string;
            membership_token?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "add_member"), { new_member: args.new_member, membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") : args.membership_token }, txnParams, atc);
        },
        get_membership_record: async (args: {
            member: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_membership_record"), { member: args.member }, txnParams, atc);
        },
        set_affirmation: async (args: {
            idx: bigint;
            affirmation: Uint8Array;
            membership_token?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_affirmation"), { idx: args.idx, affirmation: args.affirmation, membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") : args.membership_token }, txnParams, atc);
        },
        get_affirmation: async (args: {
            membership_token?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_affirmation"), { membership_token: args.membership_token === undefined ? await this._resolve("global-state", "membership_token") : args.membership_token }, txnParams, atc);
        }
    };
}
