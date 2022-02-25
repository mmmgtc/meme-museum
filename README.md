# MEMES.PARTY

#### MEMES.PARTY is the de facto meme site in WEB3 to rate, curate, celebrate, and proliferate meme culture and memelords in perpetuity!

## Tech stack overview

We are using [WEB3.storage](https://web3.storage) to upload the memes on IPFS and Filecoin in conjunction with TypeScript, Next.js and Chakra-UI on the front-end.
The backend is powered by a Python API using Django & PostgreSQL (That might shift into a GraphQL API to allow discoverability of new memes and real-time updates using subscriptions/pub-sub).

### 📁 Folder structure

```
.
├── packages # Monorepo using yarn workspaces & lerna
│ ├── contexts # Global  state  containing the  account, provider, etc
│ ├── components  # Dummy  &  functional compononents
│ ├── views # the main "views" of the app, meme modal, create meme modal, etc
│ └── styles # theming options
└── ... misc...
```

## 🏄‍♂️ Quick Start

### Prerequisites

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/downloads)
- Account and API key for [WEB3.storage](https://web3.storage/)
- Account and API key for [INFURA](https://infura.io/)

### Clone the repo

```sh
$ git clone https://github.com/mmmgtc/meme-museum.git
```

### Setup env

Create your `.env` files by copying the `.example.env` and fill in the empty values.

```sh
$ cd packages/[dapp, hardhat and schemas]
$ cp .example.env .env
```

### Create your [WEB3.storage](https://web3.storage) account and API key

Go to https://web3.storage and set the value of WEB3STORAGE_TOKEN with your web3.storage API key.

1. Login at the top right (Github or email/password)
2. Go to account
3. Create API key and copy it
4. Paste/assign the value in your `.env` for the `WEB3STORAGE_TOKEN` key)

### Install dependencies

```sh
$ cd meme-museum && yarn install
```

### 👷‍ Development

**Start the 📱 dApp:**

```bash
$ yarn dev
```

### 👷‍ Build it!

**Build the 📱 dApp:**

```bash
$ yarn build
```

### Deploy

The dapp is automatically deployed for every change on the `staging` and `main` branches.

- staging is the default development branch where features are being tested before being merged on main
- main is the production branch

### Running your development environment using docker

```
make up
make in
yard dev
```

Access via http://localhost:3000
