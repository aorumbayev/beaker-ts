import algosdk from "algosdk";
import * as bkr from "../../src/";
export class ConstantProductAMM extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { asset_a: { type: bkr.AVMType.uint64, key: "a", desc: "", static: false }, asset_b: { type: bkr.AVMType.uint64, key: "b", desc: "", static: false }, governor: { type: bkr.AVMType.bytes, key: "g", desc: "", static: false }, pool_token: { type: bkr.AVMType.uint64, key: "p", desc: "", static: false }, ratio: { type: bkr.AVMType.uint64, key: "r", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMSAxMDAwIDQgMTAwMDAwMDAwMDAKYnl0ZWNibG9jayAweDYxIDB4NjIgMHg3MCAweDY3IDB4NzIKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NmI1OWQ5NjUgLy8gImJvb3RzdHJhcChwYXksYXNzZXQsYXNzZXQpdWludDY0Igo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgxNDM2YzJhYyAvLyAiYnVybihheGZlcixhc3NldCxhc3NldCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sMTAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg1Y2JmMWUyZCAvLyAibWludChheGZlcixheGZlcixhc3NldCxhc3NldCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDA4YTk1NmY3IC8vICJzZXRfZ292ZXJub3IoYWNjb3VudCl2b2lkIgo9PQpibnogbWFpbl9sOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDRhODhlMDU1IC8vICJzd2FwKGF4ZmVyLGFzc2V0LGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2w3CmVycgptYWluX2w3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMjMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDI0CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMjIKbG9hZCAyMgpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMjIKbG9hZCAyMwpsb2FkIDI0CmNhbGxzdWIgc3dhcF8xMQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCmNhbGxzdWIgc2V0Z292ZXJub3JfMTAKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDk6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMjAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDIxCnR4biBHcm91cEluZGV4CnB1c2hpbnQgMiAvLyAyCi0Kc3RvcmUgMTcKbG9hZCAxNwpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMTgKbG9hZCAxOApndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMTcKbG9hZCAxOApsb2FkIDE5CmxvYWQgMjAKbG9hZCAyMQpjYWxsc3ViIG1pbnRfOQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE2CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMTMKbG9hZCAxMwpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMTMKbG9hZCAxNApsb2FkIDE1CmxvYWQgMTYKY2FsbHN1YiBidXJuXzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDExOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMgp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDAKbG9hZCAwCmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KYXNzZXJ0CmxvYWQgMApsb2FkIDEKbG9hZCAyCmNhbGxzdWIgYm9vdHN0cmFwXzMKc3RvcmUgMwpwdXNoYnl0ZXMgMHgxNTFmN2M3NSAvLyAweDE1MWY3Yzc1CmxvYWQgMwppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxNAplcnIKbWFpbl9sMTQ6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgpieXRlY18zIC8vICJnIgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNCAvLyAiciIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMToKYnl0ZWNfMyAvLyAiZyIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKYnl0ZWNfMyAvLyAiZyIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBib290c3RyYXAKYm9vdHN0cmFwXzM6CnN0b3JlIDYKc3RvcmUgNQpzdG9yZSA0CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8yCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQpwdXNoaW50IDIgLy8gMgo9PQovLyBncm91cCBzaXplIG5vdCAyCmFzc2VydApsb2FkIDQKZ3R4bnMgUmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KLy8gcmVjZWl2ZXIgbm90IGFwcCBhZGRyZXNzCmFzc2VydApsb2FkIDQKZ3R4bnMgQW1vdW50CnB1c2hpbnQgMzAwMDAwIC8vIDMwMDAwMAo+PQovLyBhbW91bnQgbWluaW11bSBub3QgbWV0CmFzc2VydApsb2FkIDUKdHhuYXMgQXNzZXRzCmxvYWQgNgp0eG5hcyBBc3NldHMKPAovLyBhc3NldCBhIG9yIGFzc2V0IGIgaW5jb3JyZWN0CmFzc2VydAppbnRjXzAgLy8gMApieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSA4CnN0b3JlIDcKbG9hZCA4CiEKYXNzZXJ0CmJ5dGVjXzAgLy8gImEiCmxvYWQgNQp0eG5hcyBBc3NldHMKYXBwX2dsb2JhbF9wdXQKaW50Y18wIC8vIDAKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgMTAKc3RvcmUgOQpsb2FkIDEwCiEKYXNzZXJ0CmJ5dGVjXzEgLy8gImIiCmxvYWQgNgp0eG5hcyBBc3NldHMKYXBwX2dsb2JhbF9wdXQKaW50Y18wIC8vIDAKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXRfZXgKc3RvcmUgMTIKc3RvcmUgMTEKbG9hZCAxMgohCmFzc2VydApieXRlY18yIC8vICJwIgpieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldApieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGRvY3JlYXRlcG9vbHRva2VuXzcKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKY2FsbHN1YiBkb29wdGluXzgKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXQKY2FsbHN1YiBkb29wdGluXzgKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXQKcmV0c3ViCgovLyBidXJuCmJ1cm5fNDoKc3RvcmUgMzcKc3RvcmUgMzYKc3RvcmUgMzUKc3RvcmUgMzQKbG9hZCAzNQp0eG5hcyBBc3NldHMKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gYXNzZXQgcG9vbCBpbmNvcnJlY3QKYXNzZXJ0CmxvYWQgMzYKdHhuYXMgQXNzZXRzCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0Cj09Ci8vIGFzc2V0IGEgaW5jb3JyZWN0CmFzc2VydApsb2FkIDM3CnR4bmFzIEFzc2V0cwpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQovLyBhc3NldCBiIGluY29ycmVjdAphc3NlcnQKbG9hZCAzNApndHhucyBBc3NldFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09Ci8vIHJlY2VpdmVyIG5vdCBhcHAgYWRkcmVzcwphc3NlcnQKbG9hZCAzNApndHhucyBBc3NldEFtb3VudAppbnRjXzAgLy8gMAo+Ci8vIGFtb3VudCBtaW5pbXVtIG5vdCBtZXQKYXNzZXJ0CmxvYWQgMzQKZ3R4bnMgWGZlckFzc2V0CmJ5dGVjXzIgLy8gInAiCmFwcF9nbG9iYWxfZ2V0Cj09Ci8vIGFzc2V0IHBvb2wgaW5jb3JyZWN0CmFzc2VydApsb2FkIDM0Cmd0eG5zIFNlbmRlcgp0eG4gU2VuZGVyCj09Ci8vIGludmFsaWQgc2VuZGVyCmFzc2VydApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDM1CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSAzOQpzdG9yZSAzOApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDM2CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA0MQpzdG9yZSA0MApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDM3CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA0MwpzdG9yZSA0Mgpsb2FkIDM5Ci8vIG1pc3NpbmcgcmVxdWlyZWQgYmFsYW5jZXMKYXNzZXJ0CmxvYWQgNDEKLy8gbWlzc2luZyByZXF1aXJlZCBiYWxhbmNlcwphc3NlcnQKbG9hZCA0MwovLyBtaXNzaW5nIHJlcXVpcmVkIGJhbGFuY2VzCmFzc2VydAppbnRjIDQgLy8gMTAwMDAwMDAwMDAKbG9hZCAzOApsb2FkIDM0Cmd0eG5zIEFzc2V0QW1vdW50Ci0KLQpzdG9yZSA0NApsb2FkIDQ0CmxvYWQgNDAKbG9hZCAzNApndHhucyBBc3NldEFtb3VudApjYWxsc3ViIHRva2Vuc3RvYnVybl8xMgpzdG9yZSA0NQpsb2FkIDQ0CmxvYWQgNDIKbG9hZCAzNApndHhucyBBc3NldEFtb3VudApjYWxsc3ViIHRva2Vuc3RvYnVybl8xMgpzdG9yZSA0Ngp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0CmxvYWQgNDUKY2FsbHN1YiBkb2F4ZmVyXzYKdHhuIFNlbmRlcgpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldApsb2FkIDQ2CmNhbGxzdWIgZG9heGZlcl82CmJ5dGVjIDQgLy8gInIiCmNhbGxzdWIgY29tcHV0ZXJhdGlvXzUKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBjb21wdXRlX3JhdGlvCmNvbXB1dGVyYXRpb181OgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldAphc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKc3RvcmUgNDgKc3RvcmUgNDcKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDUwCnN0b3JlIDQ5CmxvYWQgNDgKLy8gbWlzc2luZyByZXF1aXJlZCBiYWxhbmNlcwphc3NlcnQKbG9hZCA1MAovLyBtaXNzaW5nIHJlcXVpcmVkIGJhbGFuY2VzCmFzc2VydApsb2FkIDQ3CmludGNfMiAvLyAxMDAwCm11bHcKaW50Y18wIC8vIDAKbG9hZCA0OQpkaXZtb2R3CnBvcApwb3AKc3dhcAohCmFzc2VydApyZXRzdWIKCi8vIGRvX2F4ZmVyCmRvYXhmZXJfNjoKc3RvcmUgMzMKc3RvcmUgMzIKc3RvcmUgMzEKaXR4bl9iZWdpbgppbnRjXzMgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpsb2FkIDMyCml0eG5fZmllbGQgWGZlckFzc2V0CmxvYWQgMzMKaXR4bl9maWVsZCBBc3NldEFtb3VudApsb2FkIDMxCml0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEZlZQppdHhuX3N1Ym1pdApyZXRzdWIKCi8vIGRvX2NyZWF0ZV9wb29sX3Rva2VuCmRvY3JlYXRlcG9vbHRva2VuXzc6CnN0b3JlIDI1CmFzc2V0X3BhcmFtc19nZXQgQXNzZXRVbml0TmFtZQpzdG9yZSAyNwpzdG9yZSAyNgpsb2FkIDI1CmFzc2V0X3BhcmFtc19nZXQgQXNzZXRVbml0TmFtZQpzdG9yZSAyOQpzdG9yZSAyOApsb2FkIDI3Ci8vIG1pc3NpbmcgcmVxdWlyZWQgYmFsYW5jZXMKYXNzZXJ0CmxvYWQgMjkKLy8gbWlzc2luZyByZXF1aXJlZCBiYWxhbmNlcwphc3NlcnQKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCnB1c2hieXRlcyAweDQ0NTA1NDJkIC8vICJEUFQtIgpsb2FkIDI2CmNvbmNhdApwdXNoYnl0ZXMgMHgyZCAvLyAiLSIKY29uY2F0CmxvYWQgMjgKY29uY2F0Cml0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCnB1c2hieXRlcyAweDY0NzA3NCAvLyAiZHB0IgppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKaW50YyA0IC8vIDEwMDAwMDAwMDAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXRUb3RhbApwdXNoaW50IDMgLy8gMwppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RGVjaW1hbHMKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldE1hbmFnZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldFJlc2VydmUKaW50Y18wIC8vIDAKaXR4bl9maWVsZCBGZWUKaXR4bl9zdWJtaXQKaXR4biBDcmVhdGVkQXNzZXRJRApyZXRzdWIKCi8vIGRvX29wdF9pbgpkb29wdGluXzg6CnN0b3JlIDMwCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMzAKaW50Y18wIC8vIDAKY2FsbHN1YiBkb2F4ZmVyXzYKcmV0c3ViCgovLyBtaW50Cm1pbnRfOToKc3RvcmUgNTgKc3RvcmUgNTcKc3RvcmUgNTYKc3RvcmUgNTUKc3RvcmUgNTQKbG9hZCA1Nwp0eG5hcyBBc3NldHMKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gYXNzZXQgYSBpbmNvcnJlY3QKYXNzZXJ0CmxvYWQgNTgKdHhuYXMgQXNzZXRzCmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0Cj09Ci8vIGFzc2V0IGIgaW5jb3JyZWN0CmFzc2VydApsb2FkIDU2CnR4bmFzIEFzc2V0cwpieXRlY18yIC8vICJwIgphcHBfZ2xvYmFsX2dldAo9PQovLyBhc3NldCBwb29sIGluY29ycmVjdAphc3NlcnQKbG9hZCA1NApndHhucyBBc3NldFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09Ci8vIHJlY2VpdmVyIG5vdCBhcHAgYWRkcmVzcwphc3NlcnQKbG9hZCA1NApndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gYXNzZXQgYSBpbmNvcnJlY3QKYXNzZXJ0CmxvYWQgNTQKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPgovLyBhbW91bnQgbWluaW11bSBub3QgbWV0CmFzc2VydApsb2FkIDU0Cmd0eG5zIFNlbmRlcgp0eG4gU2VuZGVyCj09Ci8vIGludmFsaWQgc2VuZGVyCmFzc2VydApsb2FkIDU1Cmd0eG5zIEFzc2V0UmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KLy8gcmVjZWl2ZXIgbm90IGFwcCBhZGRyZXNzCmFzc2VydApsb2FkIDU1Cmd0eG5zIFhmZXJBc3NldApieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQovLyBhc3NldCBiIGluY29ycmVjdAphc3NlcnQKbG9hZCA1NQpndHhucyBBc3NldEFtb3VudAppbnRjXzAgLy8gMAo+Ci8vIGFtb3VudCBtaW5pbXVtIG5vdCBtZXQKYXNzZXJ0CmxvYWQgNTUKZ3R4bnMgU2VuZGVyCnR4biBTZW5kZXIKPT0KLy8gaW52YWxpZCBzZW5kZXIKYXNzZXJ0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgNTYKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDYwCnN0b3JlIDU5Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgNTcKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDYyCnN0b3JlIDYxCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgNTgKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDY0CnN0b3JlIDYzCmxvYWQgNjAKLy8gbWlzc2luZyByZXF1aXJlZCBiYWxhbmNlcwphc3NlcnQKbG9hZCA2MgovLyBtaXNzaW5nIHJlcXVpcmVkIGJhbGFuY2VzCmFzc2VydApsb2FkIDY0Ci8vIG1pc3NpbmcgcmVxdWlyZWQgYmFsYW5jZXMKYXNzZXJ0CmxvYWQgNjEKbG9hZCA1NApndHhucyBBc3NldEFtb3VudAo9PQpsb2FkIDYzCmxvYWQgNTUKZ3R4bnMgQXNzZXRBbW91bnQKPT0KJiYKYm56IG1pbnRfOV9sMgppbnRjIDQgLy8gMTAwMDAwMDAwMDAKbG9hZCA1OQotCmxvYWQgNjEKbG9hZCA1NApndHhucyBBc3NldEFtb3VudAotCmxvYWQgNjMKbG9hZCA1NQpndHhucyBBc3NldEFtb3VudAotCmxvYWQgNTQKZ3R4bnMgQXNzZXRBbW91bnQKbG9hZCA1NQpndHhucyBBc3NldEFtb3VudApjYWxsc3ViIHRva2Vuc3RvbWludF8xMwpiIG1pbnRfOV9sMwptaW50XzlfbDI6CmxvYWQgNTQKZ3R4bnMgQXNzZXRBbW91bnQKbG9hZCA1NQpndHhucyBBc3NldEFtb3VudApjYWxsc3ViIHRva2Vuc3RvbWludGluaXRpYWxfMTQKbWludF85X2wzOgpzdG9yZSA2NQpsb2FkIDY1CmludGNfMCAvLyAwCj4KLy8gb3V0Z29pbmcgYW1vdW50IHRvbyBsb3cKYXNzZXJ0CnR4biBTZW5kZXIKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXQKbG9hZCA2NQpjYWxsc3ViIGRvYXhmZXJfNgpieXRlYyA0IC8vICJyIgpjYWxsc3ViIGNvbXB1dGVyYXRpb181CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gc2V0X2dvdmVybm9yCnNldGdvdmVybm9yXzEwOgpzdG9yZSA3Mwp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjXzMgLy8gImciCmxvYWQgNzMKdHhuYXMgQWNjb3VudHMKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBzd2FwCnN3YXBfMTE6CnN0b3JlIDc2CnN0b3JlIDc1CnN0b3JlIDc0CmxvYWQgNzUKdHhuYXMgQXNzZXRzCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0Cj09Ci8vIGFzc2V0IGEgaW5jb3JyZWN0CmFzc2VydApsb2FkIDc2CnR4bmFzIEFzc2V0cwpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQovLyBhc3NldCBiIGluY29ycmVjdAphc3NlcnQKbG9hZCA3NApndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KbG9hZCA3NApndHhucyBYZmVyQXNzZXQKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXQKPT0KfHwKLy8gYXNzZXQgYSBvciBhc3NldCBiIGluY29ycmVjdAphc3NlcnQKbG9hZCA3NApndHhucyBBc3NldEFtb3VudAppbnRjXzAgLy8gMAo+Ci8vIGFtb3VudCBtaW5pbXVtIG5vdCBtZXQKYXNzZXJ0CmxvYWQgNzQKZ3R4bnMgU2VuZGVyCnR4biBTZW5kZXIKPT0KLy8gaW52YWxpZCBzZW5kZXIKYXNzZXJ0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgNzQKZ3R4bnMgWGZlckFzc2V0CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA3OApzdG9yZSA3NwpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDc0Cmd0eG5zIFhmZXJBc3NldApieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldAo9PQpibnogc3dhcF8xMV9sNQpieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldApzd2FwXzExX2wyOgphc3NldF9ob2xkaW5nX2dldCBBc3NldEJhbGFuY2UKc3RvcmUgODAKc3RvcmUgNzkKbG9hZCA3OAovLyBtaXNzaW5nIHJlcXVpcmVkIGJhbGFuY2VzCmFzc2VydApsb2FkIDgwCi8vIG1pc3NpbmcgcmVxdWlyZWQgYmFsYW5jZXMKYXNzZXJ0CmxvYWQgNzQKZ3R4bnMgQXNzZXRBbW91bnQKbG9hZCA3Nwpsb2FkIDc0Cmd0eG5zIEFzc2V0QW1vdW50Ci0KbG9hZCA3OQpjYWxsc3ViIHRva2Vuc3Rvc3dhcF8xNQpzdG9yZSA4MQpsb2FkIDgxCmludGNfMCAvLyAwCj4KLy8gb3V0Z29pbmcgYW1vdW50IHRvbyBsb3cKYXNzZXJ0CnR4biBTZW5kZXIKbG9hZCA3NApndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KYm56IHN3YXBfMTFfbDQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKYiBzd2FwXzExX2w2CnN3YXBfMTFfbDQ6CmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0CmIgc3dhcF8xMV9sNgpzd2FwXzExX2w1OgpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldApiIHN3YXBfMTFfbDIKc3dhcF8xMV9sNjoKbG9hZCA4MQpjYWxsc3ViIGRvYXhmZXJfNgpieXRlYyA0IC8vICJyIgpjYWxsc3ViIGNvbXB1dGVyYXRpb181CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gdG9rZW5zX3RvX2J1cm4KdG9rZW5zdG9idXJuXzEyOgpzdG9yZSA1MwpzdG9yZSA1MgpzdG9yZSA1MQpsb2FkIDUyCmxvYWQgNTMKbXVsdwppbnRjXzAgLy8gMApsb2FkIDUxCmRpdm1vZHcKcG9wCnBvcApzd2FwCiEKYXNzZXJ0CnJldHN1YgoKLy8gdG9rZW5zX3RvX21pbnQKdG9rZW5zdG9taW50XzEzOgpzdG9yZSA3MApzdG9yZSA2OQpzdG9yZSA2OApzdG9yZSA2NwpzdG9yZSA2Ngpsb2FkIDY5CmludGNfMiAvLyAxMDAwCm11bHcKaW50Y18wIC8vIDAKbG9hZCA2NwpkaXZtb2R3CnBvcApwb3AKc3dhcAohCmFzc2VydApzdG9yZSA3MQpsb2FkIDcwCmludGNfMiAvLyAxMDAwCm11bHcKaW50Y18wIC8vIDAKbG9hZCA2OApkaXZtb2R3CnBvcApwb3AKc3dhcAohCmFzc2VydApzdG9yZSA3Mgpsb2FkIDcxCmxvYWQgNzIKPApibnogdG9rZW5zdG9taW50XzEzX2wyCmxvYWQgNzIKYiB0b2tlbnN0b21pbnRfMTNfbDMKdG9rZW5zdG9taW50XzEzX2wyOgpsb2FkIDcxCnRva2Vuc3RvbWludF8xM19sMzoKbG9hZCA2NgptdWx3CmludGNfMCAvLyAwCmludGNfMiAvLyAxMDAwCmRpdm1vZHcKcG9wCnBvcApzd2FwCiEKYXNzZXJ0CnJldHN1YgoKLy8gdG9rZW5zX3RvX21pbnRfaW5pdGlhbAp0b2tlbnN0b21pbnRpbml0aWFsXzE0OgoqCnNxcnQKaW50Y18yIC8vIDEwMDAKLQpyZXRzdWIKCi8vIHRva2Vuc190b19zd2FwCnRva2Vuc3Rvc3dhcF8xNToKc3RvcmUgODQKc3RvcmUgODMKc3RvcmUgODIKbG9hZCA4MgppbnRjXzIgLy8gMTAwMApwdXNoaW50IDUgLy8gNQotCm11bHcKbG9hZCA4NAp1bmNvdmVyIDIKZGlnIDEKKgpjb3ZlciAyCm11bHcKY292ZXIgMgorCnN3YXAKaW50Y18wIC8vIDAKbG9hZCA4MwppbnRjXzIgLy8gMTAwMAoqCmxvYWQgODIKaW50Y18yIC8vIDEwMDAKcHVzaGludCA1IC8vIDUKLQoqCisKZGl2bW9kdwpwb3AKcG9wCnN3YXAKIQphc3NlcnQKcmV0c3Vi";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "bootstrap", desc: "", args: [{ type: "pay", name: "seed", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "burn", desc: "", args: [{ type: "axfer", name: "pool_xfer", desc: "" }, { type: "asset", name: "pool_asset", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "mint", desc: "", args: [{ type: "axfer", name: "a_xfer", desc: "" }, { type: "axfer", name: "b_xfer", desc: "" }, { type: "asset", name: "pool_asset", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_governor", desc: "", args: [{ type: "account", name: "new_governor", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "swap", desc: "", args: [{ type: "axfer", name: "swap_xfer", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async bootstrap(args: {
        seed: algosdk.TransactionWithSigner | algosdk.Transaction;
        a_asset: bigint;
        b_asset: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.bootstrap({ seed: args.seed, a_asset: args.a_asset, b_asset: args.b_asset }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async burn(args: {
        pool_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        pool_asset?: bigint;
        a_asset?: bigint;
        b_asset?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.burn({ pool_xfer: args.pool_xfer, pool_asset: args.pool_asset === undefined ? await this._resolve("global-state", "p") as bigint : args.pool_asset, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") as bigint : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") as bigint : args.b_asset }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async mint(args: {
        a_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        b_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        pool_asset?: bigint;
        a_asset?: bigint;
        b_asset?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.mint({ a_xfer: args.a_xfer, b_xfer: args.b_xfer, pool_asset: args.pool_asset === undefined ? await this._resolve("global-state", "p") as bigint : args.pool_asset, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") as bigint : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") as bigint : args.b_asset }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async set_governor(args: {
        new_governor: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.set_governor({ new_governor: args.new_governor }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async swap(args: {
        swap_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
        a_asset?: bigint;
        b_asset?: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.swap({ swap_xfer: args.swap_xfer, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") as bigint : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") as bigint : args.b_asset }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        bootstrap: async (args: {
            seed: algosdk.TransactionWithSigner | algosdk.Transaction;
            a_asset: bigint;
            b_asset: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "bootstrap"), { seed: args.seed, a_asset: args.a_asset, b_asset: args.b_asset }, txnParams, atc);
        },
        burn: async (args: {
            pool_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            pool_asset?: bigint;
            a_asset?: bigint;
            b_asset?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "burn"), { pool_xfer: args.pool_xfer, pool_asset: args.pool_asset === undefined ? await this._resolve("global-state", "p") : args.pool_asset, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") : args.b_asset }, txnParams, atc);
        },
        mint: async (args: {
            a_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            b_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            pool_asset?: bigint;
            a_asset?: bigint;
            b_asset?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "mint"), { a_xfer: args.a_xfer, b_xfer: args.b_xfer, pool_asset: args.pool_asset === undefined ? await this._resolve("global-state", "p") : args.pool_asset, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") : args.b_asset }, txnParams, atc);
        },
        set_governor: async (args: {
            new_governor: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_governor"), { new_governor: args.new_governor }, txnParams, atc);
        },
        swap: async (args: {
            swap_xfer: algosdk.TransactionWithSigner | algosdk.Transaction;
            a_asset?: bigint;
            b_asset?: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "swap"), { swap_xfer: args.swap_xfer, a_asset: args.a_asset === undefined ? await this._resolve("global-state", "a") : args.a_asset, b_asset: args.b_asset === undefined ? await this._resolve("global-state", "b") : args.b_asset }, txnParams, atc);
        }
    };
}
