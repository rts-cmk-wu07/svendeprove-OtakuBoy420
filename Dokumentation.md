# Opgave Titel - Oliver

Elev: Oliver Zeymer

Hold: WU07

Uddannelse: Webudvikler


### List of contents


- [Opgave Titel - Oliver](#opgave-titel---oliver)
  * [Beskrivelse](#beskrivelse)
  * [.env fil](#env-fil)
  * [Getting Started](#getting-started)
- [Kode Eksempler](#kode-eksempler)
- [Build Tool](#build-tool)
- [Tech Stack](#tech-stack)
  * [Frameworks](#frameworks)
  * [Libraries](#libraries)
  * [Valgfrie opgaver](#valgfrie-opgaver)
  * [Projekt perspektivering](#projekt-perspektivering)



## Beskrivelse

Velkommen til min eksamensopgave! I dette repository har jeg lavet min eksamensopgave med build toolen Vite og en masse andre ting, læs videre for at lære mere om hvordan man kører projektet, min tech-stack og hvordan jeg har overvejet mine valg :)

## .env fil

```env
VITE_API_URI=http://localhost:4000
```
## Getting Started

1. Klon projektet ned på din egen maskine.
2. Tilføj .env filen som står ovenover i dokumentation til rooten af projektet.
3. Kør kommandoen `npm install` og vent på at alt er blevet installeret korrekt.
4. Få developer serveren op og køre i terminalen:

```bash
npm run dev
```

4. Til sidst hvis Vite ikke allerede har gjordt det for dig, åben http://localhost:5173 i browseren, og så er vi i gang! :)

# Kode Eksempler

### 1. Skriftligt Eksempel
```javascript
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, { needsAuth = false, token = "", needsId = false, id = null } = {}) {
  //sets default values for the options object if none are provided, so that the function can be called without any arguments and still work
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (needsAuth && !token) {
      setLoading(false);
      setError({
        message: "You need to be logged in to access this page.",
        status: 401,
      });
      return;
    }
    if (needsId && !id) {
      setLoading(false);
      setError({
        message: "You need to provide an ID to access this page.",
        status: 400,
      });
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(needsId && id ? `${url}/${id}` : url, needsAuth ? { headers: headers } : null)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setLoading(false);
        } else {
          setError(new Error(`Fetching error: ${response.status}`));
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(new Error(`Fetching error: ${err.message}`));
        setLoading(false);
      });
  }, [url, needsAuth, token, id]);

  const refreshData = () => {
    setLoading(true);
    setError(null);

    axios.get(url).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setLoading(false);
      } else {
        setError(new Error(`Fetching error: ${response.status}`));
        setLoading(false);
      }
    });
  };

  return { data, error, loading, refreshData };
}
```

### Skriftligt forklaring: 


Det her er mit custom "useAxios" hook. Det bruges til at håndtere API-kald i min React-applikation. 

Jeg valgte at lave et custom hook fordi der skal bruges API-kald mange gange i applikationen og det er en rigtig nem måde at kunne bruge den samme logik henover hele applikationen, som reducerer kode duplikering og gør det nemt at vedligeholde og lave nye ting i koden senere hen.

Hooket tager et URL og et destructured optional objekt med nogle default values som kan indeholde krav om authorization og et ID som parametre.

Hooket bruger Axios-biblioteket til at lave en GET request til det angivne URL med mulighed for authorization headers og returnerer derefter et objekt med tre states: data, error og loading.

For at forklare state-håndteringen er "data" den data som er blevet hentet fra API'et, "error" vil indeholde de fejl der kan ske under API-kaldet, og "loading" vil være true eller false i forhold til om API-kaldet er i gang eller er færdigt.

Hooket har også en "refreshData" funktion som kan kaldes for at få hooket til at foretage et nyt API-kald til det samme URL og opdatere mine states med den nye data.

Hvis mit destructured optional object parameter indeholder "needsAuth" eller "needsId" krav vil hook'et først kontrollere om disse er opfyldt, før det foretager API-kaldet. Hvis kravene ikke er opfyldt vil hook'et sætte "loading" til false og "error" til en fejlbesked der beskriver hvad der gik galt, hvilket giver en rigtig god developer experience.

Så i konklusion kan mit useAxios hook lave GET requests på en rigtig nem måde, og håndtere mine states for mig med kun en linje kode i mine komponenter.

### #2


Mundtligt forklaret


# Build Tool

## **Vite**

Vite tilbyder en hurtigere developer experience med sin lynhurtige build time og hurtige reaktionsevne. Vite bruger en moderne og optimeret development process ved hjælp af ES modules, hvilket resulterer i at det er meget hurtigere end CRA. Dette betyder, at development processsen er mere effektiv og smooth, da man som udvikler kan se ændringerne i real time mens man arbejder.

# Tech Stack

## Frameworks 

### **React.js**

For mig var der to framework muligheder til dette projekt, enten at skrive i frameworket **Next.js** eller **React.js**. Jeg valgte at bruge React da det er det framework som jeg har mest erfaring med og fordi da jeg gjorde mig overvejelser om projektbeskrivelsen og kravene, tænkte jeg at jeg højest sandsynligt ikke ville gøre brug af Next's ekstra funktionaliteter alligevel (så som Server Side Rendering og SEO) så React er det perfekte valg for mig.

React stiller en masse forskellige ting til rådighed som for eksempel et stort community som gør det rigtig nemt at finde problemløsninger, stort udvalg af npm pakker, og det er rigtig nemt at genanvende forskellige komponenter så jeg slipper for at gentage kode jeg allerede har skrevet.

Derudover kan man med React lave en single page applikation hvilket vil sige at man ikke er nødt til at genindlæse en helt ny html side hver gang man skifter side, hvilket gør din applikation hurtigere og får den til at føles mere smooth.


### **TailwindCSS**

Jeg har valgt at bruge Tailwind som mit CSS framework da jeg synes det er helt klart den bedste og mindst tidskrævende måde at skrive CSS på. I modsætning til normale CSS filer som vi kender, styler man med Tailwind direkte når man skriver sin jsx kode ved hjælp af predefinerede klasser, hvilket jeg synes er super smart og hjælper mit workflow rigtig meget.

Der er også andre meget populære CSS frameworks som for eksempel Bootstrap. Bootstrap har meninger om hvordan tingene skal se ud, og man har mindre frihed til at lave noget der ser unikt ud hvorimod med Tailwind kan man lave lige hvad man kunne have lyst til på sin egen måde, så det er derfor jeg har valgt Tailwind frem for Bootstrap.

## Libraries

### **Framer-motion**

Det var nok ikke helt behøvet i et projekt på denne størrelse men jeg er blevet virkelig glad for framer-motion og vil gerne vise at jeg kan finde ud af det, jeg bruger det i stort set alle mine projekter.

I stedet for at lave CSS animationer som vi kender, gør Framer-motion det virkelig nemt ved at man bare kalde sit element for eksempel `<motion.div>`, og derefter give elementet en masse props der fortæller hvordan det skal animeres.

Ligesom TailwindCSS sparer det en virkelig meget tid og kode. Der skal altså ikke meget til for at lave nogle simple men smukke animationer, især hvis man allerede har nogle prædefinerede motion variants fra et andet projekt så er det virkelig nemt at sætte det op.

### **React-router**

React router gør det muligt at navigere siden ved hjælp af at bytte alle de viste komponenter ud hvilket gør det til en single page applikation. Single page applikationer gør applikationen meget hurtigere da man ikke genindlæser et helt nyt html dokument hver gang man navigerer på siden. SPAs giver også en bedre user experience da man ikke ser siden refreshe hver gang man navigere og giver en mere smooth oplevelse.

### **Axios**

Jeg har valgt at bruge axios til mine HTTP requests. Med axios frem for bare at lave et normalt fetch kald er formateringen til json allerede indbygget i det. Axios giver en rigtig god developer experience da jeg personligt synes at kodestrukturen er nemmere at forstå og læse. Axios giver også en bedre user experience i forhold til Cross-browser compatibilty, det vil sige at axios tager sig selv af at få requesten til at virke på meget gamle systemer/browsere hvor man med fetch manuelt skal ind og tjekke på det.

### **React-Toastify**

Jeg har valgt at bruge React-Toastify fordi det er en simpel og effektiv måde at implementere notifikationer og feedback til brugeren. Biblioteket er let at bruge og tilbyder virkelig meget reusability, så det nemt kan integreres i eksisterende projekter. Det er virkelig let at tilpasse udseendet og animationerne, så det passer til applikationens design og branding. React-Toastify et velkendt og veldokumenteret bibliotek, som har et aktiv og støttende community, som kan hjælpe med eventuelle spørgsmål eller problemer, der måtte opstå under implementeringen.

### **Lucide-react**

Jeg har valgt at bruge Lucide-React ikoner i stedet for React-Icons fordi Lucide-React ikoner tilbyder et mere moderne og minimalistisk design. Lucide-React ikoner er mere tilgængelige og lette at forstå, da de er baseret på symboler og ikoner, der er let genkendelige for brugerne. Fra hvad jeg har kunne undersøge er Lucide-React ikoner lettere og mere optimerede end React-Icons, hvilket betyder, at applikationen vil blive hurtigere og mere effektiv.


## Valgfrie opgaver

- A
- B
- C


## Projekt perspektivering

Hvis jeg skulle skalere dette projekt, ville jeg -

Hvis jeg skulle forbedre applikationen ville jeg -
