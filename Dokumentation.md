# Landrup Dans - Oliver

Elev: Oliver Zeymer

Hold: WU07

Uddannelse: Webudvikler

## Beskrivelse

Velkommen til min eksamensopgave, Landrup Dans! I dette repository har jeg lavet min eksamensopgave som bruger [Landrup Dans API'et](https://github.com/OtakuBoy420/landrup-dans-api), læs videre for at lære mere om hvordan man starter projektet, min tilgang og hvordan jeg har overvejet mine valg :)

## List of contents

- [Landrup Dans - Oliver](#landrup-dans---oliver)
  - [Beskrivelse](#beskrivelse)
  - [List of contents](#list-of-contents)
  - [.env fil](#env-fil)
  - [Start projektet](#start-projektet)
- [Projekt tilgang](#projekt-tilgang)
  - [Project Board](#project-board)
  - [Prioritering](#prioritering)
  - [Perspektivering](#perspektivering)
- [Design Ændringer](#design--ndringer)
  - [Navigations menu](#--navigations-menu--)
  - [Input felter](#--input-felter--)
  - [Hold roster side](#--hold-roster-side--)
  - [Kalender side](#--kalender-side--)
- [Valgfrie opgaver](#valgfrie-opgaver)
  - [A - Automatiseret Deployment](#--a---automatiseret-deployment--)
  - [B - Responsive Design](#--b---responsive-design--)
  - [C - Cookies](#--c---cookies--)
- [Kode Eksempler](#kode-eksempler)
  - [Skriftligt Eksempel - useAxios hook](#skriftligt-eksempel---useaxios-hook)
  - [Mundtligt Eksempel - joinActivity funktion](#mundtligt-eksempel---joinactivity-funktion)
- [Tech Stack](#tech-stack)
  - [Build Tool](#build-tool)
    - [Vite](#--vite--)
  - [Frameworks](#frameworks)
    - [React.js](#--reactjs--)
    - [TailwindCSS](#--tailwindcss--)
  - [Libraries](#libraries)
    - [Framer-motion](#--framer-motion--)
    - [React-router](#--react-router--)
    - [Axios](#--axios--)
    - [React-Toastify](#--react-toastify--)
    - [Lucide-react](#--lucide-react--)
    - [Yup](#--yup--)

## .env fil

```env
VITE_API_URI=http://localhost:4000/api/v1
VITE_AUTH_URI=http://localhost:4000/auth/token
```

## Start projektet

1. Klon projektet ned på din maskine.
2. Tilføj .env filen som står ovenover i dokumentation til rooten af projektet.
3. Start [Landrup Dans API'et](https://github.com/OtakuBoy420/landrup-dans-api) på din maskine.
4. Kør kommandoen `npm install` og vent på at alt er blevet installeret korrekt.
5. Få development serveren op og køre i terminalen:

```bash
npm run dev
```

6. Til sidst hvis Vite ikke allerede har gjordt det for dig, åben http://localhost:5173 i browseren, og så er vi i gang! :)

# Projekt tilgang

## Prioritering og organisering

Jeg har lavet et [GitHub Projects board](https://github.com/orgs/rts-cmk-wu07/projects/17/views/1) med issues og labels der indikerer om jeg synes issuet er en MVP, Nice to have eller Need to have. Min tankegang da jeg satte mit board op var "hvad skal man minimum have på siden for at brugeren kan bruge alt funktionaliteten?" Så det var derfor at jeg satte activities page, activity list, activity details, log in og useAxios hook alle som mit minimal viable product (MVP). Derefter som need to have tilføjede jeg issues som ville gøre oplevelsen for brugeren meget bedre og gøre det nemmere at navigere rundt. Nice to have var ting som jeg ikke behøvede at tilføje men som jeg synes er rigtig rare at have når man skal bruge en hjemmeside og som bare gør hele brugeroplevelsen mere lækker og flydende. Jeg synes det er rigtig rart at have et project board til sit projekt fordi det gør det meget nemmere at få overblik over hvor henne man er og hvad der mangler.

## Perspektivering

Hvis jeg skulle skalere applikationen ville jeg starte med at lave en opret bruger formular da det er essentielt for danseskolen at kunder kan oprette deres egen bruger og tilmelde sig aktiviteter. Dette var også en stor grund i mit valg om at bruge Yup, da det er meget genbrugeligt og man ville kunne genbruge mit skema til at lave en opret bruger formular. Jeg ville også lave en "glemt password" formular som sender en email til brugeren med et link til at nulstille deres password hvis de har glemt det og en "opret aktivitet" formular som ville gøre det muligt for instruktørere at oprette nye aktiviteter. Til sidst ville jeg tilføje noget information om firmaet og instruktørerne på siden i form af en "om os" side eller i en footer, med billeder og kontakt information om firmaet og instruktørerne.

Hvis jeg skulle forbedre applikationen ville jeg ændre et par ting i API'et som billedestørrelse og token længde for hurtigere performance da det er ekstremt vigtigt at folk ikke skal vente for længe på at indlæse siden da folk tit vil lukke siden ned hvis den er for lang tid om at loade. Jeg ville også ændre i API'et så det vil give nogen bedre og mere beskrivende fejlbeskeder så brugeren kan forstå hvad der er galt og hvad de potentielt kan gøre for at løse problemet.

# Design Ændringer

## **Navigations menu**

Jeg har valgt at lave en ekstra knap i navigations menuen som viser et Login-formular modal pop-up vindue når man trykker på den. Da jeg gjorde mig overvejlser over hvordan man skulle logge ind og ud af applikationen tænkte jeg at det ville være mest brugervenligt at der var en knap til det som man altid kunne trykke på for at åbne formularen, og siden der var massere af plads i navigations menuen til en ekstra knap så valgte jeg at gøre det på den måde.

## **Input felter**

Jeg har valgt at give input felterne på siden afrundede hjørner så de passer bedre ind i det generelle udtryk af siden, nu hvor næsten alt andet er afrundet og brugeren skal have et indtryk at der er en sammenhæng mellem alle elementerne på siden.

## **Hold roster side**

Jeg har lavet listen over de tilmeldte brugere meget nemmere at læse ved at sætte det op som en liste med punktopstilling og lidt margin mellem punkterne. Derudover hvis man er instruktør og går ind på en aktivitet som man er instruktør for, er der en knap til at gå til hold roster siden for nem adgang.

## **Kalender side**

På kalender-siden har jeg gjort titlen på ens aktiviter mindre så man kan se hele navnet på aktiviteten, da det gør det meget nemmere at læse og få en forståelse for hvilke aktiviteter man er tilmeldt.

# Valgfrie opgaver

### **A - Automatiseret Deployment**

Jeg har deployet min applikation til Vercel da jeg synes det er en rigtig god platform som jeg har brugt til deployment mange gange før. Jeg har valgt at bruge Vercel frem for Netlify da jeg synes det er nemmere at sætte op og bruge.

### **B - Responsive Design**

Jeg har gjordt min applikation responsiv ved at bruge tailwind's breakpoints, det vil sige at min applikation er responsiv på alle skærmstørrelser. Jeg har hold mig så godt som muligt til de design-valg der allerede er foretaget i det udleverede design, men har nogle gange ændre lidt ting for at det også er brugervenligt på større skærme.

### **C - Cookies**

Jeg har lavet en "husk mig" checkbox i login formularen som bruger React-use-cookie biblioteket til at sætte en cookie om man vil blive husket næste gang man går ind på siden.

# Kode Eksempler

## Skriftligt Eksempel - useAxios hook

```javascript
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import checkTokenValidity from "../functions/checkTokenValidity";

export default function useAxios(url, { needsAuth = false, token = "", needsId = false, id = null } = {}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (needsAuth && !token) {
      setLoading(false);
      setError({
        message: "Du skal være logget ind for at se denne side.",
        status: 401,
      });
      return;
    }
    if (needsId && !id) {
      setLoading(false);
      setError({
        message: "Der er sket en fejl. Prøv igen senere.",
        status: 400,
      });
      return;
    }

    setLoading(true);
    setError(null);

    if (needsAuth) {
      checkTokenValidity(auth, setAuth);
    }

    axios
      .get(needsId && id ? `${url}/${id}` : url, needsAuth ? { headers: headers } : null)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setLoading(false);
        } else {
          setError(new Error(`Data fejl: ${response.status}`));
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(new Error(`Data fejl: ${err.message}`));
        setLoading(false);
      });
  }, [url, needsAuth, token, id]);

  return { data, error, loading };
}
```

<br />
useAxios er et custom react hook som gør det enkelt og nemt at hente data fra et API ved hjælp af axios-biblioteket.

Jeg har valgt at lave et custom hook til GET requests fordi der skal laves mange API-kald i applikationen på forskellige sider med forskellige headers og jeg synes det er den bedste måde at samle sin logik på. Custom hooks hook gør det ekstremt nemt at genbruge sin logik henover hele applikationen og de er virkelig effektive når det kommer til at undgå kode duplikering og god vedligeholdelse i fremtiden.

Hooket tager en URL string og et destructured optional object med nogle default values som kan indeholde krav om authorization eller ID som parametre.

Hookets funktionalitet er at lave en GET request til det angivne URL med mulighed for headers. Det returnerer derefter et objekt med tre states: data, error og loading.

For at forklare state-håndteringen vil "data" indolde den data som er blevet hentet fra API'et, "error" vil indeholde de fejl der kan ske under API-kaldet, og "loading" vil være true eller false i forhold til om API-kaldet er i gang eller færdigt med at loade dataen.

Hvis man kalder hooket med "needsAuth" eller "needsId" paremtrerne i et objekt vil hooket lave API kaldet ud for den logik der er skrevet som går ind og tjekker på det for at undgå unødvendige fetch kald og andre fejl. Derudover når man bruger hooket med "needsAuth" kører den min checkTokenValidity funktion som fungerer som en slags middleware der tjekker om ens token er udløbet og hvis det er det, så fjerner den tokenet fra session og cookie, logger brugeren ud og viser en notifikation.

Så i konklusion kan mit useAxios hook lave GET requests på en rigtig nem måde, og håndtere mine states for mig med kun en linje kode i mine komponenter.

<br />

## Mundtligt Eksempel - joinActivity funktion

```javascript
import axios from "axios";
import { toast } from "react-toastify";
import checkTokenValidity from "./checkTokenValidity";

export default function joinActivity(data, setHasJoined, setUserJoinedDays, userJoinedDays, setUserJoinedActivities, userAge, auth, setAuth) {
  // Kører min checkTokenValidity funktion som fungerer som en slags middleware der tjekker om ens token er udløbet og hvis det er det, så bliver logger brugeren ud og viser en notifikation.
  checkTokenValidity(auth, setAuth);

  //GUARD CLAUSES

  // Hvis brugeren ikke er logget ind, vises en fejlmeddelelse og funktionen afbrydes
  if (!auth) {
    toast.error("Du skal være logget ind for at kunne tilmelde dig aktiviteter", {
      position: "top-center",
      autoClose: 5000,
    });
    return;
  }

  // Hvis brugeren allerede er tilmeldt en aktivitet på samme ugedag, vises en fejlmeddelelse og funktionen afbrydes
  if (userJoinedDays.includes(data?.weekday)) {
    toast.error(`Du er allerede tilmeldt en aktivitet på ${data?.weekday ? data?.weekday : "denne dag"}`, {
      autoClose: 5000,
    });
    return;
  }

  // Hvis brugerens alder ikke er inden for aldersgrænsen for aktiviteten, vises en fejlmeddelelse og funktionen afbrydes
  if (userAge < data?.minAge || userAge > data?.maxAge) {
    toast.error(
      `Du skal være mellem ${data?.minAge}-${data?.maxAge} år for at kunne tilmelde dig ${data?.name}
    `,
      {
        autoClose: 7500,
      }
    );
    return;
  }

  // Laver en POST request til API'et med brugerens token og id for at tilmelde brugeren til aktiviteten
  axios.post(`${import.meta.env.VITE_API_URI}/users/${auth?.userId}/activities/${data?.id}`, {}, { headers: { Authorization: `Bearer ${auth?.token}`, "Content-Type": "application/json" } });

  // Opdaterer userJoinedDays statet med den nye ugedag, så brugeren ikke kan tilmelde sig aktiviteten igen
  setUserJoinedDays([...userJoinedDays, data?.weekday]);

  // Opdaterer userJoinedActivities statet med den nye aktivitet, så brugeren ikke kan tilmelde sig aktiviteten igen
  setUserJoinedActivities((prevState) => [...prevState, data?.id]);

  // Opdaterer hasJoined statet til true, så brugeren ikke kan tilmelde sig aktiviteten igen
  setHasJoined(true);

  // Viser en succesmeddelelse om tilmelding
  toast.success(
    <div>
      Du er nu tilmeldt {data?.name}. <br />
      Vær klar på {data?.weekday.charAt(0).toUpperCase()}
      {data?.weekday.slice(1)} kl.{data?.time}!
    </div>,
    {
      autoClose: 5000,
    }
  );
}
```

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

## Libraries

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
