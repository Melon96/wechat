from PIL import Image, ImageDraw, ImageFont
import datetime


def draw_image(new_img, text, show_image=False):
    text = str(text)
    text.encode('utf8').decode()
    draw = ImageDraw.Draw(new_img)
    img_size = new_img.size
    # draw.line((0, 0) + img_size, fill=128)
    # draw.line((0, img_size[1], img_size[0], 0), fill=128)

    font_size = 16
    # word_css = "C:\\Windows\\Fonts\\simhei.TTF"
    word_css = "/usr/share/chinese/simhei.ttf"
    fnt = ImageFont.truetype(word_css, font_size)
    fnt_size = fnt.getsize(text)
    x = 10
    y = 10
    draw.text((x, y), text, font=fnt, fill=(0, 0, 0))

    # if show_image:
    #     new_img.show()
    del draw


def new_image(width, height, text='default', color=(255, 255, 255, 255), show_image=False):
    new_img = Image.new('RGBA', (int(width), int(height)), color)
    draw_image(new_img, text, show_image)
    name = 'SW1'
    new_img.save(r'%s.png' % (name))
    del new_img


def new_image_with_file(fn):
    with open(fn, encoding='utf-8') as f:
        for l in f:
            l = l.strip()
            if l:
                ls = l.split(',')
                if '#' == l[0] or len(ls) < 2:
                    continue

                new_image(*ls)


if '__main__' == __name__:
    new_image(400, 1800, '中文测试', show_image=True)
    # new_image_with_file('image_data.txt')
