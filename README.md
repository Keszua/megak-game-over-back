# Projekt na zaliczenie
<p align="center">
  <a href="https://www.megak.pl/" target="_blank" rel="noreferrer"> <img src="https://github.com/Keszua/megak-game-over-front/blob/main/public/images/megak.png/" alt="MegaK" height="80"/>
  </a>
</p>


# Back End 

Projekt na zaliczenie drugiej edycji [Mega Kursu JavaScriptu MegaK](https://www.megak.pl)

To jest **back end** napisany w ***node.js*** (framework *NestJS*)
Do prawidłowego działania, wymagany jest **front end** dostępny pod [tym adresem](https://github.com/Keszua/megak-game-over-front/)

<hr/>

## Opis projektu
Przykład strony dla zakładu usługowego.
- rejestracja, logowanie, autoryzacja i autentykacja
- baza danych dla produktów i usług
- obsługa koszyka

<hr/>

## Zastosowane języki i technologie
<p align="center" float="top">
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303360/nodejs-logo.svg" alt="nodejs" width="120"/>
  </a> 
</p>
<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  </a> 
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a> 
  <a href="https://expressjs.com" target="_blank" rel="noreferrer">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" height="40"/> 
  </a> 
  <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" alt="nestjs" width="40" height="40"/>
  </a> 
  <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" height="50"/> 
  </a> 
  <a href="https://typeorm.io/" target="_blank" rel="noreferrer"> <img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" alt="typeORM" height="40"/> 
  </a> 
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
  </a> 
  <a href="https://github.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/github.svg" alt="github" width="50" height="40"/> 
  </a> 
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/331370/docker.svg" alt="docker" width="50" height="40"/> 
  </a> 
  <a href="https://kubernetes.io/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/jmnote/z-icons/master/svg/kubernetes.svg" alt="kubernetes" width="40" height="40"/> 
  </a> 
  <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/448266/aws.svg" alt="kubernetes" width="40" height="40"/> 
  </a> 
  <a href="https://aws.amazon.com/eks/" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/448262/amazon-eks.svg" alt="kubernetes" width="40" height="40"/> 
  </a> 
</p>


## Zrealizowane zadania

- [x] Instalacja Nest
- [x] Założenie repozytorium na GitHub
- [x] Przygotowanie pliku README
- [x] Konfiguracja Git i wypchniecie projektu na zdalne repozytorium
- [x] Stworzenie testowego programu, który zwróci napis "Aplikacja działa"
- [x] Stworzenie bazy danych
- [x] Przygotowanie pliku config.ts 
- [x] Stworzenie połąaczenia z bazą danych
- [x] Instalacja TypeORM
- [x] Konteneryzacja
- [x] Uruchomienie projektu na AWS w usłudze EKS
- [x] Rejestracja, logowanie, autoryzacja i autentykacja
- [x] Dodanie modułu produktów i usług
- [x] Dodanie endpointów produktów i usług
  - [x] Zaprojektowanie struktury bazy
  - [x] Dodawanie rekordu ogłoszenia
  - [x] Zwracanie pojedynczego ogłoszenia
  - [x] Listowanie ogłoszeń
  - [x] Wyszukiwanie ogłoszeń
  - [x] Dodawanie ogłoszeń
- [x] Dodanie modułu koszyka
- [x] Dodanie endpiontów dla koszyka
  - [x] Zaprojektowanie struktury bazy
  - [x] Dodawanie rekordu koszyka
  - [x] Zwracanie zawartości koszyka
  - [ ] Zapamiętywanie historii koszyka/zakupów
- [ ] Globalna obsługa błędów


<hr/>

## Uruchomienie

Repozytorium współdziała z częścią frontendową, którą można znaleźć pod [tym adresem](https://github.com/Keszua)

### Uruchomienie projektu na swojej lokalnej maszynie

Sklonuj repozytorium na swój dysk

```bash
git clone https://github.com/Keszua/project...
```

Wejdź do folderu *project* i pobierz wymagane zależności

```bash
cd project
npm install
```

W folderze config, zmień jego nazwę *configuration.example.ts*, na: *configuration.ts* i uzupełnij dane swojej konfiguracji bazy.

Uruchomienie projektu

```bash
npm start
```

Zostanie uruchomiony serwer [http://localhost:3001](http://localhost:3001).

Uruchomienie w trybie watch mode

```bash
npm run start:dev
```

Stworzenie wersji produkcyjnej

```bash
npm run start:prod
```

### Uruchomienie projektu na platformie Kubernetes
Ten projekt uruchomiłem na chmurze [aws](https://aws.amazon.com/) w usłudze [EKS](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)

Analogicznie, podobnie uruchamia się projekty na [Google Cloud](https://cloud.google.com/), [Microsoft Azure](https://azure.microsoft.com/pl-pl/), [linode](https://www.linode.com/), [OVH](https://www.ovhcloud.com/pl/) lub lokalnie z zainstalowanym [minikube](https://minikube.sigs.k8s.io/docs/)

Tworzenie obrazu kontenera:
```bash
docker image build -t megak-gameover-back:v1.0.1 .
```

Zakładając że jest zainstalowany Docker, można sprawdzić, czy kontener uruchomi się prawidłowo na lokalnej maszynie, za pomocą polecenia:
```bash
docker run -p 3000:3000 megak-gameover-back:v1.0.1
```

Aby wysłać obraz na chmurę, można to zrobić przez GitHub (tak jak pokazywał Kuba w kursie MegaK w filmie: Etap 7 - Advanced | Tydzień 5 - dzień 5).
Ja skorzystałem z bardziej dedykowanej metody, jaką jest 
[DockerHub](https://hub.docker.com/)


Otagowanie obrazu swoją nazwą konta DockerHub:
```bash
docker image tag megak-gameover-back:v1.0.1 nazwaTwojegoKontaDockerHub/megak-gameover-back:v1.0.1
```

Wysłanie otagowanego obrazu na DockerHub:
```bash
docker image pull nazwaTwojegoKontaDockerHub/megak-gameover-back:v1.0.1
```

Aby uruchomić projekt na AWS EKS, korzystam z "AWS CloudShell".
Należy skopiować pliki .yaml do przygotowanej usługi EKS. Można to zrobić za pomocą Actions -> Uplowad file.
Działa wklejanie teści ze schowka.

*gameover-secret.yaml* plik zawiera dane przykładowe.
Umieć plik na swoim zdalnym serwerze, uzupełnij swoimi danymi.
(w pliku *configuration.ts* mogą być zupełnie inne dane, te dwa pliki nie są od siebie zależne).
Uruchom polecenie (na chmurze):
```bash
kubectl apply -f gameover-secret.yaml
```

Można sprawdzić czy powstała instancja secret za pomocą polecenia (na chmurze):
```bash
kubectl get secrets
```

*gameover-volume.yaml* - plik do stworzenia stałego miejsca na dysku, gdzie będą trwale przechowywane dane z bazy (nie zostaną utracone, nawet jeśli przestanie istnieć kontener z mysql)
```bash
kubectl apply -f gameover-volume.yaml
```


*gameover-mysql.yaml* - plik do uruchomienia bazy *mysql:5.6*
Uruchomienie bazy (na chmurze):
```bash
kubectl apply -f gameover-mysql.yaml
```

*gameover-api.yaml* - plik do uruchomienia właściwej aplikacji.
```bash
kubectl apply -f gameover-api.yaml
```


Jeśli wszystko się uruchomiło poprawnie, po wpisaniu polecenia (na chmurze):
```bash
kubectl get all
```
Powinniśmy zobaczyć wynik podobny do tego:
```js
NAME                                  READY   STATUS    RESTARTS   AGE
pod/gameover-mysql-78779bdd59-7tchh   1/1     Running   0          65m
pod/megak-gameover-56464c685d-jrdf4   1/1     Running   0          38m
pod/megak-gameover-56464c685d-trl5n   1/1     Running   0          38m

NAME                         TYPE           CLUSTER-IP       EXTERNAL-IP                                                                 PORT(S)        AGE
service/kubernetes           ClusterIP      XXX.XXX.XXX.1       <none>                                                                      443/TCP        4d23h
service/megak-gameover-srv   LoadBalancer   XXX.XXX.XXX.154   ac58800750a4f453a90e4e72f470ca71-405922443.eu-central-1.elb.amazonaws.com   80:30001/TCP   60m
service/mysql                ClusterIP      XXX.XXX.XXX.106   <none>                                                                      3306/TCP       65m

NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/gameover-mysql   1/1     1            1           65m
deployment.apps/megak-gameover   2/2     2            2           60m

NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/gameover-mysql-78779bdd59   1         1         1       65m
replicaset.apps/megak-gameover-56464c685d   2         2         2       38m
replicaset.apps/megak-gameover-6cb577955    0         0         0       60m
```

Gdzie [http://ac58800750a4f453a90e4e72f470ca71-405922443.eu-central-1.elb.amazonaws.com/](http://ac58800750a4f453a90e4e72f470ca71-405922443.eu-central-1.elb.amazonaws.com/) to  link, do naszej aplikacji.


W plikach .yaml dodałem podstawowe wskazówki związane z dany plikiem

**Uwaga!** Wyłączyłęm tą usługę, poniewarz w ciągu miesiaca obciążyło moje konto na około 100USD. Jeszcze nie stać mnie na taką zabawę.

<br/><br/><hr/>

## Kontakt

Mój profil na <a href="https://www.linkedin.com/in/karol-michalczyk-keszua83/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/linkedin/linkedin-ar21.svg" alt="git" width="85" height="40" align="center"/> 
</a>

#### mail: [Gmail](mailto:keszua@gmail.com)

<hr/>
