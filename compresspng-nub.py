from PIL import Image
from subprocess import Popen, PIPE
import time
import sys

def shell(cmd):
 return Popen(cmd, shell=True, stdout=PIPE).stdout.read().decode('utf-8')

a = shell("find * -type f | grep png").splitlines()
lena = len(a)
for i in range(0, lena):
# sys.stdout.write(str(lena))
# sys.stdout.flush()
 print(str(lena)+" : "+str(a[i]), end='\r')
 try:
  im = Image.open(str(a[i]))
  im = im.convert("P", palette=Image.ADAPTIVE, colors=256)
  im.save(str(a[i]), optimize=True)
#   im.save(str(a[i]), format="JPEG", quality=70)
 except:
  pass
 lena = lena - 1

# print(i)
