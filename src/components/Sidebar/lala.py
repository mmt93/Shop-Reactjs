lista = [123, 456, 789, 0]

import pandas as pd

df = pd.DataFrame([lista])
df.columns= ['começo', 'meio', 'fim', 'zero']
print(df.head())