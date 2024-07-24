Thé Tip Top Projet

## Getting Started

Cloner le projet:

```bash
git clone https://github.com/daurian37/Jeu-the-tip-top.git
```

Installer les dépendances:

```bash
npm install
```

executer le front:

```bash
npm run dev
```

executer le serveur:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

A respecter

Nomenclature des branches:

```bash
F2I-EPIC/[bugfix-chore-feature]-Desciption_Ticket
```

Nomenclature des commits:

```bash
F2I-EPIC/[fix-chore-feat]-Desciption_commits
```

EPIC: désignation de l'epic du ticket concerné

fix/bugfix: s'il s'agit de la correction d'un bug

feat/feature: ajout d'une fonctionnalité

chore: nettoyage de code

Pour executer les tests e2e:

```bash
npx playwright test --headed
```

Pour visualiser les rapports de tests e2e

```bash
npx playwright show-report
```
executer les tests unitaires:

```bash
npm run test
```