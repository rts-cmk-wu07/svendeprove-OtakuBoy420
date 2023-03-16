# Landrup Dans - Oliver

Elev: Oliver Zeymer

Hold: WU07

Uddannelse: Webudvikler

### List of contents

- [Landrup Dans - Oliver](#landrup-dans---oliver)
  - [List of contents](#list-of-contents)
  * [Beskrivelse](#beskrivelse)
  * [.env fil](#env-fil)
  * [Project Board](#project-board)
  * [Getting Started](#getting-started)
- [Kode Eksempler](#kode-eksempler)
  - [Skriftligt Eksempel - useAxios hook](#skriftligt-eksempel---useaxios-hook)
  - [Mundtligt Eksempel - checkTokenValidity function](#mundtligt-eksempel---checktokenvalidity-function)
- [Valgfrie opgaver](#valgfrie-opgaver)
  - [A - Automatiseret deployment](#--a---automatiseret-deployment--)
  - [C - Cookies](#--c---cookies--)
- [Design Ændringer](#design--ndringer)
  - [Navigations menu](#--navigations-menu--)
- [Projekt tilgang](#projekt-tilgang)
  - [Prioritering](#prioritering)
  - [Perspektivering](#perspektivering)
- [Tech Stack](#tech-stack)
  - [Build Tool](#build-tool)
    - [Vite](#--vite--)
  - [Frameworks](#frameworks)
    - [React.js](#--reactjs--)
    - [TailwindCSS](#--tailwindcss--)
  - [Libraries](#--libraries--)
    - [Framer-motion](#--framer-motion--)
    - [React-router](#--react-router--)
    - [Axios](#--axios--)
    - [React-Toastify](#--react-toastify--)
    - [Lucide-react](#--lucide-react--)
    - [Yup](#--yup--)

## Beskrivelse

Velkommen til min eksamensopgave, Landrup Dans! I dette repository har jeg lavet min eksamensopgave som bruger [Landrup Dans API'et](https://github.com/OtakuBoy420/landrup-dans-api), læs videre for at lære mere om hvordan man kører projektet, min tech-stack og hvordan jeg har overvejet mine valg :)

## .env fil

```env
VITE_API_URI=http://localhost:4000/api/v1
VITE_AUTH_URI=http://localhost:4000/auth/token
```

## Project Board

Jeg har lavet min opgave med et project board, det kan ses [her](https://github.com/orgs/rts-cmk-wu07/projects/17/views/1). Mine issues er sat op med sin egen branch, og custom labels. I "Done" sektionen kan i se i rækkefølge hvilke ting jeg har valgt at prioritere og lave først (øverst er nyeste).

## Getting Started

1. Klon projektet ned på din egen maskine.
2. Tilføj .env filen som står ovenover i dokumentation til rooten af projektet.
3. Kør kommandoen `npm install` og vent på at alt er blevet installeret korrekt.
4. Få development serveren op og køre i terminalen:

```bash
npm run dev
```

4. Til sidst hvis Vite ikke allerede har gjordt det for dig, åben http://localhost:5173 i browseren, og så er vi i gang! :)

# Kode Eksempler

## Skriftligt Eksempel - useAxios hook

```javascript
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxios(url, { needsAuth = false, token = "", needsId = false, id = null } = {}) {
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

<br />
useAxios er et custom react hook som jeg har lavet for at gøre det enkelt og nemt at hente data fra API'et ved hjælp af Axios-biblioteket og en masse logik.

Overvejelser:

Jeg valgte at lave et custom hook til GET requests fordi der skal laves API-kald mange gange i applikationen og fordi et custom hook gør det rigtig nemt at genbruge den samme logik henover hele applikationen. Derudover skal man ikke tænke på ting som kode duplikering eller om det bliver et helvede at vedligeholde og lave nye ting i sin koden senere hen.

Hooket tager en URL string og et destructured optional objekt med nogle default values som kan indeholde krav om authorization og et ID.

Hooket bruger som sagt Axios-biblioteket til at lave en GET request til det angivne URL med mulighed for authorization headers. Det returnerer derefter et objekt med tre states: data, error og loading.

For at forklare state-håndteringen vil "data" indolde den data som er blevet hentet fra API'et, "error" vil indeholde de fejl der kan ske under API-kaldet, og "loading" vil være true eller false i forhold til om API-kaldet er i gang eller er færdigt.

Hooket har også en "refreshData" funktion som kan kaldes for at få hooket til at foretage et nyt API-kald til det samme URL og opdatere data statet med den nye data.

Hvis man kalder hooket med "needsAuth" eller "needsId" paremtrerne i et objekt vil hooket lave API kaldet ud for den logik der er skrevet som går ind og tjekker på det for at opnå ingen unødvendige fetch kald og andre fejl.

Så i konklusion kan mit useAxios hook lave GET requests på en rigtig nem måde, og håndtere mine states for mig med kun en linje kode i mine komponenter.

<br />

## Mundtligt Eksempel - checkTokenValidity function

```javascript
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "react-use-cookie";

export default function checkTokenValidity(auth, setAuth) {
  const updateAuth = (token) => {
    //Hvis der ikke er noget token gemt i session eller cookie, så sæt auth til null (log brugeren ud) og hop ud af funktionen
    if (!token) {
      setAuth(null);
      return;
    }

    const currentTime = Date.now();
    const validUntil = token.validUntil;

    //Hvis et token er gemt i session eller cookie, så gem alt dataen i AuthContext og log brugeren ind.
    if (currentTime <= validUntil) {
      setAuth(token);
    } else {
      //Hvis token er udløbet, så fjern det fra session og cookie, log brugeren ud og vis en fejl notifikation.
      sessionStorage.removeItem("token");
      setCookie("token", "", { days: 0 });
      setAuth(null);
      toast.error("Din session er udløbet. Log venligst ind igen.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const tokenCookie = getCookie("token");
    const storedToken = sessionStorage.getItem("token");
    //Hvis brugeren ikke er logget ind så kør funktionen updateAuth med et token paremeter fra session eller cookie.
    if (!auth) {
      if (tokenCookie) {
        updateAuth(JSON.parse(tokenCookie));
      } else if (storedToken) {
        updateAuth(JSON.parse(storedToken));
      }
    }
  }, []);

  useEffect(() => {
    //Hvis brugeren ikke er logget ind så hop ud.
    if (!auth) {
      return;
    }

    const intervalId = setInterval(() => {
      updateAuth(auth);
    }, 1000 * 60 * 60); // Tjek hver time om token er udløbet.

    //Stop interval når component unmountes.
    return () => {
      clearInterval(intervalId);
    };
    //Det er vigtigt at useEffect kører hver gang auth ændrer sig, så vi starter med at tjekke samme tid token blev oprettet.
  }, [auth]);
}
```

# Valgfrie opgaver

### **A - Automatiseret deployment**

Jeg har deployet min applikation til Vercel da jeg synes det er en rigtig god platform som jeg har deployed på mange gange før. Jeg har valgt at bruge Vercel frem for Netlify da jeg synes det er nemmere at sætte op og bruge.

### **C - Cookies**

Jeg har lavet en "husk mig" checkbox i login formularen som bruger React-use-cookie biblioteket til at sætte en cookie om man vil blive husket næste gang man går ind på siden.

# Design Ændringer

## **Navigations menu**

Jeg har valgt at lave en ekstra knap i navigations menuen som viser en Login-formular modal når man trykker på den. Da jeg tænkte over hvordan man skulle logge ind og ud af applikationen tænkte jeg at det ville være mest brugervenligt at der var en knap til det som man altid kunne trykke på for at åbne formularen, og siden der var massere af plads i navigations menuen til en ekstra knap så valgte jeg at gøre det på den måde.

# Projekt tilgang

## Prioritering

Jeg har lavet et [GitHub Projects board](https://github.com/orgs/rts-cmk-wu07/projects/17/views/1) med issues og labels der indikerer om jeg synes issuet er en MVP, Nice to have eller Need to have. Min tankegang igennem det hele var "hvad skal man minimum have på siden for at brugeren kan bruge den for dens funktionalitet?" Så det var derfor at jeg satte activities page, activity list, activity details, log in og useAxios hook alle som mit minimal viable product (MVP). Derefter som need to have tilføjede jeg issues som ville gøre oplevelsen for brugeren meget bedre og gøre det nemmere at navigere rundt. Nice to have var ting som jeg ikke behøvede at tilføje men som jeg synes er rigtig rare at have når man skal bruge en hjemmeside og som bare gør hele brugeroplevelsen mere lækker og flydende.

## Perspektivering

Hvis jeg skulle skalere dette projekt ville jeg starte med at lave en opret bruger formular da det er essentielt for siden og firmaet, at kunder kan oprette deres egen bruger og tilmelde sig danse aktiviteter. Dette var også en stor grund i mit valg om at bruge Yup, da det er meget genbrugeligt og man ville kunne bruge det samme skema til at lave en opret bruger formular.

Hvis jeg skulle forbedre applikationen ville jeg ændre et par ting i backenden som billedestørrelse og token længde for bedre hastigheder da det er ekstremt vigtigt at folk ikke skal vente for længe på siden da folk tit går væk fra siden hvis den er for lang tid om at loade.

# Tech Stack

## Build Tool

### **Vite**

Vite tilbyder en hurtigere developer experience med sin lynhurtige build time og hurtige reaktionsevne. Vite bruger en moderne og optimeret development process ved hjælp af ES modules, hvilket resulterer i at det er meget hurtigere end CRA. Dette betyder, at development processsen er mere effektiv og smooth, da man som udvikler kan se ændringerne i real time mens man arbejder.

## Frameworks

### **React.js**

For mig var der to framework muligheder til dette projekt, enten at skrive i frameworket **Next.js** eller **React.js**. Jeg valgte at bruge React da det er det framework som jeg har mest erfaring med og fordi da jeg gjorde mig overvejelser om projektbeskrivelsen og kravene, tænkte jeg at jeg højest sandsynligt ikke ville gøre brug af Next's ekstra funktionaliteter alligevel (så som Server Side Rendering og SEO) så React er det perfekte valg for mig.

React stiller en masse forskellige ting til rådighed som for eksempel et stort community som gør det rigtig nemt at finde problemløsninger, stort udvalg af npm pakker, og det er rigtig nemt at genanvende forskellige komponenter så jeg slipper for at gentage kode jeg allerede har skrevet.

Derudover kan man med React lave en single page applikation hvilket vil sige at man ikke er nødt til at genindlæse en helt ny html side hver gang man skifter side, hvilket gør din applikation hurtigere og får den til at føles mere smooth.

### **TailwindCSS**

Jeg har valgt at bruge Tailwind som mit CSS framework da jeg synes det er helt klart den bedste og mindst tidskrævende måde at skrive CSS på. I modsætning til normale CSS filer som vi kender, styler man med Tailwind direkte når man skriver sin jsx kode ved hjælp af predefinerede klasser, hvilket jeg synes er super smart og hjælper mit workflow rigtig meget.

Der er også andre meget populære CSS frameworks som for eksempel Bootstrap. Bootstrap har meninger om hvordan tingene skal se ud, og man har mindre frihed til at lave noget der ser unikt ud hvorimod med Tailwind kan man lave lige hvad man kunne have lyst til på sin egen måde, så det er derfor jeg har valgt Tailwind frem for Bootstrap.

## **Libraries**

### **Framer-motion**

Det var nok ikke helt behøvet i et projekt på denne størrelse men jeg er blevet virkelig glad for framer-motion og vil gerne vise at jeg kan finde ud af det, jeg bruger det i stort set alle mine projekter. Jeg tænkte at siden welcome-page knappen skulle animeres ville jeg vise hvordan det skal gøres med framer motion :)

I stedet for at lave CSS animationer som vi kender, gør Framer-motion det virkelig nemt ved at man bare kalde sit element for eksempel `<motion.div>`, og derefter give elementet en masse props der fortæller hvordan det skal animeres.

Ligesom TailwindCSS sparer det en virkelig meget tid og kode. Der skal altså ikke meget til for at lave nogle simple men smukke animationer, især hvis man allerede har nogle prædefinerede motion variants fra et andet projekt så er det virkelig nemt at sætte det op.

### **React-router**

React router gør det muligt at navigere siden ved hjælp af at bytte alle de viste komponenter ud hvilket gør det til en single page applikation. Single page applikationer gør applikationen meget hurtigere da man ikke genindlæser et helt nyt html dokument hver gang man navigerer på siden. SPAs giver også en bedre user experience da man ikke ser siden refreshe hver gang man navigere og giver en mere smooth oplevelse.

### **Axios**

Jeg har valgt at bruge axios til mine HTTP requests. Med axios frem for bare at lave et normalt fetch kald er formateringen til json allerede indbygget i det. Axios giver en rigtig god developer experience da jeg personligt synes at kodestrukturen er nemmere at forstå og læse. Axios giver også en bedre user experience i forhold til Cross-browser compatibilty, det vil sige at axios tager sig selv af at få requesten til at virke på meget gamle systemer/browsere hvor man med fetch manuelt skal ind og tjekke på det.

### **React-Toastify**

Jeg har valgt at bruge React-Toastify fordi det er en simpel og effektiv måde at implementere notifikationer og feedback til brugeren. Biblioteket er let at bruge og tilbyder virkelig meget reusability, så det nemt kan integreres i eksisterende projekter. Det er virkelig let at tilpasse udseendet og animationerne, så det passer til applikationens design og branding. React-Toastify et velkendt og veldokumenteret bibliotek, som har et aktiv og støttende community.

### **Lucide-react**

Jeg har valgt at bruge Lucide-React ikoner i stedet for React-Icons fordi Lucide-React ikoner tilbyder et mere moderne og minimalistisk design. Lucide-React ikoner er mere tilgængelige og lette at forstå, da de er baseret på symboler og ikoner, der er let genkendelige for brugerne. Fra hvad jeg har kunne undersøge er Lucide-React ikoner lettere og mere optimerede end React-Icons, hvilket vil sige at applikationen vil køre hurtigere og mere effektivt.

### **Yup**

Jeg har valgt at bruge Yup til mine form valideringer fordi det nemt at bruge, jeg har meget erfaring med det og det gør det meget nemmere at skalere applikationen i fremtiden. Det er meget customizable hvilket gør det til en rigtig god developer experience. Det er også nemt at bruge Yup sammen med React-hook-form, hvilket jeg har gjort i mit projekt.
