import os
import GetData
import jqdatasdk
from flask import Flask, request, abort, render_template
from wechatpy import parse_message, create_reply
from wechatpy.utils import check_signature
from wechatpy.exceptions import (
    InvalidSignatureException,
    InvalidAppIdException,
)
from jqdatasdk import cash_flow, query

# set token or get from environments
TOKEN = os.getenv("WECHAT_TOKEN", "JqData")
AES_KEY = os.getenv("WECHAT_AES_KEY", "")
APPID = os.getenv("WECHAT_APPID", "")

app = Flask(__name__)


@app.route("/")
def index():
    host = request.url_root
    return render_template("index.html", host=host)


@app.route("/wechat", methods=["GET", "POST"])
def wechat():
    signature = request.args.get("signature", "")
    timestamp = request.args.get("timestamp", "")
    nonce = request.args.get("nonce", "")
    encrypt_type = request.args.get("encrypt_type", "raw")
    msg_signature = request.args.get("msg_signature", "")
    try:
        check_signature(TOKEN, signature, timestamp, nonce)
    except InvalidSignatureException:
        abort(403)
    if request.method == "GET":
        echo_str = request.args.get("echostr", "")
        return echo_str

    # POST request
    if encrypt_type == "raw":
        # plaintext mode
        msg = parse_message(request.data)
        if msg.type == "text":
            # reply = create_reply(msg.content, msg)
            str0 = msg.content;
            if str0[0] == '6':
                str0 += ".XSHG"
            else:
                str0 += ".XSHE"

            myq = query(jqdatasdk.valuation).filter(jqdatasdk.valuation.code == str0)
            df = jqdatasdk.get_fundamentals(myq, '2020-9-28')
            str1 = df['pe_ratio']
            str2 = df['pb_ratio']
            str4 = '%s ' % str1
            str5 = '%s' % str2
            str6 = str4 + str5
            reply = create_reply(str6, msg)
        else:
            reply = create_reply("Sorry, can not handle this for now", msg)
        return reply.render()
    else:
        # encryption mode
        from wechatpy.crypto import WeChatCrypto

        crypto = WeChatCrypto(TOKEN, AES_KEY, APPID)
        try:
            msg = crypto.decrypt_message(request.data, msg_signature, timestamp, nonce)
        except (InvalidSignatureException, InvalidAppIdException):
            abort(403)
        else:
            msg = parse_message(msg)
            if msg.type == "text":
                reply = create_reply(msg.content, msg)
            else:
                reply = create_reply("Sorry, can not handle this for now", msg)
            return crypto.encrypt_message(reply.render(), nonce, timestamp)


if __name__ == "__main__":
    app.run("127.0.0.1", 8080, debug=True)
