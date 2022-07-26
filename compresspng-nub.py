from PIL import Image
img_path = "asdasdasd.png"
img = Image.open(img_path)
img = img.convert("P", palette=Image.ADAPTIVE, colors=256)
img.save("asdasdasd2.png", optimize=True)