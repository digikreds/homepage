#!/usr/bin/env python3

kagecreme = "-.-/.-/--././-.-./.-././--/.//"
floedeskum = "..-./.-../---./-.././.../-.-/..-/--//"
lagkagebund = ".-../.-/--./-.-/.-/--././-.../..-/-./-..//"
kirsebaersovs = "-.-/../.-./..././-.../.-.-/.-./.../---/...-/...//"


def til_tale(kode):
    ord = {
        ".": "dut",
        "-": "dat",
        "/": "streg",
    }
    return " ".join([ord[x] for x in kode])


print("Kagecreme:", til_tale(kagecreme), "\n")
print("flødeskum:", til_tale(floedeskum), "\n")
print("Lagkagebund:", til_tale(lagkagebund), "\n")
print("Kirsebærsovs:", til_tale(kirsebaersovs), "\n")
