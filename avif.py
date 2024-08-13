import sys
import os
import pillow_avif
from PIL import Image

src = r'\_original'
dst = r'\_avif'

def card():
  w = 144
  h = 40
  ratio = 700 / 1024
  top = 16

  dir = os.path.dirname(__file__)
  files = os.listdir(rf'{dir}{src}')
  for file in files:
    name = os.path.splitext(file)[0]
    original = Image.open(rf'{dir}{src}\{file}')
    height = round(w * ratio)
    resized = original.resize((w, height), Image.LANCZOS)
    cropped = resized.crop((0, top, w, top + h))
    cropped.save(rf'{dir}{dst}\{name}.avif')


def icon(height):
  dir = os.path.dirname(__file__)
  files = os.listdir(rf'{dir}{src}')
  for file in files:
    name = os.path.splitext(file)[0]
    original = Image.open(rf'{dir}{src}\{file}')
    w, h = original.size
    width = round(w / h * height)
    resized = original.resize((width, height), Image.LANCZOS)
    resized.save(rf'{dir}{dst}\{name}.avif')

if __name__ == '__main__':
  arg = sys.argv[1]
  if arg == 'c':
    card()
  else:
    icon(int(arg))