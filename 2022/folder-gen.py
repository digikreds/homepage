
#%%

folders = [
  "1845",
  "2743",
  "3659",
  "4385"
]

order_1 = folders
order_2 = [x+y for x in order_1 for y in folders]
order_3 = [x+y for x in order_2 for y in folders]
order_4 = [x+y for x in order_3 for y in folders]

for x in order_1 + order_2 + order_3 + order_4:
  print(x)

# %%
