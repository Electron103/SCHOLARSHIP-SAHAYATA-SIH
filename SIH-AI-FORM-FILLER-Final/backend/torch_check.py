import importlib, sys

spec = importlib.util.find_spec("torch")
print("torch_installed:", bool(spec))

if spec:
    import torch
    print("torch_version:", torch.__version__)
    print("cuda_available:", torch.cuda.is_available())
    if torch.cuda.is_available():
        print("device_count:", torch.cuda.device_count())
        print("device_name:", torch.cuda.get_device_name(0))

print("python:", sys.version)
