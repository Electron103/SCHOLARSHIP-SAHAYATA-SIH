# -*- coding: utf-8 -*-

import time
import torch
import easyocr
import sys
import traceback

# Path to a real image in this folder - change the filename if needed
img = "sample.jpg"

print("torch version:", getattr(torch, "__version__", None))
print("cuda available:", torch.cuda.is_available())
if torch.cuda.is_available():
    try:
        print("device name:", torch.cuda.get_device_name(0))
    except Exception as e:
        print("device name error:", e)

try:
    t0 = time.time()
    reader = easyocr.Reader(["en"], gpu=True)
    t1 = time.time()
    print("Reader created in {:.2f}s".format(t1 - t0))

    t0 = time.time()
    res = reader.readtext(img, detail=0)
    t1 = time.time()
    print("OCR time: {:.2f}s, lines_detected: {}".format(t1 - t0, len(res)))

    try:
        print("cuda memory_allocated:", torch.cuda.memory_allocated(0), "bytes")
        print("cuda memory_reserved :", torch.cuda.memory_reserved(0), "bytes")
    except Exception as e:
        print("cuda memory query error:", e)

    print("Sample output (first 5):", res[:5])

except Exception:
    traceback.print_exc()
    print("ERROR during OCR")
