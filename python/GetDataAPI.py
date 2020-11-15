from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route('/GetSSECData', methods=['POST', 'GET'])  # 获取上证指数数据
def GetSSECData():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'rating': '3'
                },
                {
                    'id': 2,
                    'Valuation': '2'
                },
                {
                    'id': 3,
                    'pe': '28'
                },
                {
                    'id': 4,
                    'pePercentile': '5.06'
                },
                {
                    'id': 5,
                    'pb': '12'
                },
                {
                    'id': 6,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 7,
                    'ROE': '5.06'
                },
                {
                    'id': 8,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }

    return jsonify(message_json)


@app.route('/GetSZIData', methods=['POST', 'GET'])  # 获取深圳指数数据
def GetSZIData():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'rating': '3'
                },
                {
                    'id': 2,
                    'Valuation': '2'
                },
                {
                    'id': 3,
                    'pe': '28'
                },
                {
                    'id': 4,
                    'pePercentile': '5.06'
                },
                {
                    'id': 5,
                    'pb': '12'
                },
                {
                    'id': 6,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 7,
                    'ROE': '5.06'
                },
                {
                    'id': 8,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }

    return jsonify(message_json)


@app.route('/GetSSEC50Data', methods=['POST', 'GET'])  # 获取上证50指数数据
def GetSSEC50Data():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'rating': '3'
                },
                {
                    'id': 2,
                    'Valuation': '2'
                },
                {
                    'id': 3,
                    'pe': '28'
                },
                {
                    'id': 4,
                    'pePercentile': '5.06'
                },
                {
                    'id': 5,
                    'pb': '12'
                },
                {
                    'id': 6,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 7,
                    'ROE': '5.06'
                },
                {
                    'id': 8,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }

    return jsonify(message_json)


@app.route('/GetGEMData', methods=['POST', 'GET'])  # 获创业板指数数据
def GetGEMData():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'rating': '3'
                },
                {
                    'id': 2,
                    'Valuation': '2'
                },
                {
                    'id': 3,
                    'pe': '28'
                },
                {
                    'id': 4,
                    'pePercentile': '5.06'
                },
                {
                    'id': 5,
                    'pb': '12'
                },
                {
                    'id': 6,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 7,
                    'ROE': '5.06'
                },
                {
                    'id': 8,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }

    return jsonify(message_json)


@app.route('/GetCSI300Data', methods=['POST', 'GET'])  # 获沪深300指数数据
def GetCSI300Data():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'rating': '3'
                },
                {
                    'id': 2,
                    'Valuation': '2'
                },
                {
                    'id': 3,
                    'pe': '28'
                },
                {
                    'id': 4,
                    'pePercentile': '5.06'
                },
                {
                    'id': 5,
                    'pb': '12'
                },
                {
                    'id': 6,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 7,
                    'ROE': '5.06'
                },
                {
                    'id': 8,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }

    return jsonify(message_json)


@app.route('/NewGetCSI300Data', methods=['POST', 'GET'])  # 获创业板指数数据
def NewGetCSI300Data():
    message_json = {
        'data': {
            'list': [
                {
                    'id': 1,
                    'pe': '28'
                },
                {
                    'id': 2,
                    'pePercentile': '5.06'
                },
                {
                    'id': 3,
                    'pb': '12'
                },
                {
                    'id': 4,
                    'pbPercentile': '5.06'
                },
                {
                    'id': 5,
                    'ROE': '5.06'
                },
                {
                    'id': 6,
                    'DYR': '5.06'
                }
            ]
        },
        'err': 0,
        'msg': 's'
    }
    return jsonify(message_json)


if __name__ == '__main__':
    # app.run()
    app.run("127.0.0.1", 80, debug=True)
