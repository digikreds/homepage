#!/usr/bin/env python3

from random import randint
import json


segments = [
    [(0, 0), (0, 1), (1, 1), (2, 1), (2, 0), (1, 0), (0, 0)],  # 0
    [(0, 1), (1, 1), (2, 1)],  # 1
    [(0, 0), (0, 1), (1, 1), (1, 0), (2, 0), (2, 1)],  # 2
    [(0, 0), (0, 1), (1, 1), (1, 0), (1, 1), (2, 1), (2, 0)],  # 3
    [(0, 0), (1, 0), (1, 1), (0, 1), (1, 1), (2, 1)],  # 4
    [(0, 1), (0, 0), (1, 0), (1, 1), (2, 1), (2, 0)],  # 5
    [(0, 1), (0, 0), (1, 0), (1, 1), (2, 1), (2, 0), (1, 0)],  # 6
    [(0, 0), (0, 1), (1, 1), (2, 1)],  # 7
    [(0, 0), (0, 1), (1, 1), (1, 0), (2, 0), (2, 1), (1, 1), (0, 1), (0, 0)],  # 8
    [(1, 1), (1, 0), (0, 0), (0, 1), (1, 1), (2, 1)],  # 9
]

words = json.load(open("w3w-h_kode.json"))["points"]


def generate_pins(n, length=4) -> list[list[int]]:
    if n == 0:
        return []
    else:
        return [[randint(1, 9) for _ in range(length)] for _ in range(n)]


mapping = {
    "x": {0: "top", 1: "middle", 2: "bottom"},
    "y": {
        0: "left",
        1: "right",
    },
}


def get_idx(x, y) -> str:
    return mapping["x"][x] + "_" + mapping["y"][y]


def pick_random(xs):
    return xs[randint(0, len(xs) - 1)]


def make_number(n: int):
    return [pick_random(words[get_idx(x, y)]) for x, y in segments[n]]


def encode_pin(pin: list[int]):
    return [make_number(n) for n in pin]


def main():
    pins = generate_pins(4)
    encoded = [(pin, encode_pin(pin)) for pin in pins]

    for pin, code in encoded:
        print(pin)
        for line in code:
            print("\n".join(line))
            print("------")
        print("=======================================")


if __name__ == "__main__":
    main()
