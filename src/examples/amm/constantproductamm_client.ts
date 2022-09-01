import algosdk from "algosdk";
import {ApplicationClient, ABIResult, decodeNamedTuple, Schema, AVMType} from "../..";
export class ConstantProductAMM extends ApplicationClient {
    desc: string = "";
    appSchema: Schema = { declared: { asset_a: { type: AVMType.uint64, key: "a", desc: "", static: false }, asset_b: { type: AVMType.uint64, key: "b", desc: "", static: false }, governor: { type: AVMType.bytes, key: "g", desc: "", static: false }, pool_token: { type: AVMType.uint64, key: "p", desc: "", static: false }, ratio: { type: AVMType.uint64, key: "r", desc: "", static: false } }, dynamic: {} };
    acctSchema: Schema = { declared: {}, dynamic: {} };
    approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMSAxMDAwIDQgMTAwMDAwMDAwMDAKYnl0ZWNibG9jayAweDYxIDB4NjIgMHg3MCAweDY3IDB4NzIKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDEyCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NmI1OWQ5NjUgLy8gImJvb3RzdHJhcChwYXksYXNzZXQsYXNzZXQpdWludDY0Igo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgxNDM2YzJhYyAvLyAiYnVybihheGZlcixhc3NldCxhc3NldCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sMTAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg1Y2JmMWUyZCAvLyAibWludChheGZlcixheGZlcixhc3NldCxhc3NldCxhc3NldCl2b2lkIgo9PQpibnogbWFpbl9sOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDA4YTk1NmY3IC8vICJzZXRfZ292ZXJub3IoYWNjb3VudCl2b2lkIgo9PQpibnogbWFpbl9sOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDRhODhlMDU1IC8vICJzd2FwKGF4ZmVyLGFzc2V0LGFzc2V0KXZvaWQiCj09CmJueiBtYWluX2w3CmVycgptYWluX2w3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMjMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDI0CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMjIKbG9hZCAyMgpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMjIKbG9hZCAyMwpsb2FkIDI0CmNhbGxzdWIgc3dhcF8xMQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCmNhbGxzdWIgc2V0Z292ZXJub3JfMTAKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDk6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMjAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDIxCnR4biBHcm91cEluZGV4CnB1c2hpbnQgMiAvLyAyCi0Kc3RvcmUgMTcKbG9hZCAxNwpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMTgKbG9hZCAxOApndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMTcKbG9hZCAxOApsb2FkIDE5CmxvYWQgMjAKbG9hZCAyMQpjYWxsc3ViIG1pbnRfOQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CnR4bmEgQXBwbGljYXRpb25BcmdzIDEKaW50Y18wIC8vIDAKZ2V0Ynl0ZQpzdG9yZSAxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMTUKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDE2CnR4biBHcm91cEluZGV4CmludGNfMSAvLyAxCi0Kc3RvcmUgMTMKbG9hZCAxMwpndHhucyBUeXBlRW51bQppbnRjXzMgLy8gYXhmZXIKPT0KYXNzZXJ0CmxvYWQgMTMKbG9hZCAxNApsb2FkIDE1CmxvYWQgMTYKY2FsbHN1YiBidXJuXzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDExOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKc3RvcmUgMgp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDAKbG9hZCAwCmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KYXNzZXJ0CmxvYWQgMApsb2FkIDEKbG9hZCAyCmNhbGxzdWIgYm9vdHN0cmFwXzMKc3RvcmUgMwpwdXNoYnl0ZXMgMHgxNTFmN2M3NSAvLyAweDE1MWY3Yzc1CmxvYWQgMwppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxNAplcnIKbWFpbl9sMTQ6CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCj09CmFzc2VydApjYWxsc3ViIGNyZWF0ZV8wCmludGNfMSAvLyAxCnJldHVybgoKLy8gY3JlYXRlCmNyZWF0ZV8wOgpieXRlY18zIC8vICJnIgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKYXBwX2dsb2JhbF9wdXQKYnl0ZWMgNCAvLyAiciIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMToKYnl0ZWNfMyAvLyAiZyIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMjoKYnl0ZWNfMyAvLyAiZyIKYXBwX2dsb2JhbF9nZXQKPT0KcmV0c3ViCgovLyBib290c3RyYXAKYm9vdHN0cmFwXzM6CnN0b3JlIDYKc3RvcmUgNQpzdG9yZSA0CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8yCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKZ2xvYmFsIEdyb3VwU2l6ZQpwdXNoaW50IDIgLy8gMgo9PQphc3NlcnQKbG9hZCA0Cmd0eG5zIFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09CmFzc2VydApsb2FkIDQKZ3R4bnMgQW1vdW50CnB1c2hpbnQgMzAwMDAwIC8vIDMwMDAwMAo+PQphc3NlcnQKbG9hZCA1CnR4bmFzIEFzc2V0cwpsb2FkIDYKdHhuYXMgQXNzZXRzCjwKYXNzZXJ0CmludGNfMCAvLyAwCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDgKc3RvcmUgNwpsb2FkIDgKIQphc3NlcnQKYnl0ZWNfMCAvLyAiYSIKbG9hZCA1CnR4bmFzIEFzc2V0cwphcHBfZ2xvYmFsX3B1dAppbnRjXzAgLy8gMApieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSAxMApzdG9yZSA5CmxvYWQgMTAKIQphc3NlcnQKYnl0ZWNfMSAvLyAiYiIKbG9hZCA2CnR4bmFzIEFzc2V0cwphcHBfZ2xvYmFsX3B1dAppbnRjXzAgLy8gMApieXRlY18yIC8vICJwIgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSAxMgpzdG9yZSAxMQpsb2FkIDEyCiEKYXNzZXJ0CmJ5dGVjXzIgLy8gInAiCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0CmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0CmNhbGxzdWIgZG9jcmVhdGVwb29sdG9rZW5fNgphcHBfZ2xvYmFsX3B1dApieXRlY18wIC8vICJhIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGRvb3B0aW5fNwpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGRvb3B0aW5fNwpieXRlY18yIC8vICJwIgphcHBfZ2xvYmFsX2dldApyZXRzdWIKCi8vIGJ1cm4KYnVybl80OgpzdG9yZSAzNwpzdG9yZSAzNgpzdG9yZSAzNQpzdG9yZSAzNApsb2FkIDM1CnR4bmFzIEFzc2V0cwpieXRlY18yIC8vICJwIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKbG9hZCAzNgp0eG5hcyBBc3NldHMKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CmxvYWQgMzcKdHhuYXMgQXNzZXRzCmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApsb2FkIDM0Cmd0eG5zIEFzc2V0UmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KYXNzZXJ0CmxvYWQgMzQKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPgphc3NlcnQKbG9hZCAzNApndHhucyBYZmVyQXNzZXQKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CmxvYWQgMzQKZ3R4bnMgU2VuZGVyCnR4biBTZW5kZXIKPT0KYXNzZXJ0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMzUKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDM5CnN0b3JlIDM4Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMzYKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDQxCnN0b3JlIDQwCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMzcKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDQzCnN0b3JlIDQyCmxvYWQgMzkKbG9hZCA0MQomJgpsb2FkIDQzCiYmCmFzc2VydAppbnRjIDQgLy8gMTAwMDAwMDAwMDAKbG9hZCAzOApsb2FkIDM0Cmd0eG5zIEFzc2V0QW1vdW50Ci0KLQpzdG9yZSA0NAp0eG4gU2VuZGVyCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0CmxvYWQgNDQKbG9hZCA0MApsb2FkIDM0Cmd0eG5zIEFzc2V0QW1vdW50CmNhbGxzdWIgdG9rZW5zdG9idXJuXzEyCmNhbGxzdWIgZG9heGZlcl81CnR4biBTZW5kZXIKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXQKbG9hZCA0NApsb2FkIDQyCmxvYWQgMzQKZ3R4bnMgQXNzZXRBbW91bnQKY2FsbHN1YiB0b2tlbnN0b2J1cm5fMTIKY2FsbHN1YiBkb2F4ZmVyXzUKYnl0ZWMgNCAvLyAiciIKY2FsbHN1YiBnZXRyYXRpb184CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gZG9fYXhmZXIKZG9heGZlcl81OgpzdG9yZSAzMwpzdG9yZSAzMgpzdG9yZSAzMQppdHhuX2JlZ2luCmludGNfMyAvLyBheGZlcgppdHhuX2ZpZWxkIFR5cGVFbnVtCmxvYWQgMzIKaXR4bl9maWVsZCBYZmVyQXNzZXQKbG9hZCAzMwppdHhuX2ZpZWxkIEFzc2V0QW1vdW50CmxvYWQgMzEKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCml0eG5fc3VibWl0CnJldHN1YgoKLy8gZG9fY3JlYXRlX3Bvb2xfdG9rZW4KZG9jcmVhdGVwb29sdG9rZW5fNjoKc3RvcmUgMjUKYXNzZXRfcGFyYW1zX2dldCBBc3NldFVuaXROYW1lCnN0b3JlIDI3CnN0b3JlIDI2CmxvYWQgMjUKYXNzZXRfcGFyYW1zX2dldCBBc3NldFVuaXROYW1lCnN0b3JlIDI5CnN0b3JlIDI4CmxvYWQgMjcKbG9hZCAyOQomJgphc3NlcnQKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCnB1c2hieXRlcyAweDQ0NTA1NDJkIC8vICJEUFQtIgpsb2FkIDI2CmNvbmNhdApwdXNoYnl0ZXMgMHgyZCAvLyAiLSIKY29uY2F0CmxvYWQgMjgKY29uY2F0Cml0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCnB1c2hieXRlcyAweDY0NzA3NCAvLyAiZHB0IgppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKaW50YyA0IC8vIDEwMDAwMDAwMDAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXRUb3RhbApwdXNoaW50IDMgLy8gMwppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RGVjaW1hbHMKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldE1hbmFnZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKaXR4bl9maWVsZCBDb25maWdBc3NldFJlc2VydmUKaXR4bl9zdWJtaXQKaXR4biBDcmVhdGVkQXNzZXRJRApyZXRzdWIKCi8vIGRvX29wdF9pbgpkb29wdGluXzc6CnN0b3JlIDMwCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgMzAKaW50Y18wIC8vIDAKY2FsbHN1YiBkb2F4ZmVyXzUKcmV0c3ViCgovLyBnZXRfcmF0aW8KZ2V0cmF0aW9fODoKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDQ2CnN0b3JlIDQ1Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA0OApzdG9yZSA0Nwpsb2FkIDQ2CmxvYWQgNDgKJiYKYXNzZXJ0CmxvYWQgNDUKaW50Y18yIC8vIDEwMDAKbXVsdwppbnRjXzAgLy8gMApsb2FkIDQ3CmRpdm1vZHcKcG9wCnBvcApzd2FwCiEKYXNzZXJ0CnJldHN1YgoKLy8gbWludAptaW50Xzk6CnN0b3JlIDU2CnN0b3JlIDU1CnN0b3JlIDU0CnN0b3JlIDUzCnN0b3JlIDUyCmxvYWQgNTUKdHhuYXMgQXNzZXRzCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApsb2FkIDU2CnR4bmFzIEFzc2V0cwpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKbG9hZCA1NAp0eG5hcyBBc3NldHMKYnl0ZWNfMiAvLyAicCIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CmxvYWQgNTIKZ3R4bnMgQXNzZXRSZWNlaXZlcgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQphc3NlcnQKbG9hZCA1MgpndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KYXNzZXJ0CmxvYWQgNTIKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPgphc3NlcnQKbG9hZCA1MgpndHhucyBTZW5kZXIKdHhuIFNlbmRlcgo9PQphc3NlcnQKbG9hZCA1MwpndHhucyBBc3NldFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09CmFzc2VydApsb2FkIDUzCmd0eG5zIFhmZXJBc3NldApieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKbG9hZCA1MwpndHhucyBBc3NldEFtb3VudAppbnRjXzAgLy8gMAo+CmFzc2VydApsb2FkIDUzCmd0eG5zIFNlbmRlcgp0eG4gU2VuZGVyCj09CmFzc2VydApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDU0CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA1OApzdG9yZSA1NwpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDU1CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA2MApzdG9yZSA1OQpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpsb2FkIDU2CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA2MgpzdG9yZSA2MQpsb2FkIDU4CmxvYWQgNjAKJiYKbG9hZCA2MgomJgphc3NlcnQKdHhuIFNlbmRlcgpieXRlY18yIC8vICJwIgphcHBfZ2xvYmFsX2dldApsb2FkIDU5CmxvYWQgNTIKZ3R4bnMgQXNzZXRBbW91bnQKPT0KbG9hZCA2MQpsb2FkIDUzCmd0eG5zIEFzc2V0QW1vdW50Cj09CiYmCmJueiBtaW50XzlfbDIKaW50YyA0IC8vIDEwMDAwMDAwMDAwCmxvYWQgNTcKLQpsb2FkIDU5CmxvYWQgNTIKZ3R4bnMgQXNzZXRBbW91bnQKLQpsb2FkIDYxCmxvYWQgNTMKZ3R4bnMgQXNzZXRBbW91bnQKLQpsb2FkIDUyCmd0eG5zIEFzc2V0QW1vdW50CmxvYWQgNTMKZ3R4bnMgQXNzZXRBbW91bnQKY2FsbHN1YiB0b2tlbnN0b21pbnRfMTMKYiBtaW50XzlfbDMKbWludF85X2wyOgpsb2FkIDUyCmd0eG5zIEFzc2V0QW1vdW50CmxvYWQgNTMKZ3R4bnMgQXNzZXRBbW91bnQKY2FsbHN1YiB0b2tlbnN0b21pbnRpbml0aWFsXzE0Cm1pbnRfOV9sMzoKY2FsbHN1YiBkb2F4ZmVyXzUKYnl0ZWMgNCAvLyAiciIKY2FsbHN1YiBnZXRyYXRpb184CmFwcF9nbG9iYWxfcHV0CnJldHN1YgoKLy8gc2V0X2dvdmVybm9yCnNldGdvdmVybm9yXzEwOgpzdG9yZSA3MAp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMQovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjXzMgLy8gImciCmxvYWQgNzAKdHhuYXMgQWNjb3VudHMKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBzd2FwCnN3YXBfMTE6CnN0b3JlIDczCnN0b3JlIDcyCnN0b3JlIDcxCmxvYWQgNzIKdHhuYXMgQXNzZXRzCmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0Cj09CmFzc2VydApsb2FkIDczCnR4bmFzIEFzc2V0cwpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldAo9PQphc3NlcnQKbG9hZCA3MQpndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KbG9hZCA3MQpndHhucyBYZmVyQXNzZXQKYnl0ZWNfMSAvLyAiYiIKYXBwX2dsb2JhbF9nZXQKPT0KfHwKYXNzZXJ0CmxvYWQgNzEKZ3R4bnMgQXNzZXRBbW91bnQKaW50Y18wIC8vIDAKPgphc3NlcnQKbG9hZCA3MQpndHhucyBTZW5kZXIKdHhuIFNlbmRlcgo9PQphc3NlcnQKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKbG9hZCA3MQpndHhucyBYZmVyQXNzZXQKYXNzZXRfaG9sZGluZ19nZXQgQXNzZXRCYWxhbmNlCnN0b3JlIDc1CnN0b3JlIDc0Cmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCmxvYWQgNzEKZ3R4bnMgWGZlckFzc2V0CmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0Cj09CmJueiBzd2FwXzExX2w1CmJ5dGVjXzAgLy8gImEiCmFwcF9nbG9iYWxfZ2V0CnN3YXBfMTFfbDI6CmFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQpzdG9yZSA3NwpzdG9yZSA3Ngpsb2FkIDc1CmxvYWQgNzcKJiYKYXNzZXJ0CnR4biBTZW5kZXIKbG9hZCA3MQpndHhucyBYZmVyQXNzZXQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKPT0KYm56IHN3YXBfMTFfbDQKYnl0ZWNfMCAvLyAiYSIKYXBwX2dsb2JhbF9nZXQKYiBzd2FwXzExX2w2CnN3YXBfMTFfbDQ6CmJ5dGVjXzEgLy8gImIiCmFwcF9nbG9iYWxfZ2V0CmIgc3dhcF8xMV9sNgpzd2FwXzExX2w1OgpieXRlY18xIC8vICJiIgphcHBfZ2xvYmFsX2dldApiIHN3YXBfMTFfbDIKc3dhcF8xMV9sNjoKbG9hZCA3MQpndHhucyBBc3NldEFtb3VudApsb2FkIDc0CmxvYWQgNzEKZ3R4bnMgQXNzZXRBbW91bnQKLQpsb2FkIDc2CmNhbGxzdWIgdG9rZW5zdG9zd2FwXzE1CmNhbGxzdWIgZG9heGZlcl81CmJ5dGVjIDQgLy8gInIiCmNhbGxzdWIgZ2V0cmF0aW9fOAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIHRva2Vuc190b19idXJuCnRva2Vuc3RvYnVybl8xMjoKc3RvcmUgNTEKc3RvcmUgNTAKc3RvcmUgNDkKbG9hZCA1MApsb2FkIDUxCm11bHcKaW50Y18wIC8vIDAKbG9hZCA0OQpkaXZtb2R3CnBvcApwb3AKc3dhcAohCmFzc2VydApyZXRzdWIKCi8vIHRva2Vuc190b19taW50CnRva2Vuc3RvbWludF8xMzoKc3RvcmUgNjcKc3RvcmUgNjYKc3RvcmUgNjUKc3RvcmUgNjQKc3RvcmUgNjMKbG9hZCA2NgppbnRjXzIgLy8gMTAwMAptdWx3CmludGNfMCAvLyAwCmxvYWQgNjQKZGl2bW9kdwpwb3AKcG9wCnN3YXAKIQphc3NlcnQKc3RvcmUgNjgKbG9hZCA2NwppbnRjXzIgLy8gMTAwMAptdWx3CmludGNfMCAvLyAwCmxvYWQgNjUKZGl2bW9kdwpwb3AKcG9wCnN3YXAKIQphc3NlcnQKc3RvcmUgNjkKbG9hZCA2OApsb2FkIDY5CjwKYm56IHRva2Vuc3RvbWludF8xM19sMgpsb2FkIDY5CmIgdG9rZW5zdG9taW50XzEzX2wzCnRva2Vuc3RvbWludF8xM19sMjoKbG9hZCA2OAp0b2tlbnN0b21pbnRfMTNfbDM6CmxvYWQgNjMKbXVsdwppbnRjXzAgLy8gMAppbnRjXzIgLy8gMTAwMApkaXZtb2R3CnBvcApwb3AKc3dhcAohCmFzc2VydApyZXRzdWIKCi8vIHRva2Vuc190b19taW50X2luaXRpYWwKdG9rZW5zdG9taW50aW5pdGlhbF8xNDoKKgpzcXJ0CmludGNfMiAvLyAxMDAwCi0KcmV0c3ViCgovLyB0b2tlbnNfdG9fc3dhcAp0b2tlbnN0b3N3YXBfMTU6CnN0b3JlIDgwCnN0b3JlIDc5CnN0b3JlIDc4CmxvYWQgNzgKaW50Y18yIC8vIDEwMDAKcHVzaGludCA1IC8vIDUKLQptdWx3CmxvYWQgODAKdW5jb3ZlciAyCmRpZyAxCioKY292ZXIgMgptdWx3CmNvdmVyIDIKKwpzd2FwCmludGNfMCAvLyAwCmxvYWQgNzkKaW50Y18yIC8vIDEwMDAKKgpsb2FkIDc4CmludGNfMiAvLyAxMDAwCnB1c2hpbnQgNSAvLyA1Ci0KKgorCmRpdm1vZHcKcG9wCnBvcApzd2FwCiEKYXNzZXJ0CnJldHN1Yg==";
    clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "bootstrap", desc: "", args: [{ type: "pay", name: "seed", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "burn", desc: "", args: [{ type: "axfer", name: "pool_xfer", desc: "" }, { type: "asset", name: "pool_asset", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "mint", desc: "", args: [{ type: "axfer", name: "a_xfer", desc: "" }, { type: "axfer", name: "b_xfer", desc: "" }, { type: "asset", name: "pool_asset", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_governor", desc: "", args: [{ type: "account", name: "new_governor", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "swap", desc: "", args: [{ type: "axfer", name: "swap_xfer", desc: "" }, { type: "asset", name: "a_asset", desc: "" }, { type: "asset", name: "b_asset", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async bootstrap(seed: algosdk.TransactionWithSigner | algosdk.Transaction, a_asset: bigint, b_asset: bigint): Promise<ABIResult<bigint>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "bootstrap"), { seed: seed, a_asset: a_asset, b_asset: b_asset });
        return new ABIResult<bigint>(result);
    }
    async burn(pool_xfer: algosdk.TransactionWithSigner | algosdk.Transaction, pool_asset: bigint, a_asset: bigint, b_asset: bigint): Promise<ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "burn"), { pool_xfer: pool_xfer, pool_asset: pool_asset, a_asset: a_asset, b_asset: b_asset });
        return new ABIResult<void>(result);
    }
    async mint(a_xfer: algosdk.TransactionWithSigner | algosdk.Transaction, b_xfer: algosdk.TransactionWithSigner | algosdk.Transaction, pool_asset: bigint, a_asset: bigint, b_asset: bigint): Promise<ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "mint"), { a_xfer: a_xfer, b_xfer: b_xfer, pool_asset: pool_asset, a_asset: a_asset, b_asset: b_asset });
        return new ABIResult<void>(result);
    }
    async set_governor(new_governor: string): Promise<ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "set_governor"), { new_governor: new_governor });
        return new ABIResult<void>(result);
    }
    async swap(swap_xfer: algosdk.TransactionWithSigner | algosdk.Transaction, a_asset: bigint, b_asset: bigint): Promise<ABIResult<void>> {
        const result = await this.call(algosdk.getMethodByName(this.methods, "swap"), { swap_xfer: swap_xfer, a_asset: a_asset, b_asset: b_asset });
        return new ABIResult<void>(result);
    }
}
