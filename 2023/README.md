# OIO Mysteriets LøbsApp

Hej og velkommen til. Her er manualen til O!O mysteriets lille LøbsApp.

Appen, bygger på en motor. Motoren er en hjemmeside, som du kan styre, til at lave det løb du gerne
vil have dine deltagere ud på.
Praktisk betyder det, at du, med en smule teknik, kan få hjemmesiden til at gøre som du vil.

## Et eksempel

Deltagerne får start-posten, og åbner den på deres telefon. De står ved FDFs hovedkontor, på 
Rysensteensgade.
Appen siger NØ, så deltagerne bevæger sig op af rysensteensgade mod vestervoldgade, på hjørnet
skifter appen skærm og deltagerne får en information, når de trykker igennem får de en ny retning,
osv, osv.

Praktisk har "Appen" brugt GPSen i telefonen til at finde retnigen fra hvor deltageren står og til
"mål", og når deltageren kommer indenfor X meter, åbner posten.

Du kan se ruten inde i (trips.json)[2023/src/stores/trips.json] under `"teamName": "rysen"`

## Sådan gør du

Inden du går igang, skal du bruge

1. En smule tålmodighed
2. Et kode værktøj - f.eks. VisualStudioCode https://code.visualstudio.com/
   1. Ikke strengt nødvendigt, Men det hjælper en del.
3. En bruger på github - https://github.com/signup

**Overordnet**: er der 4 trin

- Fork repo - lav din egen kopi af den her "mappe"
- Tilføj løbet
- Indsend ændringerne
- Regn alle delene ud

_Fork repo_: Øverst til højre er der en knap med teksten "Fork", benyt denne til at lave din egen
kopi af motoren.

_Tilføj løb_: Det er her det sjove sker. Du laver dine ændringer til `trips.json`-filen. Se sektionen
nedenfor "Sådn laver du et løb".

_Indsend ændringer_: Når du har lavet dit løb, gemmer du og uploader til github, så kommer der en gul
bjælke, som foreslår at du laver et "Pull Request", det er din måde at få offentliggjort dit løb.

_Regn delene ud_: Når du har lavet et løb, er der som minimum en start-post, som du skal kunne give
til deltagerne, hvis du har brugt "kode" poster, skal der også laves links til dem.

## Sådan laver du et løb

Det simpleste løb ser sådan her ud:

```json
{
  "teamName": "rysen-test",
  "tour": [
    {
      "comment": "Rysensteen",
      "type": "location",
      "position": [55.67227405268402, 12.576124015503156],
      "accuracy": 5,
      "info": "Så er du fremme. Tak for at du legede med."
    }
  ]
}
```

Imellem firkant-parenteserne er der en post, det er den i krølle-parenteser(tuborg klammer?). Hvis
der skal være flere poster, laver du et komma efter den første post, og indsætter en til.

```
{
  "teamName": "test",
  "tour": [
    { POST HER },
    { ANDEN POST HER },
    { OSV }
  ]
}
```

Der er flere typer af poster du kan lave:

| Type     | Eksempel                                                          | Felter                         |
| -------- | ----------------------------------------------------------------- | ------------------------------ |
| Location | `{"type": "location", "position":[55.6, 12.5], "info": "Sådan"}`  | type, Position, accuracy, info |
| Code     | `{"type": "code", "code":"EXAMPLE", "info": "Sådan"}`             | type, Code, info               |
| time     | `{"type": "time", "time":"2023-10-01T21:00:05", "info": "Sådan"}` | type, time, info               |

Time er ikke testet eller færdig udviklet, opdateringer modtages gerne.

_Location_ Her skal deltageren i nærheden af et punkt. Deltageren skal være indenfor `accuracy` af
punktet i `position`, beregnet ved hjælp af pythagoras på de rå "decimal degree" koordinater, gange
10^4. Det skulle gerne ca være i meter.

```javascript
const lat1 = cur[0],
  lon1 = cur[1],
  lat2 = dest[0],
  lon2 = dest[1];

const dist =
  Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2)) *
  Math.pow(10, 4);
```

_Code_ her skal deltageren besøge et link der regitsrerer den rigtige kode i appens hukommelse.
Navnligt skal den gå til `/register_code?code=EXAMPLE` - reelt
https://digikreds.dk/2023/register_code?code=EXAMPLE

_Time_ DENNE ER IKKE TESTET. Intentionen er at man kan have løbet på pause, eller udskyde brugen af
appen, sådan at den først bliver relevant efter kl XX, hvorefter der så kommer en ny information.
