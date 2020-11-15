import os
import datetime
import JqDataSDKOperate
from flask import Flask, request, abort, render_template
from wechatpy import parse_message, create_reply
from wechatpy.utils import check_signature
from wechatpy.exceptions import (
    InvalidSignatureException,
    InvalidAppIdException,
)
import threading
import CreateImage
from wechatpy.replies import TextReply, ImageReply
from wechatpy import WeChatClient
from wechatpy.session.redisstorage import RedisStorage
from redis import Redis

redis_client = Redis.from_url('redis://127.0.0.1:6379/0')
app_id="wxd5b06d410ee206cb"
secret="11e3f805dedda31b97af887d2cc7a32f"
session_interface = RedisStorage(
    redis_client,
    prefix="wechatpy"
)
client = WeChatClient(
    app_id,
    secret,
    session=session_interface
)

# set token or get from environments
TOKEN = os.getenv("WECHAT_TOKEN", "JqData")
AES_KEY = os.getenv("WECHAT_AES_KEY", "")
APPID = os.getenv("WECHAT_APPID", "wxd5b06d410ee206cb")
# client = WeChatClient("wxd5b06d410ee206cb", "11e3f805dedda31b97af887d2cc7a32f")

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
        date = (datetime.datetime.now() + datetime.timedelta(days=-1)).strftime("%Y-%m-%d")
        msg = parse_message(request.data)
        # if msg.type == "text":
            # reply = create_reply(msg.content, msg)
        code = msg.content;
        if code[0] == '6':
            code += ".XSHG"
            strPePercent = JqDataSDKOperate.get_stock_pe_and_pb(code, date, 2500)
            strReply = code + "; " + strPePercent
            reply = create_reply(strReply, msg)
            return reply.render()
        elif code[0] == '0' or code[0] == '3':
            code += ".XSHE"
            strPePercent = JqDataSDKOperate.get_stock_pe_and_pb(code, date, 2500)
            strReply = code + "; " + strPePercent
            reply = create_reply(strReply, msg)
            return reply.render()
        # elif code == '行业':
        elif code=='行业':
            reply = ImageReply(message=msg)
            reply.media_id = get_media_id(client, msg)
            return reply.render()
        # else:
        #     reply = create_reply("Sorry, can not handle this for now", msg)
        #     return reply.render()
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

def get_media_id(client, msg):
    path = "SW1.png"
    with open(path, "rb") as file:
        msg = client.material.add(media_type="image", media_file=file)
        media_id = msg["media_id"]
        return media_id

def refresh():
    strReturn = JqDataSDKOperate.get_all_sw1_pe_and_pb(2500)
    CreateImage.new_image(600, 1800, strReturn, show_image=True)
    global client
    client = WeChatClient("wxd5b06d410ee206cb", "11e3f805dedda31b97af887d2cc7a32f")
    print("Ontimer")
    global timer
    timer = threading.Timer(60*60*2-1, refresh)
    timer.start()
    # print(strGet)


timer = threading.Timer(1, refresh)
timer.start()

if __name__ == "__main__":
    app.run("127.0.0.1", 8080, debug=True)
