import sys
import os
import pillow_avif
from PIL import Image

src = r'\_original'
dst = r'\_avif'

def card(suffix = ''):
  x = 1 if not suffix else 2
  w = 144 * x
  h = 40 * x
  ratio = 700 / 1024
  top = 16 * x

  dir = os.path.dirname(__file__)
  files = os.listdir(rf'{dir}{src}')
  for file in files:
    name = os.path.splitext(file)[0]
    original = Image.open(rf'{dir}{src}\{file}')
    height = round(w * ratio)
    resized = original.resize((w, height), Image.LANCZOS)
    cropped = resized.crop((0, top, w, top + h))
    cropped.save(rf'{dir}{dst}\{name}{suffix}.avif')


def fit_height(height, suffix, append):
  dir = os.path.dirname(__file__)
  files = os.listdir(rf'{dir}{src}')
  for file in files:
    name = os.path.splitext(file)[0]
    original = Image.open(rf'{dir}{src}\{file}')
    w, h = original.size
    width = round(w / h * height)
    resized = original.resize((width, height), Image.LANCZOS)

    if append:
      resized2 = Image.new(resized.mode, (height, height), (0, 0, 0, 0))
      left = round((height - width) / 2)
      resized2.paste(resized, (left, 0))
      resized = resized2

    resized.save(rf'{dir}{dst}\{name}{suffix}.avif')

def fit_width(width, suffix, append):
  dir = os.path.dirname(__file__)
  files = os.listdir(rf'{dir}{src}')
  for file in files:
    name = os.path.splitext(file)[0]
    original = Image.open(rf'{dir}{src}\{file}')
    w, h = original.size
    height = round(h / w * width)
    resized = original.resize((width, height), Image.LANCZOS)

    if append:
      resized2 = Image.new(resized.mode, (width, width), (0, 0, 0, 0))
      top = round((width - height) / 2)
      resized2.paste(resized, (0, top))
      resized = resized2

    resized.save(rf'{dir}{dst}\{name}{suffix}.avif')

def icon(size, suffix=''):
  append = False
  # append = True
  fit_height(size, suffix, append)
  # fit_width(size, suffix, append)

if __name__ == '__main__':
  arg = sys.argv[1]
  suffix = '@2x'
  if arg == 'c':
    card()
    card(suffix)
  else:
    h = int(arg)
    icon(h)
    icon(h * 2, suffix)